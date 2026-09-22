/*
 * Design-system lint: find colour that bypasses the M3 token layer.
 *
 *   node tools/check_tokens.mjs            report
 *   node tools/check_tokens.mjs --strict   exit 1 if anything is found
 *
 * The theme only holds together if every colour resolves to an M3 role. A
 * literal hex or a Quasar palette class cannot follow the light/dark flip, so
 * one stray `bg-grey-2` is a patch of permanent light grey sitting in a dark
 * UI. Those are invisible in code review and obvious on screen, which is
 * exactly the kind of thing worth automating.
 *
 * See docs/design-system.md.
 */

import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'

const STRICT = process.argv.includes('--strict')

/*
 * Files where literal colour is legitimate:
 *   _color.css          the generated palette -- literals are the point
 *   quasar.variables.scss  compile-time seeds, documented as mirroring _color
 *   _quasar-bridge.css  the three status colours M3 has no role for
 */
const EXEMPT = [
  'src/css/tokens/_color.css',
  'src/css/quasar.variables.scss',
  'src/css/tokens/_quasar-bridge.css',
  /* Generated alongside _color.css. Its swatches must be literal colours --
     the picker paints them before the theme they represent is active, so they
     cannot come from a var(). */
  'src/config/themes.js'
]

/* Quasar's Material 2 palette classes -- each one is a frozen colour. */
const PALETTE = '(?:red|pink|purple|deep-purple|indigo|blue|light-blue|cyan|teal|green|light-green|lime|yellow|amber|orange|deep-orange|brown|grey|blue-grey)'

const RULES = [
  {
    id: 'hex',
    label: 'hard-coded hex colour',
    re: /(?<!url\()#[0-9a-fA-F]{3,8}\b/g,
    /*
     * A three or four digit hex is only treated as a colour inside CSS.
     * Outside it, `#125` is far more often data -- issue numbers, order ids,
     * anchors -- and flagging those sends people to "fix" a ticket reference.
     * Six and eight digit forms are unambiguous enough to flag anywhere.
     */
    cssOnlyBelowLength: 6
  },
  {
    id: 'rgb',
    label: 'hard-coded rgb()/rgba()',
    re: /\brgba?\(\s*\d/g
  },
  {
    id: 'palette-class',
    label: 'Quasar palette class (frozen colour, cannot follow dark mode)',
    re: new RegExp(`\\b(?:bg|text)-${PALETTE}(?:-\\d{1,2})?\\b`, 'g')
  },
  {
    id: 'absolute-bw',
    label: 'text-white / text-black / bg-white / bg-black',
    re: /\b(?:text|bg)-(?:white|black)\b/g
  }
]

const files = globSync('src/**/*.{vue,css,scss,js}').filter(f => EXEMPT.includes(f) === false)

/*
 * Blank out comments before scanning, preserving newlines so reported line
 * numbers still point at the real line.
 *
 * Without this the gate flags its own documentation: a comment reading "was
 * bg-blue-8, now primary-container" is a description of the fix, and reporting
 * it as a violation trains people to ignore the tool. Whitespace replaces the
 * comment body rather than deleting it so offsets never shift.
 */
function stripComments (source) {
  const blank = match => match.replace(/[^\n]/g, ' ')

  return source
    .replace(/<!--[\s\S]*?-->/g, blank)   // HTML / template
    .replace(/\/\*[\s\S]*?\*\//g, blank)   // CSS and JS block
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + blank(m.slice(p1.length))) // // line, not URLs
}

const findings = []

/* True for whole-stylesheet files; for .vue, only inside <style>. */
const isStylesheet = file => /\.(?:css|scss|sass)$/.test(file)

for (const file of files) {
  const source = stripComments(readFileSync(file, 'utf8'))
  const lines = source.split('\n')

  let inStyleBlock = isStylesheet(file)

  lines.forEach((line, index) => {
    if (inStyleBlock === false && /<style[\s>]/.test(line) === true) inStyleBlock = true
    else if (isStylesheet(file) === false && /<\/style>/.test(line) === true) inStyleBlock = false

    /* An inline style attribute is a CSS context too. */
    const cssContext = inStyleBlock === true || /style\s*=|style\s*:/.test(line) === true

    /* A line that already reaches a token is doing the right thing. */
    if (line.includes('--md-sys-') === true) return

    for (const rule of RULES) {
      rule.re.lastIndex = 0
      const hits = line.match(rule.re)
      if (hits === null) continue

      const relevant = rule.cssOnlyBelowLength === undefined
        ? hits
        : hits.filter(hit => (
          hit.length - 1 >= rule.cssOnlyBelowLength || cssContext === true
        ))

      if (relevant.length > 0) {
        findings.push({ file, line: index + 1, rule: rule.label, hits: [ ...new Set(relevant) ] })
      }
    }
  })
}

if (findings.length === 0) {
  console.log(`ok -- ${files.length} files, no colour bypasses the token layer`)
  process.exit(0)
}

const byFile = findings.reduce((map, f) => {
  ;(map[ f.file ] ||= []).push(f)
  return map
}, {})

const order = Object.entries(byFile).sort((a, b) => b[ 1 ].length - a[ 1 ].length)

for (const [ file, items ] of order) {
  console.log(`\n${file}  (${items.length})`)
  for (const item of items.slice(0, 8)) {
    console.log(`  ${String(item.line).padStart(4)}: ${item.hits.join(', ')}   -- ${item.rule}`)
  }
  if (items.length > 8) console.log(`  ... ${items.length - 8} more`)
}

console.log(`\n${findings.length} finding(s) across ${order.length} file(s)`)
process.exit(STRICT === true ? 1 : 0)

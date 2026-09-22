/*
 * Parse-check .vue single-file components without running a build.
 *
 *   node tools/check_sfc.mjs [path ...]     (defaults to src/)
 *
 * `quasar build` writes .quasar/ and dist/, so several of them running at once
 * corrupt each other's output. This gives a way to validate template and script
 * syntax in parallel -- it catches unclosed tags, bad interpolation and script
 * parse errors, which is most of what a careless edit breaks.
 *
 * It does NOT type-check, resolve imports or verify component registration; a
 * real build is still the authority before shipping.
 */

import { readFileSync } from 'node:fs'
import { globSync } from 'node:fs'
import { parse } from 'vue/compiler-sfc'

const args = process.argv.slice(2)
const patterns = args.length > 0 ? args : [ 'src/**/*.vue' ]

const files = patterns.flatMap(p => (
  p.includes('*') ? globSync(p) : globSync(`${p.replace(/\/$/, '')}/**/*.vue`).concat(p.endsWith('.vue') ? [ p ] : [])
))

let failed = 0

for (const file of [ ...new Set(files) ]) {
  const { errors } = parse(readFileSync(file, 'utf8'), { filename: file })
  if (errors.length > 0) {
    failed++
    console.error(`\n${file}`)
    for (const error of errors) {
      const line = error.loc?.start?.line
      console.error(`  ${line !== undefined ? `line ${line}: ` : ''}${error.message}`)
    }
  }
}

console.log(
  failed === 0
    ? `\nok -- ${[ ...new Set(files) ].length} components parsed cleanly`
    : `\n${failed} component(s) failed to parse`
)

process.exit(failed > 0 ? 1 : 0)

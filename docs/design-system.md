# Material 3 Expressive — design system

How this app is themed, and the rules for building UI in it.

Based on Material 3 as of the [I/O 2026 expressive layout update](https://m3.material.io/blog/whats-new-at-io26).

## Why the theme is hand-built

Material has no first-party web implementation of the 2026 update:

| Subsystem | Web status per Material |
|---|---|
| Spacing system & tokens | Unavailable |
| `@material/web` components | Maintenance mode, awaiting new maintainers |
| Layout scaffold / canonical layouts | Compose + Android Views only |
| Motion physics | Compatible — Material publishes a spring→cubic-bezier table |

So the token layer is ours, and **Quasar is bridged onto it rather than replaced**.

## The two halves

**Runtime** — `src/css/tokens/`. CSS custom properties. Can retheme anything Quasar
reads through `var()`, which is colour, and only colour.

**Compile-time** — `src/css/quasar.variables.scss`. Radii, type scale, breakpoint
boundaries, grid gutters. Quasar bakes these into its stylesheet at build time;
no runtime variable can reach them.

`_quasar-bridge.css` maps `--q-*` onto M3 roles, so every existing `bg-primary`,
`text-primary` and `color="primary"` in the app follows the theme for free.

> **Gotcha.** A custom property containing `var()` resolves on the element
> carrying the *declaration*; descendants inherit the finished value. Quasar's
> dark class sits on `<body>`, one level below `:root`, so any `:root` bridge
> must be **repeated under `.body--dark`** or it stays frozen at the light value.

## Colour

Generated from one seed (`#6750A4`) by `tools/generate_m3_tokens.mjs` →
`npm run tokens:generate`. 36 roles × light/dark. Never edit `_color.css`.

Use role pairs. A `-container` background always takes its `on-` pair as
foreground; that is what guarantees contrast in both schemes.

```css
background: var(--md-sys-color-primary-container);
color: var(--md-sys-color-on-primary-container);
```

Elevation is **surface tone**, not shadow:
`surface-container-lowest → low → container → high → highest`.

`error-container` carries meaning. Don't use it decoratively.

M3 has no success/info/warning roles — `--q-positive/info/warning` keep Quasar's
values and are lightened under `.body--dark` for contrast.

## Spacing — `--md-sys-space-*`

8dp scale, `space100` = 8px. Material only defines the values it uses, so the
nested units are deliberately not a uniform progression:

`0 · 25:2 · 50:4 · 75:6 · 100:8 · 125:10 · 150:12 · 175:14 · 200:16 · 250:20 · 300:24 · 400:32 · 450:36 · 500:40 · 600:48 · 700:56 · 800:64 · 900:72`

Prefer padding and gaps on the parent over margins on children.

## Shape — `--md-sys-shape-corner-*`

`none:0 · extra-small:4 · small:8 · medium:12 · large:16 · large-increased:20 ·
extra-large:28 · extra-large-increased:32 · extra-extra-large:48 · full`

**Optical roundness** — nested containers must not share a radius:

```
inner radius = outer radius − padding      e.g. 28 − 16 = 12
```

## Type

Quasar's `.text-h1..h6`, `.text-subtitle1/2`, `.text-body1/2`, `.text-caption`
are remapped onto the M3 scale, so existing markup already gets M3 metrics.

For new markup use the token classes: `.md-display-*`, `.md-headline-*`,
`.md-title-*`, `.md-body-*`, `.md-label-*`, plus `--emphasized` modifiers
(heavier weight, for selection, actions and headlines).

Only Roboto 400/500/700 ship. Baseline needs 400/500, emphasized 500/700 — the
full scale renders without adding a weight. Don't introduce one.

Keep lines to 40–60 characters; `.md-measure` caps at `64ch`.

## Motion — `--md-sys-motion-*`

Material's published spring→curve conversions.

- **spatial** curves overshoot (control point y > 1). Safe on `transform` and
  `opacity` only — animating `width`/`height` with them forces layout every
  frame and can overshoot to negative values.
- **effects** curves never overshoot. Use for colour and opacity.

Durations collapse to `1ms` (not `0`) under `prefers-reduced-motion`, so
`transitionend` listeners still fire.

## Breakpoints

| | Width | Margin | Panes | Navigation |
|---|---|---|---|---|
| compact | <600 | 16 | 1 | bottom bar / modal rail |
| medium | 600–839 | 24 | 1 | rail |
| expanded | 840–1199 | 24 | 2 | rail |
| large | 1200–1599 | 24 | 2 | rail |
| extra-large | 1600+ | 24 | 2–3 | expanded rail |

Quasar's five size classes are **realigned to these**, so `col-md-*` and
`$q.screen` break where the scaffold does. `col-md-*` now starts at **840px**,
not 1024px.

`useBreakpoint()` adds the semantic layer: `navigationMode`, `recommendedPanes`.

## Rules for building UI here

1. **Use Quasar components.** This is a Quasar template. `QCard`, `QItem`,
   `QTable`, `QExpansionItem`, `QTabs` bring accessibility, keyboard support,
   ripple and RTL. Style them with tokens; don't rebuild them.
2. **No hardcoded colour.** No hex, no `rgb()`, no Quasar palette classes like
   `bg-grey-2` / `text-indigo-8`. Every colour is a role.
3. **Interactive targets stay ≥ 48×48 CSS px**, whatever the density.
4. **Density is opt-in**, never the default.
5. **Logical properties** — `padding-inline-start`, not `padding-left`; M3
   requires RTL to work.
6. **State layers** are the content colour at an opacity, composited over the
   surface — not a fixed grey:
   `color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent)`
   (8% hover, 12% pressed).

## Build gates

```bash
npm run tokens:check     # _color.css matches the generator
npm run fonts:check      # FA subset covers every rendered icon
```

**Adding a Font Awesome icon fails the production build** until
`npm run fonts:subset` is re-run and the four woff2 files re-committed
(`postcss.config.js` asserts this). Material Icons are never purged — prefer
them, and they're the M3-native set anyway.

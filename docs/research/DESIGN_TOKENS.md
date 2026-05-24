# Frontify.com — Design Tokens

## Colors (extracted from CSS `--primitive-color-palette--*`)

| Token | Hex | Usage |
|---|---|---|
| `--color-paper` / `--color-core-white` | `#f0f0eb` | Main page background |
| `--color-core-black` | `#111110` | Primary text |
| `--color-neutral-05` | `#f8f8f5` | Lightest off-white surface |
| `--color-grey-25` | `#e1e1db` | bg-secondary, subtle dividers |
| `--color-grey-30` | `#d7d7d0` | hairlines |
| `--color-grey-35` | `#cbcbc5` | borders |
| `--color-grey-40` | `#bfbfb8` | text-tertiary |
| `--color-grey-50` | `#a4a49e` | icon defaults |
| `--color-grey-60` | `#777772` | muted text |
| `--color-grey-75` | `#575753` | text-secondary |
| `--color-grey-80` | `#464643` | dark text |
| `--color-grey-90` | `#242422` | near-black |
| `--color-marker-purple` | `#b60ae3` | Accent / brand highlight (CTA hovers, links) |
| `--color-error-red` | `#e7461e` | Error / destructive |

Inverse theme (hero sections):
- `--coded-color-theme--bg` on hero = dark / image overlay
- `--coded-color-theme--text` on hero = white

## Typography

### Font families

| Token | Family | Use |
|---|---|---|
| `--primitive-font-family--utility` | `"ABC Diatype", Verdana, sans-serif` | Body, UI, labels, paragraphs |
| `--primitive-font-family--expression` | `Cranny, "Palatino Linotype", sans-serif` | Display headings (h1–h6) |

### Font weights observed

- ABC Diatype: 400 (regular), 500 (medium), 700 (bold), 900 (black) + italics
- Cranny: 300 (light), 400, 500, 700, 900 + variants (Hairline, Frame, Blocks, ParadigmShifts)

### Sample sizes (from getComputedStyle)

| Element | Family | Size | Weight | Line height | Color |
|---|---|---:|---:|---:|---|
| `body` | ABC Diatype | 18px | 400 | 27px (1.5) | `#111110` |
| `h1` | Cranny | 40px | 300 | 40px (1.0) | white (in hero) |
| Standard h2 | Cranny | ~40px | 300 | ~40px | `#111110` |

(More precise sizes per section in component spec files.)

## Spacing scale (Webflow primitive vars)

| Token | Value |
|---|---|
| `--primitive-spacing--s-16px` | 1rem (16px) |
| `--primitive-spacing--s-32px` | 2rem (32px) |
| `--alias-spacing--s-3xs` | 16px |
| `--alias-spacing--s-4xs` | 12px |
| `--alias-spacing--s-xs` | 24px |
| `--alias-spacing--s-lg` | 64px |
| `--alias-spacing--s-xl` | 80px |

## Fonts to self-host

### ABC Diatype (woff2 from `cdn.prod.website-files.com/66e0711541e49a7979011342/`)
- 67b131ba7dd289fecc81cd37 — Regular (400)
- 67b131ba39bc6aa0f65b4381 — RegularItalic (400i)
- 67b131ba2198ce62d23f826d — Medium (500)
- 67b131ba0778c8023e9cd441 — MediumItalic (500i)
- 67b131bad98df6fd29d02b35 — Bold (700)
- 67b131ba027f0ee0d82c2895 — BoldItalic (700i)
- 67b131baec8a8aeeab43f6bc — Black (900)
- 67b131bafb6d026271a3bf7f — BlackItalic (900i)

### Cranny
- 67c1c1577a19111ac69b8825 — Light (300)
- 67c1b8b4a112404d7a357b46 — Regular (400)
- 67c1b8dc4ad50f29fe566822 — Medium (500)
- 67c1b8b4aa321a0546109818 — Bold (700)
- 67c1b8b491666bb01fe4188b — Black (900)
- 67e17fcd3deaf0f4ff10e370 — Blocks (decorative)
- 67e181c2fda5d9b0053361cb — Frame (decorative)
- 67e181d4808848bf0a56781f — Hairline (decorative)
- 67e181ec41c8c3bcfe65b768 — ParadigmShifts (decorative)

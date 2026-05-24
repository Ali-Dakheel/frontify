# Frontify.com/en — Page Topology

Source URL: https://www.frontify.com/en
Total scroll height: ~17,250px
Viewport tested: 1408x715

## Tech stack

- **Builder:** Webflow (`data-wf-page`, `data-wf-site`, `cdn.prod.website-files.com` assets)
- **Smooth scroll:** Lenis (`html.lenis.is-ready`)
- **Scroll animations:** GSAP ScrollTrigger (pin-spacer divs present on most large sections)
- **Carousels:** Swiper 11 (`swiper-bundle.min.css` loaded)
- **Design system CSS:** `fondueflow.css` (Frontify's own dependency stylesheet)
- **Analytics:** Twitter pixel, Bing pixel, StackAdapt (sa.css)

## Top-level DOM

```
<html lang="en" class="lenis is-ready">
  <body>
    <div class="page-wrapper">
      <div class="style_code-wrap" />
      <div class="modal-block" />
      <div class="w-embed" />
      <div class="ff-navbar">   ← floating nav, top:16px height:72
      <main class="page-main u-pt-0">  ← 16146px tall
      <footer class="footer" id="footer">  ← 1163px
```

## `<main>` sections (top-to-bottom)

| # | Class / ID | Heading | Height | Top | Notes |
|---|---|---|---:|---:|---|
| 0 | `section is-hero` (`section u-minh-100vh`) | (animated) | 690 | 0 | Hero scene (overlapped by pin) |
| 1 | `pin-spacer` | "The command center for brand work" | 3450 | 0 | GSAP pin: hero animates over 3,450px of scroll |
| 2 | `section is-partner` | (24 brand logos) | 272 | 690 | Logo strip with grayscale customer marks |
| 3 | `section is-upload` (#uploadSection) | "Upload and it's organized" | 3763 | 962 | Scroll-pinned feature scene (DAM upload demo) |
| 4 | `section is-engine` (#engineSection) | "Find anything, instantly" | 2902 | 4724 | Scroll-pinned (search/AI demo, 12 imgs) |
| 5 | `section is-guidelines` (#guidelinesSection) | "Check brand standards as you work" | 1256 | 7626 | Single visual + copy |
| 6 | `section is-assistant` (#assistantSection) | "Work with your AI brand expert" | 2308 | 8883 | Scroll-pinned AI chat demo |
| 7 | `section is-design` (#designSection) | "Adapt, localize, and publish" | 3171 | 11191 | Scroll-pinned (creative tool integration, 6 imgs) |
| 8 | `section is-publish` (#publishSection) | "Connects to your tech stack" | 1041 | 14362 | Integration logo grid (45 logos) |
| 9 | `section is-stories` | "Built for the world's leading brands" | 743 | 15403 | 4 customer story cards with videos |
| F | `footer#footer` | "Brand news straight to your inbox:" | 1163 | 16146 | Newsletter signup + sitemap + social |

## Interaction model

- **Smooth scroll:** Lenis intercepts wheel events — implement on client with `lenis` package; loop in `requestAnimationFrame`.
- **Pinning:** Sections with > viewport height (Upload, Engine, Assistant, Design) use GSAP `ScrollTrigger.pin` to keep a hero element fixed while content slides/cross-fades behind. Pin-spacer divs reserve the scroll length.
- **Hero pin:** The hero copy "The command center for brand work" is pinned over 3,450px while underlying visual changes.
- **Navbar:** `.ff-navbar` is floating (top:16, not stuck to 0) — likely uses scroll listener to add/remove a "scrolled" class.

## Asset inventory

- **42** unique images (36 Webflow CDN + 3 ffycdn + 3 tracking pixels we ignore)
- **6** videos (all from `media.ffycdn.net`)
- **152** inline SVGs — many duplicates (icons reused across sections)
- **18** font files (8 ABC Diatype variants + 10 Cranny variants)

## Render order / z-index

- Navbar: position:fixed top:16, z above content
- Hero pin-spacer: overlays section is-hero so the title floats above the hero visual
- All other sections: normal flow
- Footer: normal flow at bottom

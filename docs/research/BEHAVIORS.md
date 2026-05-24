# Frontify.com — Behavior Bible

Captured from a static recon pass at 1408×715. Page uses Lenis smooth scroll + GSAP ScrollTrigger pinning extensively.

## Global

- **Smooth scroll**: `html.lenis.is-ready` — Lenis is mounted and ticks via rAF. Default settings (no custom `lerp`/`smooth` visible in stylesheet).
- **Font loading**: Webfont Loader (`wf-active`, `wf-aktivgrotesk-*-active`, `wf-inter-*-active` classes). We load fonts via `next/font/local` instead.
- **Cursor**: site has a small custom dot cursor visible in screenshots. We can mimic with a small overlay div following pointer, or skip if too costly.

## Navbar (`.ff-navbar`)

- **Position**: fixed top:16px, width:calc(100% - 32px), centered on viewport with rounded pill background.
- **Initial state (top of page, over dark hero)**: white logo, transparent/translucent backdrop, white text on items.
- **Scrolled state (over light content)**: dark logo, light-cream filled pill, dark text. Looks like a single light pill at all scroll positions in screenshots — i.e. the bg is always cream `#f0f0eb` regardless of section. **Action**: confirm by toggling scroll Y; for now assume static cream pill with dark text.
- **Items**: `Platform | Customers | Partnerships | Resources | Pricing | EN | Login | Demo`
- **Mobile**: hamburger icon on right (visible at 735px breakpoint).
- **Demo CTA**: dark filled pill, white text.

## Hero (`.section is-hero` + `.pin-spacer`)

- **Background**: full-bleed photo — a mountain landscape under deep teal/blue sky (sunset/twilight).
- **Pinned overlay**: H1 "The command center for brand work" in Cranny serif, white, centered. Subhead, two CTAs ("Book demo" filled black pill, "See the platform" outline pill with play-triangle icon), then an asset-preview card.
- **Pinned scene**: GSAP pins the hero content for 3,450px of scroll. Likely cycles or transforms the asset preview card (changes the image inside the chip — "PNG", "Magic hour" labels) while the title stays in view. Implementation: ScrollTrigger pin + small set of state transitions (3-4 cards cycling).
- **Hero CTAs**:
  - "Book demo" — filled dark pill, white text
  - "See the platform" — dark outline pill with play-triangle icon, white text on transparent

## Partner strip (`.section is-partner`)

- **Background**: cream `#f0f0eb`.
- **Layout**: horizontal logo marquee/strip — 24 logos: Microsoft, Telefónica, OpenAI, Budweiser, Bayern Munich, Uber, Kia Europe, Lufthansa Group, Alfa Laval, Skyscanner, etc.
- **Style**: logos are monochrome black on cream, scaled to consistent height (~32-40px).
- **Animation**: likely a continuous marquee loop (`infinite scroll`). The first screenshot shows Budweiser, Telefónica, OpenAI partly visible — confirms it's wider than viewport, suggesting horizontal scroll/marquee.

## Feature sections — common pattern

Each feature section (`is-upload`, `is-engine`, `is-guidelines`, `is-assistant`, `is-design`, `is-publish`) follows this template:
1. Centered H2 in Cranny serif (~40px, weight 300, color #111110)
2. Subhead paragraph in Diatype (18px, regular, #575753 muted)
3. CTA pill (dark fill, white text, e.g. "See how it works", "Meet the Brand Assistant", "Explore templates", "Browse integrations")
4. A scroll-pinned visual demo below

## Upload (`is-upload`, 3,763px tall)

- Heading: "Upload and it's organized"
- Sub: "Every asset gets tagged, described, and structured automatically. No manual metadata entry."
- Visual: An animated DAM upload demo — visible in early screenshots as a folder/file UI. Pinned section runs through 3-4 stages: file dropping → metadata appearing → asset organized into folders.

## Engine (`is-engine`, 2,902px tall)

- Heading: "Find anything, instantly"
- Sub: "Smart search cuts through thousands of assets in seconds so projects move faster."
- CTA: "See how it works"
- Visual: A search bar with filter chips (Category, Type, Industry), a "Search assets" placeholder, an asset grid below showing a 4-col grid of preview images (flower, leaf-on-sky, portrait, etc.). Says "Assets 1046" with "Sort by Newest first".

## Guidelines (`is-guidelines`, 1,256px tall)

- Heading: "Check brand standards as you work"
- Sub: "Guidelines live alongside assets so teams stay compliant without switching tools or breaking their flow."
- CTA: "See guidelines in action"
- Visual: a `nobrand` guidelines portal with red "Photography" headline + descriptive paragraph, plus an "Image library" CTA below. Likely a single static-feeling visual (1,256px is the shortest feature section).

## Assistant (`is-assistant`, 2,308px tall)

- Heading: "Work with your AI brand expert"
- Sub: "The Brand Assistant uses your guidelines to answer questions, locate files, and create on-brand content."
- CTA: "Meet the Brand Assistant"
- Visual: A chat UI showing "Hi there! Ask me about anything in the brand portal. I'll find an answer in the content you have access to." with a "Type your query here" input and purple send button. Pinned scroll likely cycles through a fake chat conversation.

## Design (`is-design`, 3,171px tall)

- Heading: "Adapt, localize, and publish"
- Sub: "Lock brand standards to unlock creativity with templates that allow teams to create with confidence."
- CTA: "Explore templates"
- Visual: An on-canvas template editor demo with buttons: "Logo, Text, Background", "Button", "Box", "Headline Move Forwards", "Image". Pinned scroll likely cycles through 3 platforms (e.g. Frontify Templates → Figma → Webflow).

## Publish (`is-publish`, 1,041px tall)

- Heading: "Connects to your tech stack"
- Sub: "Push assets directly to your CMS, design tools, and marketing platforms — no reformatting, no re-uploading."
- CTA: "Browse integrations"
- Visual: file-format chips row (AI, DOCX, SVG, JPEG, PNG, etc.) — these are pill cards with file-type abbreviation centered on neutral fill. Below them: a row of template cards (Onboarding hub, Brand Guideline, Campaign, "Case study library").

## Stories (`is-stories`, 743px tall)

- Heading: "Built for the world's leading brands"
- CTA: "Read customer stories"
- Visual: 4-card grid, each card has an autoplay looping video of a person + logo overlay (Uber, Kia, Alfa Laval, Skyscanner) + name + role below: Shayla Love / Senior Executive Producer at Uber; Rishaad Sacoor / Senior Manager Brand Strategy at Kia; Kim Gustafsson / Digital Brand Lead at Alfa Laval; Andre Le Masurier / Global Head of Brand and Creative at Skyscanner.
- Videos: muted, autoplay, loop. Hover may pause/play.

## Footer

- **Background**: dark `#111110` (inverted theme).
- **Top row**: logo (Frontify trefoil), social icons (LinkedIn, Instagram, Facebook), B-Corp badge.
- **Expandable categories**: Platform, Partnerships, Learn, Frontify — each a collapsible row with caret on right. (May be permanent expanded on desktop; verify.)
- **Email signup**: "Brand news straight to your inbox:" + email input + submit.
- **Bottom**: privacy, TOS, sitemap, copyright.

## Responsive

- **Desktop ≥1024**: full hero photo, full nav menu, multi-column feature layouts.
- **Tablet ~768-1023**: nav collapses to hamburger but Demo stays visible. Feature layouts stack to single column.
- **Mobile ~390-767**: stacked, smaller padding (16-24px), 1-column grids.
- **Hero breakpoint for nav collapse**: around 1024px likely (hamburger visible at 735 in screenshots).

## Implementation order (for builders)

Sequential dependencies:
1. Globals (fonts, tokens, Lenis setup) — DONE manually in Phase 2.
2. Nav (depends on globals).
3. Footer (depends on globals).
4. Hero (depends on nav, ScrollTrigger).
5. Partner strip (small).
6. Feature sections — can build in parallel (independent worktrees).
7. Page assembly.

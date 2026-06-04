# Lucas Mujica — Portfolio

Production build of the portfolio for **Lucas Mujica**, senior Webflow &
front-end developer. A motion-forward, dark one-pager plus a reusable case-study
template. Built to be the proof of craft it advertises: fast, accessible, and
animated with intent.

> The original HTML/CSS/JS design export (from Claude Design) and the design
> conversation transcripts are preserved in [`project/`](./project) and
> [`chats/`](./chats) for reference. The app in `src/` is the production
> implementation of those designs.

## Stack

- **Next.js (App Router) + TypeScript**
- **Tailwind CSS v4** — design tokens mapped into the theme as CSS variables
- **GSAP + ScrollTrigger + SplitText** for motion, **Lenis** for smooth scroll
  (synced to ScrollTrigger), wrapped in `useGSAP` / `gsap.context` for cleanup
- **next/font/local** — self-hosted Clash Display, General Sans, Geist Mono
  (zero Google Fonts requests)
- **next-intl** — English only today, structured so adding `es` is a content task
- **Netlify** target via `@netlify/plugin-nextjs`

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
```

## Architecture

```
src/
  app/[locale]/            # locale-scoped routes (en today)
    layout.tsx             # html shell, fonts, providers, nav/dock/footer, grain
    template.tsx           # route-transition fade
    page.tsx               # home one-pager (#work #about #stack #process #contact)
    work/[slug]/page.tsx   # the single reusable case-study template
    not-found.tsx          # styled 404 (in-layout)
  app/not-found.tsx        # global 404 fallback
  app/sitemap.ts           # sitemap.xml  ·  app/robots.ts → robots.txt
  components/
    layout/                # Nav, Dock, Footer, Wordmark, ScrollChrome
    sections/              # Hero, SelectedWork, About, Stack, Process,
                           #   Testimonials, Contact (+ ContactForm)
    case-study/            # Curtain, CaseStudyHero, CaseStudyGallery, CaseStudyView
    motion/                # SmoothScroll (Lenis), RevealScope (scroll reveals)
    ui/                    # Icon (inline SVG sprite), RichText, ImageFill
  data/                    # projects.ts (6 projects + 4 case studies), testimonials.ts
  i18n/                    # routing, navigation, request config
  lib/                     # gsap setup, site constants
  styles/globals.css       # tokens + ported component styles (Tailwind layers)
messages/en.json           # all UI + section copy
public/                    # fonts, assets, __forms.html (Netlify form detection)
```

### Content is data

The six projects and their case studies live in `src/data/projects.ts`. Four are
full case studies (their own `/work/[slug]` route via `generateStaticParams`);
two are compact (listed on the home stack, linking to contact). Reordering or
adding work is a data edit. Rich copy marks its single ember-highlighted phrase
with `*asterisks*`, rendered by `<RichText>`.

### Motion

`SmoothScroll` runs Lenis on GSAP's ticker and syncs `ScrollTrigger`. Section
reveals (`RevealScope` → any `[data-reveal]` child), the SplitText hero headline,
the count-up stats, the process rail draw, testimonial crossfade, and the
case-study gallery parallax are all GSAP. **Everything fails open**: content is
visible by default and `prefers-reduced-motion` disables transforms entirely.

### Contact form

The conversational madlib posts to **Netlify Forms** via AJAX. Because the App
Router renders dynamically, Netlify detects the form from the static
`public/__forms.html` shell — keep its field names in sync with
`components/sections/ContactForm.tsx`.

## i18n

Locales are configured in `src/i18n/routing.ts` with `localePrefix: "as-needed"`
(default locale at the bare path, additional locales prefixed). hreflang-ready
via per-route `alternates`. To add Spanish: add `"es"` to `locales`, drop in
`messages/es.json`, and translate the data fields.

## Deploy (Netlify)

`netlify.toml` is configured with the Next.js runtime plugin and
`command = "next build"`. Set `NEXT_PUBLIC_SITE_URL` to the production origin
(defaults to `https://lucasmujica.dev`) so canonicals, OG URLs, sitemap and
robots resolve correctly.

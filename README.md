# Lucas Mujica — Portfolio

Production build of the portfolio for **Lucas Mujica**, senior Webflow &
front-end developer. A motion-forward, dark one-pager backed by a reusable
case-study template. Built to be the proof of craft it advertises: fast,
accessible, and animated with intent.

**Live:** [lucasmujica.dev](https://lucasmujica.dev)

> The original HTML/CSS/JS design export (from Claude Design) and the design
> conversation transcripts are preserved in [`project/`](./project) and
> [`chats/`](./chats) for reference. The app in `src/` is the production
> implementation of those designs.

## Stack

- **Next.js 15 (App Router) + React 19 + TypeScript**
- **Tailwind CSS v4** — design tokens mapped into the theme as CSS variables
- **GSAP + ScrollTrigger + SplitText** for motion, **Lenis** for smooth scroll
  (synced to ScrollTrigger), wrapped in `useGSAP` / `gsap.context` for cleanup
- **next/font/local** — self-hosted Clash Display, General Sans, Geist Mono
  (zero Google Fonts requests)
- **next-intl** — English only today, structured so adding `es` is a content task
- **Resend** — contact form delivery via a Route Handler
- **Vercel** — deploy target + Web Analytics

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
```

Node version is pinned in [`.nvmrc`](./.nvmrc) (Node 22).

## Architecture

```
src/
  app/
    layout.tsx             # root html shell, fonts, analytics
    sitemap.ts             # sitemap.xml  ·  robots.ts → robots.txt  ·  manifest.ts
    api/contact/route.ts   # contact form handler (Resend)
    [locale]/              # locale-scoped routes (en today)
      layout.tsx           # providers, nav/dock/footer, grain
      template.tsx         # route-transition fade
      page.tsx             # home one-pager (#work #about #stack #process #contact)
      work/page.tsx        # the full work index
      work/[slug]/page.tsx # the single reusable case-study template
      about/page.tsx       # standalone about page
      privacy/page.tsx     # privacy page
      opengraph-image.tsx  # branded OG image (per route, incl. work/[slug])
      not-found.tsx        # styled 404 (in-layout)
  components/
    layout/                # Nav, Dock, Footer, Wordmark, ScrollChrome, MobileMenu
    sections/              # Hero, SelectedWork, About, Stack, Process,
                           #   Testimonials, Contact (+ ContactForm), about/
    case-study/            # Curtain, CaseStudyHero, CaseStudyGallery, CaseStudyView
    motion/                # SmoothScroll (Lenis), RevealScope, MaskHeading, etc.
    seo/                   # JsonLd (structured data)
    ui/                    # Icon (inline SVG sprite), RichText, ImageFill, Metric…
  data/                    # projects.ts (6 case studies), testimonials.ts
  i18n/                    # routing, navigation, request config
  lib/                     # gsap setup, jsonld helpers, site constants
  styles/globals.css       # tokens + ported component styles (Tailwind layers)
messages/en.json           # all UI + section copy
public/                    # fonts, assets, og art, llms.txt
```

### Content is data

The work lives in `src/data/projects.ts` as six full case studies, each with its
own `/work/[slug]` route via `generateStaticParams`. Reordering or adding work is
a data edit. Rich copy marks its single ember-highlighted phrase with
`*asterisks*`, rendered by `<RichText>`.

### Motion

`SmoothScroll` runs Lenis on GSAP's ticker and syncs `ScrollTrigger`. Section
reveals (`RevealScope` → any `[data-reveal]` child), the SplitText hero headline,
the count-up stats, the process rail draw, testimonial crossfade, and the
case-study gallery parallax are all GSAP. **Everything fails open**: content is
visible by default and `prefers-reduced-motion` disables transforms entirely.

### Contact form

The conversational "madlib" contact form posts JSON to the `/api/contact` Route
Handler, which sends the inquiry via **Resend** with the visitor's address as
`Reply-To`. A honeypot field drops bots silently. Configure it with:

```bash
RESEND_API_KEY=...        # required
CONTACT_FROM=...          # optional; defaults to Resend's onboarding sender
```

### SEO

Per-route `metadata` with canonical + hreflang `alternates`, a generated
`sitemap.xml` and `robots.txt`, a PWA `manifest`, JSON-LD structured data, an
`llms.txt`, and branded Open Graph images rendered at the edge (a global card
plus one per case study).

## i18n

Locales are configured in `src/i18n/routing.ts` with `localePrefix: "as-needed"`
(default locale at the bare path, additional locales prefixed). hreflang-ready
via per-route `alternates`. To add Spanish: add `"es"` to `locales`, drop in
`messages/es.json`, and translate the data fields in `src/data/`.

## Deploy

Deployed on **Vercel** (zero-config Next.js). Set `NEXT_PUBLIC_SITE_URL` to the
production origin (defaults to `https://lucasmujica.dev`) so canonicals, OG URLs,
sitemap and robots resolve correctly, plus the contact-form env vars above.
A legacy `netlify.toml` remains in the repo from the project's earlier host and
is unused.

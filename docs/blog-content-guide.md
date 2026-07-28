# Blog content guide

Everything needed to write a post for lucasmujica.dev/blog. Hand this whole file
to whoever (or whatever) is drafting.

Two posts already exist and are the reference implementation. Read them before
writing a third: `src/data/posts.ts`.

---

## 1. Who this is for

Lucas is a senior Webflow developer in Buenos Aires, Client-First Certified,
5+ years and 100+ production sites. He works remotely and is targeting **direct
clients: small business owners and founders in the USA and Europe**, not
agencies and not other developers.

That audience decision drives everything below. The reader is a person deciding
whether to hire someone, not a developer looking for a tutorial. They are
technical enough to have heard of Webflow and not technical enough to care how a
Webflow interaction is wired.

**Write in English.** Spanish is a translation layer, added second (see §6).

---

## 2. What makes a good topic

The bar: **a question a potential client has actually asked, or would type into
Google before hiring someone.**

Good topics look like objections and decisions:

- "Does animation make a Webflow site slow?" (an objection)
- "Can Webflow Ecommerce handle made-to-order products?" (a feasibility question)
- "Webflow vs WordPress for a small business" (a decision)
- "What does a Webflow site actually cost?" (a decision)
- "How long does a Webflow build take?" (a decision)
- "What happens to my site after launch?" (a fear)

Bad topics, and why:

| Topic | Why not |
|---|---|
| "10 best Webflow templates" | Listicle. No buying intent, infinite competition. |
| "How to add a GSAP scroll trigger" | Developer audience. They are not hiring anyone. |
| "Webflow just launched X" | News, dated in a month, and Webflow's own blog wins it. |
| "Why I love Webflow" | Nobody searches this. |

**The strongest source of topics is the case studies themselves.** Every build in
`src/data/projects.ts` solved a problem someone else also has. Pull the problem
out, answer it generally, link back to the case study as evidence. Unmined
material still sitting there:

- **Home Organizers** — a before/after slider built from scratch in vanilla JS,
  plus JSON-LD LocalBusiness markup. Topic: local SEO for a service business.
- **K2BTools** — a trilingual site (es/en/pt) using Webflow Localization. Topic:
  what running a multilingual site actually involves.
- **Nextfense** — bilingual build for a cybersecurity firm. Topic: what a site
  has to do to look trustworthy in a high-trust industry.
- **Seilas Ship Supplies** — a century-old B2B chandler, 500+ clients across
  30+ countries. Topic: what a B2B site needs that a consumer site does not.

---

## 3. Voice

Lucas's voice is already established across the site. Match it. Read `Process`
and `About` in `messages/en.json` for the clearest samples.

**The rules:**

1. **Direct. Short sentences.** "Shipping is the start, not the finish."
2. **First person, no hedging.** "I build", "I ask", not "one might consider".
3. **Concede the real cost.** The credibility comes from admitting what a thing
   costs before explaining why it is worth it. The animation post says outright
   that 81 is not a 98. Do that.
4. **Say when the answer is no.** Every post should be willing to name the case
   where Lucas is the wrong hire. The ecommerce post has a "When Webflow is the
   wrong answer" section. This sells better than pretending, and it is honest.
5. **No hype vocabulary.** No "game-changing", "seamless", "leverage",
   "supercharge", "in today's digital landscape", "unlock the power of".
6. **No em dashes.** A previous commit stripped every em dash from the site's
   copy. Use a full stop, a comma, or a colon.
7. **No rhetorical throat-clearing.** Start with the substance.
8. **Second person for the reader.** "your team", "you", not "the client".

**Length:** 800 to 1,200 words. Six to eight sections. If a section is one
sentence it should be merged into the one above it.

---

## 4. Structure

The data shape is in `src/data/posts.ts`. A post is:

```ts
{
  slug: string;          // kebab-case, matches the search phrase, no dates
  title: string;         // ideally the literal question someone types
  description: string;   // under ~155 chars. Meta description + index blurb.
  date: string;          // "YYYY-MM-DD"
  tags: string[];        // 2-4. Reuse existing tags where they fit.
  relatedSlug?: string;  // case-study slug this came from, if any
  lead: string;          // standfirst. One paragraph, sets up the question.
  sections: [{ heading?: string; paras: string[]; list?: string[] }]
}
```

**The shape of the argument**, which both existing posts follow:

1. **Lead** — state the question the way a client asks it. Give the honest
   one-line answer immediately. Do not make them scroll for it.
2. **The honest version** — concede the real cost or limitation up front.
3. **What is actually going on** — the substance. Where the common belief is
   wrong.
4. **Evidence from a real build** — name the project, describe what was done and
   why. Real numbers only (§5).
5. **A usable heuristic** — questions to ask, or a rule of thumb the reader can
   apply without hiring anyone. Give something away.
6. **When this is the wrong answer** — the disqualifying case, stated plainly.
7. **Close** — restate the answer in one or two sentences. No call to action in
   the body; the page already ends with a contact section.

Use `list` for anything genuinely enumerable. Do not fake a list to break up
text.

---

## 5. The hard rule: no invented numbers

**This is not stylistic. Do not break it.**

The only figures allowed in a post are ones already measured and published
elsewhere on this site, which in practice means the Lighthouse scores in
`src/data/projects.ts`. Those are:

| Project | SEO | Accessibility | Performance |
|---|---|---|---|
| True North Jerseys | 100 | 92 | 87 |
| BIKE | 100 | 90 | 81 |

Also verifiable and safe to state: 5+ years, 100+ projects, Client-First
Certified Expert, project counts and locations already written into
`AboutPage.journey` in `messages/en.json`.

**Forbidden**, no matter how plausible: conversion lifts, traffic increases,
revenue figures, "we cut load time by 40%", client quotes that do not exist in
`src/data/testimonials.ts`, industry statistics without a named source, and any
percentage that was not measured.

If an argument needs a number that does not exist, **rewrite the argument**. A
qualitative claim that is true beats a quantitative one that is invented, and
this is a portfolio where a single fabricated stat destroys the credibility of
everything around it.

---

## 6. Spanish

`src/data/posts.ts` holds English base records; `postsCopyEs` overlays a Spanish
version keyed by slug. A post can ship English-only and gain Spanish later
without duplicating the source.

If you write the Spanish: it is **rioplatense**, voseo, not peninsular. "vos
tenés", not "tú tienes". "acá", not "aquí". Several commits exist purely to
de-peninsularize this site's copy, so this matters to Lucas. Keep the dev jargon
in English (build, deploy, CMS, ecommerce, loader). Translate the argument, do
not translate the words.

---

## 7. Publishing checklist

1. Add the record to `posts` in `src/data/posts.ts`. Spanish goes in
   `postsCopyEs`.
2. Add the post to the `## Posts` list in `public/llms.txt`.
3. `npx tsc --noEmit` then `npm run build`. Sitemap, JSON-LD, the index and both
   locale routes are generated automatically. Nothing else to wire.
4. If the build fails with `Cannot find module for page: /robots.txt`, delete
   `.next` and rebuild. It is a stale cache, not your change.
5. After deploy, request indexing in Search Console (URL inspection, paste the
   URL, Request indexing). Do not wait for Google to find it.

**Do not** hand-write HTML, add a CMS, install an MDX pipeline, or create a
parallel content directory. The data file is the whole system and it already
handles i18n, JSON-LD, OG tags and the sitemap.

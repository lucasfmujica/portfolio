# Blog content guide

Everything needed to write a post for lucasmujica.dev/blog. Hand this whole file
to whoever (or whatever) is drafting.

Two posts already exist and are the reference implementation. Read them before
writing a third: `src/data/posts.ts`.

---

## 1. Who this is for

Lucas is a senior Webflow developer in Buenos Aires, Client-First Certified,
5+ years and 100+ production sites, working remotely.

**Write for the buyer who already has a budget and a complexity problem.** In
practice that is:

- Someone who found him through the **Finsweet Client-First certified experts
  directory**, which is the strongest referral channel the site has.
- **Agency referrals**, and agencies subcontracting a build they need done
  properly.
- **Marketing leads and founders at technology companies** with a job a
  generalist would rather not take: multilingual, deep CMS, a rebuild of
  something tangled, a site that has to survive real editorial load.

**Who this is explicitly not for.** Not the small business owner googling what a
website costs. `/services` publishes a USD 3k floor, and that reader is shopping
for a template at a tenth of it. Writing toward them fills the contact form with
the bottom budget tier, which is precisely where the risk of underpricing lives.
It is not a question of being unfriendly to small clients, it is that a post
written to win that search wins the wrong search.

**On how technical to be.** The reader is not a developer, but do not assume they
are unsophisticated. The buyer on a build like K2BTools or Nextfense is a
marketing lead or a technical founder, and writing down to them costs authority.

The rule is not "keep it non-technical", it is:

> **The unit of explanation is a decision with a consequence, never an
> implementation.**

Be as technical as the argument requires. Explain what breaks, what it costs and
what you would choose instead. Do not walk through how the thing was wired unless
the wiring is the reason the decision went one way.

**Write in English.** Spanish is a translation layer, added second (see §6).

---

## 2. What makes a good topic

The bar: **a question someone with a real budget asks when the job is hard
enough that they are worried about getting it wrong.**

Two filters, and a topic has to pass both:

1. **Does the person searching this already have money allocated?** A search that
   attracts researchers rather than buyers is a bad search even if the volume
   looks good.
2. **Does answering it well demonstrate something a generalist could not?** If
   any competent Webflow freelancer could have written the post, it does not
   differentiate.

Good topics look like feasibility questions and risk:

- "Does animation make a Webflow site slow?" (an objection, published)
- "Can Webflow Ecommerce handle made-to-order products?" (feasibility, published)
- Running a site in three languages: what it actually involves
- What "the client can run it themselves" has to mean structurally
- Inheriting a Webflow site nobody can edit: rebuild or repair
- What a site in a high-trust industry has to prove before it can sell

Bad topics, and why:

| Topic | Why not |
|---|---|
| "What does a Webflow site cost?" | Attracts the template-budget reader. Wins a search that fills the form with the bottom tier. |
| "Webflow vs WordPress for a small business" | Same problem, and the framing invites the cheapest possible buyer. |
| "10 best Webflow templates" | Listicle. No buying intent, infinite competition. |
| "How to add a GSAP scroll trigger" | Developer audience. They are not hiring anyone. |
| "Webflow just launched X" | News, dated in a month, and Webflow's own blog wins it. |
| "Why I love Webflow" | Nobody searches this. |

**The strongest source of topics is the case studies themselves.** Every build in
`src/data/projects.ts` solved a problem someone else also has. Pull the problem
out, answer it generally, link back to the case study as evidence. Note the
evidence ceiling in §5b before planning a run of posts.

### The queue, in order

**1. Running a site in three languages.** Evidence: **K2BTools** only (es/en/pt,
Webflow Localization). This goes first because multilingual is the sharpest
differentiator on the list: competition for the topic is low, most Webflow
freelancers avoid the work, and **anyone searching for it already has the
budget**. Cover what changes in CMS structure, what breaks at scale, and what it
costs in maintenance rather than how to click through the Localization panel.

**2. What "the client can run it themselves" actually requires.** Evidence:
**Seilas Ship Supplies**. The useful phrase in that build is "CMS-driven where it
counts": not everything went into the CMS, and deciding which parts do is the
whole argument. A century-old B2B supplier whose team keeps the site current is
better evidence for a handoff post than a small catalogue would be. This maps to
migrations and rebuilds, the USD 5 to 8k band. The angle is what has to be true
at build time for a team to still be shipping a year later without a developer.

**3. When Webflow is the wrong tool.** Evidence: **Home Organizers**, which was
hand-coded end to end in vanilla JS rather than built in Webflow, including a
before/after slider written from scratch. A Webflow specialist arguing honestly
about the limits of Webflow is more credible than one who never concedes any,
and it pairs with the "wrong answer" section already in the ecommerce post.

> Priority note: if a public case study is ever added that was a **rebuild of an
> existing site**, that topic outranks this one. Checked on 2026-07-28 against
> `src/data/projects.ts` and no such build exists yet, so this stands. Re-check
> before drafting.

### Evidence ledger

Six public case studies, and §5b means that is the whole budget. Current state:

| Case study | Status |
|---|---|
| BIKE | **Spent** — animation and performance post |
| True North Jerseys | **Spent** — ecommerce made-to-order post |
| K2BTools | Reserved for queue post 1 (multilingual) |
| Seilas Ship Supplies | Reserved for queue post 2 (handoff and CMS) |
| Home Organizers | Reserved for queue post 3 (when Webflow is wrong) |
| Nextfense | **Held back entirely.** Not to be used as supporting evidence in another post. |

Once the queue ships, every public case study is used. Anything after that needs
new public work or has to run on argument alone. Do not quietly reuse a spent
one.

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

### The one exception: published third-party facts

A fact published by an **identifiable third party** may be used. Webflow's own
plan pricing is the obvious case, and a post about multilingual or ecommerce is
hard to write well without one.

Three conditions, all required:

1. **The source is named in the body text**, not just known to the writer.
   "Webflow's published Localization pricing" is fine; a bare number is not.
2. **It is re-verified immediately before publishing.** Platform pricing and
   limits change, and a stale figure in a post about cost is worse than no
   figure. Re-check on every substantive edit too.
3. **It is genuinely published and checkable**, not something heard on a call,
   read in a forum thread, or recalled from a sales conversation.

The exception is narrow on purpose. It **does not** extend to results, client
metrics, performance claims, or any industry statistic without a named source.
Those remain banned outright regardless of how confident the source seems.

### 5b. Candid Leap work is off limits

**No post may use Candid Leap work as evidence. It is under NDA.** Not the
client names, not the build details, not an anonymised "a recent enterprise
client" version of the same story. If it came from that engagement it does not
appear.

This has a consequence worth planning around: **the blog runs entirely on the
six public case studies in `src/data/projects.ts`.** Nextfense is held back on
top of that, so the working budget is **five posts**: two published, three
queued. See the evidence ledger in §2.

Two implications:

- **Do not burn two posts on the same case study** unless they genuinely draw on
  different parts of it. Spend the evidence deliberately.
- After the queue ships, the next posts have to either come from **new public
  work**, or drop the case-study spine and run on argument alone. The second is
  harder to make credible and should be the exception.

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
2. **Give the post its own date, and space it from the last one.** The two
   launch posts both carry `2026-07-28`. A third sharing that date makes the
   whole blog read as one batch dumped in an afternoon, which undercuts a blog
   whose premise is notes from real builds. A week or two apart is enough, and
   the gaps do not need to be even. The date is display-only and drives ordering
   plus `datePublished`, so it costs nothing to set deliberately.
3. Add the post to the `## Posts` list in `public/llms.txt`.
4. `npx tsc --noEmit` then `npm run build`. Sitemap, JSON-LD, the index and both
   locale routes are generated automatically. Nothing else to wire.
5. If the build fails with `Cannot find module for page: /robots.txt`, delete
   `.next` and rebuild. It is a stale cache, not your change.
6. After deploy, request indexing in Search Console (URL inspection, paste the
   URL, Request indexing). Do not wait for Google to find it.

**Do not** hand-write HTML, add a CMS, install an MDX pipeline, or create a
parallel content directory. The data file is the whole system and it already
handles i18n, JSON-LD, OG tags and the sitemap.

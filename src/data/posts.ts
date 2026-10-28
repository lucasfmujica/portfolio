import { routing, type Locale } from "@/i18n/routing";

/**
 * Blog posts.
 *
 * Same shape as `projects.ts`: English is the base record and `postsCopyEs`
 * overlays a translation, so a post can ship in English first and gain Spanish
 * later without a second source of truth.
 *
 * Editorial rule, inherited from the case studies: **no invented numbers.** The
 * only figures allowed are ones already measured and published elsewhere on the
 * site (the Lighthouse scores in `projects.ts`). If a claim needs a number that
 * doesn't exist yet, rewrite the claim.
 */

export interface PostSection {
  /** Rendered as an h2. Omit for a section that continues the previous one. */
  heading?: string;
  paras: string[];
  /** Optional bulleted list, rendered after the paragraphs. */
  list?: string[];
}

export interface Post {
  slug: string;
  title: string;
  /** Meta description and the blurb on the index. Keep under ~155 chars. */
  description: string;
  /** ISO date. Drives ordering and the BlogPosting datePublished. */
  date: string;
  tags: string[];
  /** Case-study slug this came out of, linked at the foot of the post. */
  relatedSlug?: string;
  /** Standfirst under the title. One paragraph, no heading. */
  lead: string;
  sections: PostSection[];
}

export const posts: Post[] = [
  {
    slug: "webflow-animation-performance",
    title: "Does animation make a Webflow site slow?",
    description:
      "A bit, but usually less than images, fonts or third-party scripts. What the motion on BIKE costs in Lighthouse and how I decide where it goes.",
    date: "2026-07-21",
    tags: ["Webflow", "GSAP", "Performance"],
    relatedSlug: "bike",
    lead:
      "BIKE, an English language institute in Uruguay, scores 81 for performance in Lighthouse, 100 for SEO and 90 for accessibility. It's not a restrained build: it has a custom preloader, GSAP reveals down the whole page and an interactive 3D bicycle on the 404. So when someone asks me if all that animation will make their site slow, BIKE is a fair example to answer with. Motion does cost something. In practice, though, it's rarely the main reason a Webflow site is slow.",
    sections: [
      {
        heading: "Where the motion is on BIKE, and where it isn't",
        paras: [
          "I didn't want the whole page to move. There's only so much movement a page can take before it gets in the way of reading, so I limited it to a few parts of the page.",
          "On BIKE the motion is in three places. The preloader, because it sets the tone before anything else on the page can. The reveals down the page, because the brand is about progress and the motion makes the page feel like it's moving forward. And the 404, because a dead end was a chance to be memorable instead of apologetic, so that's where the 3D bicycle went.",
          "Everything else is still, and I did it on purpose. Forms don't bounce and cards don't tilt. The courses section is the part people actually came to read, so it stays out of the way and lets them read it.",
        ],
      },
      {
        heading: "What the motion costs in Lighthouse",
        paras: [
          "A site with real motion will almost always score lower than the same site with none, and I don't think it helps anyone to pretend it doesn't. 81 is a fine score, but it's not a 98. When I look at a number like that, I check what the motion is actually doing for the site before I decide if the points were worth it.",
          "On BIKE I think it is. The whole promise of the business is that you get better at something over time, so the page needed to feel like it was going somewhere. A static page would have undersold that. On a site where the message is different, I'd probably weigh it differently.",
        ],
      },
      {
        heading: "What usually makes a Webflow site slow",
        paras: [
          "The animation library is rarely the problem. What I see again and again is duller than that. Images are the first one: a single hero photo exported at full resolution can weigh more than every script on the page. Fonts come next, for example four weights loaded when the design only uses two, with no preload and no swap. Neither of those has anything to do with motion.",
          "Then there are third-party scripts. Chat widgets, heat maps, three analytics tools, a cookie banner from 2019. Each one is someone else's code running on your critical path, and they add up quickly.",
          "The last thing I see is everything animating. That one is about motion, but the problem isn't that things move, it's that nothing was left still. Even then it isn't GSAP's fault. Nobody decided where the motion belongs, so on every build that's one of the first things I decide: which parts of the page move and which stay still.",
        ],
      },
      {
        heading: "Three questions before I animate something",
        paras: [
          "I ask these on every build, and most animation ideas don't get past them, which means they get cut before they cost anything.",
        ],
        list: [
          "Does it help someone understand the page? For example, motion that shows how two things are related earns its place. Motion that only decorates usually doesn't.",
          "Would a first-time visitor notice it was missing? If not, that's a strong argument for cutting it.",
          "Does it delay what they came for? Anything between the visitor and the content they want should be short and deliberate.",
        ],
      },
      {
        heading: "The cost Lighthouse doesn't show",
        paras: [
          "Motion also has a maintenance cost that never shows up in a Lighthouse report. Every animated element is something that can break when your team adds a fifth item to a four-item grid, or pastes a paragraph twice as long as the placeholder.",
          "This is probably the main reason I'm selective with it. It's also why I build motion against the CMS structure and not against a specific set of content. A reveal that assumes three cards will look broken the day someone adds a fourth, so I set it up for the structure and not for whatever happens to be in the collection at launch.",
        ],
      },
      {
        heading: "When the points are worth it, and when they aren't",
        paras: [
          "So yes, animation makes a Webflow site a bit slower, and usually less than your images do. If the motion is doing real work, like carrying the brand on BIKE or making a 404 feel intentional, a few points of Lighthouse are probably a reasonable price.",
          "Where I'd push back is motion nobody asked for, especially on a page where it gets in the way of reading. In that case I'd rather cut it and look at the images, fonts and scripts first, because that's usually where the speed is. If you're not sure which case your site is in, the three questions above are a good place to start.",
        ],
      },
    ],
  },
  {
    slug: "webflow-ecommerce-made-to-order",
    title: "Can Webflow Ecommerce handle made-to-order products?",
    description:
      "On a made-to-order store I built, the cart runs on CartGenie, not Webflow Ecommerce. Why I made that call, and when I'd choose something else.",
    date: "2026-07-28",
    tags: ["Webflow", "Ecommerce", "CMS"],
    relatedSlug: "true-north-jerseys",
    lead:
      "On True North Jerseys, a custom kit maker in British Columbia, the store doesn't run on Webflow Ecommerce. It runs on CartGenie, an app from Webflow's marketplace, and the products still live in the Webflow CMS. I think that's the realistic answer for most made-to-order businesses: yes, Webflow can carry the store, but probably not on its own ecommerce. Below is why I made that call, and where I think this setup stops working.",
    sections: [
      {
        heading: "Why the standard product model didn't fit",
        paras: [
          "Webflow Ecommerce is built around a product with a fixed price and a stock count. That covers a lot of retail and almost none of what a custom manufacturer sells. A made-to-order business usually doesn't know either of those things at the moment someone lands on the page.",
          "True North makes custom hockey and baseball kits: sublimated, reversible, embroidered. The price depends on the run, the finish and the artwork, and nothing is sitting in stock waiting to ship.",
          "If you force that into a standard product template, the store either shows a price that isn't real or hides the price completely. For example, a team manager looking at a reversible jersey can't do anything useful with either answer, so they leave. I didn't want to build either version.",
        ],
      },
      {
        heading: "Why CartGenie and not Webflow Ecommerce",
        paras: [
          "Some of what True North sells does behave like retail. Stock apparel has a price and a count. So the site needed a real cart next to the quote path, and the question was which cart to use.",
          "I went with CartGenie, an ecommerce app built by the team behind Monto and listed in Webflow's app marketplace. The reasons are specific to this kind of product. It's not a general complaint about Webflow:",
        ],
        list: [
          "Variants. CartGenie's published comparison puts it at 200 variants per product, against 50 on Webflow Ecommerce. Once sizes multiply by colours and by finishes, 50 stops being enough.",
          "Personalization fields on the product, and custom fields at checkout. That's where a made-to-order order actually gets specified.",
          "It runs on a Webflow CMS plan, not an Ecommerce plan.",
        ],
      },
      {
        paras: [
          "Those figures come from CartGenie's own comparison, and both products change, so I'd check them again before you rely on them for your own store.",
        ],
      },
      {
        heading: "Where the catalogue lives",
        paras: [
          "The third reason is the one that matters most, and it isn't really about ecommerce. Because CartGenie runs on a CMS plan, the products stay in Webflow CMS collections and the store engine sits behind them. I did it on purpose because most of a custom catalogue is a content problem, not a checkout problem.",
          "What a custom buyer needs first is evidence: what the work looks like, what the options are, and whether this company has made kits for a team like theirs. The Webflow CMS handles that well. Product lines are collections and finishes are fields.",
          "Hockey, baseball and team apparel are built as components that follow the same rules, so a new line gets added the same way the first three were, without anyone touching the build. If every new line needed a developer, the site would probably be out of date within a year.",
        ],
      },
      {
        heading: "Keeping the quote one tap away",
        paras: [
          "The most common failure I see on custom-product sites is a quote request buried behind a contact page. Someone looking at a reversible jersey and thinking about their team's colours is about as close to buying as they'll get, and sending them to a generic contact form is a good way to lose them.",
          "On True North the order and quote path is reachable from wherever that interest shows up, and it stays inside the brand. There's no jump to a third-party form that looks like it belongs to a different company.",
          "The cart follows the same rule. One path ends in a checkout and the other ends in a conversation, but a visitor shouldn't have to work out which one they're in, or notice that the cart is a different system. I kept both of them looking and behaving like the same site.",
        ],
      },
      {
        heading: "When I'd point you to something else",
        paras: [
          "If your product needs a live configurator that reprices as the buyer changes options, per-customer pricing tiers, or inventory synced with a warehouse system, I think you're past what this setup does comfortably. At that point you're probably looking at a headless build or a different platform, and I wouldn't quote it to you as a quick Webflow project.",
          "That line has moved, though. A few years ago it sat much closer, and plenty of stores left Webflow over variant limits and checkout fields that the app layer has since solved. Before you accept a quote to migrate away from Webflow, I'd check what the platform and its apps can do today.",
          "A made-to-order store that needs a catalogue, a cart for the stock items and a clear path to a quote is still below that line. That's what True North needed, and it's what I built the store to do.",
        ],
      },
    ],
  },
  {
    slug: "webflow-multilingual-site-what-it-takes",
    title: "What does it actually take to run a site in three languages?",
    description:
      "Adding a locale in Webflow is the easy part. What changes is how your team handles every content update after launch, in every language.",
    date: "2026-08-11",
    tags: ["Webflow", "Localization", "CMS"],
    relatedSlug: "k2btools",
    lead:
      "It usually comes up like this: we're opening in Brazil and Spain, can we just add the languages? Yes. Webflow does this natively now, and I don't think the build is the hard part. What changes is everything after launch. From then on, every content decision your team makes happens in three languages, and that work usually isn't in the quote. Below is what changes, roughly in the order a team runs into it.",
    sections: [
      {
        heading: "What Webflow handles on day one",
        paras: [
          "Adding a locale is cheap. Webflow sells Localization as a per-locale add-on, roughly ten dollars a month per locale at the entry tier and around three times that at the tier that includes localized URLs, depending on whether you pay annually or monthly. Take the current figures from Webflow's pricing page and not from this post, because platform pricing changes.",
          "That fee is usually the only part anyone budgets for, and it's the smallest part. A few things come with it that I think are worth knowing, because they change how you plan the project:",
        ],
        list: [
          "Hreflang tags and the localized sitemap are generated for you. Teams often get this wrong on other platforms, and then search engines serve the wrong language to the wrong market for months. On Webflow I wouldn't spend budget on it.",
          "Locales publish independently. English can go live while Portuguese is still in draft, so a late translation doesn't block a launch.",
          "Localized URL slugs are on the Advanced tier. If a product URL stays in English on your French site, you're competing for French searches with an English address. If organic search in the second language is part of the business case, I'd budget for that tier from the start.",
        ],
      },
      {
        heading: "The first content change: one edit becomes three",
        paras: [
          "The first thing your team notices is that every change now happens three times. A new landing page is three pages, and a pricing change is three changes. If the site isn't built for that, someone eventually updates two locales, forgets the third, and that page stays wrong for a year.",
          "K2BTools sells developer tooling for GeneXus, and its market is split across Spanish, English and Portuguese, with real buyers in each language. On that site I built everything component first, and I did it on purpose because of this problem. For example, when a feature card is a component, changing it is one change and it lands in all three locales. The only work left per locale is the words inside it. When it isn't a component, the same change is three separate edits.",
          "That costs more at build time than a single-language site would need, because you have to define the components up front. I think it pays back on a marketing site, since the content changes all the time and you save the extra edits on every change.",
        ],
      },
      {
        heading: "The first translation request",
        paras: [
          "Next comes the translation itself. Every blog post and every new page now has a translation request attached to it, and the easy option is machine translation.",
          "Machine translation gives you a draft, not a page a buyer will trust. For example, auto-translated meta titles and descriptions get indexed and shown to real people in search results, and often nobody on your team ever read that version. If you use it, I'd have a native speaker review at least the pages that sell and the metadata on them before they go live.",
        ],
      },
      {
        heading: "A few months in: the locales drift apart",
        paras: [
          "This is where multilingual sites usually go wrong, and it isn't translation quality. It's the gap that opens after launch. For example, English gets a new pricing page in March, and Portuguese still shows the old one in September. Someone in São Paulo lands on the old version precisely because hreflang worked and sent them to their own language.",
          "Webflow won't tell you about it. There's no drift alert or staleness flag, nothing that shows the Spanish pricing page is three revisions behind the English one. So this needs a process, not a feature. I'd set two rules: one named owner per locale, and the primary locale doesn't publish a structural change until the other locales are queued. Neither of them costs anything, but someone has to keep doing them.",
        ],
      },
      {
        heading: "Questions to answer before you add a second language",
        paras: [
          "I'd answer these before anyone sends you a quote. None of them is technical, and I think they decide more about the project than anything technical I could tell you.",
        ],
        list: [
          "Who owns the second locale, by name? If the answer is “marketing”, it probably doesn't have an owner yet.",
          "How often does the content change? Weekly content across three locales needs someone with time set aside for it.",
          "Is the market real, or one you hope to have? A locale with no sales effort behind it is a monthly bill attached to pages that slowly go out of date.",
        ],
      },
      {
        heading: "When I'd keep it smaller",
        paras: [
          "If one market brings in most of your revenue and nobody will own the second locale, I wouldn't localize the whole site. I'd localize the one page that market actually converts on and leave the rest in English. A single page that someone keeps current is more useful there than a full site nobody updates, and you can add more pages once someone owns the locale.",
          "And if the plan is machine translation with no native reviewer, I think English only is the better choice. A buyer who reads obviously machine-translated copy will probably assume you didn't take their market seriously, which is worse than assuming you haven't got there yet. In that case I'd wait until there's someone who can review the copy.",
        ],
      },
    ],
  },
  {
    slug: "webflow-site-team-can-run",
    title: "Why does my team still need a developer to change the site?",
    description:
      "Running your own site isn't a platform feature. It comes from decisions made at build time, and there's a one-hour test you can run before launch.",
    date: "2026-08-25",
    tags: ["Webflow", "CMS", "Client-First"],
    relatedSlug: "true-north-jerseys",
    lead:
      "You were told the site would be easy to update, and for the first month it was. Then someone needed a seventh person on the team page, or a heading that ran to two lines, and the answer was that it needs a developer. I don't think anyone lied to you. The site was built for the content that existed the week it launched, and being able to run it yourself isn't something the platform gives you. It depends on decisions somebody made at build time. Further down there's a one-hour test you can run before you accept a site, and you don't need a developer for it.",
    sections: [
      {
        heading: "Why building for future content costs more",
        paras: [
          "Building for content that hasn't been written yet costs more than building for content that has. A site built to match the design file exactly is faster and cheaper than one built to handle a fifth card, a heading twice as long as the mockup, or a photo uploaded portrait when the layout expected landscape.",
          "When a build quote comes in surprisingly low, this is usually what got cut. You don't find out at handover. You find out eight months later, when the site that was supposed to save you a retainer turns out to need one. Those same cases, the extra card, the long heading and the wrong-shaped photo, are what the test further down checks for.",
        ],
      },
      {
        heading: "Deciding what goes in the CMS",
        paras: [
          "Once someone has been burned, the instinct is to put everything in the CMS. I think that's the opposite mistake, and it's expensive in its own way.",
          "Every field in a collection is something a person has to understand before they can safely edit anything. For example, a five-item collection with fourteen fields will probably sit untouched for a year, because nobody wants to be the one who breaks it.",
          "So the question I ask at build time isn't how much can go in the CMS. It's which parts of the site will change without me. Those get structured. The rest gets built directly, because it isn't going to move, and structuring it would only add fields for someone to work around. I run every section of the site through three questions before anything gets built:",
        ],
        list: [
          "Does it change on someone else's schedule? A catalogue, a team page, a list of certifications, anything tied to the business rather than to the design. That goes in the CMS.",
          "Does it repeat? If there are three of something today there will be seven eventually, and a repeating block that isn't a collection means a developer every time it grows.",
          "Would changing it need a design decision? A hero layout, the navigation structure, the shape of a pricing table. That's design work, not editing, so it stays out of the CMS.",
        ],
      },
      {
        paras: [
          "The third question is the one I see go wrong most often. Letting a team change anything isn't the same as letting them run the site, and it's usually how sites get broken. It comes from a good instinct: nobody wants to be the bottleneck, so everything gets exposed. What a team actually needs is a small number of things they can change with full confidence, and a clear line where the answer is that this one needs a developer. So when I scope a handoff, I start from the smallest set of fields and only add what the team asks for.",
        ],
      },
      {
        heading: "How many places your team has to edit",
        paras: [
          "There's a second question under all of this, and almost nobody asks it before signing. Not what your team can change, but how many places they have to go to change it.",
          "On True North Jerseys the store doesn't run on Webflow's own ecommerce. It runs on a third-party app. That kind of choice usually comes with a separate dashboard, a second login, and a team that keeps its catalogue in one place and its content in another. Six months in, that's often how a site stops being maintained. Nobody found it hard, but keeping two systems in step was nobody's job.",
          "So the catalogue lives in Webflow CMS collections, and the family-run team edits it in Webflow, in the same place they edit everything else. The store engine sits behind that and they don't have to think about it. I picked the app for what it could do, and then wired it so that choice never reached the people using the site. None of this shows on the finished site, so it's worth asking about before the build starts, not after.",
        ],
      },
      {
        heading: "The hour before you accept a site",
        paras: [
          "This is the test I'd run on any site before signing it off. Give yourself an hour before launch and do four things:",
        ],
        list: [
          "Add one more item to every list. A fourth card in a three-across grid, an eleventh person on the team page.",
          "Double the length of the longest heading.",
          "Leave an optional field empty on one item and look at what renders.",
          "Upload an image in the wrong aspect ratio.",
        ],
      },
      {
        paras: [
          "If any of the four needs a developer to fix, I don't think the build is finished. You don't need me to run it, and it's probably the most useful hour you can spend before going live.",
          "If you're commissioning a site right now, I'd put those four checks into the acceptance criteria before you sign anything. It costs you nothing, and it changes what done means: not how the site looks on launch day, but whether it still works once your team starts using it.",
        ],
      },
      {
        heading: "Naming, for whoever comes next",
        paras: [
          "The other half of running your own site is naming. I build with Client-First, a convention for naming classes and structuring a project so the next person can read it.",
          "You'll probably never look at a class name. The developer you hire in two years will, and whether they can make a change in an afternoon or have to rebuild the site is decided now, by whoever you're paying today. That's the reason I use it: so the next person can find what they need without having to ask the last one.",
        ],
      },
      {
        heading: "When this much structure isn't worth it",
        paras: [
          "If your site is five pages, changes twice a year and one person edits it, I think heavy structure is money badly spent. I'd build it simply, keep it cheap, and put the difference into the content instead.",
          "And if nobody on your team wants the job, structure doesn't fix that. A site your team could run still goes stale if nobody has been assigned to run it. That's not a build problem and I can't solve it for you. What I can do is build it so that whoever picks it up later isn't blocked by the site itself.",
        ],
      },
    ],
  },
  {
    slug: "when-webflow-is-the-wrong-tool",
    title: "When is Webflow the wrong tool for the job?",
    description:
      "I build in Webflow most of the time. These are the cases where I don't, why Home Organizers was one of them, and what a custom build costs you.",
    date: "2026-09-08",
    tags: ["Webflow", "Custom code", "Process"],
    relatedSlug: "home-organizers",
    lead:
      "It's a fair question to ask someone who works mostly in one platform. I think Webflow is the right call for most marketing and B2B sites, especially when the content changes, and that's why I spend most of my time in it. But there are specific cases where I don't use it, and they're concrete enough that you can check them yourself before you commission anything.",
    sections: [
      {
        heading: "The cases where I don't use Webflow",
        paras: [
          "There are four, and I think they're narrower than what you'll read online. Even with most of my work on the platform, I still talk people out of it several times a year when one of these applies.",
        ],
        list: [
          "The interface is the product. If people log in and use what you're building, instead of reading it, you need an application framework. Webflow can run the marketing site in front of that product very well, but I wouldn't build the product in it.",
          "The feel is the product, and the site is small. When how a page moves and how fast it responds are the main sales argument, a platform limits how far you can tune them. On a large site I'd accept that limit for everything else Webflow gives you. On a small one you'd be paying for a CMS you won't use and getting a limit on the one thing that matters.",
          "Nobody will log in to edit it. The CMS and the Designer are most of what the monthly fee pays for. If the content changes twice a year, you're paying for features you don't use.",
          "The output has to live somewhere else. If the pages have to be embedded in an existing application, served from infrastructure you control, or handed to a team that works in a repository, you'll spend the project exporting your way out of the platform.",
        ],
      },
      {
        heading: "Why Home Organizers isn't built in Webflow",
        paras: [
          "Home Organizers Long Island is a small service business. I took that project end to end (design, copy, SEO and code), and I chose to build it by hand: no Webflow, no framework, no build step. I did it on purpose because I wanted every detail of the feel and the performance to be mine to tune.",
          "It's the second case on the list. A home organizing business sells a transformation, so the centerpiece of the site is a before and after slider, written from scratch with no library, where you drag to see the room change. How that drag feels, how quickly it responds and whether it stutters on a phone is the sales argument itself, not decoration. GSAP and ScrollTrigger handle the rest of the motion, but I wrote the slider by hand because it was the part that had to feel right.",
          "The rest of the site pointed the same way. It's a handful of pages that change rarely, with LocalBusiness structured data so search engines read the business correctly. There's no editorial team and no collection to maintain, so a CMS wouldn't have made anything easier, and the client doesn't pay a monthly platform fee.",
        ],
      },
      {
        heading: "What a custom build costs you",
        paras: [
          "This isn't a free choice, and I'd be selling you something if I said it was. A hand-built site has no Designer behind it. Changing a paragraph means changing code, which means it goes through whoever writes code, and usually that's me. If you later want a marketing team to run it, that's a rebuild, not a migration.",
          "The person who maintains it also has to be a developer. That narrows the field a lot compared with a Webflow project, which any competent Webflow freelancer can pick up after me.",
          "So you save the platform fee and get full control over the details, and in exchange you give up easy editing. I think that trade works on a small site that doesn't change much. On almost anything else I wouldn't make it.",
        ],
      },
      {
        heading: "Two questions that usually settle it",
        paras: [
          "Most of the time, these two are enough to tell which side your project is on:",
        ],
        list: [
          "Who edits this in eighteen months, and are they a developer? If it's a marketing person or the owner, I'd build it in Webflow.",
          "Is there one thing this site has to do that the platform doesn't do? One thing, not three.",
        ],
      },
      {
        heading: "One missing feature is rarely a reason to leave",
        paras: [
          "If the answer to the second question is three things, the project is working against the platform almost everywhere, and Webflow is probably the wrong choice. If it's one thing and everything else is ordinary, I'd almost never suggest a rewrite. I'd build it in Webflow and add custom code for that one piece.",
          "Most sites that feel like they need to leave Webflow need someone to write the one part the builder can't do, and to leave the rest as it is. That's a much smaller project than a rebuild, and you keep the reasons you chose Webflow in the first place.",
        ],
      },
      {
        heading: "Why it's still Webflow most of the time",
        paras: [
          "I don't want this post to read as an argument against the platform, because it isn't one.",
          "If your site has content that changes, a team that has to change it, more than a handful of pages, or a plan to grow into more languages and markets, I think Webflow is the right tool and it isn't close. The CMS, the localization, and the fact that any competent Webflow developer can pick the project up after me are worth the monthly fee several times over.",
          "The four cases above are exceptions. Almost everything that reaches me is a Webflow project. I write about the exceptions because I'd rather tell you up front when your project is one of them.",
        ],
      },
    ],
  },
  {
    slug: "animated-site-when-javascript-fails",
    title: "What happens to an animated site when the JavaScript fails?",
    description:
      "Most scroll animation hides content until a script runs. How to build motion so a failed script costs you the effect, not the page.",
    date: "2026-10-29",
    tags: ["Webflow", "GSAP", "Accessibility"],
    relatedSlug: "fully-dialed",
    lead:
      "Short answer: it depends on how the motion was built. A lot of scroll animation works by hiding the text and images first and showing them when a script runs. If that script never runs, the content stays hidden and the page looks empty. You can check which kind of build you have before launch, and I explain how near the end.",
    sections: [
      {
        heading: "Why this happens",
        paras: [
          "Every reveal on a page is the page waiting for a script before it shows something it already has. Most of the time the script loads and nobody notices. But scripts load late, get blocked by a browser extension, or break after an edit that had nothing to do with the animation. When that happens on a site built the usual way, the visitor doesn't get a simpler version of the page. They get empty sections.",
          "The annoying part is that nobody reports it. A visitor who sees a blank section just leaves, and in your analytics it looks like any other bounce.",
        ],
      },
      {
        heading: "It's not only the script failing",
        paras: [
          "When I review a site with a lot of motion, I check three cases. Most people only think about the first one.",
        ],
        list: [
          "The script never starts. It fails to load or throws an error before it runs, and everything that was hidden stays hidden.",
          "The visitor has reduced motion turned on. People set this in their operating system, for vestibular reasons or just because they prefer it. The easy fix is to switch the animation off, but if you switch it off in the middle of a sequence, elements stay frozen where they started, for example half faded or pushed off to the side.",
          "The platform takes over. Webflow controls some states itself. Its mobile menu hides the panel as soon as it closes, so if you add a closing animation there is nothing left on screen to animate, and the menu just disappears.",
        ],
      },
      {
        heading: "How I built it on Fully Dialed",
        paras: [
          "Fully Dialed calibrates the cameras and radar in modern cars for repair shops in British Columbia. The design and the motion direction came from their side, in Figma, and the page moves a lot: text that appears line by line, photo masks that open, radar patterns tied to the scroll. My part was building it so none of that could make the page fail. Their whole message is about safety, so a page that breaks without anyone noticing was the thing I wanted to avoid the most.",
          "First, all the copy is in the HTML from the start. Search engines and screen readers get the full page whether the script runs or not.",
          "Second, the content only gets hidden once the animation code has actually started. If the script never loads, nothing was hidden in the first place.",
          "Third, there is a watchdog. If the motion layer doesn't report back within six seconds, it stops waiting and shows everything without animation.",
          "For reduced motion I show the final state instead of turning the animation off. The rotating ticker is a good example: if I stopped it in the middle it would show half a word, so with reduced motion it renders in its final position. For the menu, I catch the moment Webflow closes it and keep the panel on screen just long enough to play the curtain animation in reverse. Then Webflow hides it as usual.",
          "All the motion lives in one file of around 13 KB, and each section opts in with attributes on the page. I did it this way on purpose instead of setting up dozens of interactions by hand, because it was the only way I could make sure the rules above apply to every section and not just most of them.",
        ],
      },
      {
        heading: "What it still costs",
        paras: [
          "The live site scores 90 for accessibility in Lighthouse, not 100, and the points it loses come from the motion layer. To animate a sentence line by line you split it into pieces, and then you have to describe the original sentence to assistive technology separately. The way that description is attached is what the audit flags.",
          "I think it can be fixed. But it's also the real cost of the effect: every line that slides in is extra markup a screen reader has to make sense of. I prefer to show the 90 and explain where it comes from.",
        ],
      },
      {
        heading: "How to check your own site",
        paras: [
          "You can do this on a staging link before launch. You don't need a developer for it.",
        ],
        list: [
          "Turn off JavaScript in your browser and reload the page. Everything you need to read should still be there, just without movement. If sections come up empty, the animation is in control of your content.",
          "Turn on reduced motion (on a Mac: System Settings, Accessibility, Display, Reduce motion) and reload. Elements should appear in their final position, not frozen halfway.",
          "Ask your developer what happens if the animation script doesn't load. If the answer is “it won't happen”, that's not really an answer.",
          "Ask where the motion lives. If it's one file, it can be reviewed and fixed in one place. If it's fifty interactions set up by hand, that's fifty places where one can drift.",
        ],
      },
      {
        heading: "When I wouldn't build it this way",
        paras: [
          "If your team needs to edit the animations themselves, a motion layer written in code is probably the wrong choice, because only a developer can change it. Webflow's own interactions are harder to keep consistent on a big site, but your team can open and edit them, and on a lot of sites that matters more.",
          "And if the motion is just decoration and the budget is tight, I'd rather use less of it. Most of what I described here exists because the design had a lot of movement. With a few small animations, you don't need most of it.",
        ],
      },
    ],
  },
  {
    slug: "b2b-website-what-it-has-to-prove",
    title: "What does a B2B website have to prove before a buyer gets in touch?",
    description:
      "Business buyers come to check, not to be persuaded. The four things they look for on a B2B site, and how to show each one instead of claiming it.",
    date: "2026-11-10",
    tags: ["Webflow", "CMS", "B2B"],
    relatedSlug: "seilas-ship-supplies",
    lead:
      "I think less than most briefs assume, and most of it has to be shown, not said. A business buyer who lands on your site has usually heard your name somewhere else first: a referral, an agent, a supplier list. They're not there to be persuaded. They're there to check four things: that you're a real company, how long you've been doing this, whether you've done it for people like them, and what exactly you sell. I go through each one below, using a site I built for a ship supplier in Uruguay as the example.",
    sections: [
      {
        heading: "What a website can and can't do in a B2B sale",
        paras: [
          "A website rarely wins a B2B deal. In most industries the relationship, the price and the referral do that. What a website can do is lose one, by making an established company look smaller or less certain than it really is. That's what I try to avoid.",
          "So I think the job is narrower than most briefs admit. You're not building a pitch. You're building something that holds up when a purchasing manager has ten minutes to spare and three other suppliers to compare.",
          "It also depends on how your buyers purchase. If they buy through tenders, marketplaces or a procurement portal, the website matters much less. In that case I'd put the effort into the documents they'll actually read.",
        ],
      },
      {
        heading: "First check: that you're a real company",
        paras: [
          "The first thing a careful buyer looks for is boring: a legal entity, an address, a phone number, a person to write to. I'd make sure all of it is easy to reach from any page, so nobody has to hunt for it.",
          "This is also where adjectives stop working. “Trusted”, “leading” and “world-class” don't answer the question, and they're on every competitor's homepage, so a buyer's eye just skips them. The test I use for any sentence on a B2B site is whether a stranger could verify it. A founding year can be checked. So can a client count, a list of countries, a named port or a legal entity. “Your trusted partner” can't, so when I review a page I replace that kind of line with something checkable or remove it.",
          "For example, Seilas Ship Supplies (Nadetir S.A.) has supplied vessels at every port in Uruguay since 1921: deck and safety gear, engine-room supplies, provisions, bonded stores. They had a century of reputation and a website that carried almost none of it. The brief was a credible, international site that says “trusted since 1921” without having to use the word, so every decision below went back to the four checks.",
        ],
      },
      {
        heading: "Second check: how long you've been doing it",
        paras: [
          "Age matters to a buyer because a supplier that has been around for a long time will probably still be around after the order. It's one of the few things a site can show quickly.",
          "On Seilas the founding year isn't a tagline. It runs through the whole site, and the history has its own section. I framed that section for a buyer rather than as a family album, so it reads as a track record.",
          "If your company is new, I wouldn't build the site around age, because it puts the focus on exactly what you don't have yet. I'd lead with the work and the people instead and let the proof build up over time. What I'd never do is inflate the age or the scale, because a buyer who checks will find out.",
        ],
      },
      {
        heading: "Third check: whether you've done it for people like them",
        paras: [
          "Here the buyer is looking at scale, geography and the specific kind of work, more or less in that order. They want to know if you already serve companies like theirs, or if they'd be one of the first.",
          "On Seilas the clients section puts the claim and its shape side by side: more than 500 clients across more than 30 countries, on a world map. I wanted the map next to the number because the number alone doesn't tell you whether the reach is regional or global, and the map shows that at a glance.",
        ],
      },
      {
        heading: "Fourth check: what exactly you sell",
        paras: [
          "A buyer comparing suppliers needs the range laid out plainly, in their vocabulary and not yours. If they can't confirm quickly that you do the thing they need, they move on to the next supplier.",
          "On Seilas the services are organized the way a ship's purchasing officer thinks about them, by category, from loading to dry dock assistance. The idea is that a buyer can confirm in seconds that what they need is something Seilas does.",
          "The design stays restrained on purpose. I think a century-old supplier that looks like a startup sends the wrong signal to this kind of buyer. The page itself is part of the check too, because a slow or broken page is evidence and buyers read it. In Lighthouse the live site measures 100 for SEO, 100 for best practices and 90 for accessibility. Those scores don't sell anything on their own, but they mean the page isn't working against the rest of the site.",
        ],
      },
      {
        heading: "Keeping the proof accurate after launch",
        paras: [
          "Proof only works while it's true. A client count that was accurate when the site launched becomes a liability the day nobody updates it. That's why the Seilas site is CMS-driven where things change: the team keeps those parts current without calling a developer, and the parts that should never move are built into the page.",
          "The other cost is the restraint. A quiet site does less to grab attention than a loud one. For a supplier whose buyers already know who they're looking for, I think that's the right trade. For a company that needs its website to generate demand on its own, it probably isn't, and I'd design it differently.",
        ],
      },
      {
        heading: "How to check your own site",
        paras: [
          "Open it the way a stranger would, on a phone, and give yourself thirty seconds.",
        ],
        list: [
          "Can you find the company's legal name, its address and a direct contact without hunting for them?",
          "Is the company's age on the first screen, or only on an About page most visitors never open?",
          "Count the adjectives in your hero section. Replace each one with a fact, a number or a place, or delete it.",
          "Take your three biggest claims and ask how a buyer could verify each one. If they can't, I'd rewrite the claim or remove it.",
          "Ask someone outside the company to tell you, in one sentence, what you sell. If their sentence doesn't match yours, the services page was probably written for you and not for the buyer.",
        ],
      },
    ],
  },
];

/** Spanish overlay. Same keying as `projectsCopyEs`: slug to partial copy. */
export const postsCopyEs: Record<string, Partial<Post>> = {
  "webflow-animation-performance": {
    title: "¿Las animaciones hacen lento un sitio en Webflow?",
    description:
      "Un poco, pero en general menos que las imágenes, las tipografías o los scripts de terceros. Lo que cuesta el movimiento en BIKE y cómo decido dónde va.",
    tags: ["Webflow", "GSAP", "Rendimiento"],
    lead:
      "BIKE, un instituto de inglés en Uruguay, saca 81 en rendimiento en Lighthouse, 100 en SEO y 90 en accesibilidad. No es un build contenido: tiene un preloader a medida, reveals con GSAP en toda la página y una bicicleta 3D interactiva en el 404. Así que cuando alguien me pregunta si tanta animación le va a hacer lento el sitio, BIKE es un buen ejemplo para responder. El movimiento cuesta algo. Pero en la práctica, rara vez es la razón principal por la que un sitio en Webflow es lento.",
    sections: [
      {
        heading: "Dónde hay movimiento en BIKE y dónde no",
        paras: [
          "No quería que se moviera toda la página. Una página aguanta una cantidad limitada de movimiento antes de que empiece a molestar la lectura, así que lo limité a algunas partes.",
          "En BIKE el movimiento está en tres lugares. El preloader, porque marca el tono antes que cualquier otra cosa de la página. Los reveals a lo largo de la página, porque la marca habla de progreso y el movimiento hace que la página se sienta avanzando. Y el 404, porque un callejón sin salida era una oportunidad de ser memorable en vez de pedir disculpas, así que ahí fue la bicicleta 3D.",
          "Todo lo demás está quieto, y lo hice a propósito. Los formularios no rebotan y las cards no se inclinan. La sección de cursos es lo que la gente vino a leer, así que no se mete en el medio y los deja leer.",
        ],
      },
      {
        heading: "Lo que cuesta el movimiento en Lighthouse",
        paras: [
          "Un sitio con movimiento real casi siempre va a puntuar más bajo que el mismo sitio sin nada, y no creo que sirva de mucho hacer de cuenta que no. 81 es un buen número, pero no es un 98. Cuando veo un número así, me fijo qué está haciendo realmente el movimiento por el sitio antes de decidir si esos puntos valieron la pena.",
          "En BIKE creo que sí. Toda la promesa del negocio es que vas a mejorar en algo con el tiempo, así que la página tenía que sentirse como que iba a algún lado. Una página estática habría vendido eso de menos. En un sitio con otro mensaje, probablemente lo pesaría distinto.",
        ],
      },
      {
        heading: "Qué suele hacer lento a un sitio en Webflow",
        paras: [
          "La librería de animación rara vez es el problema. Lo que veo una y otra vez es más aburrido. Las imágenes son lo primero: una sola foto de hero exportada a resolución completa puede pesar más que todos los scripts de la página juntos. Después vienen las tipografías, por ejemplo cuatro pesos cargados cuando el diseño usa dos, sin preload y sin swap. Ninguna de las dos cosas tiene que ver con el movimiento.",
          "Después están los scripts de terceros. Widgets de chat, mapas de calor, tres herramientas de analytics, un banner de cookies de 2019. Cada uno es código ajeno corriendo en tu camino crítico, y se van sumando rápido.",
          "Lo último que veo es que todo se mueva. Eso sí tiene que ver con el movimiento, pero el problema no es que las cosas se muevan, es que no se dejó nada quieto. Y aun así no es culpa de GSAP. Nadie decidió dónde va el movimiento, así que en cada build es una de las primeras cosas que decido: qué partes de la página se mueven y cuáles quedan quietas.",
        ],
      },
      {
        heading: "Tres preguntas antes de animar algo",
        paras: [
          "Me las hago en cada build, y la mayoría de las ideas de animación no las pasan, así que se descartan antes de costar nada.",
        ],
        list: [
          "¿Ayuda a entender la página? Por ejemplo, el movimiento que muestra cómo se relacionan dos cosas se gana su lugar. El que solo decora, en general no.",
          "¿Alguien que entra por primera vez notaría que falta? Si no, es un buen argumento para sacarlo.",
          "¿Demora lo que la persona vino a buscar? Cualquier cosa entre el visitante y el contenido que quiere tiene que ser corta y deliberada.",
        ],
      },
      {
        heading: "El costo que Lighthouse no muestra",
        paras: [
          "El movimiento también tiene un costo de mantenimiento que no aparece en ningún reporte de Lighthouse. Cada elemento animado es algo que se puede romper cuando tu equipo agrega un quinto ítem a una grilla de cuatro, o pega un párrafo el doble de largo que el placeholder.",
          "Probablemente esa sea la razón principal por la que soy selectivo. Y es por eso que construyo el movimiento sobre la estructura del CMS y no sobre un contenido específico. Un reveal que asume tres cards se va a ver roto el día que alguien agregue la cuarta, así que lo armo para la estructura y no para lo que haya en la colección el día del lanzamiento.",
        ],
      },
      {
        heading: "Cuándo valen la pena esos puntos y cuándo no",
        paras: [
          "Entonces sí, las animaciones hacen un poco más lento un sitio en Webflow, y en general menos que tus imágenes. Si el movimiento está haciendo un trabajo real, como sostener la marca en BIKE o hacer que un 404 se sienta intencional, unos puntos de Lighthouse probablemente sean un precio razonable.",
          "Donde sí pondría un freno es en el movimiento que nadie pidió, sobre todo en una página donde se mete en el medio de la lectura. En ese caso prefiero sacarlo y mirar primero las imágenes, las tipografías y los scripts, porque ahí suele estar la velocidad. Si no tenés claro en qué caso está tu sitio, las tres preguntas de más arriba son un buen punto de partida.",
        ],
      },
    ],
  },
  "webflow-ecommerce-made-to-order": {
    title: "¿Webflow Ecommerce sirve para productos a medida?",
    description:
      "En una tienda a medida que construí, el carrito corre sobre CartGenie y no sobre Webflow Ecommerce. Por qué lo decidí así y cuándo elegiría otra cosa.",
    tags: ["Webflow", "Ecommerce", "CMS"],
    lead:
      "En True North Jerseys, un fabricante de kits a medida en British Columbia, la tienda no corre sobre Webflow Ecommerce. Corre sobre CartGenie, una app del marketplace de Webflow, y los productos siguen viviendo en el CMS de Webflow. Creo que esa es la respuesta realista para la mayoría de los negocios a medida: sí, Webflow puede sostener la tienda, pero probablemente no con su propio ecommerce. Acá te cuento por qué lo decidí así y dónde creo que este setup deja de funcionar.",
    sections: [
      {
        heading: "Por qué el modelo de producto estándar no servía",
        paras: [
          "Webflow Ecommerce está pensado alrededor de un producto con precio fijo y stock. Eso cubre buena parte del retail y casi nada de lo que vende un fabricante a medida. Un negocio a medida normalmente no sabe ninguna de las dos cosas en el momento en que alguien entra a la página.",
          "True North hace kits de hockey y béisbol a medida: sublimados, reversibles, bordados. El precio depende de la tirada, la terminación y el arte, y no hay nada en stock esperando para salir.",
          "Si metés eso a la fuerza en una plantilla de producto estándar, la tienda o muestra un precio que no es real o lo esconde por completo. Por ejemplo, alguien que maneja un equipo y está mirando una camiseta reversible no puede hacer nada útil con ninguna de las dos respuestas, así que se va. No quería construir ninguna de esas dos versiones.",
        ],
      },
      {
        heading: "Por qué CartGenie y no Webflow Ecommerce",
        paras: [
          "Parte de lo que vende True North sí se comporta como retail. La indumentaria de catálogo tiene precio y stock. Así que el sitio necesitaba un carrito real al lado del camino de cotización, y la pregunta era qué carrito usar.",
          "Elegí CartGenie, una app de ecommerce hecha por el equipo detrás de Monto y listada en el marketplace de apps de Webflow. Las razones son específicas de este tipo de producto. No es una queja general contra Webflow:",
        ],
        list: [
          "Variantes. La comparación publicada por CartGenie la pone en 200 variantes por producto, contra 50 de Webflow Ecommerce. En cuanto los talles se multiplican por colores y por terminaciones, 50 deja de alcanzar.",
          "Campos de personalización en el producto y campos a medida en el checkout. Ahí es donde se especifica de verdad un pedido a medida.",
          "Funciona sobre un plan CMS de Webflow, no sobre un plan de Ecommerce.",
        ],
      },
      {
        paras: [
          "Esas cifras salen de la propia comparación de CartGenie, y los dos productos cambian, así que las volvería a chequear antes de basarte en ellas para tu tienda.",
        ],
      },
      {
        heading: "Dónde vive el catálogo",
        paras: [
          "La tercera razón es la que más importa, y en realidad no tiene que ver con ecommerce. Como CartGenie funciona sobre un plan CMS, los productos quedan en colecciones del CMS de Webflow y el motor de la tienda va detrás. Lo hice a propósito, porque la mayor parte de un catálogo a medida es un problema de contenido, no de checkout.",
          "Lo primero que necesita un comprador a medida es evidencia: cómo se ve el trabajo, cuáles son las opciones y si esta empresa ya hizo kits para un equipo como el suyo. El CMS de Webflow resuelve eso bien. Las líneas de producto son colecciones y las terminaciones son campos.",
          "Hockey, béisbol e indumentaria de equipo están armados como componentes que siguen las mismas reglas, así que una línea nueva se agrega igual que las tres primeras, sin que nadie toque el build. Si cada línea nueva necesitara un desarrollador, el sitio probablemente estaría desactualizado en un año.",
        ],
      },
      {
        heading: "La cotización, siempre a un toque",
        paras: [
          "La falla más común que veo en sitios de producto a medida es un pedido de cotización enterrado detrás de una página de contacto. Alguien que está mirando una camiseta reversible y pensando en los colores de su equipo está lo más cerca de comprar que va a estar, y mandarlo a un formulario de contacto genérico es una buena forma de perderlo.",
          "En True North el camino de pedido y cotización queda al alcance desde donde aparezca ese interés, y se queda adentro de la marca. No hay un salto a un formulario de terceros que parece de otra empresa.",
          "El carrito sigue la misma regla. Un camino termina en un checkout y el otro en una conversación, pero el visitante no debería tener que darse cuenta en cuál de los dos está, ni notar que el carrito es otro sistema. Hice que los dos se vieran y se comportaran como el mismo sitio.",
        ],
      },
      {
        heading: "Cuándo te recomendaría otra cosa",
        paras: [
          "Si tu producto necesita un configurador en vivo que recalcule el precio mientras el comprador cambia opciones, precios distintos por cliente, o inventario sincronizado con un sistema de depósito, creo que ya estás más allá de lo que este setup hace cómodo. Ahí probablemente estés mirando un build headless u otra plataforma, y no te lo cotizaría como un proyecto rápido de Webflow.",
          "Igual, esa línea se movió. Hace unos años estaba mucho más cerca, y un montón de tiendas se fueron de Webflow por límites de variantes y campos de checkout que la capa de apps ya resolvió. Antes de aceptar un presupuesto para migrar afuera de Webflow, yo chequearía qué pueden hacer hoy la plataforma y sus apps.",
          "Una tienda a medida que necesita un catálogo, un carrito para los productos en stock y un camino claro a la cotización sigue estando por debajo de esa línea. Eso es lo que necesitaba True North, y para eso construí la tienda.",
        ],
      },
    ],
  },
  "animated-site-when-javascript-fails": {
    title: "¿Qué le pasa a un sitio animado cuando falla el JavaScript?",
    description:
      "Casi toda la animación de scroll esconde el contenido hasta que corre un script. Cómo armarla para que un script caído te cueste el efecto, no la página.",
    tags: ["Webflow", "GSAP", "Accesibilidad"],
    lead:
      "Respuesta corta: depende de cómo se construyó el movimiento. Mucha animación de scroll funciona escondiendo primero los textos y las imágenes, y mostrándolos cuando corre un script. Si ese script nunca corre, el contenido queda escondido y la página se ve vacía. Podés chequear qué tipo de build tenés antes del lanzamiento, y cerca del final explico cómo.",
    sections: [
      {
        heading: "Por qué pasa esto",
        paras: [
          "Cada reveal en una página es la página esperando a un script para mostrar algo que ya tiene. La mayoría de las veces el script carga y nadie se da cuenta. Pero los scripts cargan tarde, los bloquea una extensión del navegador, o se rompen después de un cambio que no tenía nada que ver con la animación. Cuando eso pasa en un sitio armado de la forma habitual, el visitante no ve una versión más simple de la página. Ve secciones vacías.",
          "Lo molesto es que nadie lo reporta. Un visitante que ve una sección en blanco simplemente se va, y en tus analytics se ve como cualquier otro rebote.",
        ],
      },
      {
        heading: "No es solo que falle el script",
        paras: [
          "Cuando reviso un sitio con mucho movimiento, chequeo tres casos. La mayoría de la gente solo piensa en el primero.",
        ],
        list: [
          "El script nunca arranca. No carga o tira un error antes de correr, y todo lo que estaba escondido queda escondido.",
          "El visitante tiene activado reducir movimiento. La gente lo configura en su sistema operativo, por motivos vestibulares o simplemente porque lo prefiere. La solución fácil es apagar la animación, pero si la apagás en el medio de una secuencia, los elementos quedan congelados donde arrancaron, por ejemplo a medio aparecer o corridos hacia un costado.",
          "La plataforma toma el control. Webflow maneja algunos estados por su cuenta. Su menú mobile esconde el panel apenas se cierra, así que si le agregás una animación de cierre no queda nada en pantalla para animar, y el menú simplemente desaparece.",
        ],
      },
      {
        heading: "Cómo lo construí en Fully Dialed",
        paras: [
          "Fully Dialed calibra las cámaras y los radares de los autos modernos para talleres en British Columbia. El diseño y la dirección del movimiento vinieron de su lado, en Figma, y la página se mueve mucho: texto que aparece línea por línea, máscaras de fotos que se abren, patrones de radar atados al scroll. Mi parte fue construirlo para que nada de eso pudiera hacer fallar la página. Todo su mensaje gira alrededor de la seguridad, así que una página que se rompe sin que nadie se dé cuenta era lo que más quería evitar.",
          "Primero, todo el copy está en el HTML desde el principio. Los buscadores y los lectores de pantalla reciben la página completa, corra o no el script.",
          "Segundo, el contenido solo se esconde una vez que el código de animación realmente arrancó. Si el script nunca carga, nunca se escondió nada.",
          "Tercero, hay un watchdog. Si la capa de movimiento no responde en seis segundos, deja de esperar y muestra todo sin animación.",
          "Para reducir movimiento muestro el estado final en vez de apagar la animación. El ticker rotativo es un buen ejemplo: si lo frenara en el medio mostraría media palabra, así que con reducir movimiento se renderiza en su posición final. Para el menú, capturo el momento en que Webflow lo cierra y mantengo el panel en pantalla justo lo necesario para reproducir la animación de cortina al revés. Después Webflow lo esconde como siempre.",
          "Todo el movimiento vive en un solo archivo de unos 13 KB, y cada sección se suma con atributos en la página. Lo hice así a propósito en vez de configurar decenas de interacciones a mano, porque era la única forma de asegurarme de que las reglas de arriba se apliquen a todas las secciones y no solo a la mayoría.",
        ],
      },
      {
        heading: "Lo que todavía cuesta",
        paras: [
          "El sitio en vivo saca 90 en accesibilidad en Lighthouse, no 100, y los puntos que pierde vienen de la capa de movimiento. Para animar una oración línea por línea la partís en pedazos, y después tenés que describirle la oración original a la tecnología asistiva por separado. La forma en que esa descripción queda asociada es lo que marca la auditoría.",
          "Creo que se puede arreglar. Pero también es el costo real del efecto: cada línea que entra deslizándose es markup extra que un lector de pantalla tiene que interpretar. Prefiero mostrar el 90 y explicar de dónde sale.",
        ],
      },
      {
        heading: "Cómo chequear tu propio sitio",
        paras: [
          "Lo podés hacer sobre un link de staging antes del lanzamiento. No necesitás un desarrollador.",
        ],
        list: [
          "Desactivá JavaScript en el navegador y recargá la página. Todo lo que necesitás leer tendría que seguir ahí, solo que sin movimiento. Si aparecen secciones vacías, la animación tiene el control de tu contenido.",
          "Activá reducir movimiento (en Mac: Configuración del Sistema, Accesibilidad, Pantalla, Reducir movimiento) y recargá. Los elementos tendrían que aparecer en su posición final, no congelados a mitad de camino.",
          "Preguntale a tu desarrollador qué pasa si el script de animación no carga. Si la respuesta es “eso no va a pasar”, no es realmente una respuesta.",
          "Preguntá dónde vive el movimiento. Si es un solo archivo, se puede revisar y arreglar en un solo lugar. Si son cincuenta interacciones configuradas a mano, son cincuenta lugares donde alguna se puede desviar.",
        ],
      },
      {
        heading: "Cuándo no lo construiría así",
        paras: [
          "Si tu equipo necesita editar las animaciones por su cuenta, una capa de movimiento escrita en código probablemente sea la opción equivocada, porque solo un desarrollador la puede cambiar. Las interacciones propias de Webflow son más difíciles de mantener consistentes en un sitio grande, pero tu equipo las puede abrir y editar, y en muchos sitios eso pesa más.",
          "Y si el movimiento es solo decoración y el presupuesto es ajustado, prefiero usar menos. La mayor parte de lo que describí acá existe porque el diseño tenía mucho movimiento. Con unas pocas animaciones chicas, no necesitás casi nada de esto.",
        ],
      },
    ],
  },
  "b2b-website-what-it-has-to-prove": {
    title: "¿Qué tiene que demostrar un sitio B2B antes de que un comprador te contacte?",
    description:
      "Un comprador B2B entra a verificar, no a que lo convenzan. Las cuatro cosas que busca en tu sitio y cómo mostrar cada una en vez de afirmarla.",
    tags: ["Webflow", "CMS", "B2B"],
    lead:
      "Creo que menos de lo que suponen la mayoría de los briefs, y casi todo hay que mostrarlo, no decirlo. Un comprador de empresa que llega a tu sitio normalmente ya escuchó tu nombre en otro lado: una recomendación, un agente, una lista de proveedores. No viene a que lo convenzan. Viene a chequear cuatro cosas: que sos una empresa real, hace cuánto hacés esto, si ya lo hiciste para empresas como la suya y qué vendés exactamente. Abajo repaso cada una, con un sitio que construí para un proveedor naval de Uruguay como ejemplo.",
    sections: [
      {
        heading: "Qué puede y qué no puede hacer un sitio en una venta B2B",
        paras: [
          "Un sitio rara vez gana un negocio B2B. En la mayoría de las industrias eso lo definen la relación, el precio y la recomendación. Lo que un sitio sí puede hacer es perder uno, si hace que una empresa establecida parezca más chica o menos segura de lo que es. Eso es lo que trato de evitar.",
          "Por eso creo que el trabajo es más acotado de lo que admiten la mayoría de los briefs. No estás armando un pitch. Estás armando algo que aguante cuando un gerente de compras tiene diez minutos libres y otros tres proveedores para comparar.",
          "También depende de cómo compran tus clientes. Si compran por licitación, marketplaces o un portal de compras, el sitio importa mucho menos. En ese caso yo pondría el esfuerzo en los documentos que de verdad van a leer.",
        ],
      },
      {
        heading: "Primer chequeo: que sos una empresa real",
        paras: [
          "Lo primero que busca un comprador cuidadoso es aburrido: una razón social, una dirección, un teléfono, una persona a quien escribirle. Yo me aseguraría de que todo eso esté a mano desde cualquier página, para que nadie tenga que buscarlo.",
          "Acá también es donde los adjetivos dejan de funcionar. “De confianza”, “líder” y “de primer nivel” no responden la pregunta, y están en la home de todos tus competidores, así que el comprador los saltea. La prueba que uso para cualquier frase de un sitio B2B es si un desconocido podría verificarla. Un año de fundación se puede chequear. También una cantidad de clientes, una lista de países, un puerto con nombre o una razón social. “Tu socio de confianza” no, así que cuando reviso una página reemplazo ese tipo de frase por algo verificable o la saco.",
          "Por ejemplo, Seilas Ship Supplies (Nadetir S.A.) abastece embarcaciones en todos los puertos de Uruguay desde 1921: equipo de cubierta y seguridad, insumos de sala de máquinas, provisiones, pañol aduanero. Tenían un siglo de reputación y un sitio que no transmitía casi nada de eso. El brief era un sitio creíble, con alcance internacional, que dijera “de confianza desde 1921” sin tener que usar la palabra, así que cada decisión de las que cuento abajo volvió a estos cuatro chequeos.",
        ],
      },
      {
        heading: "Segundo chequeo: hace cuánto lo hacés",
        paras: [
          "La antigüedad le importa al comprador porque un proveedor que está hace mucho probablemente siga estando después del pedido. Es de las pocas cosas que un sitio puede mostrar rápido.",
          "En Seilas el año de fundación no es un eslogan. Atraviesa todo el sitio, y la historia tiene su propia sección. Esa sección la pensé para un comprador y no como un álbum familiar, así que se lee como una trayectoria.",
          "Si tu empresa es nueva, no armaría el sitio alrededor de la antigüedad, porque pone el foco justo en lo que todavía no tenés. Empezaría por el trabajo y la gente, y dejaría que la prueba se vaya juntando con el tiempo. Lo que no haría nunca es inflar la antigüedad o la escala, porque un comprador que chequea se va a dar cuenta.",
        ],
      },
      {
        heading: "Tercer chequeo: si ya lo hiciste para empresas como la suya",
        paras: [
          "Acá el comprador mira la escala, la geografía y el tipo de trabajo, más o menos en ese orden. Quiere saber si ya trabajás con empresas como la suya, o si sería de las primeras.",
          "En Seilas la sección de clientes pone el dato y su forma uno al lado del otro: más de 500 clientes en más de 30 países, sobre un mapa mundial. Quise el mapa junto al número porque el número solo no te dice si el alcance es regional o global, y el mapa lo muestra de un vistazo.",
        ],
      },
      {
        heading: "Cuarto chequeo: qué vendés exactamente",
        paras: [
          "Un comprador que compara proveedores necesita ver la oferta clara, con sus palabras y no con las tuyas. Si no puede confirmar rápido que hacés lo que necesita, pasa al siguiente proveedor.",
          "En Seilas los servicios están ordenados como los piensa el responsable de compras de un barco, por categoría, desde la carga hasta la asistencia en dique seco. La idea es que un comprador confirme en segundos que lo que necesita es algo que Seilas hace.",
          "El diseño es sobrio a propósito. Creo que un proveedor centenario que parece una startup le manda la señal equivocada a este tipo de comprador. La página en sí también es parte del chequeo, porque una página lenta o rota es evidencia y el comprador la lee. En Lighthouse el sitio en vivo mide 100 en SEO, 100 en buenas prácticas y 90 en accesibilidad. Esos números no venden nada por sí solos, pero significan que la página no juega en contra del resto del sitio.",
        ],
      },
      {
        heading: "Mantener la prueba al día después del lanzamiento",
        paras: [
          "La prueba solo sirve mientras sea cierta. Una cantidad de clientes que era correcta cuando salió el sitio se vuelve un problema el día que nadie la actualiza. Por eso el sitio de Seilas está manejado por CMS donde las cosas cambian: el equipo mantiene esas partes al día sin llamar a un desarrollador, y lo que no debería moverse nunca está construido en la página.",
          "El otro costo es la sobriedad. Un sitio tranquilo llama menos la atención que uno ruidoso. Para un proveedor cuyos compradores ya saben a quién están buscando, creo que es el intercambio correcto. Para una empresa que necesita que el sitio genere demanda por su cuenta, probablemente no lo sea, y lo diseñaría distinto.",
        ],
      },
      {
        heading: "Cómo chequear tu propio sitio",
        paras: [
          "Abrilo como lo haría un desconocido, en el celular, y date treinta segundos.",
        ],
        list: [
          "¿Encontrás la razón social de la empresa, su dirección y un contacto directo sin tener que buscarlos?",
          "¿La antigüedad de la empresa está en la primera pantalla, o solo en una página de Nosotros que la mayoría de las visitas nunca abre?",
          "Contá los adjetivos de tu sección hero. Reemplazá cada uno por un dato, un número o un lugar, o borralo.",
          "Tomá tus tres afirmaciones más grandes y preguntate cómo podría verificar cada una un comprador. Si no puede, yo la reescribiría o la sacaría.",
          "Pedile a alguien de afuera de la empresa que te diga, en una frase, qué vendés. Si su frase no coincide con la tuya, probablemente la página de servicios está escrita para vos y no para el comprador.",
        ],
      },
    ],
  },
  "webflow-multilingual-site-what-it-takes": {
    title: "¿Qué hace falta de verdad para tener un sitio en tres idiomas?",
    description:
      "Agregar un idioma en Webflow es lo fácil. Lo que cambia es cómo tu equipo maneja cada actualización de contenido después del lanzamiento.",
    tags: ["Webflow", "Localización", "CMS"],
    lead:
      "Casi siempre llega igual: estamos abriendo en Brasil y en España, ¿podemos agregar los idiomas y listo? Sí. Webflow ya lo resuelve de forma nativa, y no creo que el build sea la parte difícil. Lo que cambia es todo lo que viene después del lanzamiento. Desde ese momento, cada decisión de contenido que toma tu equipo pasa en tres idiomas, y ese trabajo normalmente no aparece en el presupuesto. Acá va lo que cambia, más o menos en el orden en que un equipo se lo encuentra.",
    sections: [
      {
        heading: "Lo que Webflow resuelve el primer día",
        paras: [
          "Agregar un idioma es barato. Webflow vende Localization como un add-on por idioma: más o menos diez dólares por mes por idioma en el plan de entrada, y alrededor del triple en el plan que incluye URLs localizadas, según pagues anual o mensual. Tomá los números actuales de la página de precios de Webflow y no de este post, porque los precios de la plataforma cambian.",
          "Ese costo suele ser lo único que alguien presupuesta, y es la parte más chica. Viene con algunas cosas que creo que conviene saber, porque cambian cómo planificás el proyecto:",
        ],
        list: [
          "Las etiquetas hreflang y el sitemap localizado se generan solos. En otras plataformas los equipos suelen hacerlo mal, y entonces los buscadores le muestran el idioma equivocado al mercado equivocado durante meses. En Webflow no gastaría presupuesto en eso.",
          "Cada idioma se publica por separado. El inglés puede salir mientras el portugués sigue en borrador, así que una traducción atrasada no frena un lanzamiento.",
          "Los slugs localizados están en el plan Advanced. Si la URL de un producto queda en inglés en tu sitio en francés, estás compitiendo por búsquedas en francés con una dirección en inglés. Si el tráfico orgánico en el segundo idioma es parte del plan de negocio, yo presupuestaría ese plan desde el principio.",
        ],
      },
      {
        heading: "El primer cambio de contenido: una edición pasa a ser tres",
        paras: [
          "Lo primero que nota tu equipo es que ahora cada cambio pasa tres veces. Una landing nueva son tres páginas, y un cambio de precios son tres cambios. Si el sitio no está construido para eso, en algún momento alguien actualiza dos idiomas, se olvida del tercero, y esa página queda mal durante un año.",
          "K2BTools vende herramientas para desarrolladores de GeneXus, y su mercado está repartido entre español, inglés y portugués, con compradores reales en cada idioma. En ese sitio construí todo a partir de componentes, y lo hice a propósito por este problema. Por ejemplo, cuando una card de funcionalidad es un componente, cambiarla es un solo cambio y se aplica en los tres idiomas. Lo único que queda por idioma son las palabras de adentro. Cuando no es un componente, el mismo cambio son tres ediciones separadas.",
          "Eso cuesta más en el build que un sitio en un solo idioma, porque tenés que definir los componentes desde el principio. Creo que en un sitio de marketing se recupera, porque el contenido cambia todo el tiempo y te ahorrás las ediciones extra en cada cambio.",
        ],
      },
      {
        heading: "El primer pedido de traducción",
        paras: [
          "Después llega la traducción en sí. Cada post del blog y cada página nueva ahora vienen con un pedido de traducción, y la opción fácil es la traducción automática.",
          "La traducción automática te da un borrador, no una página en la que un comprador confíe. Por ejemplo, los meta títulos y descripciones traducidos automáticamente se indexan y se le muestran a gente real en los resultados de búsqueda, y muchas veces nadie de tu equipo leyó esa versión. Si la usás, yo haría que una persona nativa revise por lo menos las páginas que venden y su metadata antes de publicarlas.",
        ],
      },
      {
        heading: "A los pocos meses: los idiomas se desfasan",
        paras: [
          "Acá es donde los sitios multilingües suelen fallar, y no es por la calidad de la traducción. Es por la distancia que se abre después del lanzamiento. Por ejemplo, el inglés tiene una página de precios nueva en marzo, y el portugués sigue mostrando la vieja en septiembre. Alguien en San Pablo cae en la versión vieja justamente porque hreflang funcionó y lo mandó a su idioma.",
          "Webflow no te avisa. No hay alerta de desfase ni marca de contenido viejo, nada que muestre que la página de precios en español está tres versiones atrás de la de inglés. Así que esto necesita un proceso, no una funcionalidad. Yo pondría dos reglas: un responsable con nombre por idioma, y que el idioma principal no publique un cambio estructural hasta que los otros idiomas lo tengan en cola. Ninguna de las dos cuesta plata, pero alguien tiene que sostenerlas.",
        ],
      },
      {
        heading: "Preguntas para responder antes de sumar un segundo idioma",
        paras: [
          "Yo las respondería antes de que alguien te pase un presupuesto. Ninguna es técnica, y creo que definen más del proyecto que cualquier cosa técnica que te pueda decir.",
        ],
        list: [
          "¿Quién es responsable del segundo idioma, con nombre y apellido? Si la respuesta es “marketing”, probablemente todavía no tiene responsable.",
          "¿Cada cuánto cambia el contenido? Contenido semanal en tres idiomas necesita a alguien con tiempo asignado para eso.",
          "¿El mercado es real, o es uno que esperás tener? Un idioma sin un esfuerzo de ventas detrás es una cuota mensual pegada a páginas que de a poco quedan desactualizadas.",
        ],
      },
      {
        heading: "Cuándo lo haría más chico",
        paras: [
          "Si un mercado trae la mayor parte de tu facturación y nadie se va a hacer cargo del segundo idioma, no localizaría el sitio entero. Localizaría la página en la que ese mercado realmente convierte y dejaría el resto en inglés. Una sola página que alguien mantiene al día sirve más ahí que un sitio completo que nadie actualiza, y podés sumar páginas cuando alguien se haga cargo del idioma.",
          "Y si el plan es traducción automática sin una persona nativa que revise, creo que quedarse solo en inglés es la mejor opción. Un comprador que lee un texto que claramente salió de un traductor automático probablemente piense que no te tomaste en serio su mercado, y eso es peor que pensar que todavía no llegaste. En ese caso yo esperaría a tener a alguien que pueda revisar los textos.",
        ],
      },
    ],
  },
  "webflow-site-team-can-run": {
    title: "¿Por qué mi equipo sigue necesitando un desarrollador para cambiar el sitio?",
    description:
      "Poder manejar tu propio sitio no depende de la plataforma. Sale de decisiones del build, y hay una prueba de una hora para hacer antes de lanzar.",
    tags: ["Webflow", "CMS", "Client-First"],
    lead:
      "Te dijeron que el sitio iba a ser fácil de actualizar, y durante el primer mes lo fue. Después alguien necesitó sumar una séptima persona a la página del equipo, o un título que ocupaba dos líneas, y la respuesta fue que hacía falta un desarrollador. No creo que nadie te haya mentido. El sitio se construyó para el contenido que existía la semana del lanzamiento, y poder manejarlo vos mismo no es algo que te dé la plataforma. Depende de decisiones que alguien tomó durante el build. Más abajo hay una prueba de una hora que podés hacer antes de aceptar un sitio, y no necesitás un desarrollador para hacerla.",
    sections: [
      {
        heading: "Por qué construir para contenido futuro cuesta más",
        paras: [
          "Construir para contenido que todavía no se escribió cuesta más que construir para el que ya existe. Un sitio hecho para coincidir exactamente con el archivo de diseño es más rápido y más barato que uno hecho para aguantar una quinta card, un título el doble de largo que el del mockup, o una foto subida en vertical cuando el layout esperaba una horizontal.",
          "Cuando un presupuesto de build llega sorprendentemente bajo, normalmente esto es lo que se recortó. No te das cuenta en la entrega. Te das cuenta ocho meses después, cuando el sitio que te iba a ahorrar un retainer resulta que necesita uno. Esos mismos casos, la card de más, el título largo y la foto con la forma equivocada, son los que revisa la prueba de más abajo.",
        ],
      },
      {
        heading: "Decidir qué va en el CMS",
        paras: [
          "Cuando alguien ya se quemó una vez, el instinto es meter todo en el CMS. Creo que ese es el error opuesto, y sale caro a su manera.",
          "Cada campo de una colección es algo que una persona tiene que entender antes de poder editar cualquier cosa sin miedo. Por ejemplo, una colección de cinco ítems con catorce campos probablemente quede sin tocar durante un año, porque nadie quiere ser el que la rompa.",
          "Así que la pregunta que me hago durante el build no es cuánto puede ir en el CMS. Es qué partes del sitio van a cambiar sin mí. Esas se estructuran. El resto se construye directo, porque no se va a mover, y estructurarlo solo agregaría campos que alguien tiene que esquivar. Antes de construir nada, paso cada sección del sitio por tres preguntas:",
        ],
        list: [
          "¿Cambia según los tiempos de otra persona? Un catálogo, una página de equipo, una lista de certificaciones, cualquier cosa atada al negocio y no al diseño. Eso va en el CMS.",
          "¿Se repite? Si hoy hay tres de algo, en algún momento va a haber siete, y un bloque que se repite y no es una colección significa llamar a un desarrollador cada vez que crece.",
          "¿Cambiarlo requiere una decisión de diseño? El layout de un hero, la estructura de la navegación, la forma de una tabla de precios. Eso es trabajo de diseño, no de edición, así que queda afuera del CMS.",
        ],
      },
      {
        paras: [
          "La tercera pregunta es la que más veo salir mal. Dejar que un equipo cambie cualquier cosa no es lo mismo que dejar que maneje el sitio, y normalmente es así como se rompen los sitios. Viene de un buen instinto: nadie quiere ser el cuello de botella, así que se expone todo. Lo que un equipo necesita de verdad es una cantidad chica de cosas que pueda cambiar con total confianza, y un límite claro donde la respuesta es que esto necesita un desarrollador. Así que cuando defino una entrega, arranco por la menor cantidad de campos posible y solo agrego los que el equipo pide.",
        ],
      },
      {
        heading: "En cuántos lugares tiene que editar tu equipo",
        paras: [
          "Debajo de todo esto hay una segunda pregunta, y casi nadie la hace antes de firmar. No qué puede cambiar tu equipo, sino a cuántos lugares tiene que ir para cambiarlo.",
          "En True North Jerseys la tienda no corre sobre el ecommerce propio de Webflow. Corre sobre una app de terceros. Ese tipo de decisión suele venir con un panel aparte, un segundo login, y un equipo que mantiene el catálogo en un lugar y el contenido en otro. A los seis meses, muchas veces así es como un sitio deja de mantenerse. A nadie le resultó difícil, pero mantener dos sistemas sincronizados no era trabajo de nadie.",
          "Así que el catálogo vive en colecciones del CMS de Webflow, y el equipo familiar lo edita en Webflow, en el mismo lugar donde edita todo lo demás. El motor de la tienda va detrás y no tienen que pensar en él. Elegí la app por lo que podía hacer, y después la conecté de forma que esa decisión nunca llegara a la gente que usa el sitio. Nada de esto se ve en el sitio terminado, así que conviene preguntarlo antes de que empiece el build, no después.",
        ],
      },
      {
        heading: "La hora antes de aceptar un sitio",
        paras: [
          "Esta es la prueba que haría con cualquier sitio antes de darlo por bueno. Tomate una hora antes del lanzamiento y hacé cuatro cosas:",
        ],
        list: [
          "Agregá un ítem más a cada lista. Una cuarta card en una grilla de tres columnas, la persona número once en la página del equipo.",
          "Duplicá el largo del título más largo.",
          "Dejá vacío un campo opcional en un ítem y fijate qué se muestra.",
          "Subí una imagen con la proporción equivocada.",
        ],
      },
      {
        paras: [
          "Si alguna de las cuatro necesita un desarrollador para arreglarse, no creo que el build esté terminado. No me necesitás para hacerla, y probablemente sea la hora más útil que puedas dedicarle al sitio antes de salir en vivo.",
          "Si estás encargando un sitio ahora, yo pondría esas cuatro pruebas en los criterios de aceptación antes de firmar nada. No te cuesta nada, y cambia lo que significa terminado: no cómo se ve el sitio el día del lanzamiento, sino si sigue funcionando cuando tu equipo empieza a usarlo.",
        ],
      },
      {
        heading: "Los nombres, para el que venga después",
        paras: [
          "La otra mitad de manejar tu propio sitio son los nombres. Construyo con Client-First, una convención para nombrar clases y estructurar un proyecto de forma que la próxima persona lo pueda leer.",
          "Probablemente nunca mires el nombre de una clase. El desarrollador que contrates dentro de dos años sí lo va a hacer, y si puede hacer un cambio en una tarde o tiene que reconstruir el sitio se decide ahora, por quien le estás pagando hoy. Por eso la uso: para que la próxima persona encuentre lo que necesita sin tener que preguntarle al anterior.",
        ],
      },
      {
        heading: "Cuándo tanta estructura no vale la pena",
        paras: [
          "Si tu sitio tiene cinco páginas, cambia dos veces por año y lo edita una sola persona, creo que una estructura pesada es plata mal gastada. Lo construiría simple, barato, y pondría la diferencia en el contenido.",
          "Y si nadie en tu equipo quiere hacerse cargo, la estructura no lo arregla. Un sitio que tu equipo podría manejar igual se queda desactualizado si nadie tiene asignado manejarlo. Eso no es un problema del build y no te lo puedo resolver. Lo que sí puedo hacer es construirlo para que quien lo tome más adelante no quede trabado por el sitio en sí.",
        ],
      },
    ],
  },
  "when-webflow-is-the-wrong-tool": {
    title: "¿Cuándo Webflow es la herramienta equivocada?",
    description:
      "Construyo en Webflow casi siempre. Estos son los casos en los que no, por qué Home Organizers fue uno, y lo que te cuesta un build a medida.",
    tags: ["Webflow", "Código a medida", "Proceso"],
    lead:
      "Es una pregunta justa para alguien que trabaja casi siempre en una sola plataforma. Creo que Webflow es la opción correcta para la mayoría de los sitios de marketing y B2B, sobre todo cuando el contenido cambia, y por eso paso la mayor parte de mi tiempo ahí. Pero hay casos puntuales en los que no lo uso, y son lo bastante concretos como para que los puedas chequear vos antes de encargar nada.",
    sections: [
      {
        heading: "Los casos en los que no uso Webflow",
        paras: [
          "Son cuatro, y creo que son más acotados de lo que vas a leer por ahí. Aunque la mayor parte de mi trabajo es en la plataforma, igual convenzo a gente de no usarla varias veces por año cuando aplica alguno de estos.",
        ],
        list: [
          "La interfaz es el producto. Si la gente entra con usuario y usa lo que estás construyendo, en vez de leerlo, necesitás un framework de aplicaciones. Webflow puede llevar muy bien el sitio de marketing que está delante de ese producto, pero yo no construiría el producto ahí.",
          "La sensación es el producto, y el sitio es chico. Cuando cómo se mueve una página y qué tan rápido responde son el argumento de venta principal, una plataforma limita cuánto podés ajustarlos. En un sitio grande yo aceptaría ese límite por todo lo demás que te da Webflow. En uno chico estarías pagando un CMS que no vas a usar a cambio de un límite en lo único que importa.",
          "Nadie va a entrar a editarlo. El CMS y el Designer son la mayor parte de lo que paga la cuota mensual. Si el contenido cambia dos veces por año, estás pagando funcionalidades que no usás.",
          "El resultado tiene que vivir en otro lado. Si las páginas tienen que ir embebidas en una aplicación existente, servirse desde infraestructura que controlás vos, o pasarse a un equipo que trabaja en un repositorio, vas a gastar el proyecto exportando para salir de la plataforma.",
        ],
      },
      {
        heading: "Por qué Home Organizers no está hecho en Webflow",
        paras: [
          "Home Organizers Long Island es un negocio de servicios chico. Hice ese proyecto de punta a punta (diseño, textos, SEO y código), y elegí construirlo a mano: sin Webflow, sin framework, sin build step. Lo hice a propósito porque quería que cada detalle de la sensación y del rendimiento dependiera de mí.",
          "Es el segundo caso de la lista. Un negocio de organización de casas vende una transformación, así que la pieza central del sitio es un slider de antes y después, escrito desde cero sin ninguna librería, donde arrastrás para ver cómo cambia el ambiente. Cómo se siente ese arrastre, qué tan rápido responde y si se traba en un celular es el argumento de venta en sí, no decoración. GSAP y ScrollTrigger se encargan del resto del movimiento, pero el slider lo escribí a mano porque era la parte que tenía que sentirse bien.",
          "El resto del sitio apuntaba para el mismo lado. Son unas pocas páginas que cambian poco, con datos estructurados de LocalBusiness para que los buscadores entiendan bien el negocio. No hay un equipo editorial ni una colección para mantener, así que un CMS no habría facilitado nada, y el cliente no paga una cuota mensual de plataforma.",
        ],
      },
      {
        heading: "Lo que te cuesta un build a medida",
        paras: [
          "No es una elección gratis, y te estaría vendiendo algo si te dijera que sí. Un sitio hecho a mano no tiene un Designer detrás. Cambiar un párrafo es cambiar código, o sea que pasa por quien escribe el código, y normalmente ese soy yo. Si más adelante querés que lo maneje un equipo de marketing, eso es rehacerlo, no migrarlo.",
          "La persona que lo mantiene también tiene que ser desarrollador. Eso achica bastante las opciones comparado con un proyecto en Webflow, que cualquier freelancer de Webflow competente puede agarrar después de mí.",
          "Entonces te ahorrás la cuota de la plataforma y tenés control total sobre los detalles, y a cambio resignás la facilidad para editar. Creo que ese intercambio funciona en un sitio chico que no cambia mucho. En casi cualquier otro caso yo no lo haría.",
        ],
      },
      {
        heading: "Dos preguntas que casi siempre lo definen",
        paras: [
          "La mayoría de las veces, con estas dos alcanza para saber de qué lado está tu proyecto:",
        ],
        list: [
          "¿Quién lo va a editar dentro de dieciocho meses, y es desarrollador? Si es alguien de marketing o el dueño, yo lo haría en Webflow.",
          "¿Hay una cosa que este sitio tiene que hacer y que la plataforma no hace? Una sola, no tres.",
        ],
      },
      {
        heading: "Que falte una funcionalidad rara vez es motivo para irse",
        paras: [
          "Si la respuesta a la segunda pregunta son tres cosas, el proyecto va en contra de la plataforma casi en todos lados, y Webflow probablemente sea la opción equivocada. Si es una sola y todo lo demás es normal, casi nunca sugeriría rehacerlo desde cero. Lo haría en Webflow y sumaría código a medida para esa pieza.",
          "La mayoría de los sitios que parecen tener que irse de Webflow necesitan que alguien escriba la parte que el builder no puede hacer, y que deje el resto como está. Es un proyecto mucho más chico que rehacer el sitio, y conservás los motivos por los que elegiste Webflow en primer lugar.",
        ],
      },
      {
        heading: "Por qué igual es Webflow casi siempre",
        paras: [
          "No quiero que este post se lea como un argumento en contra de la plataforma, porque no lo es.",
          "Si tu sitio tiene contenido que cambia, un equipo que lo tiene que cambiar, más que unas pocas páginas, o un plan para crecer a más idiomas y mercados, creo que Webflow es la herramienta correcta y no hay mucha discusión. El CMS, la localización y el hecho de que cualquier desarrollador de Webflow competente pueda agarrar el proyecto después de mí valen la cuota mensual varias veces.",
          "Los cuatro casos de arriba son excepciones. Casi todo lo que me llega es un proyecto de Webflow. Escribo sobre las excepciones porque prefiero decirte de entrada cuando tu proyecto es una de ellas.",
        ],
      },
    ],
  },
};

const copyByLocale: Record<Locale, Record<string, Partial<Post>>> = {
  en: {},
  es: postsCopyEs,
};

/**
 * Locales a post is actually written in: the default one plus every overlay
 * that has it. An untranslated post still renders under `/es`, in English, so
 * its metadata must not present that page as a Spanish version.
 */
export function postLocales(slug: string): Locale[] {
  return routing.locales.filter(
    (l) => l === routing.defaultLocale || slug in (copyByLocale[l] ?? {}),
  );
}

/**
 * A post is live once its `date` has arrived. Comparing ISO strings is enough
 * here and avoids timezone drift: both sides are `YYYY-MM-DD` in UTC.
 *
 * This exists so the queue can be committed ahead of time. Posts are dated on a
 * schedule (see the guide, section 7) and committing them early would otherwise
 * publish everything at once and sort the future ones above the real ones.
 */
export function isPublished(post: Pick<Post, "date">, now = new Date()): boolean {
  return post.date <= now.toISOString().slice(0, 10);
}

/** Published posts, newest first, localized to `locale`. */
export function getPosts(locale: Locale): Post[] {
  const overlay = copyByLocale[locale] ?? {};
  return posts
    .filter((p) => isPublished(p))
    .map((p) => ({ ...p, ...(overlay[p.slug] ?? {}) }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** A single post by slug, localized to `locale`. */
export function getPost(slug: string, locale: Locale): Post | undefined {
  return getPosts(locale).find((p) => p.slug === slug);
}

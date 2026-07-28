import type { Locale } from "@/i18n/routing";

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
      "Motion is not free, but it is not the reason most Webflow sites are slow either. What actually costs you, and how to decide where to spend it.",
    date: "2026-07-21",
    tags: ["Webflow", "GSAP", "Performance"],
    relatedSlug: "bike",
    lead:
      "Somewhere between the mood board and the build, someone always asks it: won't all this animation make the site slow? It is a fair question and it deserves a straight answer instead of a reassuring one. Motion is not free. It is also, most of the time, not the thing making your site slow.",
    sections: [
      {
        heading: "The honest version",
        paras: [
          "A site with real motion will almost always score lower than the same site with none. Anyone who tells you otherwise is selling something. The question worth asking is not whether motion costs anything, it is whether what you get back is worth what you paid.",
          "BIKE is an English language institute in Uruguay, and it is a good test case because it is not a restrained build. It has a custom preloader that draws before the first scroll, GSAP reveals pacing the whole page, and an interactive 3D bicycle sitting on the 404. It scores 81 on Lighthouse performance, 100 on SEO and 90 on accessibility.",
          "81 is a fine score. It is not a 98, and pretending otherwise would be dishonest. But that number buys a site that feels like it is going somewhere, for a business whose whole promise is that you will get better at something over time. A static page would have undersold that.",
        ],
      },
      {
        heading: "What actually makes a Webflow site slow",
        paras: [
          "In practice, the animation library is rarely the villain. The things that show up again and again are duller than that:",
        ],
        list: [
          "Uncompressed images. A single hero photograph exported at full resolution outweighs every script on the page.",
          "Fonts loaded badly. Four weights when you use two, no preload, no swap.",
          "Third-party scripts. Chat widgets, heat maps, three analytics tools, a cookie banner from 2019. Each one is someone else's code running on your critical path.",
          "Everything animating. Not the fact that things animate, but the fact that nothing was left alone.",
        ],
      },
      {
        paras: [
          "Notice that only the last one is about motion, and even then the problem is not GSAP. It is the absence of a decision about where motion belongs.",
        ],
      },
      {
        heading: "Where the budget goes",
        paras: [
          "Treat motion like any other budget. You have a finite amount to spend and spending it evenly is the same as spending it badly.",
          "On BIKE the spend was concentrated in three places: the preloader, because it sets the tone before anything else can; the reveals down the page, because the brand is about progress and the page should feel like it is moving forward; and the 404, because a dead end was an opportunity to be memorable rather than apologetic.",
          "Everything else is still. Forms do not bounce. Cards do not tilt. The courses section, which is the part people actually came to read, gets out of the way and lets them read it.",
        ],
      },
      {
        heading: "Three questions before you animate something",
        paras: [
          "These are the ones I ask on every build, and they kill most animation ideas before they cost anything:",
        ],
        list: [
          "Does this help someone understand the page? Motion that shows a relationship between two things earns its place. Motion that decorates does not.",
          "Would a first-time visitor notice it missing? If not, that is a strong argument for cutting it.",
          "Does it delay the thing they came for? Anything between a visitor and the content they want had better be short and deliberate.",
        ],
      },
      {
        heading: "The part nobody mentions",
        paras: [
          "Motion has a maintenance cost that never shows up in a Lighthouse report. Every animated element is something that can break when a client adds a fifth item to a four-item grid, or pastes a paragraph twice as long as the placeholder.",
          "This is the real reason to be selective, and it is why I build motion against the CMS structure rather than against a specific set of content. A reveal that assumes three cards will embarrass you the day someone adds a fourth.",
        ],
      },
      {
        heading: "So: does animation make a Webflow site slow?",
        paras: [
          "A bit. Less than your images do. And if the motion is doing real work, carrying a brand, explaining a structure, making a dead end feel intentional, then a few points of Lighthouse is a reasonable price.",
          "What is not reasonable is paying that price for motion nobody asked for on a page nobody can read.",
        ],
      },
    ],
  },
  {
    slug: "webflow-ecommerce-made-to-order",
    title: "Can Webflow Ecommerce handle made-to-order products?",
    description:
      "If your product is quoted rather than priced, the answer is yes, but probably not on Webflow Ecommerce itself. What to use instead and why.",
    date: "2026-07-28",
    tags: ["Webflow", "Ecommerce", "CMS"],
    relatedSlug: "true-north-jerseys",
    lead:
      "Webflow Ecommerce is built around a product with a fixed price and a stock count. That covers a great deal of retail and almost none of what a custom manufacturer sells. If your product is quoted rather than priced, the honest answer is yes, Webflow can carry that store, but probably not on Webflow Ecommerce itself.",
    sections: [
      {
        heading: "Where the default model runs out",
        paras: [
          "The standard setup expects you to know two things: what the item costs, and how many you have. A made-to-order business usually knows neither at the point someone lands on the page.",
          "True North Jerseys makes custom hockey and baseball kits in British Columbia. Sublimated, reversible, embroidered. The price depends on the run, the finish and the artwork. There is no shelf and nothing on it.",
          "Force that into a standard product template and you get a store that either lies about the price or hides it, and a buyer who bounces because neither answer is useful.",
        ],
      },
      {
        heading: "Separate browsing from buying",
        paras: [
          "The move that unlocks this is to stop treating one page as both catalogue and checkout.",
          "What a custom buyer needs first is evidence: what the work looks like, what the options are, whether these people have done this before for a team like theirs. That is a content problem, and the Webflow CMS handles it well. Product lines become collections. Finishes become fields. The team adds a new line without anyone touching the build.",
          "What they need second is a path to a number. That is a conversation, not a cart.",
        ],
      },
      {
        heading: "Where I stopped using Webflow Ecommerce",
        paras: [
          "Some of what True North sells does behave like retail. Stock apparel has a price and a count. So the store needed a real cart alongside the quote path, and the question became which cart.",
          "It is not Webflow Ecommerce. The store runs on CartGenie, an ecommerce app built by the team behind Monto and listed in Webflow's app marketplace, and the reasons are specific to this kind of product rather than to any general complaint about Webflow. CartGenie's published comparison puts it at 200 variants per product against 50 on Webflow Ecommerce, which stops mattering the moment sizes multiply by colours multiply by finishes. It adds personalization fields on the product and custom fields at checkout, which is where a made-to-order order actually gets specified. And it runs on a Webflow CMS plan rather than an Ecommerce one.",
          "That last point is the one worth understanding, because it is not really about ecommerce. The products live in Webflow CMS collections. The store engine sits behind them.",
        ],
      },
      {
        heading: "Keep the quote path one tap away",
        paras: [
          "The most common failure I see on custom-product sites is burying the quote behind a contact page. Intent is perishable. Someone looking at a reversible jersey and thinking about their team's colours is as close to buying as they will ever be, and sending them to a generic contact form is a good way to lose them.",
          "On True North the order and quote path stays reachable from wherever intent lands, and it stays inside the brand. No jarring hop to a third-party form that looks like it belongs to a different company.",
          "The same applies to the cart. A visitor should never have to work out which of the two paths they are in. One of them ends in a checkout and the other ends in a conversation, and neither should announce that it is a different system.",
        ],
      },
      {
        heading: "Build it so the client can grow it",
        paras: [
          "A custom manufacturer adds product lines. That is the business. If each new line means a developer, you have built something that will be out of date within a year and resented within two.",
          "Structuring lines as components and content as CMS collections means hockey, baseball and team apparel all follow the same rules, and the fourth line drops in the same way the first three did. True North is a family-run team and they run the catalogue themselves.",
        ],
      },
      {
        heading: "When Webflow is the wrong answer",
        paras: [
          "Worth saying plainly, because the alternative is selling you something that will hurt later. If your product needs a live configurator that prices itself as the buyer changes options, or per-customer pricing tiers, or inventory syncing against a warehouse system, you are past what this setup does comfortably. At that point you are looking at a headless build or a different platform, and anyone who tells you it is a quick Webflow project has not thought it through.",
          "Note where that line sits now. A few years ago it sat much closer, and plenty of stores left Webflow over variant limits and checkout fields that the app layer has since solved. It is worth checking what the platform and its apps do today before you accept a quote to migrate away from it.",
          "The made-to-order case sits below that line. Catalogue, craft, and a clean path to a quote. Webflow handles that well, as long as you stop trying to make it a supermarket.",
        ],
      },
    ],
  },
  {
    slug: "webflow-multilingual-site-what-it-takes",
    title: "What does it actually take to run a site in three languages?",
    description:
      "Webflow makes adding a locale close to trivial. The part nobody quotes is what happens to your content operation for the next three years.",
    date: "2026-08-11",
    tags: ["Webflow", "Localization", "CMS"],
    relatedSlug: "k2btools",
    lead: "It always arrives the same way. We are opening in Brazil and Spain, can we just add the languages? Yes. Webflow does this natively now and the build is genuinely not the hard part. The hard part is that you have just tripled the size of every content decision you will make for the next three years, and that never shows up in a quote.",
    sections: [
      {
        heading: "The honest version",
        paras: [
          "Adding a locale is cheap. Webflow sells localization as a per locale add-on, roughly ten dollars a month per locale at the entry tier and around three times that at the tier which unlocks localized URLs, with the exact figures depending on whether you pay annually or monthly. Take those from Webflow's pricing page rather than from this post. Platform pricing moves, and that number is the least durable thing on this page.",
          "It is also the smallest. Everything after it is people. Every landing page you launch is now three landing pages. Every pricing change is three changes. Every blog post has a translation request stapled to it. The platform fee is the cheapest line in a multilingual site and it is the only one anyone budgets for.",
        ],
      },
      {
        heading: "Three things worth knowing before you decide",
        paras: [
          "Most of what you will read about Webflow's localization is a tour of the panel. Three details actually change how you plan the project.",
        ],
        list: [
          "Hreflang tags and the localized sitemap are generated for you. This is the part teams get wrong on other platforms, and getting it wrong means search engines serve the wrong language to the wrong market for months. Webflow handling it removes a real category of risk, so do not spend budget solving it.",
          "Locales publish independently. English can ship while Portuguese is still in draft. A late translation never blocks a launch, which changes how you sequence a rollout.",
          "Localized URL slugs sit on the Advanced tier. If a product URL stays in English on your French site, you are competing for French search with an English address. If organic search in the second language is part of the business case, the cheaper tier is not the cheaper option.",
        ],
      },
      {
        heading: "What Webflow will not do for you",
        paras: [
          "It will not tell you that your Spanish pricing page is three revisions behind the English one. There is no drift alert, no staleness flag, nothing that surfaces the gap. The product assumes somebody is watching.",
          "And machine translation gives you a draft, not a page a buyer trusts. Auto translated meta titles and descriptions get indexed and served to real people, and the version they read is the one nobody on your team ever looked at.",
        ],
      },
      {
        heading: "What this looked like on K2BTools",
        paras: [
          "K2BTools sells developer tooling for GeneXus, and its market is actually split across Spanish, English and Portuguese. Not aspirationally split. Actually split, with buyers in each.",
          "The decision that made the site survivable was structural rather than linguistic. Build it component first. When a feature card is a component, changing it is one change that lands in all three locales, and the only per locale work left is the words inside it. When it is not a component, the same change is three edits, and eventually somebody does two of them and the third sits wrong for a year.",
          "That is the whole trade. You spend more at build time defining components than a single language site would need, and you get it back every time the content changes, which on a marketing site is constantly.",
        ],
      },
      {
        heading: "Three questions before you add a second language",
        paras: [
          "Answer these before anyone quotes you. None of them is a technical question and they decide more than any technical answer I could give.",
        ],
        list: [
          "Who owns the second locale, by name? If the answer is marketing, it has no owner.",
          "How often does the content change? Weekly content across three locales is a role, not a setting.",
          "Is the market real or aspirational? A locale with no sales motion behind it is a monthly bill attached to a page that slowly stops being true.",
        ],
      },
      {
        heading: "Where multilingual sites actually rot",
        paras: [
          "Not in translation quality. In the gap that opens after launch. English gets a new pricing page in March. Portuguese still shows the old one in September. Someone in Sao Paulo lands on the stale version precisely because hreflang worked and sent them to their own language.",
          "That is a process problem, so it needs a process answer. One named owner per locale, and a rule that the primary locale does not publish a structural change until the others are queued. Neither of those is something you buy.",
        ],
      },
      {
        heading: "When the answer is no",
        paras: [
          "If one market is most of your revenue and nobody will own the second locale, do not localize the site. Localize one page, the one that market actually converts on, and leave the rest in English. A single maintained page in someone's language beats a whole site that stopped being true a year ago.",
          "And if the plan is machine translation with no native reviewer, English only is the better product. A buyer reading obviously machine translated copy concludes you did not take their market seriously, which is worse than concluding you have not got there yet.",
        ],
      },
      {
        heading: "So what does it take",
        paras: [
          "Webflow makes the mechanics close to boring, which is what you want from infrastructure. What it cannot do is make the difficulty disappear. It moves the difficulty back to where it always was: having something to say in each language, and someone whose job it is to keep saying it.",
        ],
      },
    ],
  },
  {
    slug: "webflow-site-team-can-run",
    title: "Why does my team still need a developer to change the site?",
    description:
      "Running your own site is not a platform feature. It is a set of decisions made at build time about which parts are allowed to change.",
    date: "2026-08-25",
    tags: ["Webflow", "CMS", "Client-First"],
    relatedSlug: "true-north-jerseys",
    lead: "You were told the site would be easy to update, and for the first month it was. Then someone needed a seventh person added to the team page, or a heading that ran two lines instead of one, and the answer came back that it needs a developer. Nobody lied to you. The site was built to hold the content that existed the week it launched, and being able to run it yourself is not a feature of the platform. It is a set of decisions somebody made months before you noticed.",
    sections: [
      {
        heading: "The honest version",
        paras: [
          "Building for content that has not been written yet costs more than building for content that has. A site built to look exactly like the design file is faster and cheaper than one built to survive a fifth card, a heading twice as long as the mockup, and a photo uploaded portrait when the layout assumed landscape.",
          "When a build quote comes in surprisingly low, this is usually what got cut. You do not find out at handover. You find out eight months later, when the site that was going to save you a retainer turns out to need one.",
        ],
      },
      {
        heading: "CMS driven where it counts",
        paras: [
          "The instinct, once someone has been burned, is to put everything in the CMS. That is the opposite mistake and it is expensive in its own way.",
          "A collection is a contract. Every field is something a person has to understand before they can safely edit anything, and a CMS built for scale you do not have is its own kind of unusable. A five item collection with fourteen fields will sit untouched for a year because nobody wants to be the one who breaks it.",
          "So the question at build time is not how much can go into the CMS. It is which parts of this site will change without me. Those get structured. Everything else gets built directly, because it is not going to move, and structuring it would only add fields for somebody to navigate around.",
        ],
      },
      {
        heading: "How to tell which parts those are",
        paras: [
          "Three tests, worth running against every section of the site before anybody builds anything.",
        ],
        list: [
          "Does it change on someone else's schedule? A catalogue, a team page, a list of certifications, anything tied to the business rather than to the design. That belongs in the CMS.",
          "Does it repeat? If there are three of something today there will be seven eventually, and a repeating structure that is not a collection is a developer ticket with a delay on it.",
          "Would changing it require a design decision? A hero layout, a navigation structure, the shape of a pricing table. That is not editing, that is design.",
        ],
      },
      {
        heading: "The third test is the one people fail",
        paras: [
          "Handing a team the ability to change anything is not the same as handing them the ability to run the site. It is usually how sites get broken, and it comes from a good instinct: nobody wants to be the bottleneck, so everything gets exposed.",
          "What a team actually wants is a small number of things they can change with total confidence, and a clear edge where the answer is that this one needs a developer. A narrow surface people trust beats a wide one they are scared of.",
        ],
      },
      {
        heading: "Where your team edits is a build decision",
        paras: [
          "There is a second question underneath all of this and almost nobody asks it before signing: not what can your team change, but how many places do they have to go to change it.",
          "On True North Jerseys the store does not run on Webflow's own ecommerce. It runs on a third-party app. That kind of decision usually comes with a separate dashboard, a second login, and a team that now maintains its catalogue in one place and its content in another. Six months in, that is how a site quietly stops being maintained: not because anyone found it hard, but because keeping two systems in step was nobody's job.",
          "So the catalogue lives in Webflow CMS collections and the family-run team edits it in Webflow, in the same place they edit everything else. The store engine sits behind that and they never have to think about it. The tool was chosen for what it could do, and then wired so the choice never reached the people using the site.",
          "That is what I mean by a build decision. Nothing about it is visible on the finished site. All of it decides whether the site is still current in two years.",
        ],
      },
      {
        heading: "The test to run before you accept a site",
        paras: ["Give yourself an hour before launch and do four things."],
        list: [
          "Add one more item to every list. A fourth card in a three across grid, an eleventh person on the team page.",
          "Double the length of the longest heading.",
          "Leave an optional field empty on one item and look at what renders.",
          "Upload an image in the wrong aspect ratio.",
        ],
      },
      {
        heading: "What that hour tells you",
        paras: [
          "If any of the four needs a developer, the build is not finished. You do not need me to run this and it is the most useful hour you can spend before going live.",
          "If you are commissioning a site right now, put those four checks into the acceptance criteria before you sign anything. It costs you nothing and it changes the conversation, because it moves the definition of done from how the site looks on launch day to whether it survives being used.",
        ],
      },
      {
        heading: "The half nobody sells you",
        paras: [
          "The other half of running your own site is naming. I build with Client-First, a convention for naming classes and structuring a project so the next person can read it.",
          "You will never look at a class name. But the developer you hire in two years will, and whether that person can make a change in an afternoon or has to rebuild the site is decided now, by someone you are paying today. Ownership is not a feeling about your site. It is whether the next person can find what they need without asking the last one.",
        ],
      },
      {
        heading: "When this is the wrong answer",
        paras: [
          "If your site is five pages, changes twice a year and one person edits it, heavy structure is money badly spent. Build it simple, keep it cheap, and put the difference into the content.",
          "And if nobody on your team wants the job, no amount of structure fixes it. A site that can be run by a team which has not assigned anyone to run it still goes stale. That is not a build problem and I cannot solve it for you.",
        ],
      },
      {
        heading: "The short answer",
        paras: [
          "Your team does not need a developer because the platform is limited. They need one because somebody decided, at build time, which parts of the site were allowed to change, and how many places they would have to go to change them. Make those decisions on purpose and most of the tickets never get written.",
        ],
      },
    ],
  },
  {
    slug: "when-webflow-is-the-wrong-tool",
    title: "When is Webflow the wrong tool for the job?",
    description:
      "I build in Webflow most of the time. Here are the cases where I do not, and what the alternative actually costs you.",
    date: "2026-09-08",
    tags: ["Webflow", "Custom code", "Process"],
    relatedSlug: "home-organizers",
    lead: "It is a fair thing to ask someone whose whole business is one platform, so here is the straight answer. Webflow is the right call for most marketing sites, most B2B sites and most builds with content that changes, which is why I spend most of my time in it. It is also the wrong call more often than anyone selling it will tell you, and the cases are specific enough that you can check them yourself before you commission anything.",
    sections: [
      {
        heading: "The honest version",
        paras: [
          "A specialist arguing that their specialty fits every job is telling you about their invoicing, not about your project. I have built in Webflow for years and I still talk people out of it several times a year.",
          "The reason is not that Webflow is weak. It is that Webflow is a platform with a shape, and a project either fits that shape or spends its whole budget fighting it. Noticing that in week one is cheap. Noticing it in month four is not.",
        ],
      },
      {
        heading: "The cases where I say no",
        paras: ["Four, and they are narrower than the internet suggests."],
        list: [
          "The interface is the product. If you are building something people log into and use, rather than a site people read, you want an application framework. Webflow can hold a marketing site in front of that product beautifully. It should not be the product.",
          "The feel is the product, and the site is small. When how a page moves and how fast it responds are the actual sales argument, a platform sets a ceiling on how far you can tune them. On a large site that ceiling is worth accepting for everything else you get. On a small one you are paying for a CMS you will not use in exchange for a limit on the only thing that matters.",
          "Nobody will ever log in to edit it. The CMS and the Designer are most of what the monthly fee buys. A site whose content changes twice a year is paying rent on a feature it does not use.",
          "The output has to live somewhere else. If the pages have to be embedded in an existing application, served from infrastructure you control, or handed to a team that works in a repository, you will spend the project exporting your way out of the platform.",
        ],
      },
      {
        heading: "What happened on Home Organizers",
        paras: [
          "Home Organizers Long Island is a small service business, and its site is not built in Webflow. I took that project end to end, design, copy, SEO and code, and chose to hand build it. No Webflow, no framework, no build step, so every detail of the feel and the performance was mine to tune.",
          "That is the second case on the list, and it is worth being precise about why it applied. A home organising business sells a transformation. The centerpiece of the site is a before and after slider, written from scratch with no library, where you drag to see the room change. How that drag feels, how immediately it responds, whether it stutters on a phone: that is not decoration on the sales argument, it is the sales argument. GSAP and ScrollTrigger carry the rest of the motion. The one piece that had to feel exactly right got written by hand.",
          "Everything else followed from the same fact. It is a handful of pages that change rarely, with LocalBusiness structured data so search engines read the business correctly. No editorial team, no collection to maintain, no monthly platform fee, and nothing a CMS would have made easier.",
        ],
      },
      {
        heading: "The bill for going custom",
        paras: [
          "This is not a free choice and I would be selling you something if I pretended otherwise.",
          "A hand built site has no Designer behind it. Changing a paragraph means changing code, which means it goes through whoever writes code, which usually means me. If you later want to hand it to a marketing team, that is a rebuild and not a migration. And the person who maintains it has to be a developer, which narrows the field considerably next to a Webflow project that any competent Webflow freelancer can pick up.",
          "You are trading platform cost and editing convenience for control and precision. That is a good trade on a small site that does not change. It is a bad trade on almost everything else.",
        ],
      },
      {
        heading: "How to tell which side you are on",
        paras: ["Two questions, and they settle it most of the time."],
        list: [
          "Who edits this in eighteen months, and are they a developer? If the honest answer is a marketing person or the owner, build it in Webflow and stop reading here.",
          "Is there one thing this site has to do that the platform does not do? Not three things. One.",
        ],
      },
      {
        heading: "The option people forget",
        paras: [
          "If the answer to the second question is three things, the project is fighting the platform everywhere and the platform is probably wrong. If it is one thing and everything else is ordinary, the answer is almost never a rewrite. It is Webflow with custom code inside it.",
          "Most sites that feel like they need to leave Webflow need somebody to write the one piece the builder cannot do, and then leave the rest alone. That is a much smaller project than a rebuild and it keeps every reason you chose the platform in the first place.",
        ],
      },
      {
        heading: "When Webflow is right, which is most of the time",
        paras: [
          "A post like this is easy to over read, so let me be clear about where it lands.",
          "If your site has content that changes, a team that has to change it, more than a handful of pages, or a plan to grow into more languages and more markets, Webflow is the right tool and it is not close. The CMS, the localization, the fact that any competent developer can pick the project up after me: all of that is worth the monthly fee several times over.",
          "The four cases above are the exception. Almost everything that reaches me is a Webflow project, and saying so is only worth anything because I am willing to tell you when it is not.",
        ],
      },
      {
        heading: "The short answer",
        paras: [
          "Webflow is the wrong tool when the thing you are building is an application, when the feel of a small site is the product, when nobody will ever edit it, or when the output has to live somewhere you control. Everywhere else the platform is doing work you would otherwise pay a developer to build and maintain, and renting it is cheaper than owning it.",
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
      "El movimiento no es gratis, pero tampoco es lo que hace lento a la mayoría de los sitios en Webflow. Qué te cuesta de verdad y cómo decidir dónde gastarlo.",
    tags: ["Webflow", "GSAP", "Rendimiento"],
    lead:
      "En algún punto entre el moodboard y el build siempre aparece la pregunta: ¿tanta animación no va a hacer lento el sitio? Es una pregunta justa y merece una respuesta derecha, no una que te deje tranquilo. El movimiento no es gratis. Pero casi nunca es lo que está haciendo lento tu sitio.",
    sections: [
      {
        heading: "La versión honesta",
        paras: [
          "Un sitio con movimiento real casi siempre va a puntuar más bajo que el mismo sitio sin nada. El que te diga lo contrario te está vendiendo algo. La pregunta que vale no es si el movimiento cuesta, es si lo que recibís a cambio vale lo que pagaste.",
          "BIKE es un instituto de inglés en Uruguay, y sirve como caso de prueba porque no es un build contenido. Tiene un preloader a medida que se dibuja antes del primer scroll, reveals con GSAP que marcan el ritmo de toda la página, y una bicicleta 3D interactiva en el 404. Saca 81 en rendimiento de Lighthouse, 100 en SEO y 90 en accesibilidad.",
          "81 es un buen número. No es 98, y decir lo contrario sería deshonesto. Pero ese número compra un sitio que se siente yendo a algún lado, para un negocio cuya promesa entera es que vas a mejorar en algo con el tiempo. Una página estática habría vendido eso de menos.",
        ],
      },
      {
        heading: "Qué hace lento a un sitio en Webflow de verdad",
        paras: [
          "En la práctica, la librería de animación rara vez es la culpable. Lo que aparece una y otra vez es más aburrido que eso:",
        ],
        list: [
          "Imágenes sin comprimir. Una sola foto de hero exportada a resolución completa pesa más que todos los scripts de la página juntos.",
          "Tipografías mal cargadas. Cuatro pesos cuando usás dos, sin preload, sin swap.",
          "Scripts de terceros. Widgets de chat, mapas de calor, tres herramientas de analytics, un banner de cookies de 2019. Cada uno es código ajeno corriendo en tu camino crítico.",
          "Que todo se mueva. No que las cosas se muevan, sino que no se haya dejado nada quieto.",
        ],
      },
      {
        paras: [
          "Fijate que solo el último tiene que ver con el movimiento, y ni siquiera ahí el problema es GSAP. El problema es que no se tomó ninguna decisión sobre dónde va el movimiento.",
        ],
      },
      {
        heading: "Dónde va el presupuesto",
        paras: [
          "Tratá al movimiento como cualquier otro presupuesto. Tenés una cantidad finita y repartirla en partes iguales es lo mismo que gastarla mal.",
          "En BIKE se concentró en tres lugares: el preloader, porque marca el tono antes que cualquier otra cosa; los reveals de la página, porque la marca habla de progreso y la página tiene que sentirse avanzando; y el 404, porque un callejón sin salida era una oportunidad de ser memorable en vez de pedir disculpas.",
          "Todo lo demás está quieto. Los formularios no rebotan. Las cards no se inclinan. La sección de cursos, que es a lo que la gente realmente vino, se corre del camino y los deja leer.",
        ],
      },
      {
        heading: "Tres preguntas antes de animar algo",
        paras: [
          "Son las que me hago en cada build, y matan la mayoría de las ideas de animación antes de que cuesten nada:",
        ],
        list: [
          "¿Ayuda a entender la página? El movimiento que muestra una relación entre dos cosas se gana su lugar. El que decora, no.",
          "¿Alguien que entra por primera vez notaría que falta? Si no, es un buen argumento para sacarlo.",
          "¿Demora lo que la persona vino a buscar? Cualquier cosa entre el visitante y el contenido que quiere tiene que ser corta y deliberada.",
        ],
      },
      {
        heading: "La parte que nadie menciona",
        paras: [
          "El movimiento tiene un costo de mantenimiento que no aparece en ningún reporte de Lighthouse. Cada elemento animado es algo que se puede romper cuando un cliente agrega un quinto ítem a una grilla de cuatro, o pega un párrafo el doble de largo que el placeholder.",
          "Esta es la razón real para ser selectivo, y es por lo que construyo el movimiento contra la estructura del CMS y no contra un contenido específico. Un reveal que asume tres cards te va a hacer pasar vergüenza el día que alguien agregue la cuarta.",
        ],
      },
      {
        heading: "Entonces: ¿las animaciones hacen lento un sitio en Webflow?",
        paras: [
          "Un poco. Menos que tus imágenes. Y si el movimiento está haciendo trabajo real, sosteniendo una marca, explicando una estructura, haciendo que un callejón sin salida se sienta intencional, unos puntos de Lighthouse son un precio razonable.",
          "Lo que no es razonable es pagar ese precio por movimiento que nadie pidió en una página que nadie puede leer.",
        ],
      },
    ],
  },
  "webflow-ecommerce-made-to-order": {
    title: "¿Webflow Ecommerce sirve para productos a medida?",
    description:
      "Si tu producto se cotiza en vez de tener precio, la respuesta es sí, pero probablemente no sobre Webflow Ecommerce. Qué usar en su lugar y por qué.",
    tags: ["Webflow", "Ecommerce", "CMS"],
    lead:
      "Webflow Ecommerce está pensado alrededor de un producto con precio fijo y stock. Eso cubre buena parte del retail y casi nada de lo que vende un fabricante a medida. Si tu producto se cotiza en vez de tener precio, la respuesta honesta es sí, Webflow puede sostener esa tienda, pero probablemente no sobre Webflow Ecommerce.",
    sections: [
      {
        heading: "Dónde se queda corto el modelo por defecto",
        paras: [
          "El setup estándar espera que sepas dos cosas: cuánto sale el ítem y cuántos tenés. Un negocio a medida no sabe ninguna de las dos en el momento en que alguien entra a la página.",
          "True North Jerseys hace kits de hockey y béisbol a medida en British Columbia. Sublimados, reversibles, bordados. El precio depende de la tirada, la terminación y el arte. No hay estante ni nada arriba de él.",
          "Si eso lo metés a la fuerza en una plantilla de producto estándar, terminás con una tienda que miente sobre el precio o lo esconde, y un comprador que se va porque ninguna de las dos respuestas le sirve.",
        ],
      },
      {
        heading: "Separá navegar de comprar",
        paras: [
          "La jugada que destraba esto es dejar de tratar a una misma página como catálogo y checkout al mismo tiempo.",
          "Lo que un comprador a medida necesita primero es evidencia: cómo se ve el trabajo, cuáles son las opciones, si esta gente ya hizo algo así para un equipo como el suyo. Eso es un problema de contenido, y el CMS de Webflow lo resuelve bien. Las líneas de producto son colecciones. Las terminaciones son campos. El equipo agrega una línea nueva sin que nadie toque el build.",
          "Lo que necesita después es un camino hacia un número. Eso es una conversación, no un carrito.",
        ],
      },
      {
        heading: "Dónde dejé de usar Webflow Ecommerce",
        paras: [
          "Parte de lo que vende True North sí se comporta como retail. La indumentaria de catálogo tiene precio y stock. Así que la tienda necesitaba un carrito real además del camino de cotización, y la pregunta pasó a ser cuál carrito.",
          "No es Webflow Ecommerce. La tienda corre sobre CartGenie, una app de ecommerce hecha por el equipo detrás de Monto y listada en el marketplace de apps de Webflow, y las razones son específicas de este tipo de producto, no una queja general contra Webflow. La comparación publicada por CartGenie la pone en 200 variantes por producto contra 50 de Webflow Ecommerce, algo que deja de ser un detalle en cuanto los talles se multiplican por colores y por terminaciones. Agrega campos de personalización en el producto y campos a medida en el checkout, que es justo donde se especifica un pedido a medida. Y funciona sobre un plan CMS de Webflow, no sobre uno de Ecommerce.",
          "Ese último punto es el que conviene entender, porque en realidad no es sobre ecommerce. Los productos viven en colecciones del CMS de Webflow. El motor de la tienda va detrás.",
        ],
      },
      {
        heading: "El camino a la cotización, siempre a un toque",
        paras: [
          "La falla más común que veo en sitios de producto a medida es enterrar la cotización detrás de una página de contacto. La intención es perecedera. Alguien mirando una camiseta reversible y pensando en los colores de su equipo está lo más cerca de comprar que va a estar nunca, y mandarlo a un formulario de contacto genérico es una buena forma de perderlo.",
          "En True North el camino de pedido y cotización queda alcanzable desde donde aparezca la intención, y se queda adentro de la marca. Sin saltos raros a un formulario de terceros que parece de otra empresa.",
          "Lo mismo vale para el carrito. El visitante nunca debería tener que darse cuenta en cuál de los dos caminos está. Uno termina en un checkout y el otro en una conversación, y ninguno debería anunciar que es otro sistema.",
        ],
      },
      {
        heading: "Construilo para que el cliente lo haga crecer",
        paras: [
          "Un fabricante a medida agrega líneas de producto. Ese es el negocio. Si cada línea nueva implica un desarrollador, construiste algo que va a estar desactualizado en un año y odiado en dos.",
          "Estructurar las líneas como componentes y el contenido como colecciones del CMS hace que hockey, béisbol e indumentaria de equipo sigan las mismas reglas, y que la cuarta línea entre igual que las tres primeras. True North es un equipo familiar y manejan el catálogo ellos mismos.",
        ],
      },
      {
        heading: "Cuándo Webflow es la respuesta equivocada",
        paras: [
          "Vale decirlo derecho, porque la alternativa es venderte algo que después duele. Si tu producto necesita un configurador en vivo que se recotice mientras el comprador cambia opciones, o precios por cliente, o sincronizar inventario contra un sistema de depósito, ya estás más allá de lo que este setup hace cómodo. Ahí estás mirando un build headless u otra plataforma, y el que te diga que es un proyecto rápido de Webflow no lo pensó bien.",
          "Mirá dónde está esa línea hoy. Hace unos años estaba mucho más cerca, y un montón de tiendas se fueron de Webflow por límites de variantes y campos de checkout que la capa de apps ya resolvió. Vale chequear qué hacen hoy la plataforma y sus apps antes de aceptar un presupuesto para migrar afuera.",
          "El caso a medida está por debajo de esa línea. Catálogo, oficio, y un camino limpio a la cotización. Webflow lo resuelve bien, siempre que dejes de tratar de convertirlo en un supermercado.",
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

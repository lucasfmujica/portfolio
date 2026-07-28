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
    date: "2026-07-28",
    tags: ["Webflow", "GSAP", "Performance"],
    relatedSlug: "bike",
    lead:
      "Somewhere between the mood board and the build, someone always asks it: won't all this animation make the site slow? It is a fair question and it deserves a straight answer instead of a reassuring one. Motion is not free. It is also, most of the time, not the thing making your site slow.",
    sections: [
      {
        heading: "The honest version",
        paras: [
          "A site with real motion will almost always score lower than the same site with none. Anyone who tells you otherwise is selling something. The question worth asking is not whether motion costs anything, it is whether what you get back is worth what you paid.",
          "BIKE is a good test case because it is not a restrained build. It has a custom preloader that draws before the first scroll, GSAP reveals pacing the whole page, and an interactive 3D bicycle sitting on the 404. It scores 81 on Lighthouse performance, 100 on SEO and 90 on accessibility.",
          "81 is a fine score. It is not a 98, and pretending otherwise would be dishonest. But that number buys a brand whose entire pitch is movement, on a site that would have undercut itself by sitting still.",
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
      "Webflow Ecommerce assumes a product with a price and a stock count. Custom and made-to-order products break both assumptions. Here is how to build it anyway.",
    date: "2026-07-28",
    tags: ["Webflow", "Ecommerce", "CMS"],
    relatedSlug: "true-north-jerseys",
    lead:
      "Webflow Ecommerce is built around a product with a fixed price and a stock count. That covers a great deal of retail and almost none of what a custom manufacturer sells. If your product is quoted rather than priced, the honest answer is: yes, but not the way the tutorials show you.",
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
        heading: "Use native Ecommerce where it earns its place",
        paras: [
          "This is not an argument for skipping Webflow Ecommerce. On True North it is wired in natively, because some of what they sell genuinely does have a price and a count. Stock apparel behaves like stock apparel.",
          "The mistake is the all-or-nothing framing. A store can have a real cart for the items that fit a cart, and a quote path for the items that do not, without either feeling bolted on. What matters is that the visitor never has to work out which one they are in.",
        ],
      },
      {
        heading: "Keep the quote path one tap away",
        paras: [
          "The most common failure I see on custom-product sites is burying the quote behind a contact page. Intent is perishable. Someone looking at a reversible jersey and thinking about their team's colours is as close to buying as they will ever be, and sending them to a generic contact form is a good way to lose them.",
          "On True North the order and quote path stays reachable from wherever intent lands, and it stays inside the brand. No jarring hop to a third-party form that looks like it belongs to a different company.",
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
          "Worth saying plainly, because the alternative is selling you something that will hurt later. If your product needs a live configurator that prices itself as the buyer changes options, or per-customer pricing tiers, or inventory syncing against a warehouse system, you are past what Webflow Ecommerce does comfortably. At that point you are looking at a headless setup or a different platform, and anyone who tells you it is a quick Webflow build has not thought it through.",
          "The made-to-order case sits below that line. Catalogue, craft, and a clean path to a quote. Webflow handles that well, as long as you stop trying to make it a supermarket.",
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
          "BIKE sirve como caso de prueba porque no es un build contenido. Tiene un preloader a medida que se dibuja antes del primer scroll, reveals con GSAP que marcan el ritmo de toda la página, y una bicicleta 3D interactiva en el 404. Saca 81 en rendimiento de Lighthouse, 100 en SEO y 90 en accesibilidad.",
          "81 es un buen número. No es 98, y decir lo contrario sería deshonesto. Pero ese número compra una marca cuyo pitch entero es el movimiento, en un sitio que se habría contradicho a sí mismo quedándose quieto.",
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
      "Webflow Ecommerce asume un producto con precio y stock. Los productos a medida rompen las dos cosas. Cómo construirlo igual.",
    tags: ["Webflow", "Ecommerce", "CMS"],
    lead:
      "Webflow Ecommerce está pensado alrededor de un producto con precio fijo y stock. Eso cubre buena parte del retail y casi nada de lo que vende un fabricante a medida. Si tu producto se cotiza en vez de tener precio, la respuesta honesta es: sí, pero no como lo muestran los tutoriales.",
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
        heading: "Usá el Ecommerce nativo donde se lo gana",
        paras: [
          "Esto no es un argumento para saltearse Webflow Ecommerce. En True North está integrado de forma nativa, porque parte de lo que venden sí tiene precio y stock. La indumentaria de catálogo se comporta como indumentaria de catálogo.",
          "El error es el planteo de todo o nada. Una tienda puede tener un carrito real para lo que entra en un carrito, y un camino de cotización para lo que no, sin que ninguno de los dos se sienta pegado con cinta. Lo que importa es que el visitante nunca tenga que darse cuenta en cuál de los dos está.",
        ],
      },
      {
        heading: "El camino a la cotización, siempre a un toque",
        paras: [
          "La falla más común que veo en sitios de producto a medida es enterrar la cotización detrás de una página de contacto. La intención es perecedera. Alguien mirando una camiseta reversible y pensando en los colores de su equipo está lo más cerca de comprar que va a estar nunca, y mandarlo a un formulario de contacto genérico es una buena forma de perderlo.",
          "En True North el camino de pedido y cotización queda alcanzable desde donde aparezca la intención, y se queda adentro de la marca. Sin saltos raros a un formulario de terceros que parece de otra empresa.",
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
          "Vale decirlo derecho, porque la alternativa es venderte algo que después duele. Si tu producto necesita un configurador en vivo que se recotice mientras el comprador cambia opciones, o precios por cliente, o sincronizar inventario contra un sistema de depósito, ya estás más allá de lo que Webflow Ecommerce hace cómodo. Ahí estás mirando un setup headless u otra plataforma, y el que te diga que es un build rápido de Webflow no lo pensó bien.",
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

/** All posts, newest first, localized to `locale`. */
export function getPosts(locale: Locale): Post[] {
  const overlay = copyByLocale[locale] ?? {};
  return posts
    .map((p) => ({ ...p, ...(overlay[p.slug] ?? {}) }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** A single post by slug, localized to `locale`. */
export function getPost(slug: string, locale: Locale): Post | undefined {
  return getPosts(locale).find((p) => p.slug === slug);
}

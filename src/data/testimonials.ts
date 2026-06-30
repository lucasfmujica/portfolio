/**
 * Homepage testimonials. The featured card + client selector both render from
 * this array; auto-advance and the click-to-switch transition are driven in
 * <Testimonials>. The `quote` field marks its ember phrase with `*asterisks*`.
 *
 * Localized via `getTestimonials(locale)`: English is canonical; the Spanish
 * (rioplatense) overlay translates only `quote` + `role` and inherits the rest
 * (name, company, avatar). These are real client quotes the owner authorized
 * translating, so wording is theirs in intent, in their language.
 */

import type { Locale } from "@/i18n/routing";

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  /** Square avatar (normalized to 200×200). */
  avatar: string;
  /** Body copy with a single `*ember phrase*`. */
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Artem Khomenko",
    role: "CTO",
    company: "Enkonix",
    avatar: "/assets/avatars/artem.webp",
    quote:
      "A strong developer with sharp attention to detail and the ability to ship highly custom solutions *within the constraints* of the platform. Highly recommend.",
  },
  {
    name: "Carolina Freese",
    role: "Founder",
    company: "Home Organizers Long Island",
    avatar: "/assets/avatars/carolinafreese.webp",
    quote:
      "Our site has a complex custom-code setup, and Lucas understood it *without needing much guidance*. New pages, detailed layouts, advanced flows, always clear and professional. Highly recommended.",
  },
  {
    name: "Franco Caputo",
    role: "CEO",
    company: "WonderUp",
    avatar: "/assets/avatars/francocaputo.webp",
    quote:
      "Worked with Lucas on multiple projects and would happily do a thousand more. Detail-oriented, tech-savvy, and an *incredible human*, above and beyond every time.",
  },
  {
    name: "Max Sher",
    role: "CEO",
    company: "Sher Agency",
    avatar: "/assets/avatars/maxsher.webp",
    quote:
      "Talented Webflow developer who *got us out of a tough situation* in a short amount of time. Highly recommend and will hire again. Great to work with as well!",
  },
  {
    name: "Eugenia Gallo",
    role: "Business Development Manager",
    company: "Seilas Ship Supplies",
    avatar: "/assets/avatars/eugenia.webp",
    quote:
      "Working with Lucas has been an absolute pleasure. His Webflow expertise is *unparalleled*. Proactive with solutions, transparent, and a joy to work with. Highly recommended.",
  },
];

/** Spanish (rioplatense) overlay, keyed by name. Only `quote` + `role`. */
const testimonialsEs: Record<string, Pick<Testimonial, "quote" | "role">> = {
  "Artem Khomenko": {
    role: "CTO",
    quote:
      "Un desarrollador sólido, con una atención al detalle aguda y la capacidad de entregar soluciones muy a medida *dentro de las limitaciones* de la plataforma. Muy recomendable.",
  },
  "Carolina Freese": {
    role: "Fundadora",
    quote:
      "Nuestro sitio tiene un setup complejo de código a medida, y Lucas lo entendió *sin necesitar mucha guía*. Páginas nuevas, layouts detallados, flujos avanzados, siempre claro y profesional. Muy recomendable.",
  },
  "Franco Caputo": {
    role: "CEO",
    quote:
      "Trabajé con Lucas en varios proyectos y haría mil más feliz de la vida. Detallista, con mucha capacidad técnica, y una *persona increíble*, siempre dando más de lo esperado.",
  },
  "Max Sher": {
    role: "CEO",
    quote:
      "Un desarrollador Webflow talentoso que *nos sacó de una situación difícil* en muy poco tiempo. Muy recomendable y lo volvería a contratar. ¡Además, un placer trabajar con él!",
  },
  "Eugenia Gallo": {
    role: "Desarrollo de Negocios",
    quote:
      "Trabajar con Lucas fue un placer absoluto. Su expertise en Webflow es *incomparable*. Proactivo con las soluciones, transparente, y un gusto trabajar con él. Muy recomendable.",
  },
};

/** Testimonials localized to `locale`. */
export function getTestimonials(locale: Locale): Testimonial[] {
  if (locale === "en") return testimonials;
  return testimonials.map((t) => ({ ...t, ...testimonialsEs[t.name] }));
}

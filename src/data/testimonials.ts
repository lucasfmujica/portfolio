/**
 * Homepage testimonials. The featured card + client selector both render from
 * this array; auto-advance and the click-to-switch transition are driven in
 * <Testimonials>. The `quote` field marks its ember phrase with `*asterisks*`.
 */

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  /** Body copy with a single `*ember phrase*`. */
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Carolina Freese",
    role: "Founder",
    company: "Home Organizers Long Island",
    quote:
      "Our site has a complex custom-code setup, and Lucas understood it *without needing much guidance*. New pages, detailed layouts, advanced flows — always clear and professional. Highly recommended.",
  },
  {
    name: "Eugenia Gallo",
    role: "Business Development Manager",
    company: "Seilas Ship Supplies",
    quote:
      "Working with Lucas has been an absolute pleasure — his Webflow expertise is *unparalleled*. Proactive with solutions, transparent, and a joy to work with. Highly recommended.",
  },
  {
    name: "Max Sher",
    role: "CEO",
    company: "Sher Agency",
    quote:
      "Talented Webflow developer who *got us out of a tough situation* in a short amount of time. Highly recommend and will hire again. Great to work with as well!",
  },
  {
    name: "Artem Khomenko",
    role: "CTO",
    company: "Enkonix",
    quote:
      "A strong developer with sharp attention to detail and the ability to ship highly custom solutions *within the constraints* of the platform. Highly recommend.",
  },
  {
    name: "Franco Caputo",
    role: "CEO",
    company: "WonderUp",
    quote:
      "Worked with Lucas on multiple projects and would happily do a thousand more. Detail-oriented, tech-savvy, and an *incredible human* — above and beyond every time.",
  },
];

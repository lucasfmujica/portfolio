"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the scroll-reactive chrome shared across routes:
 *  - `.nav.scrolled` once the page is scrolled (blurred ink background)
 *  - `body.past-hero` once the hero is out of view (top links recede)
 *  - `body.show-dock` once the second section is reached AND the footer is not
 *    yet in view — the bottom dock rises after the hero hand-off and tucks away
 *    again over the footer (which carries its own nav)
 *  - dock scrollspy: marks the active `.dock__item` for in-view sections
 *
 * Pure DOM side-effects on layout-rendered elements — renders nothing.
 * On routes without a `#hero` (case-study pages) it falls back to "past hero"
 * and an always-eligible dock, still hidden over the footer.
 */
export function ScrollChrome() {
  // Re-initialise on every route change: the observers below target per-page
  // elements (#hero, the second section, the footer), and this component lives
  // in the persistent layout — without re-running, client-side navigations
  // would leave the chrome wired to the previous page's (unmounted) DOM.
  const pathname = usePathname();

  useEffect(() => {
    const nav = document.getElementById("nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const supportsIO = "IntersectionObserver" in window;
    const hero = document.getElementById("hero");
    // Second section: the first content block after the hero (e.g. #work).
    const second =
      document.getElementById("work") ??
      (hero?.nextElementSibling as HTMLElement | null);
    const footer = document.querySelector<HTMLElement>("footer");

    // Dock visibility = reached the second section AND not over the footer.
    let pastHero = !hero; // no hero (subpages) → treat as already past
    let atSecond = !second; // no second section → dock always eligible
    let atFooter = false;
    const apply = () => {
      document.body.classList.toggle("past-hero", pastHero);
      document.body.classList.toggle("show-dock", atSecond && !atFooter);
    };

    const observers: IntersectionObserver[] = [];

    if (hero && supportsIO) {
      const o = new IntersectionObserver(
        ([e]) => {
          pastHero = !e.isIntersecting;
          apply();
        },
        { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
      );
      o.observe(hero);
      observers.push(o);
    }

    if (second && supportsIO) {
      // On once the second section crosses the viewport's mid-band; stays on as
      // it scrolls past (top above the fold), so the dock persists deeper down.
      const o = new IntersectionObserver(
        ([e]) => {
          atSecond = e.isIntersecting || e.boundingClientRect.top < 0;
          apply();
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
      );
      o.observe(second);
      observers.push(o);
    }

    if (footer && supportsIO) {
      // Hide the dock just before the footer enters, so it never overlaps the
      // footer's own nav. Positive bottom margin pulls the trigger up early.
      const o = new IntersectionObserver(
        ([e]) => {
          atFooter = e.isIntersecting;
          apply();
        },
        { rootMargin: "0px 0px 96px 0px", threshold: 0 },
      );
      o.observe(footer);
      observers.push(o);
    }

    apply();

    // Scrollspy — observe whichever dock-target sections exist on this route.
    const items = Array.from(document.querySelectorAll<HTMLElement>(".dock__item"));
    const map = new Map<string, HTMLElement>();
    items.forEach((it) => {
      const id = it.dataset.spy?.split("#")[1];
      const section = id ? document.getElementById(id) : null;
      if (id && section) map.set(id, it);
    });
    let spy: IntersectionObserver | undefined;
    if (map.size && "IntersectionObserver" in window) {
      spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            items.forEach((it) =>
              it.classList.toggle("is-active", it === map.get(e.target.id)),
            );
          });
        },
        { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
      );
      map.forEach((_, id) => {
        const section = document.getElementById(id);
        if (section) spy!.observe(section);
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o.disconnect());
      spy?.disconnect();
      document.body.classList.remove("past-hero", "show-dock");
    };
  }, [pathname]);

  return null;
}

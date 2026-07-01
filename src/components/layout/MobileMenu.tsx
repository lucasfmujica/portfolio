"use client";

import { useEffect, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { track } from "@vercel/analytics";
import { Link } from "@/i18n/navigation";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Wordmark } from "./Wordmark";
import { LocaleSwitcher } from "./LocaleSwitcher";

const LINKS: { href: string; key: "work" | "about" | "stack" | "process" }[] = [
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/#stack", key: "stack" },
  { href: "/#process", key: "process" },
];

const SOCIALS: { name: IconName; label: string; href: string }[] = [
  { name: "in", label: "LinkedIn", href: "https://www.linkedin.com/in/lucasfmujica" },
  { name: "gh", label: "GitHub", href: "https://github.com/lucasfmujica" },
];

/**
 * Mobile-only navigation: a morphing hamburger/close button (top-right) that
 * opens a full-screen overlay with large staggered links, the primary CTA and
 * socials. Hidden ≥861px, where the inline nav links + dock take over.
 *
 * Opening locks page scroll via a `menu-open` class on <html>; links close the
 * menu and let the global Lenis handler glide to the section.
 */
export function MobileMenu() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  // The overlay is portaled to <body> so it isn't trapped by .nav's
  // backdrop-filter, which (once scrolled) becomes a containing block for
  // fixed descendants and would otherwise clip the overlay to the nav bar
  // — the Safari bug where opening the menu lower down looked broken.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const close = () => {
    document.documentElement.classList.remove("menu-open");
    setOpen(false);
  };

  /**
   * Close the menu, then glide to the section. Done explicitly (rather than
   * leaning on the global Lenis click handler) so the scroll lock is lifted
   * before the scroll starts — otherwise `overflow: hidden` swallows it.
   */
  const navTo = (e: ReactMouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.includes("#") ? href.split("#")[1] : "";
    const target = id ? document.getElementById(id) : null;
    if (!target) {
      close();
      return; // cross-route link: let the browser navigate
    }
    e.preventDefault();
    close();
    requestAnimationFrame(() => {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: { offset?: number }) => void } }).__lenis;
      if (lenis) lenis.scrollTo(target, { offset: 0 });
      else target.scrollIntoView();
      history.pushState(null, "", `#${id}`);
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <div className="navmenu">
      <button
        type="button"
        className={`navmenu__toggle${open ? " is-open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="navmenu__bars" aria-hidden="true">
          <i />
          <i />
        </span>
      </button>

      {mounted &&
        createPortal(
          <div
            id="mobile-menu"
            className={`navmenu__overlay${open ? " is-open" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="navmenu__head">
              <Link className="navmenu__brand" href="/" onClick={close} aria-label={t("brandAria")}>
                <Wordmark dotClass="nav__dot" />
              </Link>
            </div>

            <nav className="navmenu__links" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <a
                  key={l.key}
                  href={l.href}
                  onClick={(e) => navTo(e, l.href)}
                  style={{ "--i": i } as CSSProperties}
                >
                  {t(l.key)}
                </a>
              ))}
            </nav>

            <div className="navmenu__foot">
              <a
                href="#contact"
                className="btn btn--primary navmenu__cta"
                onClick={(e) => navTo(e, "#contact")}
              >
                {t("talk")}
              </a>
              <div className="navmenu__soc" aria-label="Social links">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("social_click", { network: s.label, location: "menu" })}
                  >
                    <Icon name={s.name} />
                  </a>
                ))}
              </div>
              <LocaleSwitcher className="navmenu__locale" />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

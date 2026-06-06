"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Link } from "@/i18n/navigation";
import { ImageFill } from "@/components/ui/ImageFill";
import { RichText } from "@/components/ui/RichText";
import { Icon, type IconName } from "@/components/ui/Icon";

interface JourneyEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  note: string;
}

interface GalleryItem {
  img: string;
  alt: string;
  caption: string;
}

const TIKTOK_URL = "https://www.tiktok.com/@justlucassinging";

/**
 * The full /about page. One client component owning a single useGSAP scope so
 * every reveal, the journey rail draw, and the gallery fade-ups share one
 * ScrollTrigger pass (mirrors the per-section pattern used across the site,
 * collapsed since the whole route is one read).
 *
 * Photo slots render the brand's ember-tinted ImageFill placeholder until real
 * files are dropped — same convention as the unbuilt /work cards.
 */
export function AboutPageContent() {
  const t = useTranslations("AboutPage");
  const intro = t.raw("intro") as string[];
  const journey = t.raw("journey") as JourneyEntry[];
  const gallery = t.raw("gallery") as GalleryItem[];
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      const rail = root.current.querySelector<HTMLElement>(".atimeline");

      if (prefersReducedMotion()) {
        rail?.classList.add("play");
        return;
      }

      const revealY =
        parseInt(getComputedStyle(document.documentElement).getPropertyValue("--reveal-y"), 10) ||
        26;

      gsap.utils.toArray<HTMLElement>("[data-reveal]", root.current).forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: revealY,
          duration: 0.9,
          ease: "power3.out",
          delay: Number(el.dataset.revealDelay ?? 0) * 0.08,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Journey rail draws + nodes light in sequence — the Process/About comet
      // motif, here as a vertical timeline.
      if (rail) {
        ScrollTrigger.create({
          trigger: rail,
          start: "top 78%",
          once: true,
          onEnter: () => rail.classList.add("play"),
        });
      }
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* ---------- Intro ---------- */}
      <section className="section aboutp__intro" id="hero">
        <div className="container aboutp__intro-grid">
          <div className="aboutp__intro-copy">
            <Link href="/" className="aboutp__back" data-reveal>
              <Icon name="arrow-left" /> {t("backHome")}
            </Link>
            <span className="eyebrow" data-reveal>
              {t("eyebrow")}
            </span>
            <h1 data-reveal data-reveal-delay="1">
              <RichText text={t("heading")} />
            </h1>
            <p className="lede" data-reveal data-reveal-delay="1">
              {t("lede")}
            </p>
            <div className="aboutp__intro-body" data-reveal data-reveal-delay="2">
              {intro.map((p, i) => (
                <p key={i}>
                  <RichText text={p} />
                </p>
              ))}
            </div>
          </div>
          <div className="aboutp__portrait" data-reveal data-reveal-delay="1">
            <ImageFill
              src="/assets/about/hero.jpg"
              alt="Lucas in front of the old fort in Dubrovnik, Croatia"
              sizes="(max-width: 900px) 100vw, 38vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* ---------- Journey / experience ---------- */}
      <section className="section aboutp__journey">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">{t("journeyEyebrow")}</span>
            <h2>
              <RichText text={t("journeyHeading")} />
            </h2>
            <p className="lede">{t("journeyLede")}</p>
          </div>

          <ol className="atimeline" data-reveal data-reveal-delay="1">
            <span className="atimeline__rail" aria-hidden="true">
              <span className="atimeline__fill" />
              <span className="atimeline__comet" />
            </span>
            {journey.map((j) => (
              <li className="ajob" key={j.company}>
                <span className="ajob__node" aria-hidden="true" />
                <div className="ajob__head">
                  <h3 className="ajob__company">{j.company}</h3>
                  <span className="ajob__period">{j.period}</span>
                </div>
                <span className="ajob__role">{j.role}</span>
                <span className="ajob__loc">{j.location}</span>
                <p className="ajob__note">{j.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Off the clock / facets ---------- */}
      <section className="section aboutp__facets">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">{t("facetsEyebrow")}</span>
            <h2>
              <RichText text={t("facetsHeading")} />
            </h2>
            <p className="lede">{t("facetsLede")}</p>
          </div>

          <div className="bento">
            {/* Chess — the emotional centerpiece: photo background, story overlaid */}
            <article className="bento__tile bento__tile--photo bento__tile--chess" data-reveal>
              <ImageFill src={t("chessImg")} alt={t("chessPhotoAlt")} sizes="(max-width: 860px) 100vw, 50vw" />
              <span className="bento__chip">{t("chessStat")}</span>
              <div className="bento__cap">
                <FacetLabel icon="knight" text={t("chessLabel")} />
                <h3>{t("chessTitle")}</h3>
                <p>{t("chessBody")}</p>
              </div>
            </article>

            {/* Travel — Bariloche */}
            <article className="bento__tile bento__tile--photo bento__tile--travel" data-reveal data-reveal-delay="1">
              <ImageFill src={t("travelImg")} alt={t("travelPhotoAlt")} sizes="(max-width: 860px) 100vw, 50vw" />
              <div className="bento__cap">
                <FacetLabel icon="globe" text={t("travelLabel")} />
                <h3>{t("travelTitle")}</h3>
                <p>{t("travelBody")}</p>
              </div>
            </article>

            {/* Game of Thrones — pure personality */}
            <article className="bento__tile bento__tile--photo bento__tile--got" data-reveal data-reveal-delay="2">
              <ImageFill src={t("gotImg")} alt={t("gotPhotoAlt")} sizes="(max-width: 860px) 100vw, 34vw" />
              <div className="bento__cap">
                <FacetLabel icon="spark" text={t("gotLabel")} />
                <h3>{t("gotTitle")}</h3>
                <p>{t("gotBody")}</p>
              </div>
            </article>

            {/* Singing — photo background + TikTok */}
            <article className="bento__tile bento__tile--photo bento__tile--singing" data-reveal data-reveal-delay="1">
              <ImageFill src={t("singingImg")} alt={t("singingPhotoAlt")} sizes="(max-width: 860px) 100vw, 34vw" />
              <div className="bento__cap">
                <FacetLabel icon="mic" text={t("singingLabel")} />
                <h3>{t("singingTitle")}</h3>
                <p>{t("singingBody")}</p>
                <a className="facet__link facet__link--onphoto" href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">
                  {t("singingCta")} <Icon name="arrow-ur" />
                </a>
              </div>
            </article>

            {/* Tennis — off the board */}
            <article className="bento__tile bento__tile--photo bento__tile--tennis" data-reveal data-reveal-delay="2">
              <ImageFill src={t("tennisImg")} alt={t("tennisPhotoAlt")} sizes="(max-width: 860px) 100vw, 34vw" />
              <div className="bento__cap">
                <FacetLabel icon="ball" text={t("tennisLabel")} />
                <h3>{t("tennisTitle")}</h3>
                <p>{t("tennisBody")}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ---------- Gallery ---------- */}
      <section className="section aboutp__gallery">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">{t("galleryEyebrow")}</span>
            <h2>
              <RichText text={t("galleryHeading")} />
            </h2>
          </div>
          <div className="aframes">
            {gallery.map((g, i) => (
              <figure className="aframe" key={i} data-reveal data-reveal-delay={i}>
                <div className="aframe__media">
                  <ImageFill
                    src={g.img}
                    alt={g.alt}
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                </div>
                <figcaption className="aframe__cap">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

function FacetLabel({ icon, text }: { icon: IconName; text: string }) {
  return (
    <span className="facet__label">
      <Icon name={icon} />
      {text}
    </span>
  );
}

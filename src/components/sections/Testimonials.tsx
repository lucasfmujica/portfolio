"use client";

import { useEffect, useRef, useState, type TouchEvent as ReactTouchEvent } from "react";
import { useTranslations } from "next-intl";
import { prefersReducedMotion } from "@/lib/gsap";
import { RichText } from "@/components/ui/RichText";
import { RevealScope } from "@/components/motion/RevealScope";
import { testimonials } from "@/data/testimonials";

const ADVANCE_MS = 6000;
const FADE_MS = 280;

/**
 * Testimonials — featured quote + client selector. Auto-advances every 6s with
 * an ember progress bar, crossfades on switch, pauses on hover, and lets you
 * click a name to jump. Reduced-motion disables auto-advance + progress
 * (clicking still switches, instantly).
 */
export function Testimonials() {
  const t = useTranslations("Testimonials");
  const [current, setCurrent] = useState(0);
  const [out, setOut] = useState(false);
  const currentRef = useRef(0);
  const advanceTimer = useRef<number>(0);
  const swapTimer = useRef<number>(0);
  const progRef = useRef<HTMLDivElement>(null);
  const reduce = useRef(false);
  const touchX = useRef<number | null>(null);

  const restart = () => {
    if (reduce.current) return;
    const prog = progRef.current;
    if (prog) {
      prog.classList.remove("run");
      void prog.offsetWidth; // reflow to replay the CSS animation
      prog.classList.add("run");
    }
    window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(
      () => show((currentRef.current + 1) % testimonials.length),
      ADVANCE_MS,
    );
  };

  const show = (i: number) => {
    if (i === currentRef.current) {
      restart();
      return;
    }
    if (reduce.current) {
      currentRef.current = i;
      setCurrent(i);
      return;
    }
    setOut(true);
    window.clearTimeout(swapTimer.current);
    swapTimer.current = window.setTimeout(() => {
      currentRef.current = i;
      setCurrent(i);
      setOut(false);
    }, FADE_MS);
    restart();
  };

  useEffect(() => {
    reduce.current = prefersReducedMotion();
    restart();
    return () => {
      window.clearTimeout(advanceTimer.current);
      window.clearTimeout(swapTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pause = () => {
    window.clearTimeout(advanceTimer.current);
    progRef.current?.classList.remove("run");
  };

  const step = (dir: number) => {
    const n = testimonials.length;
    show((currentRef.current + dir + n) % n);
  };

  const onTouchStart = (e: ReactTouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: ReactTouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  };

  const active = testimonials[current];

  return (
    <RevealScope as="section" className="section" id="testimonials">
      <div
        className="bloom"
        style={{ top: "6%", right: "-7%", width: "40vw", height: "40vw", maxWidth: 520, maxHeight: 520 }}
      />
      <div className="container">
        <div className="section-head center" style={{ marginBottom: 56 }} data-reveal>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2>{t("heading")}</h2>
          <p className="lede">{t("lede")}</p>
        </div>

        <div
          className="tst"
          data-reveal
          onMouseEnter={pause}
          onMouseLeave={restart}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className={`tst__feature${out ? " is-out" : ""}`}>
            <div className="tst__mark">&ldquo;</div>
            <div className="tst__body">
              <p className="tst__q">
                &ldquo;
                <RichText text={active.quote} />
                &rdquo;
              </p>
              <div className="tst__by">
                <span className="tst__av" />
                <div>
                  <div className="tst__name">{active.name}</div>
                  <div className="tst__role">
                    {active.role} · {active.company}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tst__aside">
            <div className="tst__list">
              {testimonials.map((item, i) => (
                <button
                  type="button"
                  key={item.name}
                  className={`tst__item${i === current ? " is-active" : ""}`}
                  aria-pressed={i === current}
                  onClick={() => show(i)}
                >
                  <span className="tst__dot" />
                  <span className="tst__meta">
                    <span className="tst__nm">{item.name}</span>
                    <span className="tst__co">
                      {item.role} · {item.company}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div className="tst__prog" ref={progRef}>
              <i />
            </div>
          </div>

          <div className="tst__dots" role="tablist" aria-label={t("eyebrow")}>
            {testimonials.map((item, i) => (
              <button
                type="button"
                key={item.name}
                className={`tst__dot-btn${i === current ? " is-active" : ""}`}
                role="tab"
                aria-selected={i === current}
                aria-label={`${item.name} — ${item.company}`}
                onClick={() => show(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </RevealScope>
  );
}

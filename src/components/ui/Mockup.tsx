import { ImageFill } from "./ImageFill";

interface MockupProps {
  src?: string;
  alt?: string;
  /** Browser-bar URL label. Omit to show the chrome dots only. */
  label?: string;
  /** Optional corner badge over the screen (e.g. the project index). */
  badge?: string;
  /** Placeholder caption when there's no `src`. */
  placeholder?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Wraps an ImageFill in browser-window chrome (traffic-light dots + a URL bar)
 * so a flat screenshot reads as a live site.
 *
 * It's pure markup + CSS — the screenshot is still a responsive, lazy-loaded
 * next/image, so there's no performance cost over a bare screenshot. Shared by
 * the home and /work cards (and reusable for case-study shots).
 */
export function Mockup({
  src,
  alt,
  label,
  badge,
  placeholder,
  sizes,
  priority,
  className,
}: MockupProps) {
  return (
    <div className={["mockup", className].filter(Boolean).join(" ")}>
      <div className="mockup__bar" aria-hidden="true">
        <span className="mockup__dots">
          <i />
          <i />
          <i />
        </span>
        {label ? (
          <span className="mockup__url">
            <span className="mockup__lock" />
            {label}
          </span>
        ) : null}
      </div>
      <div className="mockup__screen">
        {badge ? <span className="mockup__num">{badge}</span> : null}
        <ImageFill src={src} alt={alt} placeholder={placeholder} sizes={sizes} priority={priority} />
      </div>
    </div>
  );
}

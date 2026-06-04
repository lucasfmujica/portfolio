import Image from "next/image";
import { Icon } from "./Icon";

interface ImageFillProps {
  /** Real image. When absent, a styled placeholder renders instead. */
  src?: string;
  alt?: string;
  /** Placeholder caption shown when there's no `src`. */
  placeholder?: string;
  /** Hint next/image for above-the-fold media. */
  priority?: boolean;
  /** `sizes` for responsive loading. */
  sizes?: string;
  className?: string;
}

/**
 * Absolutely-fills its (positioned, overflow-hidden) parent.
 *
 * With a `src`, renders an optimized, lazy-loaded next/image. Without one,
 * renders the design's ember-tinted gradient placeholder block — swap a real
 * file into the data layer later and it upgrades automatically.
 */
export function ImageFill({
  src,
  alt = "",
  placeholder = "Drop an image",
  priority = false,
  sizes = "(max-width: 860px) 100vw, 50vw",
  className,
}: ImageFillProps) {
  if (!src) {
    return (
      <div className={["imgslot", className].filter(Boolean).join(" ")} aria-hidden="true">
        <span className="imgslot__inner">
          <Icon name="spark" className="imgslot__icon" />
          <span className="imgslot__cap">{placeholder}</span>
        </span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ objectFit: "cover" }}
    />
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { ImageFill } from "./ImageFill";

interface VideoFillProps {
  /** Looping, muted screen-capture clip. */
  src: string;
  /** Still frame. Rendered on the server and kept for reduced-motion users. */
  poster?: string;
  alt?: string;
  placeholder?: string;
  sizes?: string;
  className?: string;
}

/**
 * A muted, looping clip that degrades to its poster still.
 *
 * The server always renders the poster `ImageFill`, and the clip only replaces
 * it on the client once we know the visitor hasn't asked for reduced motion.
 * Two things fall out of that order: there's no hydration mismatch to guard,
 * and a reduced-motion visitor never downloads the video at all — the poster is
 * the whole payload. Same reason the case studies hide text only once their JS
 * is alive: the still is the honest default, motion is the upgrade.
 */
export function VideoFill({
  src,
  poster,
  alt = "",
  placeholder,
  sizes,
  className,
}: VideoFillProps) {
  const [motionOk, setMotionOk] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMotionOk(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Safari ignores the React `muted` prop often enough that autoplay silently
  // fails without setting the property directly.
  useEffect(() => {
    if (video.current) video.current.muted = true;
  }, [motionOk]);

  if (!motionOk) {
    return (
      <ImageFill src={poster} alt={alt} placeholder={placeholder} sizes={sizes} className={className} />
    );
  }

  return (
    <video
      ref={video}
      className={["videofill", className].filter(Boolean).join(" ")}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      role="img"
      aria-label={alt}
    />
  );
}

"use client";

import dynamic from "next/dynamic";

/**
 * Defers the non-critical, pointer-driven flourishes out of the initial bundle.
 * None of these matter for first paint: the custom Cursor and Magnetic hover
 * effect only kick in once the pointer moves, and the ThemePicker's saved accent
 * is already applied before paint by the inline script in the layout <head>.
 * Loading them with `ssr: false` keeps their code (and execution) off the
 * critical hydration path so the page is interactive sooner.
 */
const Cursor = dynamic(() => import("./Cursor").then((m) => m.Cursor), { ssr: false });
const Magnetic = dynamic(() => import("./Magnetic").then((m) => m.Magnetic), { ssr: false });
const ThemePicker = dynamic(() => import("./ThemePicker").then((m) => m.ThemePicker), {
  ssr: false,
});

export function ClientFX() {
  return (
    <>
      <Cursor />
      <Magnetic />
      <ThemePicker />
    </>
  );
}

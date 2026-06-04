import { Fragment, type ReactNode } from "react";

/**
 * Renders copy that marks a single ember-highlighted phrase with `*asterisks*`,
 * e.g. "it *finally converts* — and the team can run it."
 *
 * `*…*` → <span class="ember-word">…</span>. Everything else is plain text.
 * Keeps the strict "one ember phrase per block" discipline readable in data.
 */
export function RichText({ text }: { text: string }): ReactNode {
  const parts = text.split(/\*([^*]+)\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="ember-word">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

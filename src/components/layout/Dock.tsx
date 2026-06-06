import { useTranslations } from "next-intl";
import { Icon, type IconName } from "@/components/ui/Icon";

const ITEMS: { href: string; icon: IconName; key: "work" | "about" | "stack" }[] = [
  { href: "/work", icon: "work", key: "work" },
  { href: "/about", icon: "person", key: "about" },
  { href: "/#stack", icon: "stacks", key: "stack" },
];

/**
 * Persistent floating bottom nav pill. Slides up once past the hero (class
 * toggled by <ScrollChrome>), and <ScrollChrome> also marks the active item
 * via scrollspy on the home route. Present on every route.
 */
export function Dock() {
  const t = useTranslations("Dock");
  const nav = useTranslations("Nav");
  return (
    <nav className="dock" id="dock" aria-label={t("aria")}>
      {ITEMS.map((item) => (
        <a key={item.key} href={item.href} className="dock__item" data-spy={item.href}>
          <Icon name={item.icon} />
          <span className="dock__lbl">{t(item.key)}</span>
        </a>
      ))}
      <span className="dock__div" />
      <a href="#contact" className="btn btn--primary dock__cta">
        {nav("talk")}
      </a>
    </nav>
  );
}

import { useTranslations, useLocale } from "next-intl";
import { RevealScope } from "@/components/motion/RevealScope";
import { RichText } from "@/components/ui/RichText";
import { Icon } from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";
import { getPosts } from "@/data/posts";
import type { Locale } from "@/i18n/routing";
import { formatPostDate } from "@/lib/postDate";

/** The /blog index: every post, newest first. */
export function BlogIndex() {
  const t = useTranslations("Blog");
  const locale = useLocale() as Locale;
  const all = getPosts(locale);

  return (
    <RevealScope as="section" className="section blog">
      <div className="container">
        <div className="section-head blog__head">
          <span className="eyebrow" data-reveal>
            {t("eyebrow")}
          </span>
          <h1 data-reveal data-reveal-delay="1">
            <RichText text={t("heading")} />
          </h1>
          <p className="lede" data-reveal data-reveal-delay="2">
            {t("lede")}
          </p>
        </div>

        <ul className="blog__list">
          {all.map((p) => (
            <li key={p.slug} data-reveal>
              <Link href={`/blog/${p.slug}`} className="blog__item">
                <div className="blog__meta">
                  <time dateTime={p.date}>{formatPostDate(p.date, locale)}</time>
                  {p.tags.map((tag) => (
                    <span className="blog__tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h2>{p.title}</h2>
                <p>{p.description}</p>
                <span className="blog__more">
                  {t("readPost")} <Icon name="arrow-right" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </RevealScope>
  );
}

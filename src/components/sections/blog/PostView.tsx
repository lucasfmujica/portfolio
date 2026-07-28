import { useTranslations, useLocale } from "next-intl";
import { RevealScope } from "@/components/motion/RevealScope";
import { Icon } from "@/components/ui/Icon";
import { Link } from "@/i18n/navigation";
import type { Post } from "@/data/posts";
import { getProject } from "@/data/projects";
import type { Locale } from "@/i18n/routing";
import { formatPostDate } from "@/lib/postDate";

/** A single blog post. */
export function PostView({ post }: { post: Post }) {
  const t = useTranslations("Blog");
  const locale = useLocale() as Locale;
  const related = post.relatedSlug
    ? getProject(post.relatedSlug, locale)
    : undefined;

  return (
    <RevealScope as="article" className="section post">
      {/* Inner wrapper carries the reading measure rather than .container,
          which is the site's wide grid. Same split the /privacy page uses
          (.legal__inner): overriding .container here loses the cascade and
          leaves paragraphs running past 170 characters a line. */}
      <div className="container">
        <div className="post__inner">
          <Link href="/blog" className="post__back">
            <Icon name="arrow-left" /> {t("backToBlog")}
          </Link>

          <header className="post__head">
            <div className="blog__meta" data-reveal>
              <time dateTime={post.date}>
                {formatPostDate(post.date, locale)}
              </time>
              {post.tags.map((tag) => (
                <span className="blog__tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <h1 data-reveal data-reveal-delay="1">
              {post.title}
            </h1>
            <p className="post__lead" data-reveal data-reveal-delay="2">
              {post.lead}
            </p>
          </header>

          <div className="post__body">
            {post.sections.map((s, i) => (
              <section key={s.heading ?? `s${i}`} data-reveal>
                {s.heading && <h2>{s.heading}</h2>}
                {s.paras.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((item) => (
                      <li key={item.slice(0, 40)}>
                        <Icon name="check" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {related && (
            <aside className="post__related" data-reveal>
              <span className="blog__tag">{t("relatedLabel")}</span>
              <h2>{related.name}</h2>
              <Link href={`/work/${related.slug}`} className="btn btn--ghost">
                {t("readCaseStudy")} <Icon name="arrow-right" />
              </Link>
            </aside>
          )}
        </div>
      </div>
    </RevealScope>
  );
}

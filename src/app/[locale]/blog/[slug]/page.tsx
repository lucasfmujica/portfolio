import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/i18n/routing";
import { siteName, siteUrl } from "@/lib/site";
import { posts, getPost } from "@/data/posts";
import { PostView } from "@/components/sections/blog/PostView";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/seo/JsonLd";
import { postJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale as Locale);
  if (!post) return {};

  const path = `/blog/${slug}`;
  return {
    title: `${post.title} · ${siteName}`,
    description: post.description,
    alternates: {
      canonical: path,
      languages: { en: path, es: `/es${path}` },
    },
    openGraph: {
      type: "article",
      siteName,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `${siteUrl}${locale === "en" ? "" : `/${locale}`}${path}`,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const post = getPost(slug, locale as Locale);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={postJsonLd(post, locale as Locale)} />
      <PostView post={post} />
      <Contact />
    </>
  );
}

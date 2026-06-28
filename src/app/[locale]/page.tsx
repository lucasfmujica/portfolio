import { setRequestLocale } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";
import { homeJsonLd } from "@/lib/jsonld";

import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { About } from "@/components/sections/About";
import { Stack } from "@/components/sections/Stack";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd data={homeJsonLd(locale as Locale)} />
      <Hero />
      <SelectedWork />
      <About />
      <Stack />
      <Process />
      <Testimonials />
      <Contact />
    </>
  );
}

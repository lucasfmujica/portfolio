import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { routing, type Locale } from "@/i18n/routing";
import { caseStudies, getProject } from "@/data/projects";

export const alt = "Case study · Lucas Mujica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudies.map((p) => ({ locale, slug: p.slug })),
  );
}

const INK = "#0b0b0d";
const EMBER = "#ff4d2e";
const LIGHT = "#cfcfca";
const MUTED = "#9a9a94";
const HAIR = "#26262b";

const asset = (...p: string[]) => readFile(join(process.cwd(), ...p));

function titleSize(name: string) {
  const l = name.length;
  return l <= 9 ? 78 : l <= 16 ? 60 : 50;
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(slug, locale as Locale);

  const [clashBold, clashSemi, mono, shotBuf] = await Promise.all([
    asset("public/fonts", "ClashDisplay-Bold.ttf"),
    asset("public/fonts", "ClashDisplay-Semibold.ttf"),
    asset("public/fonts", "GeistMono-Regular.ttf"),
    asset("public/og", `${slug}.png`).catch(() => null),
  ]);

  const cs = project?.caseStudy;
  const name = project?.name ?? "Case study";
  const category = project?.category ?? "Case study";
  const year = project?.year ?? "";
  const label =
    cs?.liveLabel ?? cs?.liveUrl?.replace(/^https?:\/\//, "") ?? "lucasmujica.dev";
  const blurb = project
    ? `${project.blurb.pre}${project.blurb.ember}${project.blurb.post}`
    : "";
  const tags = (project?.tags ?? []).slice(0, 4);
  const shot = shotBuf
    ? `data:image/png;base64,${Buffer.from(shotBuf).toString("base64")}`
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK,
          fontFamily: "Geist Mono",
          backgroundImage:
            "radial-gradient(820px 520px at 104% -10%, rgba(255,77,46,0.20), rgba(255,77,46,0) 56%), radial-gradient(640px 460px at -8% 116%, rgba(255,77,46,0.06), rgba(255,77,46,0) 60%)",
        }}
      >
        {/* top hairline */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 420,
            height: 5,
            background: "linear-gradient(90deg, #ff4d2e, rgba(255,77,46,0))",
          }}
        />

        {/* left column */}
        <div
          style={{
            width: 560,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "54px 0 50px 60px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 50,
                height: 50,
                borderRadius: 13,
                background: "#141416",
                border: `1px solid ${HAIR}`,
                color: "#fff",
                fontFamily: "Clash Display",
                fontWeight: 700,
                fontSize: 23,
              }}
            >
              LM<span style={{ color: EMBER }}>.</span>
            </div>
            <div style={{ display: "flex", color: MUTED, fontSize: 18, letterSpacing: 3 }}>
              LUCAS MUJICA
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ display: "flex", width: 9, height: 9, borderRadius: 999, background: EMBER }} />
              <div
                style={{
                  display: "flex",
                  color: EMBER,
                  fontSize: 15,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                }}
              >
                {category} · Case Study
              </div>
            </div>
            <div
              style={{
                display: "flex",
                color: "#fff",
                fontFamily: "Clash Display",
                fontWeight: 700,
                fontSize: titleSize(name),
                letterSpacing: -2,
                lineHeight: 1.02,
              }}
            >
              {name}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                color: LIGHT,
                fontFamily: "Clash Display",
                fontWeight: 600,
                fontSize: 22,
                lineHeight: 1.32,
                maxWidth: 480,
              }}
            >
              {blurb}
            </div>
            <div style={{ display: "flex", gap: 9, marginTop: 24 }}>
              {tags.map((t, i) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    fontSize: 15,
                    letterSpacing: 1,
                    color: i === 0 ? "#ffb9ab" : "#cfcfca",
                    padding: "7px 14px",
                    borderRadius: 999,
                    border: `1px solid ${i === 0 ? "rgba(255,77,46,0.5)" : HAIR}`,
                    background: "rgba(20,20,22,0.6)",
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", color: MUTED, fontSize: 17, letterSpacing: 1.5 }}>
            <div style={{ display: "flex", width: 8, height: 8, borderRadius: 999, background: EMBER, marginRight: 10 }} />
            {label}
            {year ? `  ·  ${year}` : ""}
          </div>
        </div>

        {/* right: framed screenshot */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-start", position: "relative" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 700,
              borderRadius: 16,
              overflow: "hidden",
              border: `1px solid #2c2c33`,
              background: "#141416",
              boxShadow: "0 40px 90px -28px rgba(0,0,0,0.8)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: 36,
                background: "#161618",
                borderBottom: "1px solid #232329",
                padding: "0 14px",
                gap: 7,
              }}
            >
              <div style={{ display: "flex", width: 10, height: 10, borderRadius: 999, background: "#2f2f36" }} />
              <div style={{ display: "flex", width: 10, height: 10, borderRadius: 999, background: "#2f2f36" }} />
              <div style={{ display: "flex", width: 10, height: 10, borderRadius: 999, background: "#2f2f36" }} />
              <div style={{ display: "flex", alignItems: "center", marginLeft: 12, color: MUTED, fontSize: 13, gap: 7 }}>
                <div style={{ display: "flex", width: 7, height: 7, borderRadius: 999, background: EMBER }} />
                {label}
              </div>
            </div>
            {shot ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={shot} width={700} alt="" style={{ display: "flex", width: 700 }} />
            ) : (
              <div style={{ display: "flex", width: 700, height: 420, background: "#141416" }} />
            )}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Clash Display", data: clashBold, style: "normal", weight: 700 },
        { name: "Clash Display", data: clashSemi, style: "normal", weight: 600 },
        { name: "Geist Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}

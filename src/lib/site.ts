/** Site-wide constants. `NEXT_PUBLIC_SITE_URL` overrides for previews/staging. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lucasmujica.dev"
).replace(/\/$/, "");

export const siteName = "Lucas Mujica";
export const twitterHandle = "@lucasmujica";

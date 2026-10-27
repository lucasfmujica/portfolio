# Analytics access

How to read the site's numbers. Snapshots live in `docs/analytics/YYYY-MM.md`;
take one on the 1st of every month, because **Vercel Hobby deletes anything
older than 30 days** (August and September 2026 were lost that way). A
scheduled reminder fires on the 1st.

## What lives where

| Source | Access | Notes |
|---|---|---|
| Search Console | `google.py` | property `sc-domain:lucasmujica.dev` |
| GA4 | `google.py ga4` | property `543977687`. Sees a fraction of traffic (tracker blockers, 0% consent): use it for behaviour, never volume |
| PageSpeed Insights | `google.py psi` | own API key, so the shared keyless quota doesn't apply. No CrUX field data at this traffic level |
| Vercel Web Analytics + Speed Insights | dashboard only | the API answers 404 on Hobby. Read it in the browser while logged in: `vercel.com/lucas-projects-008be302/lucasmujicaportfolio/analytics?period=30d` |

## Credentials (outside the repo, never commit or paste them)

- `~/.config/gsc/lucasmujica.json`: service account
  `gsc-reader@lucasmujica-seo.iam.gserviceaccount.com`, Google Cloud project
  `lucasmujica-seo`. It has full-user access in Search Console and Viewer in GA4.
- `~/.config/gsc/pagespeed.key`: API key restricted to the PageSpeed Insights API.

Both files are `0600`. If they are ever lost: in Google Cloud → `lucasmujica-seo`
→ Credentials, create a new JSON key for the service account (Search Console and
GA4 access stay attached to the account, not the key) and a new restricted API
key, then save them to the same paths. `pbpaste > <path> && chmod 600 <path>`
keeps the key out of shell history.

Enabled APIs in that project: Search Console API, Google Analytics Data API,
PageSpeed Insights API.

## Usage

    python3 scripts/analytics/google.py sites
    python3 scripts/analytics/google.py search --by query --days 90
    python3 scripts/analytics/google.py inspect                 # every URL in the sitemap
    python3 scripts/analytics/google.py inspect /blog/some-post
    python3 scripts/analytics/google.py submit-sitemap          # after a deploy
    python3 scripts/analytics/google.py ga4 --since 2026-10-01
    python3 scripts/analytics/google.py psi / /work/fully-dialed

Standard library only; the token is signed with `openssl`. The script points
Python at `/etc/ssl/cert.pem` because python.org builds ship without root
certificates. Don't "fix" an SSL error by disabling verification.

## Things the APIs cannot do

- **Request indexing.** Search Console UI only: paste the URL into "Inspect any
  URL" and click "Request indexing". Do it for every new or changed page.
- **Vercel Web Analytics on Hobby.** Dashboard only, see above.
- **Manual actions / security issues.** Search Console UI only.

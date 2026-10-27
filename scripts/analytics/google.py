#!/usr/bin/env python3
"""Search Console, GA4 and PageSpeed for lucasmujica.dev, standard library only.

Auth is a Google service account whose key lives OUTSIDE the repo; this file
holds no secrets. The JWT is signed with `openssl`, so nothing needs installing.

    python3 scripts/analytics/google.py sites
    python3 scripts/analytics/google.py search [--days 90] [--by page|query|date]
    python3 scripts/analytics/google.py inspect [URL ...]      # default: every URL in the sitemap
    python3 scripts/analytics/google.py submit-sitemap         # after a deploy
    python3 scripts/analytics/google.py ga4 [--since 2026-07-01]
    python3 scripts/analytics/google.py psi [URL ...]          # mobile + desktop

Not possible through any API: "Request indexing" (Search Console UI only) and
Vercel Web Analytics on the Hobby plan (dashboard only). See README.md.
"""
import argparse, base64, datetime as dt, json, os, re, ssl, subprocess, sys, tempfile, time
import urllib.error, urllib.parse, urllib.request

KEY = os.path.expanduser("~/.config/gsc/lucasmujica.json")
PSI_KEY = os.path.expanduser("~/.config/gsc/pagespeed.key")
SITE = "https://lucasmujica.dev"
GSC_PROPERTY = "sc-domain:lucasmujica.dev"
GA4_PROPERTY = "543977687"

# python.org builds ship without root certificates; macOS keeps its bundle here.
# Never disable verification instead.
CTX = ssl.create_default_context(cafile="/etc/ssl/cert.pem")


def _b64(b):
    return base64.urlsafe_b64encode(b).rstrip(b"=")


def token(scope):
    """Service-account access token. The private key only ever sits in a 0600
    temp file for the openssl call, and is never printed."""
    sa = json.load(open(KEY))
    now = int(time.time())
    msg = _b64(json.dumps({"alg": "RS256", "typ": "JWT"}).encode()) + b"." + _b64(json.dumps({
        "iss": sa["client_email"], "scope": scope, "aud": "https://oauth2.googleapis.com/token",
        "iat": now, "exp": now + 3600}).encode())
    fd, path = tempfile.mkstemp()
    os.chmod(path, 0o600)
    try:
        os.write(fd, sa["private_key"].encode())
        os.close(fd)
        sig = subprocess.run(["openssl", "dgst", "-sha256", "-sign", path], input=msg,
                             capture_output=True, check=True).stdout
    finally:
        os.remove(path)
    body = urllib.parse.urlencode({"grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
                                   "assertion": (msg + b"." + _b64(sig)).decode()}).encode()
    return json.load(urllib.request.urlopen("https://oauth2.googleapis.com/token", body, context=CTX))["access_token"]


def call(tok, url, payload=None, method=None):
    req = urllib.request.Request(url, method=method,
                                 data=json.dumps(payload).encode() if payload is not None else None,
                                 headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, context=CTX) as r:
            raw = r.read()
            return json.loads(raw) if raw else {"status": r.status}
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code} from {url}\n{e.read().decode()[:400]}")


GSC = "https://www.googleapis.com/webmasters/v3/sites/" + urllib.parse.quote(GSC_PROPERTY, safe="")
READ = "https://www.googleapis.com/auth/webmasters.readonly"


def cmd_sites(_):
    for s in call(token(READ), "https://www.googleapis.com/webmasters/v3/sites").get("siteEntry", []):
        print(f"{s['siteUrl']}  ({s['permissionLevel']})")


def cmd_search(a):
    end = dt.date.today() - dt.timedelta(days=2)  # Search Console lags ~2 days
    start = end - dt.timedelta(days=a.days)
    tok = token(READ)
    tot = call(tok, GSC + "/searchAnalytics/query",
               {"startDate": str(start), "endDate": str(end), "rowLimit": 1}).get("rows", [{}])[0]
    print(f"{start} → {end}: {tot.get('clicks', 0):.0f} clicks · {tot.get('impressions', 0):.0f} impressions"
          f" · avg position {tot.get('position', 0):.1f}\n")
    rows = call(tok, GSC + "/searchAnalytics/query", {"startDate": str(start), "endDate": str(end),
                "dimensions": [a.by], "rowLimit": a.limit}).get("rows", [])
    for r in sorted(rows, key=lambda r: -r["impressions"]):
        key = r["keys"][0].replace(SITE, "") or "/"
        print(f"{r['clicks']:>5.0f} clk {r['impressions']:>6.0f} impr  ctr {r['ctr']*100:5.1f}%  pos {r['position']:5.1f}  {key}")


def sitemap_urls():
    with urllib.request.urlopen(SITE + "/sitemap.xml", context=CTX) as r:
        return re.findall(r"<loc>([^<]+)</loc>", r.read().decode())


def cmd_inspect(a):
    tok = token(READ)
    for url in a.urls or sitemap_urls():
        if not url.startswith("http"):
            url = SITE + url
        r = call(tok, "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
                 {"inspectionUrl": url, "siteUrl": GSC_PROPERTY, "languageCode": "es"})
        i = r["inspectionResult"]["indexStatusResult"]
        print(f"{i.get('verdict', '?'):8} {i.get('coverageState', '')[:44]:44} "
              f"crawl {i.get('lastCrawlTime', '—')[:10]:10}  {url.replace(SITE, '') or '/'}")


def cmd_submit_sitemap(_):
    sm = urllib.parse.quote(SITE + "/sitemap.xml", safe="")
    call(token("https://www.googleapis.com/auth/webmasters"), f"{GSC}/sitemaps/{sm}", method="PUT")
    s = call(token(READ), f"{GSC}/sitemaps/{sm}")
    print(f"submitted {s.get('lastSubmitted')} · pending {s.get('isPending')}")


def cmd_ga4(a):
    tok = token("https://www.googleapis.com/auth/analytics.readonly")
    url = f"https://analyticsdata.googleapis.com/v1beta/properties/{GA4_PROPERTY}:runReport"
    rng = [{"startDate": a.since, "endDate": "yesterday"}]

    def report(dims, metrics, order=None, limit=25):
        body = {"dateRanges": rng, "dimensions": [{"name": d} for d in dims],
                "metrics": [{"name": m} for m in metrics], "limit": limit}
        if order:
            body["orderBys"] = [order]
        return call(tok, url, body).get("rows", [])

    print(f"GA4 since {a.since} (sees only a fraction of real traffic: blockers, 0% consent)\n")
    print("month     users sessions views events")
    for r in report(["yearMonth"], ["activeUsers", "sessions", "screenPageViews", "eventCount"],
                    {"dimension": {"dimensionName": "yearMonth"}}):
        m = [x["value"] for x in r["metricValues"]]
        print(f"{r['dimensionValues'][0]['value']}  {m[0]:>5} {m[1]:>8} {m[2]:>5} {m[3]:>6}")
    for title, dim, metric in (("sources", "sessionSource", "sessions"), ("events", "eventName", "eventCount")):
        print(f"\n{title}:")
        for r in report([dim], [metric], {"metric": {"metricName": metric}, "desc": True}):
            print(f"  {r['metricValues'][0]['value']:>4}  {r['dimensionValues'][0]['value']}")


def cmd_psi(a):
    key = open(PSI_KEY).read().strip()
    for url in a.urls or [SITE + "/"]:
        if not url.startswith("http"):
            url = SITE + url
        for strategy in ("mobile", "desktop"):
            q = urllib.parse.urlencode([("url", url), ("strategy", strategy), ("key", key)] +
                                       [("category", c) for c in ("PERFORMANCE", "ACCESSIBILITY", "BEST_PRACTICES", "SEO")])
            try:
                d = json.load(urllib.request.urlopen(
                    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?" + q, context=CTX, timeout=150))
            except urllib.error.HTTPError as e:
                print(f"{strategy:7} {url}: HTTP {e.code}")
                continue
            c, au = d["lighthouseResult"]["categories"], d["lighthouseResult"]["audits"]
            s = " / ".join(str(round(c[k]["score"] * 100)) for k in ("performance", "accessibility", "best-practices", "seo"))
            field = "yes" if d.get("loadingExperience", {}).get("metrics") else "no"
            print(f"{strategy:7} {s}  LCP {au['largest-contentful-paint']['displayValue']}"
                  f"  field data: {field}  {url.replace(SITE, '') or '/'}")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("sites").set_defaults(fn=cmd_sites)
    s = sub.add_parser("search")
    s.add_argument("--days", type=int, default=90)
    s.add_argument("--by", choices=["page", "query", "date", "country", "device"], default="page")
    s.add_argument("--limit", type=int, default=25)
    s.set_defaults(fn=cmd_search)
    s = sub.add_parser("inspect")
    s.add_argument("urls", nargs="*")
    s.set_defaults(fn=cmd_inspect)
    sub.add_parser("submit-sitemap").set_defaults(fn=cmd_submit_sitemap)
    s = sub.add_parser("ga4")
    s.add_argument("--since", default="2026-07-01")
    s.set_defaults(fn=cmd_ga4)
    s = sub.add_parser("psi")
    s.add_argument("urls", nargs="*")
    s.set_defaults(fn=cmd_psi)
    a = p.parse_args()
    a.fn(a)


if __name__ == "__main__":
    main()

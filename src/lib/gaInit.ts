/**
 * The inline GA4 bootstrap, rendered into <head> so it runs *before* React
 * hydration.
 *
 * This used to live in the GoogleAnalytics client component under
 * `strategy="afterInteractive"`, which created a silent race: mount effects
 * (notably ReadTracker's `case_study_view`) ran before `window.gtag`
 * existed, and `trackEvent` drops events when it's missing. Verified in
 * production 2026-07-27 — a hard load of /work/<slug> never recorded
 * `case_study_view`, while a client-side navigation to the same page did. That
 * silently undercounted exactly the direct-landing traffic (search, shared
 * links).
 *
 * Everything here is synchronous and network-free — it only defines the
 * dataLayer/gtag shim, the consent defaults and the config call, so `gtag` and
 * the `config` for the measurement ID are both queued ahead of any event. The
 * remote gtag.js stays `afterInteractive` and replays the queue when it lands.
 *
 * Consent storage defaults to "denied"; a prior opt-in stored on the device is
 * replayed as an update before config.
 *
 * Internal traffic is marked per device, not by IP: the home connection's IP
 * is dynamic, so the GA4 IP rule went stale. Opening any page with
 * `?internal=1` stores a flag (`?internal=0` clears it) and every hit from that
 * browser then carries `traffic_type: internal`, which the GA4 "Internal
 * Traffic" data filter excludes.
 */
export function gaInitScript(gaId: string): string {
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});try{if(localStorage.getItem('consent')==='granted'){gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}var cfg={};try{var q=new URLSearchParams(location.search).get('internal');if(q==='1')localStorage.setItem('ga_internal','1');if(q==='0')localStorage.removeItem('ga_internal');if(localStorage.getItem('ga_internal')==='1')cfg.traffic_type='internal';}catch(e){}gtag('config','${gaId}',cfg);`;
}

/**
 * The inline GA4 bootstrap, rendered into <head> so it runs *before* React
 * hydration.
 *
 * This used to live in the GoogleAnalytics client component under
 * `strategy="afterInteractive"`, which created a silent race: mount effects
 * (notably CaseStudyReadTracker's `case_study_view`) ran before `window.gtag`
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
 */
export function gaInitScript(gaId: string): string {
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});try{if(localStorage.getItem('consent')==='granted'){gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}gtag('config','${gaId}');`;
}

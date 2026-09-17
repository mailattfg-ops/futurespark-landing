"use client";

import Script from "next/script";

/**
 * Microsoft Clarity — session recordings and heatmaps.
 *
 * Clarity tracks route changes on its own (it hooks the History API), so
 * unlike the Meta pixel this needs no per-navigation call.
 *
 * The project id is public — it ships in the page source of every site that
 * uses Clarity — so it lives here like the Meta pixel id, with the env var
 * left as an override. Development renders nothing, keeping localhost
 * sessions out of the recordings.
 */
const CLARITY_ID =
  process.env.NEXT_PUBLIC_CLARITY_ID ||
  (process.env.NODE_ENV === "production" ? "yjkchlk4vj" : "");

export default function Clarity() {
  if (!CLARITY_ID) return null;

  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");
      `}
    </Script>
  );
}

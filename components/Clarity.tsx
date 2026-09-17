"use client";

import Script from "next/script";

/**
 * Microsoft Clarity — session recordings and heatmaps.
 *
 * Clarity tracks route changes on its own (it hooks the History API), so
 * unlike the Meta pixel this needs no per-navigation call. Renders nothing
 * when NEXT_PUBLIC_CLARITY_ID is unset, which keeps local and preview
 * environments out of the production project's recordings.
 */
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

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

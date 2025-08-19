'use client'

import Script from 'next/script'
import { PUBLISHER_ID, isProduction } from './config'

export const AdSenseAutoAds = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`}
        crossOrigin="anonymous"
      />
      <Script
        id="AdSense-auto"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "${PUBLISHER_ID}",
              enable_page_level_ads: true
            });
          `,
        }}
      />
    </>
  )
}

'use client'

import Script from 'next/script'
import { PUBLISHER_ID, isProduction } from './config'

export const AdSenseAutoAds = () => {
  const nonce = isProduction ? 'random-nonce-value' : undefined // Thay bằng nonce động trong production

  return (
    <>
      {/* <script
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`}
        crossOrigin="anonymous"
        nonce={nonce}
      /> */}
      <script
        id="AdSense-auto"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: `
          if (!window.adsbygoogle_loaded) {
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "${PUBLISHER_ID}",
              enable_page_level_ads: true
            });
            window.adsbygoogle_loaded = true;
          }
        `,
        }}
      />
    </>
  )
}

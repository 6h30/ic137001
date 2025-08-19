// components/AdSense/config.ts
export const PUBLISHER_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE || 'ca-pub-3940256099942544'
export const isProduction = process.env.NODE_ENV === 'production'

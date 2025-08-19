'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { PUBLISHER_ID } from './config'

interface AdUnitProps {
  slot: string
  format?: string
  layout?: string
  className?: string
  style?: React.CSSProperties
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>
  }
}

export const AdUnit = ({
  slot,
  format = 'auto',
  className = '',
  style = { display: 'block' },
  layout = '',
}: AdUnitProps) => {
  const pathname = usePathname()

  useEffect(() => {
    try {
      // Cách viết chính xác theo Google AdSense API
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [pathname])

  return (
    <div className={`w-full text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive="true"
      />
    </div>
  )
}

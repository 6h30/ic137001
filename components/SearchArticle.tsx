'use client'
import { useState } from 'react'
import { AdUnit } from './AdUnit'

export default function SeachArticle() {
  const [showAd, setShowAd] = useState(true)

  const handleCloseAd = () => {
    setShowAd(false)
  }

  if (!showAd) return null // Ẩn hẳn cả phần quảng cáo khi đóng

  return (
    <section className="relative mt-1 grid grid-cols-12 gap-y-7 xl:col-span-12">
      <div className="col-span-full pb-4">
        {/* Header quảng cáo */}
        <div className="grid grid-cols-2 items-center border-b border-current pb-1.5">
          <div className="flex gap-1 text-sm text-current uppercase">
            <span>/</span> Quảng cáo
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleCloseAd}
              className="cursor-pointer text-sm uppercase"
              aria-label="Đóng quảng cáo"
            >
              X
            </button>
          </div>
        </div>

        {/* Nội dung quảng cáo */}
        <div className="mt-4 text-center">
          <AdUnit slot="7863436668" format="auto" className="mx-auto block max-w-[728px]" />
        </div>
      </div>
    </section>
  )
}

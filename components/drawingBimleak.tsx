'use client'

import siteMetadata from '@/data/siteMetadata'
import { useRef, useEffect, useState } from 'react'

function useResponsivePixel() {
  const [config, setConfig] = useState({ pixelSize: 8, gap: 5 })

  useEffect(() => {
    function updateConfig() {
      const width = window.innerWidth
      if (width < 640) {
        // Mobile
        setConfig({ pixelSize: 5, gap: 3 })
      } else if (width < 1024) {
        // Tablet
        setConfig({ pixelSize: 7, gap: 4 })
      } else {
        // Desktop
        setConfig({ pixelSize: 10, gap: 5 })
      }
    }
    updateConfig()
    window.addEventListener('resize', updateConfig)
    return () => window.removeEventListener('resize', updateConfig)
  }, [])

  return config
}

// chữ bitmap giữ nguyên như bạn đưa
const letters: number[][] = [
  // B (4x7)
  [1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
  // I (3x7)
  [1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1],
  // M (5x7)
  [1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  // L (3x7)
  [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1],
  // E (4x7)
  [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
  // A (5x7)
  [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  // K (5x7)
  [1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
]

const letterWidths = [4, 3, 5, 3, 4, 5, 5]
const letterHeight = 5

function drawBimleak(
  step: number,
  ctx: CanvasRenderingContext2D,
  color: string,
  pixelSize: number,
  gap: number
) {
  ctx.fillStyle = color

  let pixelIndex = 0
  let xOffset = 10

  for (let l = 0; l < letters.length; l++) {
    const grid = letters[l]
    const width = letterWidths[l]
    const height = letterHeight

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y * width + x] === 1) {
          pixelIndex++
          if (pixelIndex === step) {
            const totalLetterHeight = height * (pixelSize + gap)
            const yOffset = (ctx.canvas.height - totalLetterHeight) / 2

            ctx.fillRect(
              xOffset + x * (pixelSize + gap),
              yOffset + y * (pixelSize + gap),
              pixelSize,
              pixelSize
            )
            return false
          }
        }
      }
    }
    xOffset += width * (pixelSize + gap) + pixelSize * 2
  }

  return true
}

export default function LogoBimleak() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { pixelSize, gap } = useResponsivePixel()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    // set width, height theo container
    canvas.width = canvas.clientWidth
    canvas.height = 120

    // const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    // const color = isDark ? 'white' : 'black'

    const color = mq.matches ? 'white' : 'black'

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let step = 1
    const interval = setInterval(() => {
      const done = drawBimleak(step, ctx, color, pixelSize, gap)
      if (done) clearInterval(interval)
      step++
    }, 20)

    return () => clearInterval(interval)
  }, [pixelSize, gap])

  return (
    <section className="flex w-full flex-col items-start justify-center">
      <canvas
        ref={canvasRef}
        className="w-full max-w-[500px] bg-transparent"
        style={{ imageRendering: 'pixelated', height: '120px' }}
      />
      <p className="text-base leading-7 text-gray-500 sm:text-lg dark:text-gray-400">
        {siteMetadata.description}
      </p>
    </section>
  )
}

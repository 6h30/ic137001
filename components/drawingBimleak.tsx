'use client'

import siteMetadata from '@/data/siteMetadata'
import { useRef, useEffect } from 'react'

const pixelSize = 8
const gap = 6 // khoảng hở giữa các pixel

// ma trận bitmap cho chữ BIMLEAK
const letters: number[][] = [
  // B (5x7)
  [1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  // I (3x7)
  [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
  // M (5x7)
  [1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  // L (4x7)
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  // E (5x7)
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  // A (5x7)
  [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  // K (5x7)
  [1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
]

// chiều rộng từng chữ (theo font Doto)
const letterWidths = [5, 5, 5, 5, 5, 5, 5]
const letterHeight = 5

function drawBimleak(step: number, ctx: CanvasRenderingContext2D, color: string) {
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
            const yOffset = (100 - totalLetterHeight) / 2

            // thêm gap vào vị trí pixel
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
    xOffset += width * (pixelSize + gap) + pixelSize * 2 // thêm khoảng hở giữa các chữ
  }

  return true
}

export default function LogoBimleak() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const color = isDark ? 'white' : 'black'

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let step = 1
    const interval = setInterval(() => {
      const done = drawBimleak(step, ctx, color)
      if (done) clearInterval(interval)
      step++
    }, 20)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="flex h-full w-full flex-col items-start justify-center">
      <canvas
        id="logo"
        width={700}
        height={100}
        ref={canvasRef}
        className="bg-transparent"
        style={{ imageRendering: 'pixelated' }}
      />
      <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
        {siteMetadata.description}
      </p>
    </section>
  )
}

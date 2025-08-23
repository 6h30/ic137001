'use client'

import { useRef, useEffect } from 'react'

const pixelSize = 8

// ma trận bitmap cho chữ BIMLEAK
// 1 = pixel vàng, 0 = trống
const letters: number[][] = [
  // B
  [1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0],
  // I
  [1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1],
  // M
  [1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  // L
  [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1],
  // E
  [1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1],
  // A
  [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
  // K
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
]

// chiều rộng mỗi chữ (sẽ khác nhau)
const letterWidths = [4, 3, 5, 3, 3, 3, 3]

function drawBimleak(step: number, ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = 'yellow'

  let pixelIndex = 0
  let xOffset = 10

  for (let l = 0; l < letters.length; l++) {
    const grid = letters[l]
    const width = letterWidths[l]
    const height = 5

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (grid[y * width + x] === 1) {
          pixelIndex++
          if (pixelIndex === step) {
            ctx.fillRect(xOffset + x * pixelSize, 20 + y * pixelSize, pixelSize, pixelSize)
            return false
          }
        }
      }
    }

    xOffset += width * pixelSize + 8 // khoảng cách giữa các chữ
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

    // nền đen
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let step = 1
    const interval = setInterval(() => {
      const done = drawBimleak(step, ctx)
      if (done) {
        clearInterval(interval)
      }
      step++
    }, 20)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      <canvas id="logo" width={500} height={120} ref={canvasRef} className="bg-black" />
      <div className="mt-2 text-center text-base text-gray-200 uppercase opacity-70">bimleak</div>
    </section>
  )
}

import React, { useEffect, useRef } from 'react'
import { drawBimleak } from '@/components/drawinglogo.mjs'

const LogoCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   if (!canvas) return

  //   const ctx = canvas.getContext('2d')
  //   if (!ctx) return

  //   const interval = setInterval(() => {
  //     if (drawBimleak2(2, 2, ctx)) {
  //       clearInterval(interval)
  //     }
  //   }, 50)

  //   return () => clearInterval(interval)
  // }, [])

  // Hàm vẽ logo (có thể là ô vuông hoặc chữ)
  function drawBimleak2(ctx: CanvasRenderingContext2D) {
    // vẽ nền đen
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // vẽ chữ vàng ở giữa
    ctx.fillStyle = 'yellow'
    ctx.font = 'bold 40px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('BIMLEAK', ctx.canvas.width / 2, ctx.canvas.height / 2)

    return true
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // gọi hàm vẽ logo
    const interval = setInterval(() => {
      if (drawBimleak2(ctx)) {
        clearInterval(interval)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      <style>{`
      @keyframes letterSpacing {
        0% {
          letter-spacing: -5px;
          opacity: 0;
        }
        100% {
          letter-spacing: 1px;
          opacity: 1;
        }
      }
      .animate-letterSpacing {
        animation: letterSpacing 1.5s ease-in-out 3.5s forwards;
      }
    `}</style>

      <div className="flex flex-col items-center">
        <canvas id="logo" width={400} height={400} ref={canvasRef} className="bg-black" />
        <div className="animate-letterSpacing text-center text-base text-gray-200 uppercase opacity-0">
          bimleakdotdev
        </div>
      </div>
    </section>
  )
}

export default LogoCanvas

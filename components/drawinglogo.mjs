let x = 1
// let rgb = 255
let opacity = 1

export function drawBimleak(startCoordX, startCoordY, ctx) {
  ctx.beginPath()
  switch (x) {
    /* Letter b */
    case 1:
      ctx.rect(startCoordX, startCoordY, 8, 8)
      break
    case 2:
      ctx.rect(startCoordX, startCoordY + 10, 8, 8)
      break
    case 3:
      ctx.rect(startCoordX, startCoordY + 20, 8, 8)
      break
    case 4:
      ctx.rect(startCoordX, startCoordY + 30, 8, 8)
      break
    case 5:
      ctx.rect(startCoordX, startCoordY + 40, 8, 8)
      break
    case 6:
      ctx.rect(startCoordX + 10, startCoordY, 8, 8)
      break
    case 7:
      ctx.rect(startCoordX + 20, startCoordY, 8, 8)
      break
    case 8:
      ctx.rect(startCoordX + 20, startCoordY + 20, 8, 8)
      break
    case 9:
      ctx.rect(startCoordX + 20, startCoordY + 40, 8, 8)
      break
    case 10:
      ctx.rect(startCoordX + 10, startCoordY + 40, 8, 8)
      break
    case 11:
      ctx.rect(startCoordX + 10, startCoordY + 20, 8, 8)
      break
    case 12:
      ctx.rect(startCoordX + 30, startCoordY + 10, 8, 8)
      break
    case 13:
      ctx.rect(startCoordX + 30, startCoordY + 30, 8, 8)
      break
    /* Letter i */
    case 14:
      ctx.rect(startCoordX + 60, startCoordY, 8, 8)
      break
    case 15:
      ctx.rect(startCoordX + 60, startCoordY + 10, 8, 8)
      break
    case 16:
      ctx.rect(startCoordX + 60, startCoordY + 20, 8, 8)
      break
    case 17:
      ctx.rect(startCoordX + 60, startCoordY + 30, 8, 8)
      break
    case 18:
      ctx.rect(startCoordX + 60, startCoordY + 40, 8, 8)
      break
    case 19:
      ctx.rect(startCoordX + 60, startCoordY, 8, 8)
      break
    /* Letter m */
    case 20:
      ctx.rect(startCoordX + 90, startCoordY, 8, 8)
      break
    case 21:
      ctx.rect(startCoordX + 90, startCoordY + 10, 8, 8)
      break
    case 22:
      ctx.rect(startCoordX + 90, startCoordY + 20, 8, 8)
      break
    case 23:
      ctx.rect(startCoordX + 90, startCoordY + 30, 8, 8)
      break
    case 24:
      ctx.rect(startCoordX + 90, startCoordY + 40, 8, 8)
      break
    case 25:
      ctx.rect(startCoordX + 100, startCoordY + 10, 8, 8)
      break
    case 26:
      ctx.rect(startCoordX + 110, startCoordY + 20, 8, 8)
      break
    case 27:
      ctx.rect(startCoordX + 120, startCoordY + 10, 8, 8)
      break
    case 28:
      ctx.rect(startCoordX + 130, startCoordY, 8, 8)
      break
    case 29:
      ctx.rect(startCoordX + 130, startCoordY + 10, 8, 8)
      break
    case 30:
      ctx.rect(startCoordX + 130, startCoordY + 20, 8, 8)
      break
    case 31:
      ctx.rect(startCoordX + 130, startCoordY + 30, 8, 8)
      break
    case 32:
      ctx.rect(startCoordX + 130, startCoordY + 40, 8, 8)
      break
    /* Letter l */
    case 33:
      ctx.rect(startCoordX + 180, startCoordY, 8, 8)
      break
    case 34:
      ctx.rect(startCoordX + 180, startCoordY + 10, 8, 8)
      break
    case 35:
      ctx.rect(startCoordX + 180, startCoordY + 20, 8, 8)
      break
    case 36:
      ctx.rect(startCoordX + 180, startCoordY + 30, 8, 8)
      break
    case 37:
      ctx.rect(startCoordX + 180, startCoordY + 40, 8, 8)
      break
    case 38:
      ctx.rect(startCoordX + 190, startCoordY + 40, 8, 8)
      break
    /* Letter e */
    case 39:
      ctx.rect(startCoordX + 220, startCoordY, 8, 8)
      break
    case 40:
      ctx.rect(startCoordX + 220, startCoordY + 10, 8, 8)
      break
    case 41:
      ctx.rect(startCoordX + 220, startCoordY + 20, 8, 8)
      break
    case 42:
      ctx.rect(startCoordX + 220, startCoordY + 30, 8, 8)
      break
    case 43:
      ctx.rect(startCoordX + 220, startCoordY + 40, 8, 8)
      break
    case 44:
      ctx.rect(startCoordX + 230, startCoordY, 8, 8)
      break
    case 45:
      ctx.rect(startCoordX + 240, startCoordY, 8, 8)
      break
    case 46:
      ctx.rect(startCoordX + 230, startCoordY + 20, 8, 8)
      break
    case 47:
      ctx.rect(startCoordX + 240, startCoordY + 20, 8, 8)
      break
    case 48:
      ctx.rect(startCoordX + 230, startCoordY + 40, 8, 8)
      break
    case 49:
      ctx.rect(startCoordX + 240, startCoordY + 40, 8, 8)
      break
    /* Letter a */
    case 50:
      ctx.rect(startCoordX + 260, startCoordY + 40, 8, 8)
      break
    case 51:
      ctx.rect(startCoordX + 260, startCoordY + 30, 8, 8)
      break
    case 52:
      ctx.rect(startCoordX + 260, startCoordY + 20, 8, 8)
      break
    case 53:
      ctx.rect(startCoordX + 260, startCoordY + 10, 8, 8)
      break
    case 54:
      ctx.rect(startCoordX + 270, startCoordY, 8, 8)
      break
    case 55:
      ctx.rect(startCoordX + 280, startCoordY, 8, 8)
      break
    case 56:
      ctx.rect(startCoordX + 290, startCoordY + 10, 8, 8)
      break
    case 57:
      ctx.rect(startCoordX + 290, startCoordY + 20, 8, 8)
      break
    case 58:
      ctx.rect(startCoordX + 290, startCoordY + 30, 8, 8)
      break
    case 59:
      ctx.rect(startCoordX + 290, startCoordY + 40, 8, 8)
      break
    case 60:
      ctx.rect(startCoordX + 270, startCoordY + 20, 8, 8)
      break
    case 61:
      ctx.rect(startCoordX + 280, startCoordY + 20, 8, 8)
      break
    /* Letter k */
    case 62:
      ctx.rect(startCoordX + 310, startCoordY, 8, 8)
      break
    case 63:
      ctx.rect(startCoordX + 310, startCoordY + 10, 8, 8)
      break
    case 64:
      ctx.rect(startCoordX + 310, startCoordY + 20, 8, 8)
      break
    case 65:
      ctx.rect(startCoordX + 310, startCoordY + 30, 8, 8)
      break
    case 66:
      ctx.rect(startCoordX + 310, startCoordY + 40, 8, 8)
      break
    case 67:
      ctx.rect(startCoordX + 340, startCoordY, 8, 8)
      break
    case 68:
      ctx.rect(startCoordX + 330, startCoordY + 10, 8, 8)
      break
    case 69:
      ctx.rect(startCoordX + 320, startCoordY + 20, 8, 8)
      break
    case 70:
      ctx.rect(startCoordX + 330, startCoordY + 30, 8, 8)
      break
    case 71:
      ctx.rect(startCoordX + 340, startCoordY + 40, 8, 8)
      break
    case 72:
      ctx.rect(startCoordX + 340, startCoordY, 8, 8)
      break
  }
  ctx.closePath()
  // ctx.fillStyle = `rgba(${rgb}, ${rgb}, ${rgb}, ${opacity})`
  ctx.fillStyle = `rgba(255, 215, 0, ${opacity})`
  opacity /= 1.05
  ctx.fill()
  x++
  return x > 72 // Return true when animation should stop
}

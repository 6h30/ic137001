// gameLogic.ts
// interface GameCallbacks {
//     onScoreUpdate: (score: number) => void;
//     onGameOver: () => void;
//   }

interface GameCallbacks {
  onScoreUpdate: (score: number) => void
  onGameOver: () => void
  onFirstRunUpdate: (isFirstRun: boolean) => void // Thêm callback cho isFirstRun
}

const width = 422
const height = 552
const gravity = 0.2
const platformCount = 10

let platforms: Platform[] = []
let image: HTMLImageElement
let player: Player
let base: Base
let platform_broken_substitute: Platform_broken_substitute
let Spring: spring
let position = 0
let score = 0
let broken = 0
let flag = 0
let dir: string
let jumpCount = 0
// const firstRun = true
let animloop: () => void

class Base {
  height = 5
  width = width
  cx = 0
  cy = 614
  cwidth = 100
  cheight = 5
  moved = 0
  x = 0
  y = height - this.height

  draw(ctx: CanvasRenderingContext2D) {
    try {
      ctx.drawImage(
        image,
        this.cx,
        this.cy,
        this.cwidth,
        this.cheight,
        this.x,
        this.y,
        this.width,
        this.height
      )
    } catch (e) {
      console.error('Failed to draw image:', e)
    }
  }
}

class Player {
  vy = 11
  vx = 0
  isMovingLeft = false
  isMovingRight = false
  isDead = false
  width = 55
  height = 40
  cx = 0
  cy = 0
  cwidth = 110
  cheight = 80
  dir = 'left'
  x = width / 2 - this.width / 2
  y = height

  draw(ctx: CanvasRenderingContext2D) {
    try {
      if (this.dir == 'right') this.cy = 121
      else if (this.dir == 'left') this.cy = 201
      else if (this.dir == 'right_land') this.cy = 289
      else if (this.dir == 'left_land') this.cy = 371

      ctx.drawImage(
        image,
        this.cx,
        this.cy,
        this.cwidth,
        this.cheight,
        this.x,
        this.y,
        this.width,
        this.height
      )
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  jump() {
    this.vy = -8
  }

  jumpHigh() {
    this.vy = -16
  }
}

class Platform {
  width = 70
  height = 17
  x = Math.random() * (width - this.width)
  y = position
  flag = 0
  state = 0
  cx = 0
  cy = 0
  cwidth = 105
  cheight = 31
  types: number[]
  type: number
  moved = 0
  vx = 1

  constructor() {
    position += height / platformCount
    if (score >= 5000) this.types = [2, 3, 3, 3, 4, 4, 4, 4]
    else if (score >= 2000 && score < 5000) this.types = [2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4]
    else if (score >= 1000 && score < 2000) this.types = [2, 2, 2, 3, 3, 3, 3, 3]
    else if (score >= 500 && score < 1000) this.types = [1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]
    else if (score >= 100 && score < 500) this.types = [1, 1, 1, 1, 2, 2]
    else this.types = [1]

    this.type = this.types[Math.floor(Math.random() * this.types.length)]

    if (this.type == 3 && broken < 1) {
      broken++
    } else if (this.type == 3 && broken >= 1) {
      this.type = 1
      broken = 0
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    try {
      if (this.type == 1) this.cy = 0
      else if (this.type == 2) this.cy = 61
      else if (this.type == 3 && this.flag === 0) this.cy = 31
      else if (this.type == 3 && this.flag == 1) this.cy = 1000
      else if (this.type == 4 && this.state === 0) this.cy = 90
      else if (this.type == 4 && this.state == 1) this.cy = 1000

      ctx.drawImage(
        image,
        this.cx,
        this.cy,
        this.cwidth,
        this.cheight,
        this.x,
        this.y,
        this.width,
        this.height
      )
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

class Platform_broken_substitute {
  height = 30
  width = 70
  x = 0
  y = 0
  cx = 0
  cy = 554
  cwidth = 105
  cheight = 60
  appearance = false

  draw(ctx: CanvasRenderingContext2D) {
    try {
      if (this.appearance) {
        ctx.drawImage(
          image,
          this.cx,
          this.cy,
          this.cwidth,
          this.cheight,
          this.x,
          this.y,
          this.width,
          this.height
        )
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

class spring {
  x = 0
  y = 0
  width = 26
  height = 30
  cx = 0
  cy = 0
  cwidth = 45
  cheight = 53
  state = 0

  draw(ctx: CanvasRenderingContext2D) {
    try {
      if (this.state === 0) this.cy = 445
      else if (this.state == 1) this.cy = 501

      ctx.drawImage(
        image,
        this.cx,
        this.cy,
        this.cwidth,
        this.cheight,
        this.x,
        this.y,
        this.width,
        this.height
      )
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

export function initGame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  callbacks: GameCallbacks
) {
  image = document.getElementById('sprite') as HTMLImageElement
  canvas.width = width
  canvas.height = height

  dir = 'left'
  jumpCount = 0
  // firstRun = false;
  callbacks.onFirstRunUpdate(false) // Cập nhật isFirstRun thành false

  base = new Base()
  player = new Player()
  Spring = new spring()
  platform_broken_substitute = new Platform_broken_substitute()
  platforms = []
  for (let i = 0; i < platformCount; i++) {
    platforms.push(new Platform())
  }

  function paintCanvas() {
    ctx.clearRect(0, 0, width, height)
  }

  function playerCalc() {
    if (dir == 'left') {
      player.dir = 'left'
      if (player.vy < -7 && player.vy > -15) player.dir = 'left_land'
    } else if (dir == 'right') {
      player.dir = 'right'
      if (player.vy < -7 && player.vy > -15) player.dir = 'right_land'
    }

    if (player.isMovingLeft) {
      player.x += player.vx
      player.vx -= 0.15
    } else {
      player.x += player.vx
      if (player.vx < 0) player.vx += 0.1
    }

    if (player.isMovingRight) {
      player.x += player.vx
      player.vx += 0.15
    } else {
      player.x += player.vx
      if (player.vx > 0) player.vx -= 0.1
    }

    if (player.vx > 8) player.vx = 8
    else if (player.vx < -8) player.vx = -8

    if (player.y + player.height > base.y && base.y < height) player.jump()

    if (base.y > height && player.y + player.height > height && !player.isDead) {
      player.isDead = true
    }

    if (player.x > width) player.x = 0 - player.width
    else if (player.x < 0 - player.width) player.x = width

    if (player.y >= height / 2 - player.height / 2) {
      player.y += player.vy
      player.vy += gravity
    } else {
      platforms.forEach((p, i) => {
        if (player.vy < 0) {
          p.y -= player.vy
        }
        if (p.y > height) {
          platforms[i] = new Platform()
          platforms[i].y = p.y - height
        }
      })
      base.y -= player.vy
      player.vy += gravity
      if (player.vy >= 0) {
        player.y += player.vy
        player.vy += gravity
      }
      score++
      callbacks.onScoreUpdate(score)
    }

    collides()

    if (player.isDead) gameOver()
  }

  function springCalc() {
    const s = Spring
    const p = platforms[0]

    if (p.type == 1 || p.type == 2) {
      s.x = p.x + p.width / 2 - s.width / 2
      s.y = p.y - p.height - 10
      if (s.y > height / 1.1) s.state = 0
      s.draw(ctx)
    } else {
      s.x = 0 - s.width
      s.y = 0 - s.height
    }
  }

  function platformCalc() {
    const subs = platform_broken_substitute
    platforms.forEach((p) => {
      if (p.type == 2) {
        if (p.x < 0 || p.x + p.width > width) p.vx *= -1
        p.x += p.vx
      }
      if (p.flag == 1 && subs.appearance === false && jumpCount === 0) {
        subs.x = p.x
        subs.y = p.y
        subs.appearance = true
        jumpCount++
      }
      p.draw(ctx)
    })

    if (subs.appearance) {
      subs.draw(ctx)
      subs.y += 8
    }
    if (subs.y > height) subs.appearance = false
  }

  function collides() {
    platforms.forEach((p, i) => {
      if (
        player.vy > 0 &&
        p.state === 0 &&
        player.x + 15 < p.x + p.width &&
        player.x + player.width - 15 > p.x &&
        player.y + player.height > p.y &&
        player.y + player.height < p.y + p.height
      ) {
        if (p.type == 3 && p.flag === 0) {
          p.flag = 1
          jumpCount = 0
          return
        } else if (p.type == 4 && p.state === 0) {
          player.jump()
          p.state = 1
        } else if (p.flag == 1) return
        else {
          player.jump()
        }
      }
    })

    const s = Spring
    if (
      player.vy > 0 &&
      s.state === 0 &&
      player.x + 15 < s.x + s.width &&
      player.x + player.width - 15 > s.x &&
      player.y + player.height > s.y &&
      player.y + player.height < s.y + s.height
    ) {
      s.state = 1
      player.jumpHigh()
    }
  }

  function gameOver() {
    platforms.forEach((p) => {
      p.y -= 12
    })

    if (player.y > height / 2 && flag === 0) {
      player.y -= 8
      player.vy = 0
    } else if (player.y < height / 2) flag = 1
    else if (player.y + player.height > height) {
      callbacks.onGameOver()
    }
  }

  function update() {
    paintCanvas()
    platformCalc()
    springCalc()
    playerCalc()
    player.draw(ctx)
    base.draw(ctx)
  }

  animloop = () => {
    update()
    requestAnimationFrame(animloop)
  }

  animloop()
}

export function resetGame(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  callbacks: GameCallbacks
) {
  player.isDead = false
  flag = 0
  position = 0
  score = 0
  broken = 0
  jumpCount = 0

  base = new Base()
  player = new Player()
  Spring = new spring()
  platform_broken_substitute = new Platform_broken_substitute()
  platforms = []
  for (let i = 0; i < platformCount; i++) {
    platforms.push(new Platform())
  }

  callbacks.onFirstRunUpdate(false) // Đảm bảo isFirstRun là false sau khi reset
  initGame(canvas, ctx, callbacks)
}

export function setPlayerDirection(direction: string, isMoving: boolean) {
  if (direction === 'left') {
    dir = 'left'
    player.isMovingLeft = isMoving
  } else if (direction === 'right') {
    dir = 'right'
    player.isMovingRight = isMoving
  }
}

export function getShareLinks(score: number) {
  return {
    twitter: `https://twitter.com/share?url=http://is.gd/PnFFzu&text=I just scored ${score} points in the HTML5 Doodle Jump game!&count=horiztonal&via=cssdeck&related=solitarydesigns`,
    facebook: `https://facebook.com/sharer.php?s=100&p[url]=http://cssdeck.com/labs/html5-doodle-jump/8&p[title]=I just scored ${score} points in the HTML5 Doodle Jump game!&p[summary]=Can you beat me in this awesome recreation of Doodle Jump created in HTML5?`,
  }
}

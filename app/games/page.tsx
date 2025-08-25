'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './game.module.css'
import { initGame, resetGame, setPlayerDirection, getShareLinks } from './gameLogic'

export default function Game() {
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isFirstRun, setIsFirstRun] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Stabilize init and reset with useCallback
  const init = useCallback(() => {
    setIsGameOver(false)
    setScore(0)
    setIsFirstRun(false)
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        initGame(canvas, ctx, {
          onScoreUpdate: setScore,
          onGameOver: () => setIsGameOver(true),
          onFirstRunUpdate: setIsFirstRun,
        })
      }
    }
  }, [setScore, setIsGameOver, setIsFirstRun]) // Include state setters as dependencies

  const reset = useCallback(() => {
    setIsGameOver(false)
    setScore(0)
    setIsFirstRun(false)
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        resetGame(canvas, ctx, {
          onScoreUpdate: setScore,
          onGameOver: () => setIsGameOver(true),
          onFirstRunUpdate: setIsFirstRun,
        })
      }
    }
  }, [setScore, setIsGameOver, setIsFirstRun]) // Include state setters as dependencies

  useEffect(() => {
    // Initialize game on mount
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        initGame(canvas, ctx, {
          onScoreUpdate: setScore,
          onGameOver: () => setIsGameOver(true),
          onFirstRunUpdate: setIsFirstRun,
        })
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setPlayerDirection('left', true)
      } else if (e.key === 'ArrowRight') {
        setPlayerDirection('right', true)
      } else if (e.key === ' ') {
        if (isGameOver || isFirstRun) {
          init()
        } else {
          reset()
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setPlayerDirection('left', false)
      } else if (e.key === 'ArrowRight') {
        setPlayerDirection('right', false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [isFirstRun, isGameOver, init, reset]) // Include necessary dependencies

  const shareLinks = getShareLinks(score)

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} id="canvas" className={styles.canvas} width="422" height="552">
        Ôi, trình duyệt của bạn không hỗ trợ HTML5!
      </canvas>

      {!isGameOver && (
        <div
          id="mainMenu"
          className={styles.mainMenu}
          style={{ visibility: isFirstRun ? 'visible' : 'hidden' }}
        >
          <h1 className={styles.h1}>doodle jump</h1>
          <h3 className={styles.h3}>sử dụng HTML5,</h3>
          <h3 className={styles.h3}>
            ...bởi{' '}
            <Link href="https://codepen.io" target="_blank" className={styles.h3}>
              dcviet
            </Link>
          </h3>
          <p className={styles.info}>
            sử dụng
            <span className={`${styles.key} ${styles.keyLeft}`}>←</span>
            <span className={`${styles.key} ${styles.keyRight}`}>→</span>
            để di chuyển và phím cách để (khởi động lại)...
          </p>
          <button onClick={init} className={styles.button}>
            Chơi
          </button>
        </div>
      )}

      {isGameOver && (
        <div id="gameOverMenu" className={styles.gameOverMenu}>
          <h1 className={styles.h1}>kết thúc trò chơi!</h1>
          <h3 id="go_score" className={styles.h3}>
            bạn đạt {score} điểm
          </h3>
          <button onClick={reset} className={styles.button}>
            Chơi lại
          </button>
          <Link
            id="tweetBtn"
            href={shareLinks.twitter}
            target="_blank"
            className={`${styles.button} ${styles.buttonTweet}`}
          >
            Chia sẻ điểm trên Twitter
          </Link>
          <Link
            id="fbBtn"
            href={shareLinks.facebook}
            target="_blank"
            className={`${styles.button} ${styles.buttonFb}`}
          >
            Đăng lên Facebook
          </Link>
        </div>
      )}

      <Image
        id="sprite"
        src="https://i.imgur.com/2WEhF.png"
        alt="Sprite"
        width={0}
        height={0}
        className={styles.sprite}
        unoptimized
      />

      <div id="scoreBoard" className={styles.scoreBoard}>
        <p id="score" className={styles.score}>
          {score}
        </p>
      </div>
    </div>
  )
}

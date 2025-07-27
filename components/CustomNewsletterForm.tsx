'use client'

import { useState } from 'react'

export default function CustomNewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setSubmitted(true)
        setEmail('')
      } else {
        const result = await res.json()
        setError(result.message || 'Có lỗi xảy ra.')
      }
    } catch (err) {
      setError('Không thể kết nối đến máy chủ.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      {submitted ? (
        <p className="text-center text-green-600"> Cảm ơn bạn ! </p>
      ) : (
        <>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded border border-gray-300 bg-white px-10 py-2 text-sm shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 hover:bg-primary-700 w-full rounded px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {loading ? 'Đang đăng ký ..' : 'Đăng ký'}
          </button>
          {submitted && <p className="text-primary-600">Đăng ký thành công!</p>}
          {error && <p className="text-center text-sm text-red-600">{error}</p>}
        </>
      )}
    </form>
  )
}

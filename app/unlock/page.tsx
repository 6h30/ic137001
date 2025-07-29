'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD_PROJECT

export default function UnlockPage() {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === PASSWORD) {
      router.push('/wrongpassword')
    } else {
      setError('Sai mật khẩu. Vui lòng thử lại.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-800 dark:text-white">
          Nhập mật khẩu để truy cập
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Mật khẩu"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="focus:ring-primary-500 w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 w-full rounded px-4 py-2 text-white"
          >
            Truy cập
          </button>
        </form>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
}

const POSTS_PER_PAGE = 5

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    return `${pathname}?${params.toString()}`
  }

  const prevPage = currentPage > 1
  const nextPage = currentPage < totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage ? (
          <button className="cursor-auto disabled:opacity-50" disabled>
            Trước đó
          </button>
        ) : (
          <Link href={buildPageUrl(currentPage - 1)} rel="prev">
            Trước đó
          </Link>
        )}

        <span>
          {currentPage} trên {totalPages}
        </span>

        {!nextPage ? (
          <button className="cursor-auto disabled:opacity-50" disabled>
            Kế tiếp
          </button>
        ) : (
          <Link href={buildPageUrl(currentPage + 1)} rel="next">
            Kế tiếp
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({ posts, title }: ListLayoutProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const tagQuery = searchParams.get('tag')
  const pageQuery = Number(searchParams.get('page') || 1)
  const selectedTags = tagQuery?.split(',').filter(Boolean) || []

  const tagCounts = tagData as Record<string, number>
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])

  // const filteredPosts =
  //   selectedTags.length > 0
  //     ? posts.filter((post) => post.tags?.some((tag) => selectedTags.includes(slug(tag))))
  //     : posts

  // const toggleTag = (tag: string) => {
  //   const params = new URLSearchParams(searchParams.toString())
  //   const current = params.get('tag')?.split(',').filter(Boolean) || []

  //   const tagSlug = slug(tag)
  //   const exists = current.includes(tagSlug)
  //   const updated = exists ? current.filter((t) => t !== tagSlug) : [...current, tagSlug]

  //   if (updated.length > 0) {
  //     params.set('tag', updated.join(','))
  //   } else {
  //     params.delete('tag')
  //   }
  //   params.set('page', '1') // reset to first page
  //   router.push(`${pathname}?${params.toString()}`)
  // }

  const toggleTag = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const currentTags = params.get('tag')?.split(',').filter(Boolean) || []

    const tagSlug = slug(tag)
    const exists = currentTags.includes(tagSlug)

    const updatedTags = exists
      ? currentTags.filter((t) => t !== tagSlug)
      : [...currentTags, tagSlug]

    if (updatedTags.length > 0) {
      params.set('tag', updatedTags.join(','))
    } else {
      params.delete('tag')
    }

    // giữ nguyên selectedYear nếu có
    // đã được giữ vì `params` bắt đầu từ `searchParams`

    params.set('page', '1') // reset trang về 1
    router.push(`${pathname}?${params.toString()}`)
  }

  const toggleYear = (year: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const current = params.get('year')

    const isSame = current === year

    if (isSame) {
      params.delete('year') // bỏ lọc nếu nhấn lại cùng năm
    } else {
      params.set('year', year)
    }

    params.set('page', '1') // reset page
    router.push(`${pathname}?${params.toString()}`)
  }

  const [isYearCollapsed, setIsYearCollapsed] = useState(false)
  const [isCategoryCollapsed, setIsCategoryCollapsed] = useState(true)

  const toggleCollapseCategory = () => {
    setIsCategoryCollapsed((prev) => !prev)
  }

  const toggleCollapseYear = () => {
    setIsYearCollapsed((prev) => !prev)
  }

  const selectedYear = searchParams.get('year')

  const years = Array.from(new Set(posts.map((post) => new Date(post.date).getFullYear()))).sort(
    (a, b) => b - a
  ) // Sắp xếp từ mới đến cũ

  const filteredPosts = posts.filter((post) => {
    const postYear = new Date(post.date).getFullYear().toString()

    const matchesTags =
      selectedTags.length === 0 || post.tags?.some((tag) => selectedTags.includes(slug(tag)))

    const matchesYear = !selectedYear || postYear === selectedYear

    return matchesTags && matchesYear
  })

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const currentPage = Math.min(Math.max(1, pageQuery), totalPages)

  const displayPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )
  return (
    <div>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Mới nhất
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {siteMetadata.description}
        </p>
      </div>

      <section className="font-koho relative col-span-12 mt-1 grid grid-cols-12 gap-y-7">
        {/* left */}
        <div className="relative col-span-4 grid">
          <div className="sticky top-28 col-span-full grid grid-cols-4 gap-y-4 self-start border-b">
            <div className="col-span-full grid grid-cols-2 self-start border-b border-current pb-1.5">
              <div className="col-span-1 flex gap-1 text-sm text-current uppercase">
                <span>/</span>Bộ lọc
              </div>
              {/* Xóa bộ lọc */}
              <div className="col-span-1 flex justify-self-end sm:col-start-3">
                <button
                  className="cursor-pointer text-sm uppercase"
                  // onClick={handleClearFilters}
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
            {/*  lọc theo thời gian/chủ đề */}
            <div className="col-span-4 grid grid-cols-4 self-start pb-1.5">
              {/* Thời gian Section */}
              <div className="col-span-2 flex flex-col">
                <button
                  className="text-filterTextActive flex cursor-pointer appearance-none flex-row gap-2 border-none bg-transparent pb-2"
                  onClick={toggleCollapseYear}
                >
                  {/* Chevron Icon */}
                  <svg
                    className={`h-1.5 w-2.5 text-current transition-transform duration-200 ${isYearCollapsed ? 'rotate-0' : 'rotate-180'}`}
                    width="10"
                    height="7"
                    viewBox="0 0 10 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.83728 0.885375C9.62032 0.668417 9.26857 0.668417 9.05161 0.885375L5 4.93698L0.948392 0.885374C0.731435 0.668416 0.379676 0.668416 0.162719 0.885374C-0.0542402 1.10233 -0.0542403 1.45409 0.162719 1.67105L4.60716 6.11549C4.82412 6.33245 5.17588 6.33245 5.39284 6.11549L9.83728 1.67105C10.0542 1.45409 10.0542 1.10233 9.83728 0.885375Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  {/* Folder Icon */}
                  <svg
                    className="h-4 w-4 text-current"
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Folder Icon</title>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 0H1V1H0V2V3V9H1V10H11V9H12V3H11V2H8V1H7V0ZM11 3V9H1V3H7H8H11ZM7 1V2H1V1H7Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="text-sm">Năm</span>
                </button>

                <div className={`${isYearCollapsed ? 'hidden' : ''}`}>
                  {years.map((year) => {
                    const isChecked = selectedYear === year.toString()

                    return (
                      <button
                        key={year}
                        onClick={() => toggleYear(year.toString())}
                        className={`flex items-center gap-2 px-3 py-1 transition-colors duration-150 ${
                          isChecked
                            ? 'border-primary-500'
                            : 'hover:border-primary-400 border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        {/* SVG Checkbox Icon */}
                        <svg
                          className="dark:text-primary-400 h-4 w-4"
                          viewBox="0 0 10 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Checkbox icon</title>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d={
                              isChecked
                                ? 'M1 1L-3.49691e-07 1L-4.37113e-08 8L1 8L1 9L9 9L9 8L10 8L10 1L9 1L9 -3.93402e-07L1 -4.37114e-08L1 1ZM1 1L9 1L9 8L1 8L1 1ZM7 2L8 2L8 3L7 3L7 2ZM6 4L6 3L7 3L7 4L6 4ZM5 5L5 4L6 4L6 5L5 5ZM4 6L4 5L5 5L5 6L4 6ZM3 6L4 6L4 7L3 7L3 6ZM3 6L2 6L2 5L3 5L3 6Z'
                                : 'M1 1L-3.49691e-07 1L-4.37113e-08 8L1 8L1 9L9 9L9 8L10 8L10 1L9 1L9 -3.93402e-07L1 -4.37114e-08L1 1ZM1 1L9 1L9 8L1 8L1 1Z'
                            }
                            fill="currentColor"
                          ></path>
                        </svg>

                        {/* Year text */}
                        <span className="text-sm text-gray-700 uppercase dark:text-gray-300">
                          {year}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Chủ đề Section */}
              <div className="col-span-2 flex flex-col">
                <button
                  className="text-filterTextActive flex cursor-pointer appearance-none flex-row gap-2 border-none bg-transparent pb-2"
                  onClick={toggleCollapseCategory}
                >
                  {/* Chevron Icon for Chủ đề */}
                  <svg
                    className={`h-1.5 w-2.5 text-current transition-transform duration-200 ${isCategoryCollapsed ? 'rotate-0' : 'rotate-180'}`}
                    width="10"
                    height="7"
                    viewBox="0 0 10 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.83728 0.885375C9.62032 0.668417 9.26857 0.668417 9.05161 0.885375L5 4.93698L0.948392 0.885374C0.731435 0.668416 0.379676 0.668416 0.162719 0.885374C-0.0542402 1.10233 -0.0542403 1.45409 0.162719 1.67105L4.60716 6.11549C4.82412 6.33245 5.17588 6.33245 5.39284 6.11549L9.83728 1.67105C10.0542 1.45409 10.0542 1.10233 9.83728 0.885375Z"
                      fill="currentColor"
                    ></path>
                  </svg>

                  {/* Folder Icon */}
                  <svg
                    className="h-4 w-4 text-current"
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Folder Icon</title>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 0H1V1H0V2V3V9H1V10H11V9H12V3H11V2H8V1H7V0ZM11 3V9H1V3H7H8H11ZM7 1V2H1V1H7Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="text-sm">Chủ đề</span>
                </button>
                {/* Collapsible Content */}

                <div className={`${isCategoryCollapsed ? 'hidden' : ''}`}>
                  {sortedTags.map((t) => {
                    const tagSlug = slug(t)
                    const isChecked = selectedTags.includes(tagSlug)

                    return (
                      <button
                        key={t}
                        onClick={() => toggleTag(t)}
                        className={`flex items-center gap-2 px-3 py-1 transition-colors duration-150 ${
                          isChecked
                            ? 'border-primary-500'
                            : 'hover:border-primary-400 border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        {/* SVG Checkbox Icon */}
                        <svg
                          className="dark:text-primary-400 h-4 w-4"
                          viewBox="0 0 10 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Checkbox icon</title>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d={
                              isChecked
                                ? 'M1 1L-3.49691e-07 1L-4.37113e-08 8L1 8L1 9L9 9L9 8L10 8L10 1L9 1L9 -3.93402e-07L1 -4.37114e-08L1 1ZM1 1L9 1L9 8L1 8L1 1ZM7 2L8 2L8 3L7 3L7 2ZM6 4L6 3L7 3L7 4L6 4ZM5 5L5 4L6 4L6 5L5 5ZM4 6L4 5L5 5L5 6L4 6ZM3 6L4 6L4 7L3 7L3 6ZM3 6L2 6L2 5L3 5L3 6Z'
                                : 'M1 1L-3.49691e-07 1L-4.37113e-08 8L1 8L1 9L9 9L9 8L10 8L10 1L9 1L9 -3.93402e-07L1 -4.37114e-08L1 1ZM1 1L9 1L9 8L1 8L1 1Z'
                            }
                            fill="currentColor"
                          ></path>
                        </svg>

                        {/* Tag text */}
                        <span className="text-sm text-gray-700 uppercase dark:text-gray-300">
                          {t}
                        </span>

                        {/* Tag count */}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ({tagCounts[t]})
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* danh sách bài viết */}
            <div className="col-span-full grid grid-cols-2 self-start border-b border-current pb-1.5">
              <div className="col-span-full flex gap-1 text-sm text-current uppercase">
                <span>/</span>Bài viết mới nhất
              </div>
            </div>
            <div className="col-span-full">
              {selectedTags.length > 0 && (
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  Đang lọc theo:{' '}
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-xs dark:bg-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* right */}
        <div className="relative col-span-8 col-start-5 ml-10 grid h-full overflow-y-auto">
          <div className="col-span-6 grid auto-rows-auto self-start">
            {/* header */}
            <div className="subgrid align-center grid grid-cols-4 self-start border-b-[0.5px] border-b-current pb-1.5">
              <div className="flex items-center gap-1 text-sm text-current uppercase">
                <span>/</span>Ngày
              </div>

              <div className="col-start-2 flex items-center gap-1 text-sm text-current uppercase">
                <span>/</span>Bài viết
              </div>
            </div>
            {/* danh sách bài viết */}

            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <li key={path} className="py-5">
                    <article>
                      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                            <time dateTime={post.date}>
                              {formatDate(post.date, siteMetadata.locale)}
                            </time>
                          </dd>
                        </dl>
                        <div className="space-y-5 xl:col-span-3">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-2xl leading-8 font-bold tracking-tight">
                                <Link
                                  href={`/blog/${post.slug}`}
                                  className="text-gray-900 dark:text-gray-100"
                                >
                                  {post.title}
                                </Link>
                              </h2>
                              <div className="flex flex-wrap">
                                {(post.tags || []).map((tag) => (
                                  <Tag key={tag} text={tag} />
                                ))}
                              </div>
                            </div>
                            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                              {post.summary}
                            </div>
                          </div>
                          <div className="text-base leading-6 font-medium">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              aria-label={`Read more: "${post.title}"`}
                            >
                              Đọc thêm &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>

            {/* Pagination */}
            {totalPages > 1 && filteredPosts.length > 0 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

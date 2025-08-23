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
import NewsletterForm from 'pliny/ui/NewsletterForm'
import CustomNewsletterForm from '@/components/CustomNewsletterForm'
import LogoBimleak from '@/components/drawingBimleak'

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

    params.set('page', '1') // reset trang về 1
    router.push(`${pathname}?${params.toString()}`)
  }

  const toggleYear = (year: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const current = params.get('year')

    const isSame = current === year

    if (isSame) {
      params.delete('year')
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

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('tag')
    params.delete('year')
    params.set('page', '1') // reset trang về 1
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        {/* <h1
          className="text-3xl leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100"
          style={{ fontFamily: 'var(--font-doto)' }}
        >
          Blog này
        </h1> */}
        <LogoBimleak />
        {/* <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {siteMetadata.description}
        </p> */}
      </div>

      <section className="relative mt-1 grid grid-cols-12 gap-y-7 xl:col-span-12">
        {/* left */}
        <div className="relative col-span-full grid xl:col-span-4">
          <div className="sticky top-28 col-span-full grid grid-cols-4 gap-y-4 self-start border-b">
            <div className="col-span-full grid grid-cols-2 self-start border-b border-current pb-1.5">
              <div className="col-span-1 flex gap-1 text-sm text-current uppercase">
                <span>/</span>Bộ lọc
              </div>
              {/* Xóa bộ lọc */}
              <div className="col-span-1 flex justify-self-end sm:col-start-3">
                <button className="cursor-pointer text-sm uppercase" onClick={handleClearFilters}>
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
                    className={`h-6 w-6 text-current transition-transform duration-200 ${isYearCollapsed ? 'rotate-0' : 'rotate-180'}`}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="m16 28l-7-7l1.4-1.4l5.6 5.6l5.6-5.6L23 21z"
                      fill="currentColor"
                    ></path>
                  </svg>

                  {/* Folder Icon */}
                  <svg
                    className="h-5 w-5 text-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Folder Icon</title>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 6C2 4.75736 3.00736 3.75 4.25 3.75H8.5C9.2082 3.75 9.87508 4.08344 10.3 4.65L11.65 6.45C11.7916 6.63885 12.0139 6.75 12.25 6.75H19.75C20.9926 6.75 22 7.75736 22 9V18C22 19.2426 20.9926 20.25 19.75 20.25H4.25C3.00736 20.25 2 19.2426 2 18V6ZM4.25 5.25C3.83579 5.25 3.5 5.58579 3.5 6V18C3.5 18.4142 3.83579 18.75 4.25 18.75H19.75C20.1642 18.75 20.5 18.4142 20.5 18V9C20.5 8.58579 20.1642 8.25 19.75 8.25H12.25C11.5418 8.25 10.8749 7.91656 10.45 7.35L9.1 5.55C8.95836 5.36115 8.73607 5.25 8.5 5.25H4.25Z"
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
                          className="dark:text-primary-400 h-6 w-6"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Checkbox icon</title>
                          {/* Ô vuông */}
                          <path
                            d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM6 26V6h20v20Z"
                            fill="currentColor"
                          />
                          {/* Dấu tick chỉ hiện khi checked */}
                          {isChecked && (
                            <path
                              d="m14 21.5l-5-4.96L10.59 15L14 18.35L21.41 11L23 12.58l-9 8.92z"
                              fill="currentColor"
                            />
                          )}
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
                    className={`h-6 w-6 text-current transition-transform duration-200 ${isCategoryCollapsed ? 'rotate-0' : 'rotate-180'}`}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="m16 28l-7-7l1.4-1.4l5.6 5.6l5.6-5.6L23 21z"
                      fill="currentColor"
                    ></path>
                  </svg>

                  {/* Folder Icon */}
                  <svg
                    className="h-5 w-5 text-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Folder Icon</title>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 6C2 4.75736 3.00736 3.75 4.25 3.75H8.5C9.2082 3.75 9.87508 4.08344 10.3 4.65L11.65 6.45C11.7916 6.63885 12.0139 6.75 12.25 6.75H19.75C20.9926 6.75 22 7.75736 22 9V18C22 19.2426 20.9926 20.25 19.75 20.25H4.25C3.00736 20.25 2 19.2426 2 18V6ZM4.25 5.25C3.83579 5.25 3.5 5.58579 3.5 6V18C3.5 18.4142 3.83579 18.75 4.25 18.75H19.75C20.1642 18.75 20.5 18.4142 20.5 18V9C20.5 8.58579 20.1642 8.25 19.75 8.25H12.25C11.5418 8.25 10.8749 7.91656 10.45 7.35L9.1 5.55C8.95836 5.36115 8.73607 5.25 8.5 5.25H4.25Z"
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
                        {/* <svg
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
                        </svg> */}

                        <svg
                          className="dark:text-primary-400 h-6 w-6"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Checkbox icon</title>
                          {/* Ô vuông */}
                          <path
                            d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM6 26V6h20v20Z"
                            fill="currentColor"
                          />
                          {/* Dấu tick chỉ hiện khi checked */}
                          {isChecked && (
                            <path
                              d="m14 21.5l-5-4.96L10.59 15L14 18.35L21.41 11L23 12.58l-9 8.92z"
                              fill="currentColor"
                            />
                          )}
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

            {/* Tags Section */}
            {/* <div className="col-span-full">
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
            </div> */}

            {/* Newsletter Section */}
            <div className="col-span-full grid grid-cols-2 self-start border-b border-current pb-1.5">
              <div className="col-span-full flex gap-1 text-sm text-current uppercase">
                <span>/</span> Bản tin
              </div>
            </div>

            {/* Newsletter Form */}
            <div className="col-span-full space-y-4 pb-4 xl:col-span-full">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Đăng ký nhận bài viết mới nhất qua email.
              </p>

              {siteMetadata.newsletter?.provider && (
                <div className="rounded-lg border border-gray-300 p-4 dark:border-gray-600">
                  <CustomNewsletterForm />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* right */}
        <div className="relative col-span-full grid h-full overflow-y-auto xl:col-span-8 xl:col-start-5 xl:ml-10">
          <div className="col-span-6 grid auto-rows-auto self-start">
            {/* header */}
            <div className="subgrid align-center grid grid-cols-4 self-start border-b-[0.5px] border-b-current pb-1.5">
              <div className="flex hidden items-center gap-1 text-sm text-current uppercase xl:block">
                <span>/</span>Ngày
              </div>

              <div className="col-span-full flex items-center gap-1 text-sm text-current uppercase xl:col-start-2">
                <span>/</span>Bài viết
                <div className="normal-case">
                  {selectedTags.length > 0 && (
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      _đang lọc theo:{' '}
                      {selectedTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-primary-500 mr-2 px-3 text-sm uppercase dark:bg-gray-700"
                          style={{ fontFamily: 'var(--font-vt323)' }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
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
                          <dd className="text-base leading-6 text-gray-500 dark:text-gray-400">
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
                              <div
                                className="flex flex-wrap"
                                style={{ fontFamily: 'var(--font-vt323)' }}
                              >
                                {(post.tags || []).map((tag) => (
                                  <Tag key={tag} text={tag} />
                                ))}
                              </div>
                            </div>
                            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                              {post.summary}
                            </div>
                          </div>
                          <Link href={`/blog/${post.slug}`} passHref>
                            <div className="text-primary-500 hover:bg-primary-200 hover:text-primary-600 dark:hover:text-primary-400 flex cursor-pointer justify-center rounded border text-base leading-6 font-medium">
                              Đọc thêm{' '}
                              <svg
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="h-6 w-6"
                              >
                                {' '}
                                <path
                                  d="m18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z"
                                  fill="currentColor"
                                />{' '}
                              </svg>
                            </div>
                          </Link>
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

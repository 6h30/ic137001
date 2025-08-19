'use client'

import { useState } from 'react'
import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { AdUnit } from '@/components/AdUnit'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
  toc?: { title: string; url: string }[]
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
  toc,
}: LayoutProps) {
  const { filePath, path, slug, date, title, tags, readingTime, appendix } = content
  const basePath = path.split('/')[0]

  const [isMetaArticleCollapsed, setIsMetaArticleCollapsed] = useState(true)

  const toggleCollapseMetaArticle = () => {
    setIsMetaArticleCollapsed((prev) => !prev)
  }

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                {/* <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div> */}
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>

            <AdUnit slot="7863436668" format="horizontal" className="mx-auto mb-8 max-w-4xl" />
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
            <section className="relative mt-1 hidden grid-cols-12 gap-y-7 xl:col-span-12 xl:grid">
              {/* left */}
              <div className="relative col-span-full grid xl:col-span-4 xl:pr-10">
                {/*  dữ liệu bài viêt */}
                <div className="sticky top-28 col-span-full grid grid-cols-4 gap-y-4 self-start">
                  <div className="col-span-full grid grid-cols-2 self-start border-b border-current pb-1.5">
                    <div className="col-span-2 flex gap-1 text-sm text-current uppercase">
                      <span>/</span>Dữ liệu bài viết
                    </div>
                  </div>
                  <button
                    className="text-filterTextActive flex cursor-pointer appearance-none flex-row gap-2 pb-2"
                    onClick={toggleCollapseMetaArticle}
                  >
                    {/* Chevron Icon for Chủ đề */}
                    <svg
                      className={`h-1.5 w-2.5 text-current transition-transform duration-200 ${isMetaArticleCollapsed ? 'rotate-0' : 'rotate-180'}`}
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
                  </button>

                  {/* Collapsible Content */}
                  <div className="col-span-full grid self-start pb-4">
                    <div className={`${isMetaArticleCollapsed ? 'hidden' : ''}`}>
                      {/* tên bài viết */}
                      <div className="col-span-4 grid grid-cols-4 self-start border-b-2 border-dotted pb-2">
                        <div className="col-span-4 flex flex-col justify-center">
                          <h2 className="text-xs font-bold tracking-wide text-gray-500 dark:text-gray-400">
                            {title}
                          </h2>
                        </div>
                      </div>
                      {/* ngày viết */}
                      <div className="col-span-4 grid grid-cols-4 self-start border-b-2 border-dotted p-1">
                        {/* Thời gian Section */}
                        <div className="col-span-2 flex flex-col justify-center">
                          <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                            Ngày đăng:
                          </h2>
                        </div>
                        <div
                          className="col-span-2 flex flex-col"
                          style={{ fontFamily: 'var(--font-vt323)' }}
                        >
                          <div>
                            <time dateTime={date}>
                              {new Date(date).toLocaleDateString(
                                siteMetadata.locale,
                                postDateTemplate
                              )}
                            </time>
                          </div>
                        </div>
                      </div>
                      {/* thời gian đọc */}
                      <div className="col-span-4 grid grid-cols-4 self-start border-b-2 border-dotted p-1">
                        {/* Thời gian Section */}
                        <div className="col-span-2 flex flex-col justify-center">
                          <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                            Thời gian đọc:
                          </h2>
                        </div>
                        <div
                          className="col-span-2 flex flex-col"
                          style={{ fontFamily: 'var(--font-vt323)' }}
                        >
                          <div>
                            {readingTime?.minutes && (
                              <span className="reading-time"> {readingTime.minutes} phút</span>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* tags */}
                      <div className="col-span-4 grid grid-cols-4 self-start border-b-2 border-dotted p-1">
                        <div className="col-span-2 flex flex-col justify-center">
                          <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                            Chủ đề:
                          </h2>
                        </div>
                        <div className="col-span-2 flex flex-col">
                          <div>
                            {tags && (
                              <div
                                className="flex flex-wrap"
                                style={{ fontFamily: 'var(--font-vt323)' }}
                              >
                                {tags.map((tag) => (
                                  <Tag key={tag} text={tag} />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* người viết */}
                      <div className="col-span-4 grid grid-cols-4 self-start border-b-2 border-dotted p-1">
                        <div className="col-span-2 flex flex-col">
                          <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                            Người viết:
                          </h2>
                        </div>
                        <div className="col-span-2 flex flex-col justify-center">
                          <div>
                            <ul className="flex flex-wrap gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                              {authorDetails.map((author) => (
                                <li className="flex items-center space-x-2" key={author.name}>
                                  {author.avatar && (
                                    <Image
                                      src={author.avatar}
                                      width={38}
                                      height={38}
                                      alt="avatar"
                                      className="h-10 w-10 rounded-full"
                                    />
                                  )}
                                  <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                                    <dt className="sr-only">Name</dt>
                                    <dd className="text-gray-900 dark:text-gray-100">
                                      {author.name}
                                    </dd>
                                    <dt className="sr-only">Linkedin</dt>
                                    <dd>
                                      {author.linkedin && (
                                        <Link
                                          href={author.linkedin}
                                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                        >
                                          {author.linkedin
                                            .replace('https://www.behance.net/', '@')
                                            .replace('https://x.com/', '@')}
                                        </Link>
                                      )}
                                    </dd>
                                  </dl>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Phụ lục */}
                  <div className="col-span-full grid grid-cols-2 self-start border-b border-current pb-1.5">
                    <div className="col-span-full flex gap-1 text-sm text-current uppercase">
                      <span>/</span> Phụ lục
                    </div>
                  </div>

                  {appendix && appendix.length > 0 && (
                    <div className="col-span-full space-y-6 border-gray-200 pb-4 xl:col-span-full dark:border-gray-700">
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Các nguồn tài liệu tham khảo và tài liệu bổ sung liên quan đến nội dung
                          bài viết:
                        </p>
                        <ul className="list-disc space-y-2 pl-5 text-sm">
                          {appendix.map((item, index) => (
                            <li key={index}>
                              <Link
                                href={item.url}
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center transition-colors duration-200"
                                aria-label={`${item.title} link`}
                              >
                                <span className="mr-2">↳</span> {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* right */}
              <div className="relative col-span-full grid h-full overflow-y-auto xl:col-span-8 xl:col-start-5">
                <div className="col-span-6 grid auto-rows-auto self-start">
                  {/* header */}
                  <div className="subgrid align-center grid grid-cols-4 self-start border-b-[0.5px] border-b-current pb-1.5">
                    <div className="col-span-full flex items-center gap-1 text-sm text-current uppercase">
                      <span>/</span>Bài viết
                      <div className="normal-case"></div>
                    </div>
                  </div>
                  {/* danh sách bài viết */}
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="prose dark:prose-invert pt-5 pb-8">{children}</div>
                    {siteMetadata.comments && (
                      <div
                        className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
                        id="comment"
                      >
                        <Comments slug={slug} />
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </section>

            <div className="xl:hidden">
              {/* header */}
              <div className="subgrid align-center grid grid-cols-4 self-start border-b-[0.5px] border-b-current">
                <div className="col-span-full flex items-center text-sm text-current uppercase">
                  <span>/</span>Bài viết
                  <div className="normal-case"></div>
                </div>
              </div>
              {/* danh sách bài viết */}
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="prose dark:prose-invert max-w-none pt-5 pb-8">{children}</div>
                {siteMetadata.comments && (
                  <div
                    className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
                    id="comment"
                  >
                    <Comments slug={slug} />
                  </div>
                )}
              </ul>
            </div>

            <footer>
              <div className="sticky top-28 col-span-full grid grid-cols-4 gap-y-4 self-start pt-2 xl:hidden">
                <div className="col-span-full grid grid-cols-2 self-start border-b border-current pb-1.5">
                  <div className="col-span-2 flex gap-1 text-sm text-current uppercase">
                    <span>/</span>Dữ liệu bài viết
                  </div>
                </div>
                <button
                  className="text-filterTextActive flex cursor-pointer appearance-none flex-row gap-2 pb-2"
                  onClick={toggleCollapseMetaArticle}
                >
                  {/* Chevron Icon for Chủ đề */}
                  <svg
                    className={`h-1.5 w-2.5 text-current transition-transform duration-200 ${isMetaArticleCollapsed ? 'rotate-0' : 'rotate-180'}`}
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
                </button>

                {/* Collapsible Content */}
                <div className="col-span-full grid self-start pb-4">
                  <div className={`${isMetaArticleCollapsed ? 'hidden' : ''}`}>
                    {/* tên bài viết */}
                    <div className="col-span-4 grid grid-cols-4 self-start border-b-2 border-dotted pb-2">
                      <div className="col-span-4 flex flex-col justify-center">
                        <h2 className="text-xs font-bold tracking-wide text-gray-500 dark:text-gray-400">
                          {title}
                        </h2>
                      </div>
                    </div>
                    {/* ngày viết */}
                    <div className="col-span-4 grid grid-cols-4 self-start border-b-2 border-dotted p-1">
                      {/* Thời gian Section */}
                      <div className="col-span-2 flex flex-col justify-center">
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Ngày đăng:
                        </h2>
                      </div>
                      <div
                        className="col-span-2 flex flex-col"
                        style={{ fontFamily: 'var(--font-vt323)' }}
                      >
                        <div>
                          <time dateTime={date}>
                            {new Date(date).toLocaleDateString(
                              siteMetadata.locale,
                              postDateTemplate
                            )}
                          </time>
                        </div>
                      </div>
                    </div>
                    {/* thời gian đọc */}
                    <div className="col-span-4 grid grid-cols-4 self-start border-b-2 border-dotted p-1">
                      {/* Thời gian Section */}
                      <div className="col-span-2 flex flex-col justify-center">
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Thời gian đọc:
                        </h2>
                      </div>
                      <div
                        className="col-span-2 flex flex-col"
                        style={{ fontFamily: 'var(--font-vt323)' }}
                      >
                        <div>
                          {readingTime?.minutes && (
                            <span className="reading-time"> {readingTime.minutes} phút</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* tags */}
                    <div className="col-span-4 grid grid-cols-4 self-start border-b-2 border-dotted p-1">
                      <div className="col-span-2 flex flex-col justify-center">
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Chủ đề:
                        </h2>
                      </div>
                      <div className="col-span-2 flex flex-col">
                        <div>
                          {tags && (
                            <div
                              className="flex flex-wrap"
                              style={{ fontFamily: 'var(--font-vt323)' }}
                            >
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* người viết */}
                    <div className="col-span-4 grid grid-cols-4 self-start border-b-2 border-dotted p-1">
                      <div className="col-span-2 flex flex-col">
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Người viết:
                        </h2>
                      </div>
                      <div className="col-span-2 flex flex-col justify-center">
                        <div>
                          <ul className="flex flex-wrap gap-4 sm:space-x-12 xl:block xl:space-y-8 xl:space-x-0">
                            {authorDetails.map((author) => (
                              <li className="flex items-center space-x-2" key={author.name}>
                                {author.avatar && (
                                  <Image
                                    src={author.avatar}
                                    width={38}
                                    height={38}
                                    alt="avatar"
                                    className="h-10 w-10 rounded-full"
                                  />
                                )}
                                <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                                  <dt className="sr-only">Name</dt>
                                  <dd className="text-gray-900 dark:text-gray-100">
                                    {author.name}
                                  </dd>
                                  <dt className="sr-only">Linkedin</dt>
                                  <dd>
                                    {author.linkedin && (
                                      <Link
                                        href={author.linkedin}
                                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                      >
                                        {author.linkedin
                                          .replace('https://www.behance.net/', '@')
                                          .replace('https://x.com/', '@')}
                                      </Link>
                                    )}
                                  </dd>
                                </dl>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Phụ lục */}
                <div className="col-span-full grid grid-cols-2 self-start border-b border-current pb-1.5">
                  <div className="col-span-full flex gap-1 text-sm text-current uppercase">
                    <span>/</span> Phụ lục
                  </div>
                </div>

                {appendix && appendix.length > 0 && (
                  <div className="col-span-full space-y-6 border-gray-200 pb-4 xl:col-span-full dark:border-gray-700">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Các nguồn tài liệu tham khảo và tài liệu bổ sung liên quan đến nội dung bài
                        viết:
                      </p>
                      <ul className="list-disc space-y-2 pl-5 text-sm">
                        {appendix.map((item, index) => (
                          <li key={index}>
                            <Link
                              href={item.url}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center transition-colors duration-200"
                              aria-label={`${item.title} link`}
                            >
                              <span className="mr-2">↳</span> {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="divide-gray-200 text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2 xl:divide-y dark:divide-gray-700">
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Bài viết trước
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Bài kế tiếp
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Back to the blog"
                >
                  &larr; Quay lại Blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}

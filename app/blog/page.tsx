import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { Suspense } from 'react'
import ListLayout from '@/layouts/ListLayoutWithTags'

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const allPosts = sortPosts(allBlogs)
  const posts = allCoreContent(allPosts)

  return (
    <Suspense fallback={<div>Loading blog...</div>}>
      <ListLayout posts={posts} title="Tất cả bài viết" />
    </Suspense>
  )
}

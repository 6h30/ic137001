import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { Suspense } from 'react'
import ListLayout from '@/layouts/ListLayoutWithTags'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return (
    <Suspense fallback={<div>Loading blog list...</div>}>
      <ListLayout posts={posts} title="Tất cả bài viết" />
    </Suspense>
  )
}

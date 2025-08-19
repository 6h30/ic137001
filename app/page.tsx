import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { Suspense } from 'react'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { AdSenseAutoAds } from '@/components/AutoAds'
import { isProduction } from '@/components/config'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return (
    <Suspense fallback={<div>Đang tải các bài viết...</div>}>
      {isProduction && <AdSenseAutoAds />}
      <ListLayout posts={posts} title="Tất cả bài viết" />
    </Suspense>
  )
}

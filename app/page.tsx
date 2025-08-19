import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { Suspense } from 'react'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { AdSenseAutoAds } from '@/components/AutoAds'
import { isProduction } from '@/components/config'
import { AdUnit } from '@/components/AdUnit'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return (
    // <Suspense fallback={<div>Đang tải các bài viết...</div>}>
    //   {isProduction && <AdSenseAutoAds />}
    //   <ListLayout posts={posts} title="Tất cả bài viết" />
    // </Suspense>
    <>
      {/* Auto Ads sẽ load trên toàn bộ trang */}
      {isProduction && <AdSenseAutoAds />}

      <Suspense
        fallback={<div className="py-8 text-center text-gray-500">Đang tải các bài viết...</div>}
      >
        <div className="space-y-4">
          {/* Có thể thêm AdUnit ở đây nếu muốn quảng cáo cụ thể */}
          <ListLayout posts={posts} title="Tất cả bài viết" />

          {/* Thêm quảng cáo ở cuối danh sách */}
          {isProduction && (
            <div className="mt-8">
              <AdUnit slot="7863436668" format="autorelaxed" className="my-4" />
            </div>
          )}
        </div>
      </Suspense>
    </>
  )
}

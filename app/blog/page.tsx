// import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
// import { allBlogs } from 'contentlayer/generated'
// import { genPageMetadata } from 'app/seo'
// import ListLayout from '@/layouts/ListLayoutWithTags'

// export const metadata = genPageMetadata({ title: 'Blog' })

// export default async function BlogPage({
//   searchParams,
// }: {
//   searchParams?: { tag?: string; page?: string }
// }) {
//   const selectedTags = searchParams?.tag?.split(',') ?? []

//   const allPosts = sortPosts(allBlogs)

//   const filteredPosts =
//     selectedTags.length > 0
//       ? allPosts.filter((post) => selectedTags.every((tag) => post.tags?.includes(tag)))
//       : allPosts

//   const posts = allCoreContent(filteredPosts)

//   return <ListLayout posts={posts} title="Tất cả bài viết" />
// }

import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const allPosts = sortPosts(allBlogs)
  const posts = allCoreContent(allPosts)

  return <ListLayout posts={posts} title="Tất cả bài viết" />
}

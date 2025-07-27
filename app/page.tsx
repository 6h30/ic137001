import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
// import Main from './Main'
import ListLayout from '@/layouts/ListLayoutWithTags'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  // return <Main posts={posts} />
  return <ListLayout posts={posts} title="Tất cả bài viết" />
}

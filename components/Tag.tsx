// import Link from 'next/link'
// import { slug } from 'github-slugger'
// interface Props {
//   text: string
// }

// const Tag = ({ text }: Props) => {
//   return (
//     <Link
//       href={`/tags/${slug(text)}`}
//       className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
//     >
//       {text.split(' ').join('-')}
//     </Link>
//   )
// }

// export default Tag

'use client'

import { useRouter } from 'next/navigation'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  const router = useRouter()

  const handleClick = () => {
    const tagSlug = slug(text)
    router.push(`/blog?tag=${tagSlug}&page=1`)
  }

  return (
    <button
      onClick={handleClick}
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 cursor-pointer text-sm font-medium uppercase"
    >
      {text.split(' ').join('-')}
    </button>
  )
}

export default Tag

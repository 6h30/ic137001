import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="py-8">
      <div className="flex h-[34px] w-full flex-row items-center justify-between whitespace-nowrap">
        <div className="flex h-[32px] items-center pl-4">
          {/* <Link href="/">{`© ${new Date().getFullYear()} ${siteMetadata.title}`}</Link> */}
          <Link href="https://www.portfolio-1.site/">{`© 2023 / dcviet`}</Link>
        </div>
        <div className="flex h-[32px] items-center space-x-4 pr-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
          <SocialIcon kind="github" href={siteMetadata.github} size={5} />
          <SocialIcon kind="behance" href={siteMetadata.linkedin} size={5} />
          {/* <Link
            href="/"
            className="hover:text-primary-500 transition-colors"
          >
            {`${siteMetadata.author}`}
          </Link> */}
        </div>
      </div>
    </footer>
  )
}

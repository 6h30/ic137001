'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
// import Logo from '@/data/logo.svg'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { AdUnit } from './AdUnit'

const Header = () => {
  let headerClass = 'flex flex-col'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <>
      <header className={headerClass}>
        <div className="flex w-full items-center justify-between bg-white py-10 dark:bg-gray-950">
          <Link href="/" aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between">
              <div className="mr-3">{/* <Logo /> */}</div>

              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="hidden h-6 text-2xl font-semibold sm:block">
                  {siteMetadata.headerTitle}
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>
          <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
            <div className="no-scrollbar hidden max-w-40 items-center gap-x-4 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
              {headerNavLinks
                .filter((link) => link.href !== '/')
                .map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="hover:text-primary-500 dark:hover:text-primary-400 m-1 font-medium text-gray-900 dark:text-gray-100"
                  >
                    {link.title}
                  </Link>
                ))}
            </div>
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </header>
      <div className="mt-4 flex w-full text-center">
        <AdUnit slot="7863436668" format="auto" className="mx-auto block max-w-[728px]" />
      </div>
    </>
  )
}

export default Header

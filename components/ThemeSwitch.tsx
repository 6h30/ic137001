'use client'

import { Fragment, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from '@headlessui/react'

const Sun = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="currentColor"
    className="group:hover:text-gray-100 h-6 w-6"
  >
    <path
      fillRule="evenodd"
      d="M15 2h2v4.96h-2zm6.687 6.89l3.507-3.506l1.414 1.414l-3.507 3.507zM25.04 15H30v2h-4.96zm-3.347 8.104l1.414-1.414l3.507 3.507L25.2 26.61zM15 25.04h2V30h-2zm-9.604.162l3.508-3.507l1.414 1.414l-3.507 3.507zM2 15h4.96v2H2zm3.39-8.197l1.415-1.414l3.507 3.507l-1.414 1.414zM16 12a4 4 0 1 1-4 4a4 4 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6Z"
      clipRule="evenodd"
    />
  </svg>
)
const Moon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="currentColor"
    className="group:hover:text-gray-100 h-6 w-6"
  >
    <path d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3Z" />
  </svg>
)

const Monitor = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="group:hover:text-gray-100 h-6 w-6"
  >
    <path
      d="M28 4H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8v4H8v2h16v-2h-4v-4h8a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM18 28h-4v-4h4Zm10-6H4V6h24Z"
      fill="currentColor"
    />
  </svg>
)

const Blank = () => <svg className="h-6 w-6" />

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-center">
          <MenuButton aria-label="Theme switcher">
            {mounted ? resolvedTheme === 'dark' ? <Moon /> : <Sun /> : <Blank />}
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="ring-opacity-5 absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-hidden dark:bg-gray-800">
            <RadioGroup value={theme} onChange={setTheme}>
              <div className="p-1">
                <Radio value="light">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        className={`${focus ? 'bg-primary-600 text-white' : ''} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <div className="mr-2">
                          <Sun />
                        </div>
                        Sáng
                      </button>
                    )}
                  </MenuItem>
                </Radio>
                <Radio value="dark">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        className={`${
                          focus ? 'bg-primary-600 text-white' : ''
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <div className="mr-2">
                          <Moon />
                        </div>
                        Tối
                      </button>
                    )}
                  </MenuItem>
                </Radio>
                <Radio value="system">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        className={`${
                          focus ? 'bg-primary-600 text-white' : ''
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <div className="mr-2">
                          <Monitor />
                        </div>
                        Hệ thống
                      </button>
                    )}
                  </MenuItem>
                </Radio>
              </div>
            </RadioGroup>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}

export default ThemeSwitch

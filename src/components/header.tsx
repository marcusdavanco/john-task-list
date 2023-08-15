'use client'

import { ChevronLeft, Menu } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const currentPath = pathname.split('/')
  const router = useRouter()

  return (
    <header className="flex justify-between border-b-2 border-primary-100 px-3 py-[18px] lg:justify-center lg:bg-black lg:border-none lg:py-[4rem]">
      {pathname.endsWith('/tasks') ? (
        <Menu
          size={24}
          className="text-primary-100 cursor-not-allowed lg:hidden"
        />
      ) : (
        <button onClick={() => router.push('../')}>
          <ChevronLeft
            size={24}
            className="text-primary-100 cursor-pointer lg:mr-auto block"
          />
        </button>
      )}
      <h1 className="text-secondary-300 uppercase font-bold lg:text-4xl lg:mx-auto">
        {currentPath.includes('manage')
          ? 'manage'
          : currentPath[currentPath.length - 1]}
      </h1>
    </header>
  )
}

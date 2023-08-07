'use client'

import { ChevronLeft, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from 'next/link'

export function Header() {
  const pathname = usePathname()
  const currentPath = pathname.split('/')

  return (
    <header className='flex justify-between border-b-2 border-primary-100 px-3 py-[18px]'>
      {currentPath[currentPath.length - 1] === 'tasks' ? <Menu size={24} className="text-primary-100" /> : <Link href="/tasks"><ChevronLeft size={24} className="text-primary-100" /></Link>}
      <h1 className="text-secondary-300 uppercase font-bold">{currentPath[currentPath.length - 1]}</h1>
    </header>
  )
}
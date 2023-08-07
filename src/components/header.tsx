'use client'

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname()

  return (
    <header className='flex justify-between border-b-2 border-primary-100 px-3 py-[18px]'>
      <Menu size={24} className="text-primary-100" />
      <h1 className="text-secondary-300 uppercase font-bold">{pathname.replace('/', '')}</h1>
    </header>
  )
}
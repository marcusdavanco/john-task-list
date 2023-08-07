'use client'

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname()

  return (
    <header className='flex justify-between border-b-2 border-gray-800 px-3 py-[18px]'>
      <Menu size={24} className="text-gray-800" />
      <h1 className="text-gray-800 uppercase font-bold">{pathname.replace('/', '')}</h1>
    </header>
  )
}
'use client'

import { Plus } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

export function Button() {
  const path = usePathname()
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(`${path}/manage`)}
      className="flex justify-center items-center h-12 w-12 rounded-full bg-secondary-300 fixed bottom-7 lg:bottom-[5rem] right-3 lg:right-[50%] brightness-75 md:hover:scale-110 md:hover:brightness-100 hover:transition hover:duration-300"
    >
      <Plus size={28} className="text-white" />
    </button>
  )
}

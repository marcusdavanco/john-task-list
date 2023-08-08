"use client"

import { Plus } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export function Button() {
  const path = usePathname()
  const router = useRouter()

  return (
    <button onClick={() => router.push(`${path}/manage`)} className="flex justify-center items-center h-12 w-12 rounded-full bg-secondary-300 fixed bottom-7 right-3">
      <Plus size={28} className="text-white" />
    </button>
  )
}
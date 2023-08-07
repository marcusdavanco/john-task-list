import { Menu } from "lucide-react";


export function Header() {
  return (
    <header className='flex justify-between border-b-2 border-primary-100 px-3 py-[18px]'>
      <Menu size={24} className="text-primary-100" />
      <h1 className="text-primary-100 uppercase font-bold">Tasks</h1>
    </header>
  )
}
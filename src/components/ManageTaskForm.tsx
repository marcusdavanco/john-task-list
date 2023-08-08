"use client"
import { usePathname } from "next/navigation";
import { Card } from "./card";

export function ManageTaskForm() {
  const path = usePathname()

  return (
    <form className="flex flex-col items-center w-full gap-7 mb-7">
      <header className="flex justify-between items-center w-full">
        <h2 className="text-secondary-300 font-bold uppercase text-xs">{path.endsWith('manage') ? 'New Task' : "Edit Task"}</h2>
      </header>
      <section className='flex flex-col gap-4 w-full'>
        <Card customHeight>
          <div className="flex flex-col gap-4 flex-1 ">
            <label className="flex flex-col gap-1">
              <span className="text-xs uppercase font-bold mb-1">Due</span>
              <input type="date" className="border-white border-[1px] bg-transparent rounded-md h-10 p-3" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs uppercase font-bold mb-1">Description</span>
              <textarea rows={3} maxLength={120} className="border-white border-[1px] bg-transparent rounded-md h-24 p-3" />
            </label>
            <button className="px-4 py-2 bg-secondary-300 rounded-md font-bold text-sm">
              {path.endsWith('manage') ? 'Add' : "Edit"}
            </button>
          </div>
        </Card>
      </section>
    </form>
  )
}
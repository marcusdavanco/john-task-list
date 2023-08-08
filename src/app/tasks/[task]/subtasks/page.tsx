import { Button } from "@/components/button";
import { Task } from "@/components/task";
import { ArrowUpDown } from "lucide-react";

export default function Tasks() {
  return (
    <main className="flex min-h-screen flex-col items-center px-[18px] py-7">
      <article className="flex flex-col items-center w-full gap-7 mb-7">
        <header className="flex justify-between items-center w-full">
          <h2 className="text-secondary-300 font-bold uppercase text-xs">Foo - Due today</h2>
          <ArrowUpDown size={16} className="text-secondary-300" />
        </header>
        <section className='flex flex-col gap-4 w-full'>
          <Task />
          <Task />
        </section>
      </article>
      <article className="flex flex-col items-center w-full gap-7">
        <header className="flex justify-between items-center w-full">
          <h2 className="text-secondary-300 font-bold uppercase text-xs">done</h2>
        </header>
        <section className='flex flex-col gap-4 w-full'>
          <Task completed />
        </section>
      </article>
      <Button />
    </main>
  )
}
import { Button } from '@/components/button'
import { Task } from '@/components/task'
import { ArrowUpDown } from 'lucide-react'

export default function Tasks() {
  return (
    <main className="flex flex-1 flex-col items-center px-[18px] py-7">
      <div className="block w-full lg:flex gap-8 justify-center">
        <article className="flex flex-col items-center w-full lg:max-w-[46rem] gap-7 mb-7">
          <header className="flex justify-between items-center w-full max-w-[46rem]">
            <h2 className="text-secondary-300 font-bold uppercase text-xs">
              Foo - Due today
            </h2>
            <ArrowUpDown
              size={16}
              className="text-secondary-300 cursor-pointer"
            />
          </header>
          <section className="flex flex-col gap-4 w-full items-center">
            <Task />
            <Task />
          </section>
        </article>
        <article className="flex flex-col items-center w-full lg:max-w-[46rem] gap-7">
          <header className="flex justify-between items-center w-full max-w-[46rem]">
            <h2 className="text-secondary-300 font-bold uppercase text-xs">
              done
            </h2>
            <ArrowUpDown
              size={16}
              className="text-secondary-300 cursor-pointer"
            />
          </header>
          <section className="flex flex-col gap-4 w-full items-center">
            <Task completed />
          </section>
        </article>
      </div>
      <Button />
    </main>
  )
}

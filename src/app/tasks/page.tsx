import { Button } from '@/components/button'
import { Task as TaskCard } from '@/components/TaskList/components/task'
import { Task } from '@prisma/client'

import { ArrowUpDown } from 'lucide-react'

export default async function Tasks() {
  const response = await fetch('http://localhost:3000/api/tasks', {
    cache: 'no-store',
  }) // TODO: get base url 
  const { tasks } = await response.json()

  return (
    <main className="flex flex-1 h flex-col items-center px-[18px] py-7 relative">
      <div className="block w-full lg:flex gap-8 justify-center">
        <article className="flex flex-col items-center w-full lg:max-w-[46rem] gap-7 mb-7">
          <header className="flex justify-between items-center w-full max-w-[46rem]">
            <h2 className="text-secondary-300 font-bold uppercase text-xs">
              todo
            </h2>
            <ArrowUpDown
              size={16}
              className="text-secondary-300 cursor-pointer"
            />
          </header>
          <section className="flex flex-col gap-4 w-full items-center">
            {tasks.map(task => {
              return <TaskCard key={task.id} />
            })}

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
            <TaskCard completed />
            <TaskCard completed />
            <TaskCard completed />
          </section>
        </article>
      </div>
      <Button />
    </main>
  )
}

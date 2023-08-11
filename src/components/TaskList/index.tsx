'use client'
import { ArrowUpDown } from 'lucide-react'
import { useTasks } from '@/hooks/queries/task'
import { Task } from './components/task'
import { useEffect } from 'react'

interface TaskListProps {
  complete: boolean
}

export function TaskList({ complete }: TaskListProps) {
  const { data } = useTasks()
  data && data.tasks

  return (

    <article className="flex flex-col items-center w-full lg:max-w-[46rem] gap-7 mb-7">
      <header className="flex justify-between items-center w-full max-w-[46rem]">
        <h2 className="text-secondary-300 font-bold uppercase text-xs">
          {complete ? 'done' : 'to do'}
        </h2>
        <ArrowUpDown size={16} className="text-secondary-300 cursor-pointer" />
      </header>
      <section className="flex flex-col gap-4 w-full items-center">
        {data && data.tasks.filter(task => task.completed === complete).map((task) => {
          return <Task key={task.id} data={task} />
        })}
      </section>
    </article>
  )
}

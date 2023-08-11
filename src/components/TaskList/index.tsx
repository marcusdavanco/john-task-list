'use client'
import { ArrowUpDown } from 'lucide-react'
import { useTasks } from '@/hooks/queries/task'
import { Task } from './components/task'
import { useMemo } from 'react'

interface TaskListProps {
  complete: boolean
}

export function TaskList({ complete }: TaskListProps) {
  const { data } = useTasks()
  data && data.tasks

  const cardsToDisplay = useMemo(() => {
    if (!data) return []
    return data.tasks.filter(task => task.completed === complete)
  }, [data?.tasks])

  return (
    <article className="flex flex-col items-center w-full lg:max-w-[46rem] gap-7 mb-7">
      {cardsToDisplay.length > 0 && <header className="flex justify-between items-center w-full max-w-[46rem]">
        <h2 className="text-secondary-300 font-bold uppercase text-xs">
          {complete ? 'done' : 'to do'}
        </h2>
        <ArrowUpDown size={16} className="text-secondary-300 cursor-pointer" />
      </header>}
      <section className="flex flex-col gap-4 w-full items-center">
        {cardsToDisplay.map((task) => {
          return <Task key={task.id} data={task} />
        })}
      </section>
    </article>
  )
}

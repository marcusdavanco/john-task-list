'use client'
import { ArrowUpDown } from 'lucide-react'
import { useTasks } from '@/hooks/queries/task'
import { useSubtasks } from '@/hooks/queries/subtask'
import { Task } from './components/task'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

interface TaskListProps {
  complete: boolean
}

export function TaskList({ complete }: TaskListProps) {
  const path = usePathname()

  const { data: taskData } = useTasks({
    enabled: !path.includes('subtasks'),
    initialData: { tasks: [] },
  })

  const { data: subtaskData } = useSubtasks(path.split('/')[2], {
    enabled: path.includes('subtasks'),
    initialData: { subtasks: [] },
  })

  const cardsToDisplay = useMemo(() => {
    if (path.includes('subtasks')) {
      if (!subtaskData) return []
      return subtaskData.subtasks.filter(
        (subtask) => subtask.completed === complete,
      )
    }

    if (!taskData) return []
    return taskData.tasks.filter((task) => task.completed === complete)
  }, [taskData?.tasks, subtaskData?.subtasks])

  return (
    <article className="flex flex-col items-center w-full lg:max-w-[46rem] gap-7 mb-7">
      {cardsToDisplay.length > 0 && (
        <header className="flex justify-between items-center w-full max-w-[46rem]">
          <h2 className="text-secondary-300 font-bold uppercase text-xs">
            {complete ? 'done' : 'to do'}
          </h2>
          <ArrowUpDown
            size={16}
            className="text-secondary-300 cursor-pointer"
          />
        </header>
      )}
      <section className="flex flex-col gap-4 w-full items-center">
        {cardsToDisplay.map((data) => {
          return <Task key={data.id} data={data} />
        })}
      </section>
    </article>
  )
}

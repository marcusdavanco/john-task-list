'use client'
import { ArrowUpDown, SortAscIcon } from 'lucide-react'
import { useTasks } from '@/hooks/queries/task'
import { useSubtasks } from '@/hooks/queries/subtask'
import { Task } from './components/task'
import { useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

enum SortOptions {
  TITLE = 'title',
  DUE_DATE = 'due_date',
  CREATED_AT = 'created_at',
}

interface TaskListProps {
  complete: boolean
}

export function TaskList({ complete }: TaskListProps) {
  const [sortMethod, setSortMethod] = useState<SortOptions>(
    SortOptions.CREATED_AT,
  )
  const path = usePathname()
  const sortButtonRef = useRef<HTMLButtonElement>(null)

  const handleSort = () => {
    const newSortMethod =
      sortMethod === SortOptions.TITLE
        ? SortOptions.DUE_DATE
        : SortOptions.TITLE

    setSortMethod(newSortMethod)

    cardsToDisplay.sort((a, b) => {
      if (newSortMethod === SortOptions.TITLE) {
        return a.title.localeCompare(b.title)
      }
      if (newSortMethod === SortOptions.DUE_DATE) {
        const aDate = a.due_date ? new Date(a.due_date) : null
        const bDate = b.due_date ? new Date(b.due_date) : null

        if (!aDate && !bDate) return 0
        if (!aDate) return 1
        if (!bDate) return -1

        return aDate.getTime() - bDate.getTime()
      }
      return 0
    })

    sortButtonRef.current?.classList.toggle('rotate-180')
  }

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
          <h2 className="text-secondary-300 font-bold uppercase text-xs animate-fade">
            {complete ? 'done' : 'to do'}
          </h2>
          <div className="flex items-center gap-1">
            <span className="text-secondary-300 text-xs font-bold uppercase">{`${
              sortMethod === SortOptions.CREATED_AT
                ? ''
                : sortMethod.replace('_', ' ')
            }`}</span>
            <button
              onClick={handleSort}
              ref={sortButtonRef}
              className="transition-transform duration-300"
            >
              <ArrowUpDown
                size={16}
                className="text-secondary-300 cursor-pointer"
              />
            </button>
          </div>
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

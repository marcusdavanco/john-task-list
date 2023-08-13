'use client'
import { Calendar, Trash2 } from 'lucide-react'
import { Card } from '@/components/card'
import { useRouter } from 'next/navigation'
import { useLongPress } from '@uidotdev/usehooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { type Task } from '@/types/task'
import { useMemo } from 'react'

interface TaskOrSubtask extends Task {
  task_id?: string
}
interface TaskProps {
  data: TaskOrSubtask
}

export function Task({
  data: { id, completed, title, due_date, task_id = undefined },
}: TaskProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const isSubtask: boolean = useMemo(() => {
    return !!task_id
  }, [])

  const toogleTaskComplete = useMutation({
    mutationFn: (id: string) => {
      const data = api.patch(
        isSubtask ? `/tasks/${task_id}/subtasks/${id}` : `/tasks/${id}`,
      )
      return data
    },
    onError: () => (error: ErrorEvent) => {
      console.error(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(isSubtask ? ['subtasks'] : ['tasks'])
    },
  })

  const deleteTask = useMutation({
    mutationFn: (id: string) => {
      const data = api.delete(
        isSubtask ? `/tasks/${task_id}/subtasks/${id}` : `/tasks/${id}`,
      )

      return data
    },
    onError: () => (error: ErrorEvent) => {
      console.error(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(isSubtask ? ['subtasks'] : ['tasks'])
    },
  })

  const handleChange = () => {
    toogleTaskComplete.mutate(id)
  }

  const handleDelete = () => {
    deleteTask.mutate(id)
  }

  const attrs = useLongPress(
    () => {
      router.push(
        isSubtask
          ? `/tasks/${task_id}/subtasks/manage/${id}`
          : `/tasks/manage/${id}`,
      )
    },
    {
      threshold: 500,
    },
  )

  return (
    <Card opaque={!completed}>
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-6 items-center">
          <input
            checked={completed}
            type="checkbox"
            onChange={handleChange}
            className={`appearance-none relative p-1 h-[26px] before:inline-block before:w-[18px] before:p-1 before:h-[18px] before:bg-transparent before:absolute: before:left-0 before:rounded-full before:border-2 before:border-secondary-300 before:transition before:duration-200 before:opacity-100 before:checked:opacity-0 after:inline-block after:w-[18px] after:h-[18px] after:left-[4px] after:top-[4px] after:checked:bg-secondary-300 after:absolute after:rounded-full after:border-2 after:border-none after:transition after:duration-200 after:opacity-100 after:checked:opacity-100 after:checked:bg-checkmark after:checked:bg-no-repeat after:checked:bg-center after:checked:bg-auto`}
          />
          <div className="flex flex-col gap-[10px]">
            <span
              onClick={() => !isSubtask && router.push(`/tasks/${id}/subtasks`)}
              {...attrs}
              className={`font-bold line-clamp-1 mr-4 ${
                completed
                  ? ' text-gray-700 line-through'
                  : 'text-gray-300 cursor-pointer'
              }`}
            >
              {title}
            </span>

            {due_date && (
              <div className="flex gap-1 items-center">
                <Calendar
                  size={14}
                  className={`text-xs ${
                    completed ? 'text-gray-700' : 'text-gray-400'
                  }`}
                />
                <span
                  className={`text-xs ${
                    completed ? 'text-gray-700' : 'text-gray-500'
                  }`}
                >
                  {`Due ${due_date
                    .split('T')[0]
                    .replace(/(\d{4})-(\d{2})-(\d{2})/g, '$3/$2/$1')}`}
                </span>
              </div>
            )}
          </div>
        </div>
        <button onClick={handleDelete}>
          <Trash2
            size={20}
            className={`${completed ? 'text-gray-700' : 'text-gray-400'}`}
          />
        </button>
      </div>
    </Card>
  )
}

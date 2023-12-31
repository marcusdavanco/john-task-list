'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Card } from './card'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useEffect, useMemo } from 'react'
import { useTaskById } from '@/hooks/queries/task'
import { useSubtaskById } from '@/hooks/queries/subtask'
import { Task } from '@/types/task'
import { Subtask } from '@/types/subtask'

export function ManageForm() {
  const path = usePathname()
  const router = useRouter()
  const queryClient = useQueryClient()

  const isSubtask: boolean = useMemo(() => {
    return path.includes('subtasks')
  }, [])

  const isNew: boolean = useMemo(() => {
    return path.endsWith('manage')
  }, [])

  const { data: task } = useTaskById<Task>(path.split('/')[3], {
    enabled: !isSubtask && !isNew,
  })

  const { data: subtask } = useSubtaskById<Subtask>(
    path.split('/')[2],
    path.split('/')[5],
    { enabled: isSubtask && !isNew },
  )

  const ManageFormSchema = z.object({
    due_date: z.string().optional(),
    title: z.string().min(1, { message: 'Title is required' }),
  })

  type ManageFormInputs = z.infer<typeof ManageFormSchema>

  const { register, handleSubmit, formState, reset } =
    useForm<ManageFormInputs>({
      resolver: zodResolver(ManageFormSchema),
    })

  const save = useMutation({
    mutationFn: (data: ManageFormInputs) =>
      isSubtask
        ? api.post(`/tasks/${path.split('/')[2]}/subtasks`, data)
        : api.post(`/tasks`, data),
    onError: () => (error: ErrorEvent) => {
      console.log(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(isSubtask ? ['subtasks'] : ['tasks'])
      router.push(
        isSubtask ? `/tasks/${path.split('/')[2]}/subtasks` : '/tasks',
      )
    },
  })

  const update = useMutation({
    mutationFn: (data: ManageFormInputs) =>
      isSubtask
        ? api.put(
            `/tasks/${path.split('/')[2]}/subtasks/${path.split('/')[5]}`,
            data,
          )
        : api.put(`/tasks/${path.split('/')[3]}`, data),
    onError: () => (error: ErrorEvent) => {
      console.log(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(isSubtask ? ['subtasks'] : ['tasks'])
      router.push(
        isSubtask ? `/tasks/${path.split('/')[2]}/subtasks/` : '/tasks',
      )
    },
  })

  const onSubmit: SubmitHandler<ManageFormInputs> = async (
    data: ManageFormInputs,
  ) => {
    if (!data.title) {
      return
    }

    isNew ? save.mutate(data) : update.mutate(data)
  }

  useEffect(() => {
    if (isNew) {
      reset({
        title: '',
        due_date: '',
      })
    }

    reset({
      title: isSubtask ? subtask?.title : task?.title,
      due_date: isSubtask
        ? subtask?.due_date?.split('T')[0]
        : task?.due_date?.split('T')[0],
    })
  }, [task, subtask, isNew, isSubtask, reset])

  return (
    <form
      className="flex flex-col items-center w-full gap-7 mb-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="flex justify-between items-center w-full max-w-[46rem]">
        <h2 className="text-secondary-300 font-bold uppercase text-xs animate-fade">{`${
          path.endsWith('manage') || path.endsWith('tasks') ? 'New' : 'Edit'
        } ${path.includes('subtask') ? 'Subtask' : 'Task'}`}</h2>
      </header>
      <section className="flex flex-col gap-4 w-full items-center">
        <Card customHeight>
          <div className="flex flex-col gap-4 flex-1 ">
            <label className="flex flex-col gap-1">
              <div>
                <span className="text-xs uppercase font-bold mb-1 text-white">
                  Due
                </span>
                <span className="text-xs text-gray-700 uppercase mb-1 ml-1">
                  (optional)
                </span>
              </div>

              <input
                type="date"
                className="bg-white/30 invert text-black rounded-md h-10 p-3 w-full"
                {...register('due_date')}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs uppercase font-bold mb-1 text-white">
                Description
              </span>

              <textarea
                rows={3}
                maxLength={120}
                className=" bg-white/30 invert text-black rounded-md h-24 p-3"
                {...register('title')}
              />
            </label>
            <button
              className="px-4 py-2 bg-secondary-300 rounded-md font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed text-white"
              disabled={formState.isSubmitting || !formState.isDirty}
              type="submit"
            >
              {path.endsWith('manage') || path.endsWith('tasks')
                ? 'Add'
                : 'Edit'}
            </button>
          </div>
        </Card>
      </section>
    </form>
  )
}

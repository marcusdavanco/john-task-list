'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Card } from './card'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useMemo } from 'react'

export function ManageTaskForm() {
  const path = usePathname()
  const router = useRouter()
  const queryClient = useQueryClient()

  const isSubtask: boolean = useMemo(() => {
    return path.includes('subtask')
  }, [])

  const isNew: boolean = useMemo(() => {
    return path.endsWith('subtasks') || path.endsWith('tasks')
  }, [])

  // const { data: task } = useTaskById({ enabled: !isSubtask && !isNew })
  // const { data: subtask } = useSubtaskbyId({ enabled: isSubtask && !isNew })

  const ManageFormSchema = z.object({
    due_date: z.string().optional(),
    title: z.string().min(1, { message: 'Title is required' }),
  })

  type ManageFormInputs = z.infer<typeof ManageFormSchema>

  const { register, handleSubmit, formState } = useForm<ManageFormInputs>({
    resolver: zodResolver(ManageFormSchema),
  })

  const save = useMutation({
    mutationFn: (data: ManageFormInputs) => api.post(`/tasks`, data),
    onError: () => (error: ErrorEvent) => {
      console.log(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks'])
      router.push('/tasks')
    },
  })

  const onSubmit: SubmitHandler<ManageFormInputs> = async (
    data: ManageFormInputs,
  ) => {
    if (!data.title) {
      return
    }

    save.mutate(data)
  }

  return (
    <form
      className="flex flex-col items-center w-full gap-7 mb-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="flex justify-between items-center w-full max-w-[46rem]">
        <h2 className="text-secondary-300 font-bold uppercase text-xs">{`${path.endsWith('manage') || path.endsWith('tasks') ? 'New' : 'Edit'
          } ${path.includes('subtask') ? 'Subtask' : 'Task'}`}</h2>
      </header>
      <section className="flex flex-col gap-4 w-full items-center">
        <Card customHeight>
          <div className="flex flex-col gap-4 flex-1 ">
            <label className="flex flex-col gap-1">
              <div>
                <span className="text-xs uppercase font-bold mb-1">Due</span>
                <span className="text-xs text-gray-700 uppercase mb-1 ml-1">
                  (optional)
                </span>
              </div>

              <input
                type="date"
                className="bg-white/30 invert text-black rounded-md h-10 p-3"
                {...register('due_date')}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs uppercase font-bold mb-1">
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
              className="px-4 py-2 bg-secondary-300 rounded-md font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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

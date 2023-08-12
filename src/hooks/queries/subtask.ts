import { api } from '@/lib/axios'
import { Subtask } from '@/types/Subtask'
import {
  QueryFunctionContext,
  UseQueryOptions,
  useQuery,
} from '@tanstack/react-query'

export type SubtasksQueryKey = ['subtasks', string]

async function getSubtasks({
  queryKey,
}: QueryFunctionContext<SubtasksQueryKey>) {
  const [, id] = queryKey
  const { data } = await api.get(`/tasks/${id}/subtasks`)
  return data
}

export const useSubtasks = <TData = { subtasks: Subtask[] }>(
  id: string,
  options: UseQueryOptions<
    { subtasks: Subtask[] },
    unknown,
    TData,
    SubtasksQueryKey
  > = {},
) => {
  return useQuery({
    queryKey: ['subtasks', id],
    queryFn: getSubtasks,
    ...options,
    enabled: !!id,
  })
}

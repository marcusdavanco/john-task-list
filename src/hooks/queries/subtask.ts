import { api } from '@/lib/axios'
import { Subtask } from '@/types/subtask'
import {
  QueryFunctionContext,
  UseQueryOptions,
  useQuery,
} from '@tanstack/react-query'

export type SubtasksQueryKey = ['subtasks', string]
export type SubtaskByIdQueryKey = ['subtasks', string, string]

async function getSubtasks({
  queryKey,
}: QueryFunctionContext<SubtasksQueryKey>) {
  const [, id] = queryKey
  const { data } = await api.get(`/tasks/${id}/subtasks`)
  return data
}

async function getSubtaskById({
  queryKey,
}: QueryFunctionContext<SubtaskByIdQueryKey>) {
  const [, taskId, id] = queryKey
  const { data } = await api.get(`/tasks/${taskId}/subtasks/${id}`)
  
  return data
}

export const useSubtasks = <SData = { subtasks: Subtask[] }>(
  id: string,
  options: UseQueryOptions<
    { subtasks: Subtask[] },
    unknown,
    SData,
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

export const useSubtaskById = <Subtask>(
  taskId: string,
  id: string,
  options: UseQueryOptions<
    Subtask,
    unknown,
    Subtask,
    SubtaskByIdQueryKey
  > = {},
) => {
  return useQuery<Subtask, unknown, Subtask, SubtaskByIdQueryKey>({
    queryKey: ['subtasks', taskId, id],
    queryFn: getSubtaskById,
    ...options,
    enabled: !!id && !!taskId,
  })
}
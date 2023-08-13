import { api } from '@/lib/axios'
import { QueryFunctionContext, UseQueryOptions, useQuery } from '@tanstack/react-query'
import { Task } from '@/types/task'

export type TasksQueryKey = ['tasks']
export type TaskByIdQueryKey = ['tasks', string]

async function getTasks() {
  const { data } = await api.get('/tasks')

  return data
}

async function getTaskById({ queryKey} : QueryFunctionContext<TaskByIdQueryKey>) {
  const [ , id ] = queryKey
  const { data } = await api.get(`/tasks/${id}`)

  return data
}

export const useTasks = <TData = { tasks: Task[] }>(
  options: UseQueryOptions<
    { tasks: Task[] },
    unknown,
    TData,
    TasksQueryKey
  > = {},
) => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    ...options,
  })
}

export const useTaskById = <Task>(
  id: string,
  options: UseQueryOptions<Task, unknown, Task, TaskByIdQueryKey> = {},
) => {
  return useQuery<Task, unknown, Task, TaskByIdQueryKey>({
    queryKey: ['tasks', id],
    queryFn: getTaskById,
    ...options,
    enabled: !!id,
  })
}

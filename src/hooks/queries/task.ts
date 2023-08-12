import { api } from '@/lib/axios'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { Task } from '@/types/Task'

export type TasksQueryKey = ['tasks']

async function getTasks() {
  const { data } = await api.get('/tasks')

  return data
}

export const useTasks = <TData = { tasks: Task[]} >(
  options: UseQueryOptions<{ tasks: Task[] }, unknown, TData, TasksQueryKey> = {}
) => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
    ...options,
  })
}

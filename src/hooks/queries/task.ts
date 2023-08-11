import { api } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

async function getTasks() {
  const { data } = await api.get('/tasks')

  return data
}



export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })
}
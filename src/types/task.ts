import { z } from 'zod'

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  due_date: z.date().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Task = z.infer<typeof taskSchema>

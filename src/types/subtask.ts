import { z } from 'zod'

const subtaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  due_date: z.date().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  task_id: z.string(),
})

export type Subtask = z.infer<typeof subtaskSchema>

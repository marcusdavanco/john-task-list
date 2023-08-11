import { NextRequest, NextResponse } from 'next/server'
import { ListUseCase } from '@/use-cases/subtasks/list'
import { RegisterUseCase } from '@/use-cases/subtasks/register'
import { PrismaSubtasksRepository } from '@/repositories/subtasks/prisma/prisma-subtasks-repository'
import { z } from 'zod'

export const subtasksRepository = new PrismaSubtasksRepository()

export async function GET(req: NextRequest) {
  const listUseCase = new ListUseCase(subtasksRepository)

  const task_id = req.nextUrl.pathname.split('/')[3]

  const tasks = await listUseCase.execute({
    task_id,
  })

  return NextResponse.json(tasks, { status: 200 })
}

export async function POST(req: NextRequest) {
  const task_id = req.nextUrl.pathname.split('/')[3]

  const registerBodySchema = z.object({
    title: z.string(),
    due_date: z.string().optional(),
  })

  try {
    const { title, due_date } = registerBodySchema.parse(await req.json())
    const dueDate = due_date ? new Date(due_date) : undefined

    const registerUseCase = new RegisterUseCase(subtasksRepository)
    await registerUseCase.execute({ title, due_date: dueDate, task_id })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.message }, { status: 422 })
    }
  }

  return NextResponse.json({ message: 'Subtask created' }, { status: 201 })
}

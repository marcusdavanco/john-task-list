import { NextRequest, NextResponse } from 'next/server'
import { ListUseCase } from '@/use-cases/tasks/list'
import { RegisterUseCase } from '@/use-cases/tasks/register'
import { PrismaTasksRepository } from '@/repositories/tasks/prisma/prisma-tasks-repository'
import { z } from 'zod'

export const tasksRepository = new PrismaTasksRepository()

export async function GET() {
  const listUseCase = new ListUseCase(tasksRepository)

  const tasks = await listUseCase.execute()

  return NextResponse.json(tasks, { status: 200 })
}

export async function POST(req: NextRequest) {
  const registerBodySchema = z.object({
    title: z.string(),
    due_date: z.string().optional(),
  })

  try {
    const { title, due_date } = registerBodySchema.parse(await req.json())
    let dueDate = due_date ? new Date(due_date) : undefined

    const registerUseCase = new RegisterUseCase(tasksRepository)

    await registerUseCase.execute({ title, due_date: dueDate })
  } catch (err) {         
    if (err instanceof z.ZodError) {      
      return NextResponse.json({ message: err.message }, { status: 422 })
    }

    if (err instanceof Error) {      
      return NextResponse.json({ message: err.message }, { status: 400 })
    }
  }

  return NextResponse.json({ message: 'Task created' }, { status: 201 }) 
}

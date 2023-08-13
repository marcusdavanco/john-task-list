import { NextRequest, NextResponse } from 'next/server'
import { UpdateUseCase } from '@/use-cases/tasks/update'
import { ToggleCompletedUseCase } from '@/use-cases/tasks/toggleCompleted'
import { DeleteUseCase } from '@/use-cases/tasks/delete'
import { tasksRepository } from '../route'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop()!

  const task = await tasksRepository.findById(id)

  return NextResponse.json(task, { status: 200 })
}

export async function PUT(req: NextRequest) {
  const updateBodySchema = z.object({
    title: z.string(),
    due_date: z.string().optional(),
  })

  const id = req.nextUrl.pathname.split('/').pop()!

  try {
    const updateUseCase = new UpdateUseCase(tasksRepository)
    const { title, due_date } = updateBodySchema.parse(await req.json())
    const dueDate = due_date ? new Date(due_date) : undefined

    await updateUseCase.execute({ id, title, due_date: dueDate })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.message }, { status: 422 })
    }
  }

  return NextResponse.json({ message: 'Task updated' }, { status: 200 })
}

export async function PATCH(req: NextRequest) {
  const toggleCompletedUseCase = new ToggleCompletedUseCase(tasksRepository)

  const id = req.nextUrl.pathname.split('/').pop()!

  await toggleCompletedUseCase.execute({ id })

  return NextResponse.json({ message: 'task updated' }, { status: 200 })
}

export async function DELETE(req: NextRequest) {
  const deleteUseCase = new DeleteUseCase(tasksRepository)

  const id = req.nextUrl.pathname.split('/').pop()!

  await deleteUseCase.execute({ id })

  return NextResponse.json({ status: 204 })
}

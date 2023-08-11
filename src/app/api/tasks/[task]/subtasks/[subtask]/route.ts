import { NextRequest, NextResponse } from 'next/server'
import { UpdateUseCase } from '@/use-cases/subtasks/update'
import { ToggleCompletedUseCase } from '@/use-cases/subtasks/toggleCompleted'
import { DeleteUseCase } from '@/use-cases/subtasks/delete'
import { subtasksRepository } from '../route'
import { z } from 'zod'

export async function PUT(req: NextRequest) {
  const updateBodySchema = z.object({
    title: z.string(),
    due_date: z.string().optional(),
  })

  const id = req.nextUrl.pathname.split('/')[5]

  try {
    const updateUseCase = new UpdateUseCase(subtasksRepository)
    const { title, due_date } = updateBodySchema.parse(await req.json())
    const dueDate = due_date ? new Date(due_date) : undefined

    await updateUseCase.execute({ id, title, due_date: dueDate })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: err.message }, { status: 422 })
    }
  }

  return NextResponse.json({ message: 'Subtask updated' }, { status: 200 })
}

export async function PATCH(req: NextRequest) {
  const toggleCompletedUseCase = new ToggleCompletedUseCase(subtasksRepository)

  const id = req.nextUrl.pathname.split('/')[5]

  const updatedSubtask = await toggleCompletedUseCase.execute({ id })

  return NextResponse.json({ message: 'Subtask updated' }, { status: 200 })
}

export async function DELETE(req: NextRequest) {
  const deleteUseCase = new DeleteUseCase(subtasksRepository)

  const id = req.nextUrl.pathname.split('/')[5]

  await deleteUseCase.execute({ id })

  return NextResponse.json({ message: 'Subtask removed' }, { status: 204 })
}

import { NextRequest, NextResponse } from 'next/server'
import { UpdateUseCase } from '@/use-cases/tasks/update'
import { ToggleCompletedUseCase } from '@/use-cases/tasks/toggleCompleted'
import { DeleteUseCase } from '@/use-cases/tasks/delete'
import { tasksRepository } from '../route'

export async function PUT(req: NextRequest) {
  const updateUseCase = new UpdateUseCase(tasksRepository)

  const { title, due_date } = await req.json()

  const id = req.nextUrl.pathname.split('/').pop()!

  const updatedTask = await updateUseCase.execute({ id, title, due_date })

  return NextResponse.json(updatedTask, { status: 200 })
}

export async function PATCH(req: NextRequest) {
  const toggleCompletedUseCase = new ToggleCompletedUseCase(tasksRepository)

  const id = req.nextUrl.pathname.split('/').pop()!

  const updatedTask = await toggleCompletedUseCase.execute({ id })

  return NextResponse.json(updatedTask, { status: 200 })
}

export async function DELETE(req: NextRequest) {
  const deleteUseCase = new DeleteUseCase(tasksRepository)

  const id = req.nextUrl.pathname.split('/').pop()!

  await deleteUseCase.execute({ id })

  return NextResponse.json({ status: 204 })
}

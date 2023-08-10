import { NextRequest, NextResponse } from 'next/server'
import { UpdateUseCase } from '@/use-cases/subtasks/update'
import { ToggleCompletedUseCase } from '@/use-cases/subtasks/toggleCompleted'
import { DeleteUseCase } from '@/use-cases/subtasks/delete'
import { subtasksRepository } from '../route'

export async function PUT(req: NextRequest) {
  const updateUseCase = new UpdateUseCase(subtasksRepository)

  const { id, title, due_date } = await req.json()

  const updatedSubtask = await updateUseCase.execute({ id, title, due_date })

  return NextResponse.json(updatedSubtask, {status: 200})
}

export async function PATCH(req: NextRequest) {
  const toggleCompletedUseCase = new ToggleCompletedUseCase(subtasksRepository)

  const { id } = await req.json()

  const updatedSubtask = await toggleCompletedUseCase.execute({ id })

  return NextResponse.json(updatedSubtask, {status: 200})
}

export async function DELETE(req: NextRequest) {
  const deleteUseCase = new DeleteUseCase(subtasksRepository)

  const { id } = await req.json()

  await deleteUseCase.execute({ id })

  return NextResponse.json({status: 204})
}
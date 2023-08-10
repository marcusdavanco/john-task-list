import { NextRequest, NextResponse } from 'next/server'
import { UpdateUseCase } from '@/use-cases/tasks/update'
import { ToggleCompletedUseCase } from '@/use-cases/tasks/toggleCompleted'
import { DeleteUseCase } from '@/use-cases/tasks/delete'
import { PrismaTasksRepository } from '@/repositories/tasks/prisma/prisma-tasks-repository'

export async function PUT(req: NextRequest) {
  const tasksRepository = new PrismaTasksRepository()
  const updateUseCase = new UpdateUseCase(tasksRepository)

  const { id, title, due_date } = await req.json()

  const updatedTask = await updateUseCase.execute({ id, title, due_date })

  return NextResponse.json(updatedTask, {status: 200})
}

export async function PATCH(req: NextRequest) {
  const tasksRepository = new PrismaTasksRepository()
  const toggleCompletedUseCase = new ToggleCompletedUseCase(tasksRepository)

  const { id } = await req.json()

  const updatedTask = toggleCompletedUseCase.execute({ id })

  return NextResponse.json(updatedTask, {status: 200})
}

export async function DELETE(req: NextRequest) {
  const tasksRepository = new PrismaTasksRepository()
  const deleteUseCase = new DeleteUseCase(tasksRepository)

  const { id } = await req.json()

  const deletedTask = deleteUseCase.execute({ id })

  return NextResponse.json(deletedTask, {status: 200})
}
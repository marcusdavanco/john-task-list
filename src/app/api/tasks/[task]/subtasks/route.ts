import { NextRequest, NextResponse } from 'next/server'
import { ListUseCase } from '@/use-cases/subtasks/list'
import { RegisterUseCase } from '@/use-cases/subtasks/register'
import { PrismaSubtasksRepository } from '@/repositories/subtasks/prisma/prisma-subtasks-repository'
 
export const subtasksRepository = new PrismaSubtasksRepository()

export async function GET(req: NextRequest) {
  
  const listUseCase = new ListUseCase(subtasksRepository)

  const { task_id } = await req.json()
  
  const tasks = await listUseCase.execute({
    task_id
  })  

  return NextResponse.json(tasks, {status: 200})
}

export async function POST(req: NextRequest) {
  const registerUseCase = new RegisterUseCase(subtasksRepository)

  const { title, due_date, task_id } = await req.json()
  
  const task = await registerUseCase.execute({ title, due_date, task_id })  

  return NextResponse.json(task, {status: 201})
}


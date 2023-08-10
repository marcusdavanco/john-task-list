import { NextRequest, NextResponse } from 'next/server'
import { ListUseCase } from '@/use-cases/subtasks/list'
import { RegisterUseCase } from '@/use-cases/subtasks/register'
import { PrismaSubtasksRepository } from '@/repositories/subtasks/prisma/prisma-subtasks-repository'
 
export const subtasksRepository = new PrismaSubtasksRepository()

export async function GET(req: NextRequest) {
  
  const listUseCase = new ListUseCase(subtasksRepository)

  const task_id = req.nextUrl.pathname.split('/')[3]
  
  const tasks = await listUseCase.execute({
    task_id
  })  

  return NextResponse.json(tasks, {status: 200})
}

export async function POST(req: NextRequest) {
  const registerUseCase = new RegisterUseCase(subtasksRepository)

  const { title, due_date} = await req.json()
  const task_id = req.nextUrl.pathname.split('/')[3]
  
  const subtask = await registerUseCase.execute({ title, due_date, task_id })  

  return NextResponse.json(subtask, {status: 201})
}


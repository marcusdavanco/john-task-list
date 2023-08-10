import { NextRequest, NextResponse } from 'next/server'
import { ListUseCase } from '@/use-cases/tasks/list'
import { RegisterUseCase } from '@/use-cases/tasks/register'
import { PrismaTasksRepository } from '@/repositories/tasks/prisma/prisma-tasks-repository'
 
export async function GET() {
  const tasksRepository = new PrismaTasksRepository()
  const listUseCase = new ListUseCase(tasksRepository)
  
  const tasks = await listUseCase.execute()  

  return NextResponse.json(tasks, {status: 200})
}

export async function POST(req: NextRequest) {
  const tasksRepository = new PrismaTasksRepository()
  const registerUseCase = new RegisterUseCase(tasksRepository)

  const { title, due_date } = await req.json()
  
  const task = await registerUseCase.execute({ title, due_date })  

  return NextResponse.json(task, {status: 201})
}


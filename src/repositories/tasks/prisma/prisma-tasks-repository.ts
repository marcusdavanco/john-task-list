import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { TaskRepository } from "../task-repository"

export class PrismaTasksRepository implements TaskRepository {
  async findById(id: string){
    const task = await prisma.task.findUnique({
      where: {
        id
      }
    })

    return task
  }  
  
  async create(data: Prisma.TaskCreateInput) {
    const task = await prisma.task.create({ data })

    return task
  }
  async list() {
    const tasks = await prisma.task.findMany()

    return tasks
  }

  async update(id: string, data: Prisma.TaskCreateInput) {
    const task = await prisma.task.update({
      where: {
        id
      },
      data
    })

    return task
  }

  async toggleCompleted(id: string) {
    const task =  await prisma.task.findFirst({
      where: {
        id
      }      
    })

    if(!task){
      throw new Error('Task not found')
    }

    const updatedTask = await prisma.task.update({
      where: {
        id
      },
      data: {
        completed: !task.completed
      }
    })

    return updatedTask
  }

  async delete(id: string) {
    const deletedTask = await prisma.task.delete({
      where: {
        id
      },     
    })

    return deletedTask
  }
}

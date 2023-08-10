import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { SubtaskRepository } from "../subtask-repository"

export class PrismaSubtasksRepository implements SubtaskRepository {  
  async create(data: Prisma.SubtaskCreateInput) {
    const subtask = await prisma.subtask.create({ data })

    return subtask
  }

  async list(task_id: string) {
    const subtasks = await prisma.subtask.findMany({
      where: {
        task_id
      }
  })
    return subtasks
  }

  async update(id: string, data: Prisma.TaskCreateInput) {
    const subtask = await prisma.subtask.update({
      where: {
        id
      },
      data
    })

    return subtask
  }

  async toggleCompleted(id: string) {
    const subtask =  await prisma.subtask.findFirst({
      where: {
        id
      }      
    })

    if(!subtask){
      throw new Error('Subtask not found')
    }

    const updatedSubtask = await prisma.subtask.update({
      where: {
        id
      },
      data: {
        completed: !subtask.completed
      }
    })

    return updatedSubtask
  }

  async delete(id: string) {
    const deletedSubtask = await prisma.subtask.delete({
      where: {
        id
      },     
    })

    return deletedSubtask
  }
}

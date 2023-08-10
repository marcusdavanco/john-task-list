import { Prisma, Task } from '@prisma/client';
import { TaskRepository } from '../task-repository';

export class InMemoryTasksRepository implements TaskRepository {  
  public items: Task[] = [];

  async findById(id: string){
    const task = this.items.find(task => task.id === id) || null
    
    return task
  }
  
  async create(data: Prisma.TaskCreateInput) {
    const task = {
      id: 'task-1',
      title: data.title,
      completed: false,
      due_date: data.due_date ? new Date(data.due_date) : null,
      created_at: new Date(),
    }

    this.items.push(task)

    return task
  }
  async list() {
    const tasks = this.items;

    return tasks
  }

  async update(id: string, data: Prisma.TaskCreateInput) {
    const taskIndex = this.items.findIndex(task => task.id === id)

    if (taskIndex === -1) {
      throw new Error('Task not found')
    }
    
    const task = {
      ...this.items[taskIndex],
      title: data.title,
      due_date: data.due_date ? new Date(data.due_date!) : null,
    };

    this.items[taskIndex] = task

    return this.items[taskIndex]
  }
  
  async toggleCompleted(id: string) {
    const taskIndex = this.items.findIndex(task => task.id === id)

    if (taskIndex === -1) {
      throw new Error('Task not found')
    }
    
    const task = {
      ...this.items[taskIndex],
      completed: !this.items[taskIndex].completed,
    };

    this.items[taskIndex] = task

    return this.items[taskIndex]
  }

  async delete(id: string){
    const task = this.items.find(task => task.id === id)

    if(!task){
      throw new Error('Task not found')
    }

    this.items = this.items.filter(task => task.id !== id)

    return task
  }
}
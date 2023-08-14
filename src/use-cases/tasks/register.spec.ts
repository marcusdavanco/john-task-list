import { InMemoryTasksRepository } from '@/repositories/tasks/in-memory/in-memory-repository'
import { RegisterUseCase } from './register'
import { expect, it, describe, beforeEach } from 'vitest'

let tasksRepository: InMemoryTasksRepository
let sut: RegisterUseCase

describe('Tasks Register', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new RegisterUseCase(tasksRepository)
  })

  it('should be possible to register tasks', async () => {
    const task = await sut.execute({
      title: 'New task',
      due_date: new Date('2024-01-01'),
    })

    expect(task.id).toEqual(expect.any(String))
  })
})

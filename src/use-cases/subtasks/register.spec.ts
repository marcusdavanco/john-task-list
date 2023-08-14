import { InMemorySubtasksRepository } from '@/repositories/subtasks/in-memory/in-memory-repository'
import { RegisterUseCase } from './register'
import { expect, it, describe, beforeEach } from 'vitest'

let subtasksRepository: InMemorySubtasksRepository
let sut: RegisterUseCase

describe('Subtasks Register', () => {
  beforeEach(() => {
    subtasksRepository = new InMemorySubtasksRepository()
    sut = new RegisterUseCase(subtasksRepository)
  })

  it('should be possible to register subtasks', async () => {
    const task = await sut.execute({
      title: 'New task',
      due_date: new Date('2024-01-01'),
      task_id: 'task-1',
    })

    expect(task.id).toEqual(expect.any(String))
  })
})

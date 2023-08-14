import { InMemoryTasksRepository } from '@/repositories/tasks/in-memory/in-memory-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { FindByIdUseCase } from './findById'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let tasksRepository: InMemoryTasksRepository
let sut: FindByIdUseCase

describe('Tasks Use-Cases', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new FindByIdUseCase(tasksRepository)
  })

  it('should be possible to find a task by id', async () => {
    const task = await tasksRepository.create({
      title: 'New task',
      due_date: new Date('2024-01-01'),
    })

    const foundTask = await sut.execute({ id: task.id })

    expect(foundTask).toEqual(
      expect.objectContaining({
        title: 'New task',
      }),
    )
  })

  it('should handle the case where the task is not found', async () => {
    expect(() => sut.execute({ id: 'non-existing-id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})

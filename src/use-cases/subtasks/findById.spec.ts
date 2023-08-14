import { InMemorySubtasksRepository } from '@/repositories/subtasks/in-memory/in-memory-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { FindByIdUseCase } from './findById'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let subtasksRepository: InMemorySubtasksRepository
let sut: FindByIdUseCase

describe('Subtasks FindById', () => {
  beforeEach(() => {
    subtasksRepository = new InMemorySubtasksRepository()
    sut = new FindByIdUseCase(subtasksRepository)
  })

  it('should be possible to find a task by id', async () => {
    const task = await subtasksRepository.create({
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

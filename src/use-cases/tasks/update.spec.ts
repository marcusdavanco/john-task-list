import { InMemoryTasksRepository } from '@/repositories/tasks/in-memory/in-memory-repository'
import { UpdateUseCase } from './update'

import { expect, it, describe, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let tasksRepository: InMemoryTasksRepository
let sut: UpdateUseCase

describe('Tasks Use-Cases', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new UpdateUseCase(tasksRepository)
  })

  it('should be possible to update a task', async () => {
    const task = await tasksRepository.create({
      title: 'New task',
      due_date: new Date('2024-01-01'),
    })

    const updatedTask = await sut.execute({
      id: task.id,
      title: 'Updated task',
      due_date: new Date('2024-01-01'),
    })

    expect(updatedTask.title).toEqual('Updated task')
  })

  it('should handle the case where the task is not found', async () => {
    expect(() =>
      sut.execute({
        id: 'non-existing-id',
        title: 'Updated task',
        due_date: new Date('2024-01-01'),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

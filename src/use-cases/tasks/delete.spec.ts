import { InMemoryTasksRepository } from '@/repositories/tasks/in-memory/in-memory-repository'
import { DeleteUseCase } from './delete'
import { expect, it, describe, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let tasksRepository: InMemoryTasksRepository
let sut: DeleteUseCase

describe('Tasks Use-Cases', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new DeleteUseCase(tasksRepository)
  })

  it('should be possible to delete a task', async () => {
    const task = await tasksRepository.create({
      title: 'New task',
      due_date: new Date('2024-01-01'),
    })

    const deletedTask = await sut.execute({
      id: task.id,
    })

    expect(deletedTask).toBeTruthy()
  })

  it('should handle deletion of a non-existent task gracefully', async () => {
    expect(
      sut.execute({
        id: 'task-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

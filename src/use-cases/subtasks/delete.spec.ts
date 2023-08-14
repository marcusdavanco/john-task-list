import { InMemorySubtasksRepository } from '@/repositories/subtasks/in-memory/in-memory-repository'
import { DeleteUseCase } from './delete'
import { expect, it, describe, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let subtasksRepository: InMemorySubtasksRepository
let sut: DeleteUseCase

describe('Subtasks Delete', () => {
  beforeEach(() => {
    subtasksRepository = new InMemorySubtasksRepository()
    sut = new DeleteUseCase(subtasksRepository)
  })

  it('should be possible to delete a subtask', async () => {
    const task = await subtasksRepository.create({
      title: 'New task',
      due_date: new Date('2024-01-01'),
      task: {
        connect: {
          id: 'task-1',
        }
      }
    })

    const deletedTask = await sut.execute({
      id: task.id,
    })

    expect(deletedTask).toBeTruthy()
  })

  it('should handle deletion of a non-existent subtask gracefully', async () => {
    expect(
      sut.execute({
        id: 'task-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

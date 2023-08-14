import { InMemorySubtasksRepository } from '@/repositories/subtasks/in-memory/in-memory-repository'
import { UpdateUseCase } from './update'
import { expect, it, describe, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let subtasksRepository: InMemorySubtasksRepository
let sut: UpdateUseCase

describe('Subtasks Update', () => {
  beforeEach(() => {
    subtasksRepository = new InMemorySubtasksRepository()
    sut = new UpdateUseCase(subtasksRepository)
  })

  it('should be possible to update a task', async () => {
    const task = await subtasksRepository.create({
      title: 'New task',
      due_date: new Date('2024-01-01'),
      task: {
        connect: {
          id: 'task-1',
        }
      }
    })

    const updatedTask = await sut.execute({
      id: task.id,
      title: 'Updated subtask',
      due_date: new Date('2024-01-01'),
    })

    expect(updatedTask.title).toEqual('Updated subtask')
  })

  it('should handle the case where the subtask is not found', async () => {
    expect(() =>
      sut.execute({
        id: 'non-existing-id',
        title: 'Updated task',
        due_date: new Date('2024-01-01'),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

import { InMemorySubtasksRepository } from '@/repositories/subtasks/in-memory/in-memory-repository'
import { ToggleCompletedUseCase } from './toggleCompleted'
import { expect, it, describe, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let subtasksRepository: InMemorySubtasksRepository
let sut: ToggleCompletedUseCase

describe('Subtasks ToogleCompleted', () => {
  beforeEach(() => {
    subtasksRepository = new InMemorySubtasksRepository()
    sut = new ToggleCompletedUseCase(subtasksRepository)
  })

  it('should be possible to toogle a task completion status', async () => {
    const task = await subtasksRepository.create({
      title: 'New task',
      due_date: new Date('2024-01-01'),
      task: {
        connect: {
          id: 'task-1',
        }
      }
    })    

    const updatedTask1st = await sut.execute({
      id: task.id,
    })

    expect(updatedTask1st.completed).toEqual(true)

    const updatedTask2nd = await sut.execute({
      id: task.id,
    })

    expect(updatedTask2nd.completed).toEqual(false)
  })

  it('should handle the case where the task is not found', async () => {
    expect(() => sut.execute({ id: 'non-existing-id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})

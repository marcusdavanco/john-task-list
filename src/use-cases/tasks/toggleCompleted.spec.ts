import { InMemoryTasksRepository } from '@/repositories/tasks/in-memory/in-memory-repository'
import { ToggleCompletedUseCase } from './toggleCompleted'
import { expect, it, describe, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let tasksRepository: InMemoryTasksRepository
let sut: ToggleCompletedUseCase

describe('Tasks Use-Cases', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new ToggleCompletedUseCase(tasksRepository)
  })

  it('should be possible to toogle a task completion status', async () => {
    const task = await tasksRepository.create({
      title: 'New task',
      due_date: new Date('2024-01-01'),
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

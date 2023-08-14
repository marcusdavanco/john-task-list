import { InMemoryTasksRepository } from '@/repositories/tasks/in-memory/in-memory-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { ListUseCase } from './list'

let tasksRepository: InMemoryTasksRepository
let sut: ListUseCase

describe('Tasks List', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new ListUseCase(tasksRepository)
  })

  it('should be possible to list tasks', async () => {
    await tasksRepository.create({
      title: 'New task',
      due_date: new Date('2024-01-01'),
    })

    const { tasks } = await sut.execute()

    expect(tasks).toEqual([
      expect.objectContaining({
        title: 'New task',
      }),
    ])
  })
})

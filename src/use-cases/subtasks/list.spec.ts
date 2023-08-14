import { InMemorySubtasksRepository } from '@/repositories/subtasks/in-memory/in-memory-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { ListUseCase } from './list'

let subtasksRepository: InMemorySubtasksRepository
let sut: ListUseCase

describe('Subtasks List', () => {
  beforeEach(() => {
    subtasksRepository = new InMemorySubtasksRepository()
    sut = new ListUseCase(subtasksRepository)
  })

  it('should be possible to list subtasks of a given task', async () => {
    await subtasksRepository.create({
      title: 'New task',
      due_date: new Date('2024-01-01'),
      task: {
        connect: {
          id: 'task-1',
        },
      },
    })

    const { subtasks } = await sut.execute({ task_id: 'task-1' })

    expect(subtasks).toEqual([
      expect.objectContaining({
        task_id: 'task-1',
      }),
    ])
  })
})

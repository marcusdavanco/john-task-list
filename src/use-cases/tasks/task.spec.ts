import { InMemoryTasksRepository } from '@/repositories/tasks/in-memory/in-memory-repository'
import { RegisterUseCase } from './register'
import { ListUseCase } from './list'
import { UpdateUseCase } from './update'
import { ToggleCompletedUseCase } from './toggleCompleted'
import { DeleteUseCase } from './delete'

import { expect, it, describe } from 'vitest'

describe('Tasks Use-Cases', () => {
  it('should be possible to register tasks', async () => {
    const tasksRepository = new InMemoryTasksRepository()
    const registerUseCase = new RegisterUseCase(tasksRepository)

    const task = await registerUseCase.execute({
      title: 'New task',
      due_date: new Date('2024-01-01'),
    })

    expect(task.id).toEqual(expect.any(String))
  })

  it('should be possible to list tasks', async () => {
    const tasksRepository = new InMemoryTasksRepository()
    const registerUseCase = new RegisterUseCase(tasksRepository)
    const listUseCase = new ListUseCase(tasksRepository)

    await registerUseCase.execute({
      title: 'New task',
      due_date: new Date('2024-01-01'),
    })

    const { tasks } = await listUseCase.execute()

    expect(tasks).toEqual([
      expect.objectContaining({
        title: 'New task',
      }),
    ])
  })

  it('should be possible to update a task', async () => {
    const tasksRepository = new InMemoryTasksRepository()
    const registerUseCase = new RegisterUseCase(tasksRepository)
    const updateUseCase = new UpdateUseCase(tasksRepository)

    const task = await registerUseCase.execute({
      title: 'New task',
      due_date: new Date('2024-01-01'),
    })

    const updatedTask = await updateUseCase.execute({
      id: task.id,
      title: 'Updated task',
      due_date: new Date('2024-01-01'),
    })

    expect(updatedTask.title).toEqual('Updated task')
  })

  it('should be possible to toogle a task completion status', async () => {
    const tasksRepository = new InMemoryTasksRepository()
    const registerUseCase = new RegisterUseCase(tasksRepository)
    const toggleCompletedUseCase = new ToggleCompletedUseCase(tasksRepository)

    const task = await registerUseCase.execute({
      title: 'New task',
      due_date: new Date('2024-01-01'),
    })

    const updatedTask1st = await toggleCompletedUseCase.execute({
      id: task.id,
    })

    expect(updatedTask1st.completed).toEqual(true)

    const updatedTask2nd = await toggleCompletedUseCase.execute({
      id: task.id,
    })

    expect(updatedTask2nd.completed).toEqual(false)
  })

  it('should be possible to delete a task', async () => {
    const tasksRepository = new InMemoryTasksRepository()
    const registerUseCase = new RegisterUseCase(tasksRepository)
    const deleteUseCase = new DeleteUseCase(tasksRepository)

    const task = await registerUseCase.execute({
      title: 'New task',
      due_date: new Date('2024-01-01'),
    })

    const deletedTask = await deleteUseCase.execute({
      id: task.id,
    })

    expect(deletedTask).toBeTruthy()
  })
})

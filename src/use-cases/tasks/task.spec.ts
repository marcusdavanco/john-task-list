import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-repository'
import { RegisterUseCase } from './register'
import { ListUseCase } from './list'

import { expect, it, describe } from 'vitest'

describe('Tasks', () => {
  it('should be able to register tasks', async () => {
    const tasksRepository = new InMemoryTasksRepository()
    const registerUseCase = new RegisterUseCase(tasksRepository)

    const task = await registerUseCase.execute({
      title: 'New task',
      due_date: new Date('2024-01-01'),      
    })   

    expect(task.id).toEqual(expect.any(String));    
  })

  it('should be able to list tasks', async () => {
    const tasksRepository = new InMemoryTasksRepository()
    const registerUseCase = new RegisterUseCase(tasksRepository)
    const listUseCase = new ListUseCase(tasksRepository)

    await registerUseCase.execute({
      title: 'New task',
      due_date: new Date('2024-01-01'),      
    })   

    const {tasks} = await listUseCase.execute();


    expect(tasks).toEqual([
      expect.objectContaining({
        title: 'New task',        
      })
    ]);    
  })
    
})
  
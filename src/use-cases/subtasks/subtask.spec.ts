import { InMemorySubtasksRepository } from '@/repositories/subtasks/in-memory/in-memory-repository' 
import { RegisterUseCase } from './register'
import { ListUseCase } from './list'
import { UpdateUseCase } from './update'
import { ToggleCompletedUseCase } from './toggleCompleted'
import { DeleteUseCase } from './delete'


import { expect, it, describe } from 'vitest'

describe('Subtask Use-Cases', () => {
  it('should be possible to register subtasks', async () => {
    const subtasksRepository = new InMemorySubtasksRepository()
    const registerUseCase = new RegisterUseCase(subtasksRepository)

    const subtask = await registerUseCase.execute({
      title: 'New subtask',
      due_date: new Date('2024-01-01'),      
      task_id: 'task-1'
    })   

    expect(subtask.id).toEqual(expect.any(String));    
  })

  it('should be possible to list subtasks', async () => {
    const subtasksRepository = new InMemorySubtasksRepository()
    const registerUseCase = new RegisterUseCase(subtasksRepository)
    const listUseCase = new ListUseCase(subtasksRepository)

    await registerUseCase.execute({
      title: 'New subtask',
      due_date: new Date('2024-01-01'),
      task_id: 'task-1'
    })   

    const {subtasks} = await listUseCase.execute({ task_id: 'task-1'});


    expect(subtasks).toEqual([
      expect.objectContaining({
        title: 'New subtask',        
      })
    ]);    
  })

  it('should be possible to update a subtask', async() => {
    const subtasksRepository = new InMemorySubtasksRepository()
    const registerUseCase = new RegisterUseCase(subtasksRepository)
    const updateUseCase = new UpdateUseCase(subtasksRepository)

    const subtask = await registerUseCase.execute({
      title: 'New subtask',
      due_date: new Date('2024-01-01'),
      task_id: 'task-1'
    })

    const updatedSubtask = await updateUseCase.execute({
      id: subtask.id,
      title: 'Updated subtask',
      due_date: new Date('2024-01-01'),
    })

    expect(updatedSubtask.title).toEqual('Updated subtask')
  })

  it('should be possible to toogle a subtask completion status', async () => {
    const subtasksRepository = new InMemorySubtasksRepository()
    const registerUseCase = new RegisterUseCase(subtasksRepository)
    const toggleCompletedUseCase = new ToggleCompletedUseCase(subtasksRepository)

    const subtask = await registerUseCase.execute({
      title: 'New task',
      due_date: new Date('2024-01-01'),
      task_id: 'task-1'
    })

    const updatedSubtask1st= await toggleCompletedUseCase.execute({
      id: subtask.id,
    })

    expect(updatedSubtask1st.completed).toEqual(true)

    const updatedSubtask2nd = await toggleCompletedUseCase.execute({
      id: subtask.id,
    })

    expect(updatedSubtask2nd.completed).toEqual(false)
  })

  it('should be possible to delete a subtask', async () => {
    const subtasksRepository = new InMemorySubtasksRepository()
    const registerUseCase = new RegisterUseCase(subtasksRepository)
    const deleteUseCase = new DeleteUseCase(subtasksRepository)

    const subtask = await registerUseCase.execute({
      title: 'New task',
      due_date: new Date('2024-01-01'),
      task_id: 'task-1'
    })

    const deletedTask = await deleteUseCase.execute({
      id: subtask.id,
    })

    expect(deletedTask).toBeTruthy()
  })   
})
  
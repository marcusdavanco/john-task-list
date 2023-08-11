import { TaskList } from '@/components/TaskList'
import { Button } from '@/components/button'

export default async function Tasks() {
  return (
    <main className="flex flex-1 h flex-col items-center px-[18px] py-7 relative">
      <div className="block w-full lg:flex gap-8 justify-center">
        <TaskList complete={false} />
        <TaskList complete={true} />
      </div>
      <Button />
    </main>
  )
}

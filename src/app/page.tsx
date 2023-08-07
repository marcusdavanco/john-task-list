import { redirect } from "next/navigation"

export default function Home() {
  redirect('/tasks')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      John Task List - Home
    </main>
  )
}

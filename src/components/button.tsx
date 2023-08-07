import { Plus } from "lucide-react";

export function Button() {
  return (
    <button className="flex justify-center items-center h-12 w-12 rounded-full bg-secondary-300 fixed bottom-7 right-3">
      <Plus size={28} className="text-white" />
    </button>
  )
}
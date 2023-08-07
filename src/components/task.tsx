import { Calendar, Strikethrough, Trash2 } from "lucide-react"

interface TaskProps {
  completed?: boolean
}

export function Task({ completed }: TaskProps) {

  return (
    <article
      className="w-full rounded-lg relative"
    >
      <div
        className="rounded-lg absolute left-0 right-0 top-0 bottom-0 opacity-65 flex w-full h-[90px]"
        style={{
          background: "linear-gradient(179deg, rgba(255, 255, 255, 0.25) 0%, transparent 100%)",
          padding: "0.1rem",
          clipPath: "polygon(0 0, 0 100%, 0.125rem 100%, 0.125rem 0.125rem, calc(100% - 0.125rem) 0.125rem, calc(100% - 0.125rem) calc(100% - 0.125rem), 0.125rem calc(100% - 0.125rem), 0.125rem 100%, 100% 100%, 100% 0)",
          filter: "blur(2px)"
        }}
      />
      <div
        className={`flex items-center w-full h-[90px] rounded-lg bg-gradient-to-bl ${completed ? "from-white/[0.05] to-white[0.02]" : "from-white/[0.18] to-white/[0.08]"} shadow-sm p-6`}
      >
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-6 items-center">
            <input
              checked={completed}
              type="checkbox"
              // onChange={handleChange}
              className={`appearance-none relative p-1 h-[26px] before:inline-block before:w-[18px] before:p-1 before:h-[18px] before:bg-transparent before:absolute: before:left-0 before:rounded-full before:border-2 before:border-secondary-300 before:transition before:duration-200 before:opacity-100 before:checked:opacity-0 after:inline-block after:w-[18px] after:h-[18px] after:left-[4px] after:top-[4px] after:checked:bg-secondary-300 after:absolute after:rounded-full after:border-2 after:border-none after:transition after:duration-200 after:opacity-100 after:checked:opacity-100 after:checked:bg-checkmark after:checked:bg-no-repeat after:checked:bg-center after:checked:bg-auto`}
            />
            <div className="flex flex-col gap-[10px]">
              <span className={`font-bold ${completed ? ' text-gray-700 line-through' : 'text-gray-300'}`}>Todo</span>
              <div className="flex gap-1 items-center"><Calendar size={14} className={`text-xs ${completed ? 'text-gray-700' : 'text-gray-400'}`} /><span className={`text-xs ${completed ? 'text-gray-700' : 'text-gray-500'}`}>Due 07/17/23</span></div>
            </div>
          </div>
          <button>
            <Trash2 size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

    </article >
  )
}


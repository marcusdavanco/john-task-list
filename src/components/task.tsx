export function Task() {

  return (
    <article
      className="w-full rounded-lg relative"
    >
      <div
        className="rounded-lg absolute left-0 right-0 top-0 bottom-0 opacity-65"
        style={{
          background: "linear-gradient(179deg, rgba(255, 255, 255, 0.25) 0%, transparent 100%)",
          padding: "0.1rem",
          clipPath: "polygon(0 0, 0 100%, 0.125rem 100%, 0.125rem 0.125rem, calc(100% - 0.125rem) 0.125rem, calc(100% - 0.125rem) calc(100% - 0.125rem), 0.125rem calc(100% - 0.125rem), 0.125rem 100%, 100% 100%, 100% 0)"
        }}
      >
        <div
          className="flex w-full h-[90px] rounded-lg"
        />
      </div>
      <div
        className="flex items-center w-full h-[90px] rounded-lg bg-gradient-to-bl from-white/[0.18] to-white/[0.08] shadow-sm p-6"
      >
        <div>
          Todo
        </div>
      </div>

    </article >
  )
}


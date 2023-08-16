import { ReactNode } from 'react'

// TODO - Extend this interface to receive the onClick prop as an HTML Article Element
interface CardProps {
  children: ReactNode
  opaque?: boolean
  customHeight?: boolean
  onClick?: () => void
}

export function Card({
  children,
  opaque = true,
  customHeight = false,
  onClick,
}: CardProps) {
  return (
    <article
      onClick={onClick}
      className="w-full rounded-lg relative max-w-[46rem] animate-fade-down animate-once"
    >
      <div
        className="rounded-lg absolute left-0 right-0 top-0 bottom-0 opacity-65 flex w-full  h-[90px] "
        style={{
          background:
            'linear-gradient(179deg, rgba(255, 255, 255, 0.25) 0%, transparent 100%)',
          padding: '0.1rem',
          clipPath:
            'polygon(0 0, 0 100%, 0.125rem 100%, 0.125rem 0.125rem, calc(100% - 0.125rem) 0.125rem, calc(100% - 0.125rem) calc(100% - 0.125rem), 0.125rem calc(100% - 0.125rem), 0.125rem 100%, 100% 100%, 100% 0)',
          filter: 'blur(2px)',
        }}
      />
      <div
        className={`flex items-center w-full ${
          customHeight ? 'h-fit' : 'h-[90px]'
        } rounded-lg bg-gradient-to-bl ${
          !opaque
            ? 'from-white/[0.05] to-white[0.02]'
            : 'from-white/[0.18] to-white/[0.08]'
        } shadow-lg p-6`}
      >
        {children}
      </div>
    </article>
  )
}

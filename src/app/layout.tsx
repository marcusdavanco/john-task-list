import { Header } from '@/components/header'
import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Flex as Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'John Task List',
  description: 'Task Management Software',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-gradient-to-tl from-primary-400 to-[#111]`}>
        <Header />
        {children}
      </body>
    </html>
  )
}

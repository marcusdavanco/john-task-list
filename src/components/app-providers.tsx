'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'

interface AppProvidersProps {
  children: ReactNode
}

export default function AppProviders({ children }: AppProvidersProps) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: Infinity,
          retry: false,
        },
      },
    }),
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

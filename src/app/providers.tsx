'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { ContextProvider } from '../context/context'
import theme from './theme'

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <ContextProvider>
          {children}
        </ContextProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
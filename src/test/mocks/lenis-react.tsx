import { forwardRef, type ReactNode } from 'react'
import { lenisStub } from './lenis'

export const ReactLenis = forwardRef<unknown, { children?: ReactNode; root?: boolean; options?: unknown }>(
  function ReactLenis({ children }) {
    return <>{children}</>
  },
)

export function useLenis() {
  return lenisStub
}

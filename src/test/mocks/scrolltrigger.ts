import { vi } from 'vitest'

export const ScrollTrigger = {
  create: vi.fn(() => ({ kill: vi.fn(), refresh: vi.fn() })),
  batch: vi.fn(() => []),
  refresh: vi.fn(),
  update: vi.fn(),
  getAll: vi.fn(() => []),
  killAll: vi.fn(),
  matchMedia: vi.fn(),
}

export default ScrollTrigger

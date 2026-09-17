import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import RotatingWord from './RotatingWord'

const words = ['safety', 'productivity', 'profitability']

describe('RotatingWord', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  test('shows the first word initially', () => {
    render(<RotatingWord words={words} />)
    expect(screen.getByText('safety')).toBeInTheDocument()
  })

  test('advances to the next word after the interval and fade', () => {
    render(<RotatingWord words={words} />)
    act(() => {
      vi.advanceTimersByTime(2600 + 300)
    })
    expect(screen.getByText('productivity')).toBeInTheDocument()
  })

  test('wraps around to the first word', () => {
    render(<RotatingWord words={words} />)
    act(() => {
      vi.advanceTimersByTime(3 * (2600 + 300))
    })
    expect(screen.getByText('safety')).toBeInTheDocument()
  })
})

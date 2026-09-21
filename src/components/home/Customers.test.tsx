import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { partnerLogos } from '../../data/logos'
import Customers, { PER_SLIDE, ROTATE_INTERVAL } from './Customers'

const slides = { length: Math.ceil(partnerLogos.length / PER_SLIDE) }

function renderCustomers() {
  render(
    <MemoryRouter>
      <Customers />
    </MemoryRouter>,
  )
  return screen.getByRole('region', { name: /customer logos/i })
}

function activeSlide(region: HTMLElement) {
  return region.querySelector('[aria-roledescription="slide"][aria-hidden="false"]') as HTMLElement
}

describe('Customers carousel', () => {
  test('shows every partner logo once, twelve to a slide', () => {
    const region = renderCustomers()
    const groups = region.querySelectorAll('[aria-roledescription="slide"]')
    expect(groups).toHaveLength(slides.length)
    Array.from(groups)
      .slice(0, -1)
      .forEach((group) => expect(group.querySelectorAll('img')).toHaveLength(PER_SLIDE))
    const imgs = region.querySelectorAll('img')
    expect(imgs).toHaveLength(partnerLogos.length)
    expect(Array.from(imgs).map((img) => img.getAttribute('src'))).toEqual(partnerLogos.map((logo) => logo.src))
  })

  test('starts on the first slide and the arrows move through the set', () => {
    const region = renderCustomers()
    expect(activeSlide(region)).toHaveAttribute('aria-label', `1 of ${slides.length}`)
    fireEvent.click(within(region).getByRole('button', { name: /next logos/i }))
    expect(activeSlide(region)).toHaveAttribute('aria-label', `2 of ${slides.length}`)
    fireEvent.click(within(region).getByRole('button', { name: /previous logos/i }))
    fireEvent.click(within(region).getByRole('button', { name: /previous logos/i }))
    expect(activeSlide(region)).toHaveAttribute('aria-label', `${slides.length} of ${slides.length}`)
  })

  test('the dots jump to a slide and mark the current one', () => {
    const region = renderCustomers()
    fireEvent.click(within(region).getByRole('button', { name: /show logos 3 of/i }))
    expect(activeSlide(region)).toHaveAttribute('aria-label', `3 of ${slides.length}`)
    expect(within(region).getByRole('button', { name: /show logos 3 of/i })).toHaveAttribute('aria-current', 'true')
  })
})

describe('Customers carousel timing', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  test('advances on its own and wraps around', () => {
    const region = renderCustomers()
    act(() => {
      vi.advanceTimersByTime(ROTATE_INTERVAL)
    })
    expect(activeSlide(region)).toHaveAttribute('aria-label', `2 of ${slides.length}`)
    act(() => {
      vi.advanceTimersByTime(ROTATE_INTERVAL * (slides.length - 1))
    })
    expect(activeSlide(region)).toHaveAttribute('aria-label', `1 of ${slides.length}`)
  })

  test('holds still while the pointer is over it', () => {
    const region = renderCustomers()
    fireEvent.mouseEnter(region)
    act(() => {
      vi.advanceTimersByTime(ROTATE_INTERVAL * 2)
    })
    expect(activeSlide(region)).toHaveAttribute('aria-label', `1 of ${slides.length}`)
  })
})

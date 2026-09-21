import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { partnerLogos } from '../../data/logos'
import CustomersBand from './CustomersBand'

function renderBand() {
  render(
    <MemoryRouter>
      <CustomersBand />
    </MemoryRouter>,
  )
  return screen.getByRole('region', { name: /customer logos/i })
}

describe('CustomersBand', () => {
  test('shows every partner logo once to assistive tech, in a single row', () => {
    const region = renderBand()
    const rows = within(region).getAllByRole('list')
    expect(rows).toHaveLength(1)

    const named = within(region).getAllByRole('img')
    expect(named).toHaveLength(partnerLogos.length)
    expect(named.map((el) => el.getAttribute('src')).sort()).toEqual(
      partnerLogos.map((logo) => logo.src).sort(),
    )
  })

  test('repeats the set a second time so the marquee loops seamlessly', () => {
    const region = renderBand()
    // The duplicates are aria-hidden, so getAllByRole above cannot see them.
    expect(region.querySelectorAll('img')).toHaveLength(partnerLogos.length * 2)
    expect(region.querySelectorAll('img[alt=""]')).toHaveLength(partnerLogos.length)
  })

  test('reserves each logo its real dimensions and fetches it out of the critical path', () => {
    const region = renderBand()
    partnerLogos.forEach((logo) => {
      const img = region.querySelector(`img[src="${logo.src}"]`)!
      expect(img).toHaveAttribute('width', String(logo.width))
      expect(img).toHaveAttribute('height', String(logo.height))
      expect(img).toHaveAttribute('fetchpriority', 'low')
      expect(img).toHaveAttribute('decoding', 'async')
    })
  })

  test('falls back to loading the set when IntersectionObserver is missing', () => {
    // jsdom has no IntersectionObserver, so the row arms itself on mount rather
    // than leaving the logos in native lazy loading it cannot trigger.
    expect(window.IntersectionObserver).toBeUndefined()
    const region = renderBand()
    const lazy = region.querySelectorAll('img[loading="lazy"]')
    expect(lazy).toHaveLength(0)
  })
})

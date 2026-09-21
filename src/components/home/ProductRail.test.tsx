import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { pillars } from '../../data/pillars'
import ProductRail from './ProductRail'
import ProductRows from './ProductRows'

describe('ProductRail', () => {
  test('renders one tile per pillar linking to its row', () => {
    render(
      <MemoryRouter>
        <ProductRail />
      </MemoryRouter>,
    )
    const nav = screen.getByRole('navigation', { name: /products/i })
    const links = within(nav).getAllByRole('link')
    expect(links).toHaveLength(pillars.length)
    expect(links.map((a) => a.getAttribute('href'))).toEqual(pillars.map((p) => `#row-${p.slug}`))
    expect(within(nav).getByText('Compliance')).toBeInTheDocument()
  })

  test('shows the tiles on their own, with no image band behind them', () => {
    render(
      <MemoryRouter>
        <ProductRail />
      </MemoryRouter>,
    )
    const nav = screen.getByRole('navigation', { name: /products/i })
    expect(nav.parentElement?.querySelector('img')).toBeNull()
  })
})

describe('ProductRows', () => {
  test('renders seven alternating rows with a link to each product page', () => {
    render(
      <MemoryRouter>
        <ProductRows />
      </MemoryRouter>,
    )
    const rows = pillars.map((p) => document.getElementById(`row-${p.slug}`)!)
    expect(rows.every(Boolean)).toBe(true)
    expect(rows.map((r) => r.getAttribute('data-reverse'))).toEqual([
      'false',
      'true',
      'false',
      'true',
      'false',
      'true',
      'false',
    ])
    pillars.forEach((p, i) => {
      expect(within(rows[i]).getByRole('heading', { level: 3 })).toHaveTextContent(p.headline)
      expect(within(rows[i]).getByRole('link', { name: /learn more/i })).toHaveAttribute('href', p.to)
    })
  })
})

import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { partnerLogos } from '../../data/logos'
import Customers from './Customers'

const half = Math.ceil(partnerLogos.length / 2)
const rows = [partnerLogos.slice(0, half), partnerLogos.slice(half)]

function renderCustomers() {
  render(
    <MemoryRouter>
      <Customers />
    </MemoryRouter>,
  )
  return screen.getByRole('region', { name: /customer logos/i })
}

describe('Customers marquee', () => {
  test('runs two rows that together hold every partner logo once', () => {
    const region = renderCustomers()
    const lists = within(region).getAllByRole('list')
    expect(lists).toHaveLength(2)
    expect(rows[0].length + rows[1].length).toBe(partnerLogos.length)

    const named = within(region).getAllByRole('img')
    expect(named).toHaveLength(partnerLogos.length)
    expect(named.map((el) => el.getAttribute('src')).sort()).toEqual(partnerLogos.map((logo) => logo.src).sort())
  })

  test('repeats each row a second time, hidden, so the loop is seamless', () => {
    const region = renderCustomers()
    const lists = within(region).getAllByRole('list')
    lists.forEach((list, i) => {
      const items = list.querySelectorAll('li')
      expect(items).toHaveLength(rows[i].length * 2)
      const hidden = list.querySelectorAll('li[aria-hidden="true"]')
      expect(hidden).toHaveLength(rows[i].length)
    })
  })
})

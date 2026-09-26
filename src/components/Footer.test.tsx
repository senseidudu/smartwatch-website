import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import Footer from './Footer'

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  )
}

describe('Footer', () => {
  test('carries the KRA vendor seal under the statement', () => {
    renderFooter()
    const seal = screen.getByRole('link', { name: /approved kra vendor/i })
    expect(seal).toHaveAttribute('href', '/about#awards')
    expect(seal.querySelector('img')).toHaveAttribute('src', '/images/logos/kra-mark.webp')
  })

  test('lists awards and accreditation in the company column', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: /awards & accreditation/i })).toHaveAttribute('href', '/about#awards')
  })
})

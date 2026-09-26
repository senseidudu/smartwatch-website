import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import DemoSection from './DemoSection'

describe('DemoSection credentials', () => {
  test('shows the KPMG award and the KRA approval as tiles that link to the awards section', () => {
    render(
      <MemoryRouter>
        <DemoSection />
      </MemoryRouter>,
    )
    expect(screen.getByText('Awards & accreditation')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'KPMG Top 100 Mid-Sized Companies' })).toHaveAttribute('href', '/about#awards')
    const kra = screen.getByRole('link', { name: 'Approved KRA vendor' })
    expect(kra).toHaveAttribute('href', '/about#awards')
    expect(kra.querySelector('img')).toHaveAttribute('src', '/images/logos/kenya-revenue-authority.webp')
  })
})

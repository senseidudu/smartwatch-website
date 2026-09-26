import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import CredentialBadge from './CredentialBadge'

describe('CredentialBadge', () => {
  test('links the KRA vendor approval to the awards section, with the lion mark as decoration', () => {
    render(
      <MemoryRouter>
        <CredentialBadge />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: /approved kra vendor/i })
    expect(link).toHaveAttribute('href', '/about#awards')
    expect(link).toHaveTextContent('Kenya Revenue Authority')
    const mark = link.querySelector('img')!
    expect(mark).toHaveAttribute('src', '/images/logos/kra-mark.webp')
    expect(mark).toHaveAttribute('alt', '')
  })
})

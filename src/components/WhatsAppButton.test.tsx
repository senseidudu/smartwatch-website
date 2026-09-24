import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import WhatsAppButton from './WhatsAppButton'

describe('WhatsAppButton', () => {
  test('is open at the top of the page without a click', () => {
    render(<WhatsAppButton />)
    expect(screen.getByText(/chat with us on whatsapp/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /uganda/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /kenya/i })).toBeInTheDocument()
  })

  test('opens both country lines in a new tab', () => {
    render(<WhatsAppButton />)
    const uganda = screen.getByRole('link', { name: /uganda/i })
    const kenya = screen.getByRole('link', { name: /kenya/i })
    expect(uganda).toHaveAttribute('href', 'https://wa.me/256759786255')
    expect(kenya).toHaveAttribute('href', 'https://wa.me/254118319547')
    for (const link of [uganda, kenya]) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link.getAttribute('rel')).toContain('noopener')
    }
  })
})

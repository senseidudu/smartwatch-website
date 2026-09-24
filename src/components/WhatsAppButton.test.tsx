import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
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

describe('WhatsAppButton on a small screen', () => {
  const original = window.matchMedia

  beforeEach(() => {
    window.matchMedia = vi.fn(
      (query: string) =>
        ({
          matches: query.includes('max-width'),
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }) as unknown as MediaQueryList,
    )
  })

  afterEach(() => {
    window.matchMedia = original
  })

  test('starts as the badge alone and opens the card on tap', async () => {
    const user = userEvent.setup()
    render(<WhatsAppButton />)
    expect(screen.queryByText(/chat with us on whatsapp/i)).not.toBeInTheDocument()
    const toggle = screen.getByRole('button', { name: /whatsapp/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(screen.getByText(/chat with us on whatsapp/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /uganda/i })).toBeInTheDocument()
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.click(toggle)
    expect(screen.queryByText(/chat with us on whatsapp/i)).not.toBeInTheDocument()
  })
})

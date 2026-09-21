import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import WhatsAppButton from './WhatsAppButton'

function setScroll(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
  fireEvent.scroll(window)
}

describe('WhatsAppButton', () => {
  afterEach(() => setScroll(0))

  test('stays hidden at the top of the page', () => {
    render(<WhatsAppButton />)
    expect(screen.queryByRole('link', { name: /whatsapp/i })).not.toBeInTheDocument()
  })

  test('appears once the visitor scrolls', () => {
    render(<WhatsAppButton />)
    setScroll(400)
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument()
  })

  test('opens the chat safely in a new tab', () => {
    render(<WhatsAppButton />)
    setScroll(400)
    const link = screen.getByRole('link', { name: /whatsapp/i })
    expect(link).toHaveAttribute('href', 'https://wa.me/256392177300')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
  })

  test('hides again when the visitor returns to the top', () => {
    render(<WhatsAppButton />)
    setScroll(400)
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument()
    setScroll(0)
    expect(screen.queryByRole('link', { name: /whatsapp/i })).not.toBeInTheDocument()
  })
})

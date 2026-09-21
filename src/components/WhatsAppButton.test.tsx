import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import WhatsAppButton from './WhatsAppButton'

function setScroll(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
  fireEvent.scroll(window)
}

function launcher() {
  return screen.getByRole('button', { name: /whatsapp/i })
}

function openCard() {
  render(<WhatsAppButton />)
  setScroll(400)
  fireEvent.click(launcher())
}

describe('WhatsAppButton', () => {
  afterEach(() => setScroll(0))

  test('stays hidden at the top of the page', () => {
    render(<WhatsAppButton />)
    expect(screen.queryByRole('button', { name: /whatsapp/i })).not.toBeInTheDocument()
  })

  test('appears once the visitor scrolls', () => {
    render(<WhatsAppButton />)
    setScroll(400)
    expect(launcher()).toBeInTheDocument()
  })

  test('opens both country lines in a new tab', () => {
    openCard()
    const uganda = screen.getByRole('link', { name: /uganda/i })
    const kenya = screen.getByRole('link', { name: /kenya/i })
    expect(uganda).toHaveAttribute('href', 'https://wa.me/256759786255')
    expect(kenya).toHaveAttribute('href', 'https://wa.me/254118319547')
    for (const link of [uganda, kenya]) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link.getAttribute('rel')).toContain('noopener')
    }
  })

  test('closes the card on Escape', () => {
    openCard()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('link', { name: /uganda/i })).not.toBeInTheDocument()
  })

  test('closes the card when the visitor clicks elsewhere', () => {
    openCard()
    fireEvent.pointerDown(document.body)
    expect(screen.queryByRole('link', { name: /uganda/i })).not.toBeInTheDocument()
  })

  test('hides again when the visitor returns to the top', () => {
    render(<WhatsAppButton />)
    setScroll(400)
    expect(launcher()).toBeInTheDocument()
    setScroll(0)
    expect(screen.queryByRole('button', { name: /whatsapp/i })).not.toBeInTheDocument()
  })
})

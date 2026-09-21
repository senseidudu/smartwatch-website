import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import { heroWords } from '../../data/content'
import Hero from './Hero'

function renderHero() {
  return render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>,
  )
}

describe('Home hero', () => {
  test('renders the headline', () => {
    renderHero()
    expect(
      screen.getByRole('heading', { level: 1, name: /a decade of connecting and protecting fleets/i }),
    ).toBeInTheDocument()
  })

  test('lists all three words in the lead sentence', () => {
    renderHero()
    const lead = screen.getByText(/one platform to help improve the/i)
    for (const word of heroWords) {
      expect(within(lead).getAllByText(word)).toHaveLength(1)
    }
    expect(lead).toHaveTextContent('safety, productivity, and profitability')
  })

  test('offers only the products link, with no demo button or video', () => {
    renderHero()
    expect(screen.getByRole('link', { name: /explore products/i })).toHaveAttribute('href', '/products')
    expect(screen.queryByRole('link', { name: /get a demo/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /watch/i })).not.toBeInTheDocument()
    expect(document.querySelector('video')).toBeNull()
  })

  test('carries one photograph per word, with the first one showing', () => {
    renderHero()
    const slides = document.querySelectorAll('[data-scroll-slides] img')
    expect(slides).toHaveLength(heroWords.length)
    expect(slides[0].closest('[aria-hidden]')).toHaveAttribute('aria-hidden', 'false')
    expect(slides[1].closest('[aria-hidden]')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('Speed alert cleared')).toBeInTheDocument()
  })
})

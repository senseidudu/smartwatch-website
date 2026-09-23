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

  test('splits the headline into word masks that rise into view', () => {
    renderHero()
    const words = document.querySelectorAll('h1 [data-word]')
    expect(words).toHaveLength(7)
    expect(words[0]).toHaveTextContent('A')
    expect(words[6]).toHaveTextContent('fleets.')
  })

  test('lists all three words in the lead sentence', () => {
    renderHero()
    const lead = screen.getByText(/one platform to help improve the/i)
    for (const word of heroWords) {
      expect(within(lead).getAllByText(word)).toHaveLength(1)
    }
    expect(lead).toHaveTextContent('safety, productivity, and profitability')
  })

  test('offers only the products link, as a corner button, with no demo button', () => {
    renderHero()
    const link = screen.getByRole('link', { name: /explore products/i })
    expect(link).toHaveAttribute('href', '/products')
    expect(link.parentElement?.querySelectorAll('[aria-hidden="true"]')).toHaveLength(8)
    expect(screen.queryByRole('link', { name: /get a demo/i })).not.toBeInTheDocument()
  })

  test('plays the muted hero video in place of the photographs', () => {
    renderHero()
    const video = document.querySelector('video')!
    expect(video).toHaveAttribute('src', '/videos/hero.mp4')
    expect(video).toHaveAttribute('poster', '/videos/hero-poster.webp')
    expect(video.muted).toBe(true)
    expect(video.loop).toBe(true)
    expect(document.querySelector('[data-slides]')).toBeNull()
    expect(screen.getByText('Speed alert cleared')).toBeInTheDocument()
  })
})

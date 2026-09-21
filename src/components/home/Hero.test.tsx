import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  test('cycles the three words through the morphing text', () => {
    renderHero()
    const lead = screen.getByText(/one platform to help improve the/i)
    for (const word of heroWords) {
      expect(within(lead).getAllByText(word).length).toBeGreaterThan(0)
    }
  })

  test('offers only the watch demo action', () => {
    renderHero()
    expect(screen.getByRole('button', { name: /watch demo/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /get a demo/i })).not.toBeInTheDocument()
  })

  test('"Watch demo" opens the video modal', async () => {
    const user = userEvent.setup()
    renderHero()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /watch demo/i }))
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog.querySelector('video')?.getAttribute('src')).toBe('/video/Smartvideo.mp4')
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import Hero from './Hero'

function renderHero() {
  return render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>,
  )
}

describe('Home hero', () => {
  test('renders the headline and primary actions', () => {
    renderHero()
    expect(
      screen.getByRole('heading', { level: 1, name: /a decade of connecting and protecting fleets/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /get a demo/i })).toHaveAttribute('href', '/contact')
  })

  test('offers three word tabs with the first selected', () => {
    renderHero()
    const tabs = screen.getAllByRole('tab')
    expect(tabs.map((t) => t.textContent)).toEqual(['safety', 'productivity', 'profitability'])
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', tabs[0].id)
  })

  test('clicking a word selects its media slide', async () => {
    const user = userEvent.setup()
    renderHero()
    const productivity = screen.getByRole('tab', { name: 'productivity' })
    await user.click(productivity)
    expect(productivity).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'safety' })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', productivity.id)
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

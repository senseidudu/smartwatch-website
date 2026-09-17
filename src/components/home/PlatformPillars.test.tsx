import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import PlatformPillars from './PlatformPillars'

function renderPillars() {
  return render(
    <MemoryRouter>
      <PlatformPillars />
    </MemoryRouter>,
  )
}

describe('PlatformPillars tabs', () => {
  test('shows the Compliance pillar first', () => {
    renderPillars()
    expect(
      screen.getByRole('heading', { level: 3, name: /manage compliance better/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /compliance/i })).toHaveAttribute('aria-selected', 'true')
  })

  test('clicking a tab shows that pillar', async () => {
    const user = userEvent.setup()
    renderPillars()
    await user.click(screen.getByRole('tab', { name: /tracking & telematics/i }))
    expect(
      screen.getByRole('heading', { level: 3, name: /real-time visibility into the location/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('Full fleet visibility on one map')).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /tracking & telematics/i })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tab', { name: /compliance/i })).toHaveAttribute('aria-selected', 'false')
  })

  test('renders all seven pillars as tabs', () => {
    renderPillars()
    expect(screen.getAllByRole('tab')).toHaveLength(7)
  })
})

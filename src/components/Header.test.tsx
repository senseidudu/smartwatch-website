import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import Header from './Header'

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  )
}

describe('Header mega menus', () => {
  test('no menu is open initially', () => {
    renderHeader()
    expect(screen.queryByText('By industry')).not.toBeInTheDocument()
  })

  test('hovering Solutions opens the Solutions menu', async () => {
    const user = userEvent.setup()
    renderHeader()
    await user.hover(screen.getByRole('button', { name: /solutions/i }))
    expect(screen.getByText('By industry')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Oil and Gas' })).toBeInTheDocument()
  })

  test('hovering Products swaps the open menu', async () => {
    const user = userEvent.setup()
    renderHeader()
    await user.hover(screen.getByRole('button', { name: /solutions/i }))
    await user.hover(screen.getByRole('button', { name: /products/i }))
    expect(screen.queryByText('By industry')).not.toBeInTheDocument()
    expect(screen.getByText('Driver Safety Dash Cameras are here.')).toBeInTheDocument()
  })

  test('hovering Contact closes any open menu', async () => {
    const user = userEvent.setup()
    renderHeader()
    await user.hover(screen.getByRole('button', { name: /company/i }))
    expect(screen.getByText('Get to know Smartwatch')).toBeInTheDocument()
    await user.hover(screen.getByRole('link', { name: /^contact$/i }))
    expect(screen.queryByText('Get to know Smartwatch')).not.toBeInTheDocument()
  })

  test('leaving the header closes the menu', async () => {
    const user = userEvent.setup()
    renderHeader()
    await user.hover(screen.getByRole('button', { name: /resources/i }))
    expect(screen.getByText('Technical resources')).toBeInTheDocument()
    await user.unhover(screen.getByRole('banner'))
    expect(screen.queryByText('Technical resources')).not.toBeInTheDocument()
  })

  test('menu buttons expose their open state', async () => {
    const user = userEvent.setup()
    renderHeader()
    const button = screen.getByRole('button', { name: /solutions/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.hover(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })
})

describe('Header phone popover', () => {
  test('hovering the phone number shows the contact popover', async () => {
    const user = userEvent.setup()
    renderHeader()
    expect(screen.queryByText('Talk to Sales or Support 24/7')).not.toBeInTheDocument()
    await user.hover(screen.getByRole('link', { name: /\+256 392 177 300 sales/i }))
    expect(screen.getByText('Talk to Sales or Support 24/7')).toBeInTheDocument()
  })
})

describe('Header mobile drawer', () => {
  test('menu button toggles the drawer', async () => {
    const user = userEvent.setup()
    renderHeader()
    const toggle = screen.getByRole('button', { name: /open menu/i })
    expect(screen.queryByRole('dialog', { name: /menu/i })).not.toBeInTheDocument()
    await user.click(toggle)
    const drawer = screen.getByRole('dialog', { name: /menu/i })
    expect(drawer).toBeInTheDocument()
    expect(drawer).toHaveTextContent('Solutions')
    expect(drawer).toHaveTextContent('Contact')
    await user.click(screen.getByRole('button', { name: /close menu/i }))
    expect(screen.queryByRole('dialog', { name: /menu/i })).not.toBeInTheDocument()
  })
})

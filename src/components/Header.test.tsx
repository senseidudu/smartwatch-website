import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, test } from 'vitest'
import Header from './Header'

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  )
}

function setScroll(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
  fireEvent.scroll(window)
}

/** Stands a band at the given viewport rows; jsdom has no layout, so the rect is supplied. */
function placeBand(el: HTMLElement, top: number, bottom: number) {
  el.getBoundingClientRect = () =>
    ({ top, bottom, left: 0, right: 1000, width: 1000, height: bottom - top, x: 0, y: top, toJSON: () => ({}) }) as DOMRect
}

function renderHeaderOverBands() {
  render(
    <MemoryRouter>
      <Header />
      <section data-band="dark" data-testid="dark" />
      <section data-band="light" data-testid="light" />
    </MemoryRouter>,
  )
  return { dark: screen.getByTestId('dark'), light: screen.getByTestId('light') }
}

describe('Header mega menus', () => {
  test('no menu is open initially', () => {
    renderHeader()
    expect(screen.queryByText('By industry')).not.toBeInTheDocument()
  })

  test('hovering Solutions opens the industry card', async () => {
    const user = userEvent.setup()
    renderHeader()
    await user.hover(screen.getByRole('button', { name: /solutions/i }))
    expect(screen.getByText('By industry')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Oil and Gas' })).toHaveAttribute('href', '/solutions/oil-and-gas')
  })

  test('hovering Products swaps the open menu and lists hardware in the featured column', async () => {
    const user = userEvent.setup()
    renderHeader()
    await user.hover(screen.getByRole('button', { name: /solutions/i }))
    await user.hover(screen.getByRole('button', { name: /products/i }))
    expect(screen.queryByText('By industry')).not.toBeInTheDocument()
    expect(screen.getByText('Driver Safety Dash Cameras are here.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Devices' })).toHaveAttribute('href', '/hardware#devices')
    expect(screen.getByRole('link', { name: /view all products/i })).toHaveAttribute('href', '/products')
  })

  test('hovering Contact closes any open menu', async () => {
    const user = userEvent.setup()
    renderHeader()
    await user.hover(screen.getByRole('button', { name: /company/i }))
    expect(screen.getByText('Get to know Smartwatch')).toBeInTheDocument()
    await user.hover(screen.getByRole('link', { name: /^contact$/i }))
    await waitFor(() => expect(screen.queryByText('Get to know Smartwatch')).not.toBeInTheDocument())
  })

  test('leaving the header closes the menu', async () => {
    const user = userEvent.setup()
    renderHeader()
    await user.hover(screen.getByRole('button', { name: /resources/i }))
    expect(screen.getByText('Technical resources')).toBeInTheDocument()
    await user.unhover(screen.getByRole('banner'))
    await waitFor(() => expect(screen.queryByText('Technical resources')).not.toBeInTheDocument())
  })

  test('a menu stays open while the pointer crosses the gap into its panel', async () => {
    const user = userEvent.setup()
    renderHeader()
    await user.hover(screen.getByRole('button', { name: /resources/i }))
    const panel = screen.getByText('Technical resources').closest('[id^="megamenu-"]')
    // Leaving the bar schedules the close; reaching the panel has to cancel it.
    await user.unhover(screen.getByRole('banner'))
    await user.hover(panel as HTMLElement)
    await new Promise((resolve) => setTimeout(resolve, 400))
    expect(screen.getByText('Technical resources')).toBeInTheDocument()
  })

  test('menu buttons expose their open state', async () => {
    const user = userEvent.setup()
    renderHeader()
    const button = screen.getByRole('button', { name: /solutions/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.hover(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  test('nav order is Products, Solutions, Resources, Company', () => {
    renderHeader()
    const nav = screen.getByRole('navigation', { name: /primary/i })
    expect(within(nav).getAllByRole('button').map((b) => b.textContent?.trim())).toEqual([
      'Products',
      'Solutions',
      'Resources',
      'Company',
    ])
  })
})

describe('Header utilities', () => {
  test('shows Contact and the demo button, with no phone number or login', () => {
    renderHeader()
    const banner = screen.getByRole('banner')
    expect(within(banner).getByRole('link', { name: /^contact$/i })).toHaveAttribute('href', '/contact')
    expect(within(banner).getByRole('link', { name: /get a demo/i })).toHaveAttribute('href', '/contact')
    expect(screen.queryByRole('link', { name: /\+256 392 177 300/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /^login$/i })).not.toBeInTheDocument()
  })

  test('hovering Contact reveals the sales and support popover', async () => {
    const user = userEvent.setup()
    renderHeader()
    expect(screen.queryByText('Talk to Sales or Support 24/7')).not.toBeInTheDocument()
    await user.hover(screen.getByRole('link', { name: /^contact$/i }))
    expect(screen.getByText('Talk to Sales or Support 24/7')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '+256 392 177 300' })).toHaveAttribute('href', 'tel:+256392177300')
  })
})

describe('Header theme', () => {
  afterEach(() => setScroll(0))

  test('starts transparent over the dark hero', () => {
    renderHeader()
    const banner = screen.getByRole('banner')
    expect(banner).toHaveAttribute('data-theme', 'dark')
    expect(banner).not.toHaveAttribute('data-solid')
  })

  test('turns solid once the page has scrolled', () => {
    renderHeader()
    setScroll(120)
    expect(screen.getByRole('banner')).toHaveAttribute('data-solid')
    setScroll(0)
    expect(screen.getByRole('banner')).not.toHaveAttribute('data-solid')
  })

  test('takes the colour of the band under its bottom edge', () => {
    const { dark, light } = renderHeaderOverBands()
    const banner = screen.getByRole('banner')
    placeBand(dark, 0, 700)
    placeBand(light, 700, 1400)
    setScroll(120)
    expect(banner).toHaveAttribute('data-theme', 'dark')
    // The light panel climbs up under the bar.
    placeBand(dark, -650, 50)
    placeBand(light, 50, 750)
    setScroll(650)
    expect(banner).toHaveAttribute('data-theme', 'light')
    placeBand(dark, 0, 700)
    placeBand(light, 700, 1400)
    setScroll(0)
    expect(banner).toHaveAttribute('data-theme', 'dark')
  })

  test('a later band wins where it overlaps the pinned hero', () => {
    const { dark, light } = renderHeaderOverBands()
    // The sticky hero still spans the header line while the first panel has risen over it.
    placeBand(dark, 64, 900)
    placeBand(light, 40, 1200)
    setScroll(400)
    expect(screen.getByRole('banner')).toHaveAttribute('data-theme', 'light')
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

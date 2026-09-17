import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import App from './App'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('routing', () => {
  test('renders the home page at /', () => {
    renderAt('/')
    expect(
      screen.getByRole('heading', { level: 1, name: /a decade of connecting and protecting fleets/i }),
    ).toBeInTheDocument()
  })

  test('renders the products page at /products', () => {
    renderAt('/products')
    expect(
      screen.getByRole('heading', { level: 1, name: /protect your fleet and profits/i }),
    ).toBeInTheDocument()
  })

  test('renders the solutions page at /solutions', () => {
    renderAt('/solutions')
    expect(
      screen.getByRole('heading', { level: 1, name: /built for the industries that keep east africa moving/i }),
    ).toBeInTheDocument()
  })

  test('renders the company page at /company', () => {
    renderAt('/company')
    expect(
      screen.getByRole('heading', { level: 1, name: /total peace of mind, since 2011/i }),
    ).toBeInTheDocument()
  })

  test('renders the contact page at /contact', () => {
    renderAt('/contact')
    expect(
      screen.getByRole('heading', { level: 1, name: /talk to sales or support, 24\/7/i }),
    ).toBeInTheDocument()
  })

  test('sends unknown paths to the home page', () => {
    renderAt('/does-not-exist')
    expect(
      screen.getByRole('heading', { level: 1, name: /a decade of connecting and protecting fleets/i }),
    ).toBeInTheDocument()
  })

  test('header "Get a demo" navigates to the contact page', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('banner').querySelector('a[href="/contact"]')!)
    expect(
      screen.getByRole('heading', { level: 1, name: /talk to sales or support, 24\/7/i }),
    ).toBeInTheDocument()
  })

  test('shows the shared header and footer on every page', () => {
    renderAt('/solutions')
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})

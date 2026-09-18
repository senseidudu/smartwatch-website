import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import RegionToast from './RegionToast'

describe('RegionToast', () => {
  test('is visible on load', () => {
    render(<RegionToast />)
    expect(screen.getByText('Welcome to Smartwatch!')).toBeInTheDocument()
  })

  test('"Yes, continue" dismisses it', async () => {
    const user = userEvent.setup()
    render(<RegionToast />)
    await user.click(screen.getByRole('button', { name: /yes, continue/i }))
    expect(screen.queryByText('Welcome to Smartwatch!')).not.toBeInTheDocument()
  })

  test('"No, stay on this site" dismisses it', async () => {
    const user = userEvent.setup()
    render(<RegionToast />)
    await user.click(screen.getByRole('button', { name: /no, stay on this site/i }))
    expect(screen.queryByText('Welcome to Smartwatch!')).not.toBeInTheDocument()
  })
})

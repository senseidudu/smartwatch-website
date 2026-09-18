import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, test } from 'vitest'
import VideoModal from './VideoModal'

function Harness() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Watch demo
      </button>
      <VideoModal open={open} onClose={() => setOpen(false)} src="/video/Smartvideo.mp4" title="Corporate video" />
    </>
  )
}

describe('VideoModal', () => {
  test('is closed until opened, then shows the video', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /watch demo/i }))
    const dialog = screen.getByRole('dialog', { name: /corporate video/i })
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog.querySelector('video')).toHaveAttribute('src', '/video/Smartvideo.mp4')
  })

  test('closes on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const trigger = screen.getByRole('button', { name: /watch demo/i })
    await user.click(trigger)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  test('closes with the close button', async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole('button', { name: /watch demo/i }))
    await user.click(screen.getByRole('button', { name: /close/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

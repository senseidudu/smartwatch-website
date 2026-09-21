import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site'
import { cx } from '../lib/cx'
import { useScrolled } from '../motion/useScrolled'
import s from './WhatsAppButton.module.css'

/**
 * The chat glyph is an original mark, not WhatsApp's trademarked logo. To show the
 * official mark, download it from WhatsApp's brand resources and swap the paths below.
 */
export function WhatsAppMark({ size = 26 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.6a8.4 8.4 0 0 1-12.3 7.5L3.5 20.5l1.4-5.1A8.4 8.4 0 1 1 21 11.6z" />
      <path d="M9 9.2c.3-.1.6 0 .8.3l.8 1.3c.2.3.1.6-.1.8l-.5.5a5.2 5.2 0 0 0 2.4 2.4l.5-.5c.2-.2.5-.3.8-.1l1.3.8c.3.2.4.5.3.8a2.2 2.2 0 0 1-2.5 1.4 7.3 7.3 0 0 1-5.2-5.2A2.2 2.2 0 0 1 9 9.2z" />
    </svg>
  )
}

/**
 * Floating WhatsApp launcher that appears once the visitor starts scrolling.
 * The launcher unmounts back at the top of the page, which also closes its card.
 */
export default function WhatsAppButton() {
  const scrolled = useScrolled(200)
  if (!scrolled) return null
  return <Launcher />
}

/**
 * We run a line per region, so the button opens a small card to pick one rather
 * than guessing which team the visitor wants.
 */
function Launcher() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  /** Escape, or a click anywhere else on the page, closes the card. */
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event: Event) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <div ref={rootRef} className={s.root}>
      {open && (
        <div className={s.card}>
          <div className={s.cardTitle}>Chat with us on WhatsApp</div>
          <p className={s.cardBody}>Pick the line nearest to you.</p>
          {site.whatsapp.map((line) => (
            <a
              key={line.href}
              href={line.href}
              target="_blank"
              rel="noopener noreferrer"
              className={s.line}
              onClick={() => setOpen(false)}
            >
              <span className={s.lineCountry}>{line.country}</span>
              <span className={s.lineNumber}>{line.label}</span>
            </a>
          ))}
        </div>
      )}
      <button
        type="button"
        className={cx(s.button, 'lift')}
        aria-expanded={open}
        aria-label={open ? 'Close the WhatsApp numbers' : 'Chat with Smartwatch on WhatsApp'}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        <WhatsAppMark />
      </button>
    </div>
  )
}

import { site } from '../data/site'
import { cx } from '../lib/cx'
import { useScrolled } from '../motion/useScrolled'
import s from './WhatsAppButton.module.css'

/**
 * Floating WhatsApp link that appears once the visitor starts scrolling.
 * The glyph is an original chat mark, not WhatsApp's trademarked logo. To show the
 * official mark, download it from WhatsApp's brand resources and swap the <svg> below.
 */
export default function WhatsAppButton() {
  const scrolled = useScrolled(200)
  if (!scrolled) return null
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(s.button, 'lift')}
      aria-label="Chat with Smartwatch on WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
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
    </a>
  )
}

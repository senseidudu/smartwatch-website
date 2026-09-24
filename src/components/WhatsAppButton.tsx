import { site } from '../data/site'
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
 * Floating WhatsApp card, pinned open on every page from first load. We run a line
 * per region, so both numbers stay in view rather than guessing which team the
 * visitor wants.
 */
export default function WhatsAppButton() {
  return (
    <aside className={s.root} aria-label="Chat with Smartwatch on WhatsApp">
      <div className={s.card}>
        <div className={s.cardTitle}>Chat with us on WhatsApp</div>
        <p className={s.cardBody}>Pick the line nearest to you.</p>
        {site.whatsapp.map((line) => (
          <a key={line.href} href={line.href} target="_blank" rel="noopener noreferrer" className={s.line}>
            <span className={s.lineCountry}>{line.country}</span>
            <span className={s.lineNumber}>{line.label}</span>
          </a>
        ))}
      </div>
      <div className={s.badge} aria-hidden="true">
        <WhatsAppMark />
      </div>
    </aside>
  )
}

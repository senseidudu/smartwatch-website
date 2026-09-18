import { useEffect, useId, useRef, useState } from 'react'
import { portals } from '../data/site'
import { cx } from '../lib/cx'
import s from './LoginMenu.module.css'

/** "Login" button that reveals the three customer platforms. */
export default function LoginMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointer)
    }
  }, [open])

  return (
    <div ref={rootRef} className={cx(s.root, className)}>
      <button
        type="button"
        className={s.button}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        Login <span className={s.caret} aria-hidden="true">▾</span>
      </button>
      {open && (
        <div id={id} role="menu" aria-label="Platform logins" className={s.menu}>
          {portals.map((portal) => (
            <a
              key={portal.href}
              role="menuitem"
              href={portal.href}
              target="_blank"
              rel="noopener noreferrer"
              className={s.item}
              onClick={() => setOpen(false)}
            >
              <span className={s.itemName}>{portal.name}</span>
              <span className={s.itemShort}>{portal.short}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

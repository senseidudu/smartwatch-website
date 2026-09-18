import { useLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import s from './VideoModal.module.css'

type Props = { open: boolean; onClose: () => void; src: string; title: string; poster?: string }

/** Full-screen video overlay. Escape or the backdrop closes it; focus returns to the trigger. */
export default function VideoModal({ open, onClose, src, title, poster }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    if (!open) return
    const trigger = document.activeElement as HTMLElement | null
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      lenis?.start()
      trigger?.focus()
    }
  }, [open, onClose, lenis])

  if (!open) return null

  return createPortal(
    <div className={s.backdrop} onClick={onClose} data-lenis-prevent>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={s.dialog}
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} type="button" className={s.close} onClick={onClose} aria-label="Close video">
          ✕
        </button>
        <video src={src} poster={poster} controls autoPlay playsInline className={s.video} />
      </div>
    </div>,
    document.body,
  )
}

import { useState } from 'react'
import s from './RegionToast.module.css'

export default function RegionToast() {
  const [open, setOpen] = useState(true)
  if (!open) return null
  const close = () => setOpen(false)
  return (
    <aside className={s.toast} aria-label="Regional welcome">
      <div className={s.title}>Welcome to Smartwatch!</div>
      <div className={s.body}>
        Discover how Smartwatch can help your fleet operations in Kenya with our regional team in
        Nairobi.
      </div>
      <div className={s.actions}>
        <button type="button" className={s.primary} onClick={close}>
          Yes, continue
        </button>
        <button type="button" className={s.secondary} onClick={close}>
          No, stay on this site
        </button>
      </div>
    </aside>
  )
}

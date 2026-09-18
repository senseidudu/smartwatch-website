import type { ReactNode } from 'react'
import { cx } from '../lib/cx'
import s from './Panel.module.css'

/** White rounded panel floating on the navy page base. */
export default function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx(s.panel, className)} data-band="light">
      {children}
    </div>
  )
}

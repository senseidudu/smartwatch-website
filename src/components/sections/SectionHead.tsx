import { cx } from '../../lib/cx'
import s from './Sections.module.css'

type Props = { eyebrow?: string; title?: string; intro?: string; center?: boolean; light?: boolean }

export default function SectionHead({ eyebrow, title, intro, center = false, light = false }: Props) {
  if (!eyebrow && !title && !intro) return null
  return (
    <div className={cx(s.head, center && s.headCenter)}>
      {eyebrow && <div className={cx('eyebrow', light && 'eyebrow--bright')}>{eyebrow}</div>}
      {title && <h2 className="h-section">{title}</h2>}
      {intro && <p className={cx('lead', light && s.leadLight)}>{intro}</p>}
    </div>
  )
}

import { routes } from '../../data/site'
import type { Cta } from '../../data/types'
import { cx } from '../../lib/cx'
import SmartLink from '../SmartLink'
import s from './Sections.module.css'

type Props = { title: string; body: string; ctas: Cta[] }

export const defaultCta: Props = {
  title: 'See it in action.',
  body: 'A 30-minute walkthrough with our Kampala or Nairobi team, on your fleet and your routes.',
  ctas: [
    { label: 'Get a demo', to: routes.contact, variant: 'primary' },
    { label: 'Talk to support', to: `${routes.contact}#support`, variant: 'outline-light' },
  ],
}

export function btnClass(variant: Cta['variant'] = 'primary'): string {
  return cx('btn', `btn--${variant}`)
}

export default function CtaBand({ title, body, ctas }: Props) {
  return (
    <section className={cx('container', s.section)}>
      <div className={s.ctaBand}>
        <div className={s.ctaCopy}>
          <h2 className="h-section">{title}</h2>
          <p className={s.ctaBody}>{body}</p>
        </div>
        <div className={s.ctaActions}>
          {ctas.map((cta) => (
            <SmartLink key={cta.label} to={cta.to} className={btnClass(cta.variant)}>
              {cta.label}
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  )
}

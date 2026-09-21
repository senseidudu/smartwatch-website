import { routes } from '../../data/site'
import type { Cta, DetailPage } from '../../data/types'
import { cx } from '../../lib/cx'

export type CtaBandProps = { title: string; body: string; ctas: Cta[] }

export const defaultCta: CtaBandProps = {
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

/** Hero buttons when a page defines none. No demo button here: the closing band carries it. */
export function defaultHeroCtas(kind: DetailPage['kind']): Cta[] {
  if (kind === 'product') return [{ label: 'View hardware', to: routes.hardware, variant: 'outline-light' }]
  if (kind === 'solution') return [{ label: 'All solutions', to: routes.solutions, variant: 'outline-light' }]
  return []
}

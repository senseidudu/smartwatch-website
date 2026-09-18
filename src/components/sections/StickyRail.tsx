import { useState } from 'react'
import { cx } from '../../lib/cx'
import s from './Sections.module.css'

export type RailItem = { id: string; label: string }

const labels: Record<string, string> = {
  features: 'Features',
  benefits: 'Benefits',
  'how-it-works': 'How it works',
  hardware: 'Hardware',
  resources: 'Resources',
  faq: 'FAQ',
  devices: 'Devices',
  accessories: 'Accessories',
  specs: 'Specs',
  industries: 'Industries',
  related: 'Related',
  stats: 'At a glance',
  vision: 'Vision',
  heritage: 'Heritage',
  'why-us': 'Why us',
  awards: 'Awards',
  support: 'Support',
}

export function railLabel(id: string, fallback?: string): string {
  return labels[id] ?? fallback ?? id
}

/** In-page anchor pills that stay under the header while the page scrolls. */
export default function StickyRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id)
  return (
    <nav className={s.rail} aria-label="On this page">
      <div className={cx('container', s.railInner)}>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cx(s.railPill, active === item.id && s.railPillOn)}
            aria-current={active === item.id ? 'location' : undefined}
            onClick={() => setActive(item.id)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

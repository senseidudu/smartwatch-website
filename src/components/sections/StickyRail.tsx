import { useRef, useState } from 'react'
import { cx } from '../../lib/cx'
import { ScrollTrigger, useGSAP } from '../../motion/gsap'
import type { RailItem } from './rail'
import s from './Sections.module.css'

/** In-page anchor pills that stay under the header and highlight the section in view. */
export default function StickyRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id)
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const triggers = items.map((item) => {
        const target = document.getElementById(item.id)
        if (!target) return null
        return ScrollTrigger.create({
          trigger: target,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) setActive(item.id)
          },
        })
      })
      return () => triggers.forEach((t) => t?.kill())
    },
    { scope: ref, dependencies: [items] },
  )

  return (
    <nav className={s.rail} aria-label="On this page" ref={ref}>
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

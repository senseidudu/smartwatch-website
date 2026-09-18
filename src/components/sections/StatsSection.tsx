import { useRef } from 'react'
import { formatStat } from '../../data/site'
import type { Section } from '../../data/types'
import { cx } from '../../lib/cx'
import { gsap, useGSAP } from '../../motion/gsap'
import { MOTION_OK } from '../../motion/motion'
import SectionHead from './SectionHead'
import s from './Sections.module.css'

type Props = { section: Extract<Section, { kind: 'stats' }> }

/** Counts each number up from zero the first time the band scrolls into view. */
export function useCountUp(ref: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count)
          const prefix = el.dataset.prefix ?? ''
          const suffix = el.dataset.suffix ?? ''
          const counter = { value: 0 }
          gsap.to(counter, {
            value: target,
            duration: 1.2,
            ease: 'power1.out',
            snap: { value: 1 },
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onUpdate: () => {
              el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`
            },
          })
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )
}

export default function StatsSection({ section }: Props) {
  const ref = useRef<HTMLElement>(null)
  useCountUp(ref)
  return (
    <section id={section.id} className={cx('container', s.section)} ref={ref}>
      <SectionHead eyebrow={section.eyebrow} title={section.title} intro={section.intro} />
      <div className={s.stats}>
        {section.items.map((stat) => (
          <div key={stat.label} className={s.stat}>
            <div
              className={s.statValue}
              data-count={stat.value}
              data-prefix={stat.prefix ?? ''}
              data-suffix={stat.suffix ?? ''}
            >
              {formatStat(stat)}
            </div>
            <div className={s.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { pillars } from '../../data/pillars'
import { cx } from '../../lib/cx'
import { gsap, useGSAP } from '../../motion/gsap'
import { MOTION_OK } from '../../motion/motion'
import Icon from '../Icon'
import s from './ProductRail.module.css'

/** Index of the product suite: a row of seven tiles, each linking to its row further down. */
export default function ProductRail() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        gsap.from(el.querySelectorAll('[data-tile]'), {
          autoAlpha: 0,
          y: 18,
          scale: 0.96,
          duration: 0.5,
          stagger: 0.07,
          ease: 'back.out(1.4)',
          clearProps: 'transform',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div className={cx('container', s.wrap)} ref={ref}>
      <nav className={s.rail} aria-label="Products">
        {pillars.map((p) => (
          <a key={p.slug} href={`#row-${p.slug}`} className={cx(s.tile, 'lift')} data-tile>
            <span className={s.tileIcon}>
              <Icon name={p.icon} size={24} />
            </span>
            <span className={s.tileName}>{p.name}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}

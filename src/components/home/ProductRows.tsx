import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { pillars } from '../../data/pillars'
import { cx } from '../../lib/cx'
import { gsap, useGSAP } from '../../motion/gsap'
import { DESKTOP_MOTION } from '../../motion/motion'
import Icon from '../Icon'
import Media from '../Media'
import Reveal from '../Reveal'
import s from './ProductRows.module.css'

/** One alternating media + text row per product, in the same order as the rail. */
export default function ProductRows() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()
      mm.add(DESKTOP_MOTION, () => {
        el.querySelectorAll<HTMLElement>('[data-row]').forEach((row) => {
          const media = row.querySelector('[data-row-media]')
          if (!media) return
          gsap.fromTo(
            media,
            { y: 28 },
            {
              y: -28,
              ease: 'none',
              scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      })
      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div className={cx('container', s.rows)} ref={ref}>
      {pillars.map((p, i) => {
        const reverse = i % 2 === 1
        return (
          <Reveal
            as="section"
            key={p.slug}
            id={`row-${p.slug}`}
            data-row
            data-reverse={reverse}
            className={cx(s.row, reverse && s.rowReverse)}
          >
            <div className={s.copy}>
              <div className={s.eyebrowGroup}>
                <span className={s.icon}>
                  <Icon name={p.icon} size={20} />
                </span>
                <span className="eyebrow">{p.name}</span>
              </div>
              <h3 className={s.title}>{p.headline}</h3>
              <p className={s.body}>{p.body}</p>
              <div>
                <Link to={p.to} className="btn btn--outline btn--sm">
                  Learn more
                </Link>
              </div>
            </div>
            <div className={s.media} data-row-media>
              <Media image={p.image} label={p.imageLabel} ratio="4 / 3" radius={20} decorative />
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}

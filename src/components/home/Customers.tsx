import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { partnerLogos } from '../../data/logos'
import { routes } from '../../data/site'
import type { Img } from '../../data/types'
import { cx } from '../../lib/cx'
import { prefersReducedMotion } from '../../motion/motion'
import s from './Customers.module.css'

/** Logos per slide: the design's four-by-three grid. */
export const PER_SLIDE = 12
/** How long each slide stays up before the carousel moves on. */
export const ROTATE_INTERVAL = 5000

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

/** Every partner logo, twelve to a slide, in the order of the data file. */
const slides: Img[][] = chunk(partnerLogos, PER_SLIDE)

export default function Customers() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = prefersReducedMotion()
  const count = slides.length

  const go = (i: number) => setIndex(((i % count) + count) % count)

  // Rotates on its own; pauses under the pointer or keyboard focus, and a manual pick restarts the clock.
  useEffect(() => {
    if (reduced || paused || count < 2) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_INTERVAL)
    return () => clearInterval(timer)
  }, [reduced, paused, count, index])

  return (
    <section className={cx('container', s.section)}>
      <div className={s.copy}>
        <div className="eyebrow">Our customers</div>
        <h2 className="h-section">Trusted by local and international partners.</h2>
        <p className={s.body}>800+ companies, from small businesses to large enterprises, run their fleets on Smartwatch.</p>
        <div className={s.links}>
          <Link to={routes.solutions} className="link-arrow">
            Explore success stories →
          </Link>
        </div>
      </div>

      <div
        className={s.carousel}
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer logos"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className={s.viewport}>
          <div className={s.track} style={{ transform: `translateX(-${index * 100}%)` }}>
            {slides.map((slide, i) => (
              <ul
                key={i}
                className={s.slide}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== index}
              >
                {slide.map((logo) => (
                  <li key={logo.src} className={s.logo}>
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className={s.logoImg}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className={s.controls}>
          <button type="button" className={s.arrow} aria-label="Previous logos" onClick={() => go(index - 1)}>
            <span aria-hidden="true">←</span>
          </button>
          <div className={s.dots}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={cx(s.dot, i === index && s.dotOn)}
                aria-label={`Show logos ${i + 1} of ${count}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button type="button" className={s.arrow} aria-label="Next logos" onClick={() => go(index + 1)}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import type { Img } from '../../data/types'
import { cx } from '../../lib/cx'
import s from './LogoMarquee.module.css'

type Props = {
  logos: Img[]
  /** Which way the row travels. The two rows of the band run opposite each other. */
  direction?: 'left' | 'right'
  /** Seconds for one full pass. Give each row its own so they never march in lockstep. */
  duration?: number
}

/**
 * One self-repeating row of partner logos. The track holds the set twice so the
 * -50% translation lands back on an identical frame; the second copy is hidden
 * from assistive tech, and from everyone when the visitor prefers reduced motion
 * (the row becomes a plain horizontal scroller instead).
 */
export default function LogoMarquee({ logos, direction = 'left', duration = 70 }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  // The row clips its own overflow, so native lazy loading would fetch each logo
  // only as it slid into the gap — blank tiles for most of the first pass. Hold
  // everything back until the row nears the viewport, then fetch the whole set.
  const [near, setNear] = useState(false)

  useEffect(() => {
    const row = rowRef.current
    if (!row || typeof IntersectionObserver === 'undefined') {
      setNear(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setNear(true)
        observer.disconnect()
      },
      { rootMargin: '600px 0px' },
    )
    observer.observe(row)
    return () => observer.disconnect()
  }, [])

  const render = (logo: Img, repeat: boolean) => (
    <li
      key={repeat ? `${logo.src}-repeat` : logo.src}
      className={cx(s.item, repeat && s.repeat)}
      aria-hidden={repeat || undefined}
    >
      <img
        src={logo.src}
        alt={repeat ? '' : logo.alt}
        width={logo.width}
        height={logo.height}
        loading={near ? 'eager' : 'lazy'}
        fetchPriority="low"
        decoding="async"
        className={s.logo}
      />
    </li>
  )

  return (
    <div className={s.row} ref={rowRef}>
      <ul
        className={cx(s.track, direction === 'right' && s.reverse)}
        style={{ animationDuration: `${duration}s` }}
      >
        {logos.map((logo) => render(logo, false))}
        {logos.map((logo) => render(logo, true))}
      </ul>
    </div>
  )
}

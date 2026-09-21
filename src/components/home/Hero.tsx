import { useEffect, useRef, useState } from 'react'
import { heroWords } from '../../data/content'
import { img, video } from '../../data/images'
import type { Img } from '../../data/types'
import { cx } from '../../lib/cx'
import { prefersReducedMotion } from '../../motion/motion'
import { useEntrance } from '../../motion/useEntrance'
import MorphText from '../ui/morph-text'
import VideoModal from '../VideoModal'
import s from './Hero.module.css'

/** One image per hero word: safety, productivity, profitability. */
const slides: Img[] = [img.inCabDevice, img.fleetDashboard, img.routeMap]

/** Shared by the morphing word and the media carousel so the two stay in step. */
const WORD_INTERVAL = 3000

export default function Hero() {
  const [active, setActive] = useState(0)
  const [videoOpen, setVideoOpen] = useState(false)
  const reduced = prefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  useEntrance(ref)

  useEffect(() => {
    if (reduced) return
    const timer = setInterval(() => setActive((i) => (i + 1) % slides.length), WORD_INTERVAL)
    return () => clearInterval(timer)
  }, [reduced])

  return (
    <section className={s.hero} data-band="dark" ref={ref}>
      <div className={cx('container', s.inner)}>
        <div className={s.copy}>
          <h1 className={cx('h-display', s.title)} data-enter>
            A decade of connecting and protecting fleets.
          </h1>
          <p className={s.lead} data-enter>
            One platform to help improve the{' '}
            <MorphText
              words={heroWords}
              interval={WORD_INTERVAL}
              className={s.morph}
              textClassName={s.morphText}
            />{' '}
            of your operations across East Africa.
          </p>
          <div className={s.actions} data-enter>
            <button type="button" className="btn btn--outline-light" onClick={() => setVideoOpen(true)}>
              <span aria-hidden="true">▶</span> Watch demo
            </button>
          </div>
        </div>

        <div className={s.media} data-enter-media>
          {slides.map((slide, i) => (
            <div key={slide.src} className={cx(s.slide, i === active && s.slideOn)} aria-hidden={i !== active}>
              <img
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                className={s.slideMedia}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
          <div className={s.alert}>
            <span className={s.alertDot} aria-hidden="true" />
            <div className={s.alertText}>
              <span className={s.alertTitle}>Speed alert cleared</span>
              <span className={s.alertMeta}>UBH 412K · Jinja Rd · 2 min ago</span>
            </div>
          </div>
        </div>
      </div>

      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        src={video.corporate.src}
        poster={video.corporate.poster}
        title={video.corporate.title}
      />
    </section>
  )
}

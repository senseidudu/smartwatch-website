import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { img, video } from '../../data/images'
import { routes } from '../../data/site'
import type { Img } from '../../data/types'
import { cx } from '../../lib/cx'
import { prefersReducedMotion } from '../../motion/motion'
import { useEntrance } from '../../motion/useEntrance'
import VideoModal from '../VideoModal'
import s from './Hero.module.css'

type Slide =
  | { word: string; kind: 'video'; src: string; poster: string }
  | { word: string; kind: 'image'; image: Img }

const slides: Slide[] = [
  { word: 'safety', kind: 'video', src: video.corporate.src, poster: video.corporate.poster },
  { word: 'productivity', kind: 'image', image: img.dashcams },
  { word: 'profitability', kind: 'image', image: img.laptop },
]

const ADVANCE_MS = 4000

export default function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const baseId = useId()
  const reduced = prefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  useEntrance(ref)

  useEffect(() => {
    if (paused || reduced) return
    const timer = setInterval(() => setActive((i) => (i + 1) % slides.length), ADVANCE_MS)
    return () => clearInterval(timer)
  }, [paused, reduced])

  return (
    <section className={s.hero} data-band="dark" ref={ref}>
      <div className={cx('container', s.inner)}>
        <div className={s.copy}>
          <h1 className={cx('h-display', s.title)} data-enter>
            A decade of connecting and protecting fleets.
          </h1>
          <p className={s.lead} data-enter>
            One platform to help improve the{' '}
            <span
              className={s.words}
              role="tablist"
              aria-label="What Smartwatch improves"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {slides.map((slide, i) => (
                <button
                  key={slide.word}
                  type="button"
                  role="tab"
                  id={`${baseId}-word-${i}`}
                  aria-selected={i === active}
                  aria-controls={`${baseId}-media`}
                  className={cx(s.word, i === active && s.wordOn)}
                  onClick={() => setActive(i)}
                  onFocus={() => setPaused(true)}
                  onBlur={() => setPaused(false)}
                >
                  {slide.word}
                </button>
              ))}
            </span>{' '}
            of your operations across East Africa.
          </p>
          <div className={s.actions} data-enter>
            <Link to={routes.contact} className="btn btn--accent">
              Get a demo
            </Link>
            <button type="button" className="btn btn--outline-light" onClick={() => setVideoOpen(true)}>
              <span aria-hidden="true">▶</span> Watch demo
            </button>
          </div>
        </div>

        <div
          className={s.media}
          role="tabpanel"
          id={`${baseId}-media`}
          aria-labelledby={`${baseId}-word-${active}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-enter-media
        >
          {slides.map((slide, i) => (
            <div key={slide.word} className={cx(s.slide, i === active && s.slideOn)} aria-hidden={i !== active}>
              {slide.kind === 'video' ? (
                <video
                  src={slide.src}
                  poster={slide.poster}
                  muted
                  loop
                  playsInline
                  autoPlay={!reduced}
                  preload="metadata"
                  className={s.slideMedia}
                />
              ) : (
                <img
                  src={slide.image.src}
                  alt={slide.image.alt}
                  width={slide.image.width}
                  height={slide.image.height}
                  className={s.slideMedia}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              )}
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

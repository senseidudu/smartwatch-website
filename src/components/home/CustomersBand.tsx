import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { customerLogos } from '../../data/content'
import { video } from '../../data/images'
import { routes } from '../../data/site'
import { cx } from '../../lib/cx'
import { ScrollTrigger, useGSAP } from '../../motion/gsap'
import { prefersReducedMotion } from '../../motion/motion'
import Reveal from '../Reveal'
import VideoModal from '../VideoModal'
import s from './CustomersBand.module.css'

/** Full-bleed navy band with the corporate video behind it and the customer row along its base. */
export default function CustomersBand() {
  const [open, setOpen] = useState(false)
  const bandRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduced = prefersReducedMotion()

  // Only play the background video while the band is on screen.
  useGSAP(
    () => {
      const band = bandRef.current
      const clip = videoRef.current
      if (!band || !clip || reduced) return
      const trigger = ScrollTrigger.create({
        trigger: band,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          if (self.isActive) clip.play()?.catch?.(() => {})
          else clip.pause()
        },
      })
      return () => trigger.kill()
    },
    { scope: bandRef, dependencies: [reduced] },
  )

  return (
    <section className={s.band} data-band="dark" ref={bandRef}>
      <video
        ref={videoRef}
        className={s.bg}
        src={video.corporate.src}
        poster={video.corporate.poster}
        muted
        loop
        playsInline
        autoPlay={!reduced}
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className={s.overlay} aria-hidden="true" />
      <div className={cx('container', s.inner)}>
        <Reveal className={s.copy}>
          <div className="eyebrow eyebrow--bright">Our customers</div>
          <p className={s.display}>Trusted by local and international partners.</p>
          <div className={s.actions}>
            <Link to={routes.solutions} className="btn btn--outline-light">
              Explore solutions
            </Link>
            <button type="button" className={s.play} onClick={() => setOpen(true)}>
              <span className={s.playIcon} aria-hidden="true">
                ▶
              </span>
              Watch our story
            </button>
          </div>
        </Reveal>
        <Reveal stagger className={s.logos} role="list" aria-label="Customer logos">
          {customerLogos.map((name) => (
            <div key={name} role="listitem" className={s.logo}>
              {name}
            </div>
          ))}
        </Reveal>
      </div>
      <VideoModal
        open={open}
        onClose={() => setOpen(false)}
        src={video.corporate.src}
        poster={video.corporate.poster}
        title={video.corporate.title}
      />
    </section>
  )
}

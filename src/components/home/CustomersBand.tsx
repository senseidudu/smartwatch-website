import { useState } from 'react'
import { Link } from 'react-router-dom'
import { customerLogos } from '../../data/content'
import { video } from '../../data/images'
import { routes } from '../../data/site'
import { cx } from '../../lib/cx'
import VideoModal from '../VideoModal'
import s from './CustomersBand.module.css'

/** Full-bleed navy band with the corporate video behind it and the customer row along its base. */
export default function CustomersBand() {
  const [open, setOpen] = useState(false)
  return (
    <section className={s.band} data-band="dark">
      <video
        className={s.bg}
        src={video.corporate.src}
        poster={video.corporate.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className={s.overlay} aria-hidden="true" />
      <div className={cx('container', s.inner)}>
        <div className={s.copy}>
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
        </div>
        <div className={s.logos} role="list" aria-label="Customer logos">
          {customerLogos.map((name) => (
            <div key={name} role="listitem" className={s.logo}>
              {name}
            </div>
          ))}
        </div>
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

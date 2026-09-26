import { Fragment, useEffect, useRef, useState } from 'react'
import { heroWords } from '../../data/content'
import { routes } from '../../data/site'
import { cx } from '../../lib/cx'
import { prefersReducedMotion } from '../../motion/motion'
import { useEntrance } from '../../motion/useEntrance'
import CredentialBadge from '../CredentialBadge'
import CornerButton from '../ui/corner-button'
import CursorCard from '../ui/cursor-card'
import StaggerText from '../ui/stagger-text'
import s from './Hero.module.css'

/** A muted, looping clip of a car on a city street; the poster stands in until it plays. */
const video = { src: '/videos/hero.mp4', poster: '/videos/hero-poster.webp' }

/** How long each key word in the lead stays underlined; hovering one previews its product. */
const WORD_INTERVAL = 3000

/** The headline rises word by word on its own; the lead, button and photo follow it. */
const ENTRANCE_DELAY = 0.3

/** ", " between words, ", and " before the last one. */
function separator(index: number, total: number) {
  if (index >= total - 1) return ''
  return index === total - 2 ? ', and ' : ', '
}

export default function Hero() {
  const [active, setActive] = useState(0)
  const reduced = prefersReducedMotion()
  const ref = useRef<HTMLElement>(null)
  useEntrance(ref, { delay: ENTRANCE_DELAY })

  useEffect(() => {
    if (reduced) return
    const timer = setInterval(() => setActive((i) => (i + 1) % heroWords.length), WORD_INTERVAL)
    return () => clearInterval(timer)
  }, [reduced])

  return (
    <section className={s.hero} data-band="light" ref={ref}>
      <div className={cx('container', s.inner)}>
        <div className={s.copy}>
          <h1 className={cx('h-display', s.title)}>
            <StaggerText className={s.titleLead}>A decade of connecting</StaggerText>{' '}
            <StaggerText delay={0.2}>and protecting fleets.</StaggerText>
          </h1>
          <p className={s.lead} data-enter>
            One platform to help improve the{' '}
            {heroWords.map(({ word, image, description, to }, i) => (
              <Fragment key={word}>
                <CursorCard
                  to={to}
                  image={image}
                  description={description}
                  className={cx(s.word, i === active && s.wordOn)}
                >
                  {word}
                </CursorCard>
                {separator(i, heroWords.length)}
              </Fragment>
            ))}{' '}
            of your operations across East Africa.
          </p>
          <div className={s.actions} data-enter>
            <CornerButton to={routes.products} className={s.cta}>
              Explore products
            </CornerButton>
            <CredentialBadge className={s.seal} />
          </div>
        </div>

        <div className={s.mediaWrap}>
          <div className={s.media} data-enter-media>
            <video
              className={s.video}
              src={video.src}
              poster={video.poster}
              autoPlay={!reduced}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            <div className={s.alert}>
              <span className={s.alertDot} aria-hidden="true" />
              <div className={s.alertText}>
                <span className={s.alertTitle}>Speed alert cleared</span>
                <span className={s.alertMeta}>UBH 412K · Jinja Rd · 2 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

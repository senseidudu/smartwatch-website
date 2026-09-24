import { useRef } from 'react'
import type { DetailPage } from '../../data/types'
import { cx } from '../../lib/cx'
import { useEntrance } from '../../motion/useEntrance'
import Media from '../Media'
import SmartLink from '../SmartLink'
import CornerButton from '../ui/corner-button'
import StaggerText from '../ui/stagger-text'
import { btnClass, defaultHeroCtas, isDemoCta, onLight } from './cta'
import s from './Sections.module.css'

export default function DetailHero({ page }: { page: DetailPage }) {
  const { hero } = page
  const tone = hero.tone ?? 'dark'
  const ctas = hero.ctas ?? defaultHeroCtas(page.kind)
  // Every hero is the white page design now; only a photo hero paints dark, under its green overlay.
  const photo = tone === 'photo' && hero.media
  const light = !photo
  const ref = useRef<HTMLElement>(null)
  // The eyebrow sits still as a label; the headline rises word by word, then the rest follows.
  useEntrance(ref, { delay: 0.3 })
  return (
    <section
      ref={ref}
      className={cx(s.hero, photo && s.heroPhoto)}
      style={photo ? { backgroundImage: `url(${hero.media!.src})` } : undefined}
      data-band={light ? 'light' : 'dark'}
    >
      <div className={cx('container', s.heroInner, photo && s.heroCentered)}>
        <div className={s.heroCopy}>
          <div className={cx('eyebrow', !light && 'eyebrow--bright')}>{hero.eyebrow}</div>
          <h1 className="h-page">
            <StaggerText>{hero.title}</StaggerText>
          </h1>
          <p className={s.heroLead} data-enter>
            {hero.intro}
          </p>
          {ctas.length > 0 && (
            <div className={s.heroActions} data-enter>
              {ctas.map((cta) =>
                isDemoCta(cta) ? (
                  <CornerButton key={cta.label} to={cta.to} onDark={!light}>
                    {cta.label}
                  </CornerButton>
                ) : (
                  <SmartLink
                    key={cta.label}
                    to={cta.to}
                    className={btnClass(light ? onLight(cta.variant) : cta.variant)}
                  >
                    {cta.label}
                  </SmartLink>
                ),
              )}
            </div>
          )}
        </div>
        {!photo && (
          <div data-enter-media>
            <Media
              image={hero.media}
              label={hero.mediaLabel ?? `${page.name} image`}
              ratio="4 / 3"
              radius={24}
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}

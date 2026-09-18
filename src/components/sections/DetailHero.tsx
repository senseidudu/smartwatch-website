import { routes } from '../../data/site'
import type { Cta, DetailPage } from '../../data/types'
import { cx } from '../../lib/cx'
import Media from '../Media'
import SmartLink from '../SmartLink'
import { btnClass } from './CtaBand'
import s from './Sections.module.css'

export function defaultHeroCtas(kind: DetailPage['kind']): Cta[] {
  const primary: Cta = { label: 'Get a demo', to: routes.contact, variant: 'primary' }
  if (kind === 'product') {
    return [primary, { label: 'View hardware', to: routes.hardware, variant: 'outline-light' }]
  }
  if (kind === 'solution') {
    return [primary, { label: 'All solutions', to: routes.solutions, variant: 'outline-light' }]
  }
  return [primary]
}

export default function DetailHero({ page }: { page: DetailPage }) {
  const { hero } = page
  const tone = hero.tone ?? 'dark'
  const ctas = hero.ctas ?? defaultHeroCtas(page.kind)
  const photo = tone === 'photo' && hero.media
  return (
    <section
      className={cx(s.hero, photo && s.heroPhoto)}
      style={photo ? { backgroundImage: `url(${hero.media!.src})` } : undefined}
      data-band="dark"
    >
      <div className={cx('container', s.heroInner, photo && s.heroCentered)}>
        <div className={s.heroCopy}>
          <div className="eyebrow eyebrow--bright">{hero.eyebrow}</div>
          <h1 className="h-page">{hero.title}</h1>
          <p className={s.heroLead}>{hero.intro}</p>
          <div className={s.heroActions}>
            {ctas.map((cta) => (
              <SmartLink key={cta.label} to={cta.to} className={btnClass(cta.variant)}>
                {cta.label}
              </SmartLink>
            ))}
          </div>
        </div>
        {!photo && (
          <Media
            image={hero.media}
            label={hero.mediaLabel ?? `${page.name} image`}
            ratio="4 / 3"
            radius={24}
            dark
            priority
          />
        )}
      </div>
    </section>
  )
}

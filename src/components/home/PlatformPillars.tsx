import { useState } from 'react'
import { Link } from 'react-router-dom'
import { pillars } from '../../data/pillars'
import { routes } from '../../data/site'
import { cx } from '../../lib/cx'
import Placeholder from '../Placeholder'
import s from './PlatformPillars.module.css'

export default function PlatformPillars() {
  const [active, setActive] = useState(0)
  const pillar = pillars[active]

  return (
    <section className={s.section}>
      <div className={cx('container', s.inner)}>
        <div className={s.intro}>
          <div className="eyebrow eyebrow--bright">Integrated fleet platform</div>
          <h2 className="h-section h-section--lg">
            A fully integrated suite of products, powered by industry-leading AI.
          </h2>
        </div>

        <div className={s.tabs} role="tablist" aria-label="Platform products">
          {pillars.map((p, i) => (
            <button
              key={p.name}
              type="button"
              role="tab"
              id={`pillar-tab-${i}`}
              aria-selected={i === active}
              aria-controls="pillar-panel"
              className={cx(s.tab, i === active && s.tabOn)}
              onClick={() => setActive(i)}
            >
              <span className={s.tabNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={s.tabName}>{p.name}</span>
            </button>
          ))}
        </div>

        <div className={s.strap}>
          <div className={s.strapText}>
            Your operations. One platform. With AI-powered automation at its core.
          </div>
          <Link to={routes.products} className="link-arrow link-arrow--sm link-arrow--bright">
            Platform overview →
          </Link>
        </div>

        <div
          className={s.detail}
          role="tabpanel"
          id="pillar-panel"
          aria-labelledby={`pillar-tab-${active}`}
        >
          <div className={s.detailCopy}>
            <div className="eyebrow eyebrow--muted">{pillar.name}</div>
            <h3 className={s.detailTitle}>{pillar.headline}</h3>
            <p className={s.detailBody}>{pillar.body}</p>
            <ul className="checklist">
              {pillar.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div>
              <Link to={routes.products} className="link-arrow link-arrow--bright">
                Learn more →
              </Link>
            </div>
          </div>
          <Placeholder label={pillar.image} ratio="4 / 3" dark />
        </div>
      </div>
    </section>
  )
}

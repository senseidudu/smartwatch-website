import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { pillars } from '../../data/pillars'
import { routes } from '../../data/site'
import { cx } from '../../lib/cx'
import { prefersReducedMotion } from '../../motion/motion'
import Media from '../Media'
import AgentBentoGrid from '../ui/agent-bento-grid'
import HighlightGrid from '../ui/highlight-grid'
import s from './PlatformPillars.module.css'

/** How long each product stays up before the carousel moves on. */
export const ROTATE_INTERVAL = 5000

export default function PlatformPillars() {
  const [active, setActive] = useState(0)
  // The tabs rotate like a carousel until the visitor picks one; hovering pauses them.
  const [auto, setAuto] = useState(() => !prefersReducedMotion())
  const [paused, setPaused] = useState(false)
  const pillar = pillars[active]

  useEffect(() => {
    if (!auto || paused) return
    const timer = setInterval(() => setActive((i) => (i + 1) % pillars.length), ROTATE_INTERVAL)
    return () => clearInterval(timer)
  }, [auto, paused])

  const pick = (i: number) => {
    setActive(i)
    setAuto(false)
  }

  return (
    <section className={s.section} data-band="dark">
      <div
        className={cx('container', s.inner)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={s.intro}>
          <div className="eyebrow eyebrow--bright">Integrated fleet platform</div>
          <h2 className="h-section h-section--lg">A fully integrated suite of products, powered by industry-leading AI.</h2>
        </div>

        <AgentBentoGrid dark className={s.infra} />

        <HighlightGrid
          active={active}
          className={s.tabs}
          highlightClassName={s.tabGlow}
          role="tablist"
          aria-label="Platform products"
        >
          {pillars.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              id={`pillar-tab-${i}`}
              aria-selected={i === active}
              aria-controls="pillar-panel"
              className={cx(s.tab, i === active && s.tabOn)}
              data-highlight-cell
              onClick={() => pick(i)}
            >
              <span className={s.tabNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={s.tabName}>{p.name}</span>
            </button>
          ))}
        </HighlightGrid>

        <div className={s.strap}>
          <div className={s.strapText}>Your operations. One platform. With AI-powered automation at its core.</div>
          <Link to={routes.products} className="link-arrow link-arrow--sm link-arrow--bright">
            Platform overview →
          </Link>
        </div>

        <div
          key={pillar.slug}
          className={s.detail}
          role="tabpanel"
          id="pillar-panel"
          aria-labelledby={`pillar-tab-${active}`}
          aria-live="polite"
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
              <Link to={pillar.to} className="link-arrow link-arrow--bright">
                Learn more →
              </Link>
            </div>
          </div>
          <Media image={pillar.image} label={pillar.imageLabel} ratio="4 / 3" radius={20} dark decorative />
        </div>
      </div>
    </section>
  )
}

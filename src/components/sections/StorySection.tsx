import type { Section } from '../../data/types'
import { cx } from '../../lib/cx'
import Media from '../Media'
import Reveal from '../Reveal'
import SmartLink from '../SmartLink'
import { Card } from './CardsSection'
import s from './Sections.module.css'

type Props = { section: Extract<Section, { kind: 'story' }> }

/** Opens on a lede and key facts beside the image, then themed cards, then the named clients. */
export default function StorySection({ section }: Props) {
  return (
    <section id={section.id} className={cx('container', s.section)}>
      <div className={s.split}>
        <Media
          image={section.media}
          label={section.mediaLabel ?? 'image coming soon'}
          ratio="4 / 3"
          className={s.splitMedia}
        />
        <div className={s.splitCopy}>
          {section.eyebrow && <div className="eyebrow eyebrow--rule">{section.eyebrow}</div>}
          <h2 className={s.splitTitle}>{section.title}</h2>
          <p className="lead">{section.lede}</p>
          {section.facts && (
            <dl className={s.storyFacts}>
              {section.facts.map((fact) => (
                <div key={fact.label} className={s.storyFact}>
                  <dt className={s.storyFactLabel}>{fact.label}</dt>
                  <dd className={s.storyFactValue}>{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      <Reveal stagger className={cx(s.cards, s.cols3, s.storyThemes)}>
        {section.themes.map((item) => (
          <Card key={item.title} item={item} />
        ))}
      </Reveal>

      {(section.clients || section.closing) && (
        <div className={s.storyClients}>
          {section.clients && (
            <>
              <div className={cx('eyebrow', s.logosTitle)}>{section.clients.title}</div>
              <div className={cx(s.logos, s.storyLogos)}>
                {section.clients.items.map(({ name, logo }) => (
                  <div key={name} className={s.logo}>
                    {logo ? (
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        loading="lazy"
                        decoding="async"
                        className={s.logoImg}
                      />
                    ) : (
                      name
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          {(section.closing || section.cta) && (
            <div className={s.storyClosing}>
              {section.closing && <p className="lead">{section.closing}</p>}
              {section.cta && (
                <SmartLink to={section.cta.to} className="link-arrow">
                  {section.cta.label} →
                </SmartLink>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

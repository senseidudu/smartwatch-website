import type { CardItem, Section } from '../../data/types'
import { cx } from '../../lib/cx'
import Icon from '../Icon'
import Media from '../Media'
import Reveal from '../Reveal'
import SmartLink from '../SmartLink'
import SectionHead from './SectionHead'
import s from './Sections.module.css'

type Props = { section: Extract<Section, { kind: 'cards' }> }

export function Card({ item }: { item: CardItem }) {
  const inner = (
    <>
      {item.icon && (
        <span className={s.cardIcon}>
          <Icon name={item.icon} size={22} />
        </span>
      )}
      {(item.image || item.imageLabel) && (
        <Media
          image={item.image}
          label={item.imageLabel}
          ratio="16 / 10"
          radius={12}
          decorative
          className={s.cardImage}
        />
      )}
      <div className={s.cardTitle}>{item.title}</div>
      {item.body && <p className={s.cardBody}>{item.body}</p>}
      {item.points && (
        <ul className={cx('checklist', s.cardPoints)}>
          {item.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
      {item.href && <span className={s.cardMore}>Learn more →</span>}
    </>
  )
  return item.href ? (
    <SmartLink to={item.href} className={cx(s.card, s.cardLink, 'lift')}>
      {inner}
    </SmartLink>
  ) : (
    <div className={s.card}>{inner}</div>
  )
}

export default function CardsSection({ section }: Props) {
  const columns = section.columns ?? (section.items.length === 4 ? 2 : 3)
  return (
    <section id={section.id} className={cx('container', s.section)}>
      <SectionHead eyebrow={section.eyebrow} title={section.title} intro={section.intro} />
      <Reveal stagger className={cx(s.cards, s[`cols${columns}`])}>
        {section.items.map((item) => (
          <Card key={item.title} item={item} />
        ))}
      </Reveal>
    </section>
  )
}

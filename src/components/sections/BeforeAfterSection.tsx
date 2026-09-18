import type { Section } from '../../data/types'
import { cx } from '../../lib/cx'
import s from './Sections.module.css'

type Props = { section: Extract<Section, { kind: 'beforeAfter' }> }

export default function BeforeAfterSection({ section }: Props) {
  return (
    <section id={section.id} className={cx('container', s.section)}>
      <div className={s.head}>
        {section.eyebrow && <div className="eyebrow">{section.eyebrow}</div>}
        <h2 className="h-section">{section.title}</h2>
        {section.body && <p className="lead">{section.body}</p>}
      </div>
      <div className={s.ba}>
        <div className={cx(s.baCol, s.baBefore)}>
          <div className={s.baHead}>Before</div>
          <ul className={s.baList}>
            {section.before.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={cx(s.baCol, s.baAfter)}>
          <div className={s.baHead}>After</div>
          <ul className="checklist">
            {section.after.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

import Panel from '../components/Panel'
import type { LegalDoc } from '../data/legal'
import { usePageMeta } from '../hooks/usePageMeta'
import { cx } from '../lib/cx'
import s from './LegalPage.module.css'

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  usePageMeta(doc.meta)
  return (
    <div className={s.page}>
      <section className={s.band} data-band="dark">
        <div className={cx('container', s.bandInner)}>
          <div className="eyebrow eyebrow--bright">Legal</div>
          <h1 className="h-page">{doc.title}</h1>
          <p className={s.lead}>{doc.intro}</p>
        </div>
      </section>
      <Panel className={s.panel}>
        <article className={cx('container', s.article)}>
          {doc.sections.map((section) => (
            <section key={section.heading} className={s.section}>
              <h2 className={s.heading}>{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p} className={s.paragraph}>
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className={s.bullets}>
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </Panel>
    </div>
  )
}

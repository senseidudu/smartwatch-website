import { Link } from 'react-router-dom'
import { pillars } from '../../data/pillars'
import { cx } from '../../lib/cx'
import Icon from '../Icon'
import Media from '../Media'
import s from './ProductRows.module.css'

/** One alternating media + text row per product, in the same order as the rail. */
export default function ProductRows() {
  return (
    <div className={cx('container', s.rows)}>
      {pillars.map((p, i) => {
        const reverse = i % 2 === 1
        return (
          <section
            key={p.slug}
            id={`row-${p.slug}`}
            data-reverse={reverse}
            className={cx(s.row, reverse && s.rowReverse)}
          >
            <div className={s.copy}>
              <div className={s.eyebrowGroup}>
                <span className={s.icon}>
                  <Icon name={p.icon} size={20} />
                </span>
                <span className="eyebrow">{p.name}</span>
              </div>
              <h3 className={s.title}>{p.headline}</h3>
              <p className={s.body}>{p.body}</p>
              <div>
                <Link to={p.to} className="btn btn--outline btn--sm">
                  Learn more
                </Link>
              </div>
            </div>
            <Media
              image={p.image}
              label={p.imageLabel}
              ratio="4 / 3"
              radius={20}
              decorative
              className={s.media}
            />
          </section>
        )
      })}
    </div>
  )
}

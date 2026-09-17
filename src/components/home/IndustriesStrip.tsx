import { Link } from 'react-router-dom'
import { homeIndustries } from '../../data/industries'
import { routes } from '../../data/site'
import { cx } from '../../lib/cx'
import s from './IndustriesStrip.module.css'

export default function IndustriesStrip() {
  return (
    <section className={cx('container', s.section)}>
      <div className={s.head}>
        <div className={s.headCopy}>
          <div className="eyebrow">Who we serve</div>
          <h2 className="h-section">Solutions for every industry in the physical economy.</h2>
        </div>
        <Link to={routes.solutions} className="link-arrow">
          View all industries →
        </Link>
      </div>
      <div className={s.grid}>
        {homeIndustries.map((name) => (
          <Link key={name} to={routes.solutions} className={s.card}>
            <div className={s.icon} aria-hidden="true">
              icon
            </div>
            <div className={s.name}>{name}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}

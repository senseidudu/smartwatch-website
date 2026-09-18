import Placeholder from '../components/Placeholder'
import { formatStat, stats } from '../data/site'
import { cx } from '../lib/cx'
import s from './CompanyPage.module.css'

export default function CompanyPage() {
  return (
    <section className={cx('container', s.grid)}>
      <div className={s.copy}>
        <div className="eyebrow">Company</div>
        <h1 className="h-page">Total peace of mind, since 2011.</h1>
        <p className={s.lead}>
          Smartwatch was incorporated as a direct response to emerging trends in mobile resource
          solutions across the Africa region, buoyed by oil and gas findings in Kenya, Uganda,
          Tanzania, South Sudan and Mozambique, with a focus on safety, security and productivity.
        </p>
        <div className={s.stats}>
          {stats.slice(0, 3).map((stat) => (
            <div key={stat.label} className={s.stat}>
              <div className={s.statValue}>{formatStat(stat)}</div>
              <div className={s.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <Placeholder label="team photo" ratio="4 / 3" />
    </section>
  )
}

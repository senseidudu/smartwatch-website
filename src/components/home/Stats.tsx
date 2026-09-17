import { stats } from '../../data/site'
import s from './Stats.module.css'

export default function Stats() {
  return (
    <section className="container">
      <div className={s.grid}>
        {stats.map((stat) => (
          <div key={stat.label} className={s.cell}>
            <div className={s.value}>{stat.value}</div>
            <div className={s.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { formatStat, stats } from '../../data/site'
import { cx } from '../../lib/cx'
import { useCountUp } from '../../motion/useCountUp'
import s from './Stats.module.css'

export default function Stats() {
  const ref = useRef<HTMLElement>(null)
  useCountUp(ref)
  return (
    <section className={s.band} data-band="dark" ref={ref}>
      <div className={cx('container', s.grid)}>
        {stats.map((stat) => (
          <div key={stat.label} className={s.cell}>
            <div className={s.value} data-count={stat.value} data-prefix={stat.prefix ?? ''} data-suffix={stat.suffix ?? ''}>
              {formatStat(stat)}
            </div>
            <div className={s.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

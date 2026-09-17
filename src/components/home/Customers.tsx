import { Link } from 'react-router-dom'
import { logos } from '../../data/content'
import { routes } from '../../data/site'
import { cx } from '../../lib/cx'
import s from './Customers.module.css'

export default function Customers() {
  return (
    <section className={cx('container', s.section)}>
      <div className={s.copy}>
        <div className="eyebrow">Our customers</div>
        <h2 className="h-section">Trusted by local and international partners.</h2>
        <p className={s.body}>
          800+ companies, from small businesses to large enterprises, run their fleets on Smartwatch.
        </p>
        <div className={s.links}>
          <Link to={routes.solutions} className="link-arrow">
            Explore success stories →
          </Link>
          <a href="#" className={s.video}>
            <span className={s.play} aria-hidden="true">
              ▶
            </span>
            Hear from our customers <span className={s.duration}>(1:08)</span>
          </a>
        </div>
      </div>
      <div className={s.logos} aria-label="Customer logos">
        {logos.map((name) => (
          <div key={name} className={s.logo}>
            {name}
          </div>
        ))}
      </div>
    </section>
  )
}

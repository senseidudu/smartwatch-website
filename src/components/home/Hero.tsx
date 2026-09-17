import { Link } from 'react-router-dom'
import { heroWords } from '../../data/content'
import { routes } from '../../data/site'
import { cx } from '../../lib/cx'
import Placeholder from '../Placeholder'
import RotatingWord from '../RotatingWord'
import s from './Hero.module.css'

export default function Hero() {
  return (
    <section className={cx('container', s.hero)}>
      <div className={s.copy}>
        <h1 className="h-display">A decade of connecting and protecting fleets.</h1>
        <p className={s.lead}>
          One platform to help improve the <RotatingWord words={heroWords} /> of your operations
          across East Africa.
        </p>
        <div className={s.actions}>
          <Link to={routes.contact} className="btn btn--primary">
            Get a demo
          </Link>
          <Link to={routes.products} className="btn btn--outline">
            <span aria-hidden="true">▶</span> Watch demo
          </Link>
        </div>
      </div>
      <Placeholder label="hero video: fleet on the road" ratio="5 / 4" radius={24}>
        <div className={s.alert}>
          <span className={s.alertDot} aria-hidden="true" />
          <div className={s.alertText}>
            <span className={s.alertTitle}>Speed alert cleared</span>
            <span className={s.alertMeta}>UBH 412K · Jinja Rd · 2 min ago</span>
          </div>
        </div>
      </Placeholder>
    </section>
  )
}

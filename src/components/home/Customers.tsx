import { Link } from 'react-router-dom'
import { partnerLogos } from '../../data/logos'
import { routes } from '../../data/site'
import { cx } from '../../lib/cx'
import LogoMarquee from './LogoMarquee'
import s from './Customers.module.css'

const half = Math.ceil(partnerLogos.length / 2)

/** The partner logos split over two rows that travel in opposite directions. */
const rows = [partnerLogos.slice(0, half), partnerLogos.slice(half)]

/** Seconds per pass for a half-length row, so it travels at the speed the old single row did. */
const ROW_DURATION = 78

export default function Customers() {
  return (
    <section className={cx('container', s.section)}>
      <div className={s.copy}>
        <div className="eyebrow">Our customers</div>
        <h2 className="h-section">Trusted by local and international partners.</h2>
        <p className={s.body}>800+ companies, from small businesses to large enterprises, run their fleets on Smartwatch.</p>
        <div className={s.links}>
          <Link to={routes.solutions} className="link-arrow">
            Explore success stories →
          </Link>
        </div>
      </div>
      <div className={s.rows} role="region" aria-label="Customer logos">
        <LogoMarquee logos={rows[0]} direction="left" duration={ROW_DURATION} />
        <LogoMarquee logos={rows[1]} direction="right" duration={ROW_DURATION} />
      </div>
    </section>
  )
}

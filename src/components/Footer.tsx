import { Link } from 'react-router-dom'
import logoWhite from '../assets/logo-white.svg'
import { news } from '../data/content'
import { industriesA } from '../data/industries'
import { pillars } from '../data/pillars'
import { routes, site } from '../data/site'
import { cx } from '../lib/cx'
import s from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={cx('container', s.grid)}>
        <div className={s.brand}>
          <img src={logoWhite} alt={site.name} className={s.logo} />
          <p className={s.tagline}>{site.tagline}</p>
          <div className={s.contact}>
            <a href={site.phoneHref} className={s.phone}>
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className={s.muted}>
              {site.email}
            </a>
            <span className={s.muted}>{site.regions}</span>
          </div>
        </div>

        <div className={s.col}>
          <div className={s.colHeading}>Products</div>
          {pillars.map((p) => (
            <Link key={p.name} to={routes.products} className={s.colLink}>
              {p.name}
            </Link>
          ))}
          <Link to={routes.products} className={s.colLink}>
            Hardware &amp; accessories
          </Link>
        </div>

        <div className={s.col}>
          <div className={s.colHeading}>Solutions</div>
          {industriesA.map((name) => (
            <Link key={name} to={routes.solutions} className={s.colLink}>
              {name}
            </Link>
          ))}
        </div>

        <div className={s.col}>
          <div className={s.colHeading}>Company</div>
          <Link to={routes.company} className={s.colLink}>
            Overview
          </Link>
          <a href="#" className={s.colLink}>
            The team
          </a>
          <a href="#" className={s.colLink}>
            Knowledge base
          </a>
          <Link to={routes.contact} className={s.colLink}>
            Contact
          </Link>
          <a href="#" className={s.colLink}>
            Privacy policy
          </a>
          <a href="#" className={s.colLink}>
            Terms and conditions
          </a>
        </div>
      </div>

      <div className={cx('container', s.news)}>
        <div className={s.colHeading}>Smartwatch in the news</div>
        <div className={s.newsGrid}>
          {news.map((n) => (
            <a key={n.title} href="#" className={s.newsLink}>
              <strong>{n.outlet}:</strong> {n.title}
            </a>
          ))}
        </div>
      </div>

      <div className={cx('container', s.legal)}>
        <div className={s.legalLeft}>
          <span>{site.copyright}</span>
          <a href="#" className={s.legalLink}>
            Terms of Service
          </a>
          <a href="#" className={s.legalLink}>
            Privacy Policy
          </a>
          <a href="#" className={s.legalLink}>
            Sitemap
          </a>
          <span className={s.region}>UG · KE ▾</span>
        </div>
        <div className={s.social}>
          {site.social.map((item) => (
            <a key={item.name} href={item.href} className={s.legalLink}>
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

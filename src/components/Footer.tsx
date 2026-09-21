import { Link } from 'react-router-dom'
import logoWhite from '../assets/logo-white.svg'
import { news } from '../data/content'
import { industriesA } from '../data/industries'
import { companyLinks } from '../data/nav'
import { pillars } from '../data/pillars'
import { routes, site } from '../data/site'
import { cx } from '../lib/cx'
import SmartLink from './SmartLink'
import s from './Footer.module.css'

const company = [
  { name: 'About Smartwatch', to: routes.about },
  companyLinks[1],
  { name: 'Platform logins', to: routes.platforms },
  { name: 'Contact', to: routes.contact },
  { name: 'Privacy policy', to: routes.privacy },
  { name: 'Terms and conditions', to: routes.terms },
]

export default function Footer() {
  return (
    <footer className={s.footer} data-band="dark">
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
            {site.whatsapp.map((line) => (
              <SmartLink key={line.href} to={line.href} className={s.muted}>
                WhatsApp {line.country} · {line.label}
              </SmartLink>
            ))}
            <span className={s.muted}>{site.regions}</span>
          </div>
        </div>

        <div className={s.col}>
          <div className={s.colHeading}>Products</div>
          {pillars.map((p) => (
            <Link key={p.slug} to={p.to} className={s.colLink}>
              {p.name}
            </Link>
          ))}
          <Link to={routes.hardware} className={s.colLink}>
            Hardware &amp; accessories
          </Link>
        </div>

        <div className={s.col}>
          <div className={s.colHeading}>Solutions</div>
          {industriesA.map((industry) => (
            <Link key={industry.to} to={industry.to} className={s.colLink}>
              {industry.name}
            </Link>
          ))}
          <Link to={routes.solutions} className={s.colLink}>
            All solutions
          </Link>
        </div>

        <div className={s.col}>
          <div className={s.colHeading}>Company</div>
          {company.map((link) => (
            <Link key={link.to} to={link.to} className={s.colLink}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className={cx('container', s.news)}>
        <div className={s.colHeading}>Smartwatch in the news</div>
        <div className={s.newsGrid}>
          {news.map((n) => (
            <p key={n.title} className={s.newsItem}>
              <strong>{n.outlet}:</strong> {n.title}
            </p>
          ))}
        </div>
      </div>

      <div className={cx('container', s.legal)}>
        <div className={s.legalLeft}>
          <span>{site.copyright}</span>
          <Link to={routes.terms} className={s.legalLink}>
            Terms of Service
          </Link>
          <Link to={routes.privacy} className={s.legalLink}>
            Privacy Policy
          </Link>
          <span className={s.region}>{site.regions}</span>
        </div>
        <div className={s.social}>
          {site.social.map((item) => (
            <SmartLink key={item.name} to={item.href} className={s.legalLink}>
              {item.name}
            </SmartLink>
          ))}
        </div>
      </div>
    </footer>
  )
}

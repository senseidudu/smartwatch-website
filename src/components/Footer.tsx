import { Link } from 'react-router-dom'
import logoWhite from '../assets/logo-white.svg'
import { industriesA } from '../data/industries'
import { pillars } from '../data/pillars'
import { anchors, routes, site } from '../data/site'
import { cx } from '../lib/cx'
import CredentialBadge from './CredentialBadge'
import SmartLink from './SmartLink'
import CornerButton from './ui/corner-button'
import s from './Footer.module.css'

const company = [
  { name: 'About Smartwatch', to: routes.about },
  { name: 'Our heritage', to: `${routes.about}#${anchors.heritage}` },
  { name: 'Awards & accreditation', to: `${routes.about}#${anchors.awards}` },
  { name: 'Platform logins', to: routes.platforms },
  { name: 'Contact', to: routes.contact },
]

export default function Footer() {
  return (
    <footer className={s.footer} data-band="dark">
      <div className={cx('container', s.top)}>
        <div className={s.pitch}>
          <img src={logoWhite} alt={site.name} className={s.logo} />
          <h2 className={s.statement}>
            Total peace of mind for <span className={s.statementHi}>every fleet</span> on the road.
          </h2>
          <p className={s.tagline}>{site.tagline}</p>
          <CredentialBadge onDark className={s.seal} />
        </div>
        <div className={s.reach}>
          <CornerButton to={routes.contact} className={s.demo} onDark>
            Get a demo
          </CornerButton>
          <a href={site.phoneHref} className={s.phone}>
            <span className={s.phoneCountry}>UG</span>
            {site.phone}
          </a>
          <a href={site.phoneKenyaHref} className={s.phone}>
            <span className={s.phoneCountry}>KE</span>
            {site.phoneKenya}
          </a>
          <a href={`mailto:${site.email}`} className={s.muted}>
            {site.email}
          </a>
        </div>
      </div>

      <div className={cx('container', s.grid)}>
        <nav className={s.col} aria-label="Products">
          <div className={s.colHeading}>Products</div>
          {pillars.map((p) => (
            <Link key={p.slug} to={p.to} className={cx(s.colLink, 'line-hover')}>
              {p.name}
            </Link>
          ))}
          <Link to={routes.hardware} className={cx(s.colLink, 'line-hover')}>
            Hardware &amp; accessories
          </Link>
        </nav>

        <nav className={s.col} aria-label="Solutions">
          <div className={s.colHeading}>Solutions</div>
          {industriesA.slice(0, 5).map((industry) => (
            <Link key={industry.to} to={industry.to} className={cx(s.colLink, 'line-hover')}>
              {industry.name}
            </Link>
          ))}
          <Link to={routes.solutions} className={cx(s.colLink, 'line-hover')}>
            All solutions
          </Link>
        </nav>

        <nav className={s.col} aria-label="Company">
          <div className={s.colHeading}>Company</div>
          {company.map((link) => (
            <Link key={link.to} to={link.to} className={cx(s.colLink, 'line-hover')}>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className={s.col}>
          <div className={s.colHeading}>WhatsApp</div>
          {site.whatsapp.map((line) => (
            <SmartLink key={line.href} to={line.href} className={cx(s.colLink, 'line-hover')}>
              {line.country} · {line.label}
            </SmartLink>
          ))}
          <span className={s.region}>{site.regions}</span>
        </div>
      </div>

      <div className={cx('container', s.legal)}>
        <div className={s.legalLeft}>
          <span>{site.copyright}</span>
          <Link to={routes.terms} className={cx(s.legalLink, 'line-hover')}>
            Terms of Service
          </Link>
          <Link to={routes.privacy} className={cx(s.legalLink, 'line-hover')}>
            Privacy Policy
          </Link>
        </div>
        <div className={s.social}>
          {site.social.map((item) => (
            <SmartLink key={item.name} to={item.href} className={cx(s.legalLink, 'line-hover')}>
              {item.name}
            </SmartLink>
          ))}
        </div>
      </div>
    </footer>
  )
}

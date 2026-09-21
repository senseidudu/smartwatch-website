import { Link } from 'react-router-dom'
import logoWhite from '../assets/logo-white.svg'
import { industries } from '../data/industries'
import { companyLinks, connectLinks, learnLinks, productLinks, techLinks } from '../data/nav'
import { routes, site } from '../data/site'
import { cx } from '../lib/cx'
import SmartLink from './SmartLink'
import s from './Footer.module.css'

const whoWeServe = [...industries.slice(0, 7), { name: 'All solutions', to: routes.solutions }]
const resources = [...learnLinks, ...techLinks]
const company = [
  companyLinks[0],
  companyLinks[1],
  connectLinks[0],
  { name: 'Privacy policy', to: routes.privacy },
  { name: 'Terms and conditions', to: routes.terms },
]

export default function Footer() {
  return (
    <footer className={s.footer} data-band="dark">
      <div className={cx('container', s.brandRow)}>
        <div className={s.brand}>
          <img src={logoWhite} alt={site.name} className={s.logo} />
          <p className={s.tagline}>{site.tagline}</p>
        </div>
        <div className={s.contact}>
          <a href={site.phoneHref} className={s.phone}>
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className={s.muted}>
            {site.email}
          </a>
          <div className={s.whatsapp}>
            {site.whatsapp.map((line) => (
              <SmartLink key={line.href} to={line.href} className={s.muted}>
                WhatsApp {line.country} · {line.label}
              </SmartLink>
            ))}
          </div>
          <div className={s.social}>
            {site.social.map((item) => (
              <SmartLink key={item.name} to={item.href} className={s.socialLink}>
                {item.name}
              </SmartLink>
            ))}
          </div>
        </div>
        <div className={s.region}>
          <span className={s.regionPill}>{site.regions}</span>
        </div>
      </div>

      <div className={cx('container', s.grid)}>
        <FooterColumn title="Products" links={productLinks} />
        <FooterColumn title="Who we serve" links={whoWeServe} />
        <FooterColumn title="Resources" links={resources} />
        <FooterColumn title="Company" links={company} />
      </div>

      <div className={cx('container', s.legal)}>
        <span>{site.copyright}</span>
        <div className={s.legalLinks}>
          <Link to={routes.terms} className={s.legalLink}>
            Terms and conditions
          </Link>
          <Link to={routes.privacy} className={s.legalLink}>
            Privacy policy
          </Link>
          <Link to={routes.contact} className={s.legalLink}>
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: { name: string; to: string }[] }) {
  return (
    <div className={s.col}>
      <div className={s.colHeading}>{title}</div>
      {links.map((link) => (
        <SmartLink key={link.to + link.name} to={link.to} className={s.colLink}>
          {link.name}
        </SmartLink>
      ))}
    </div>
  )
}

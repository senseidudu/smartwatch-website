import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logoWhite from '../assets/logo-white.svg'
import { news } from '../data/content'
import { industriesA } from '../data/industries'
import { pillars } from '../data/pillars'
import { anchors, routes, site } from '../data/site'
import { cx } from '../lib/cx'
import { prefersReducedMotion } from '../motion/motion'
import CredentialBadge from './CredentialBadge'
import SmartLink from './SmartLink'
import CornerButton from './ui/corner-button'
import s from './Footer.module.css'

// three.js is heavy; it is only fetched once the footer is about to scroll into view.
const InteractiveParticles = lazy(() => import('./ui/interactive-particles'))

const WORDMARK = 'Smartwatch'

/** The particle band's width:height; the sampled image is drawn at the same ratio so it fills the band. */
const BAND_RATIO = 4.6

const company = [
  { name: 'About Smartwatch', to: routes.about },
  { name: 'Our heritage', to: `${routes.about}#${anchors.heritage}` },
  { name: 'Awards & accreditation', to: `${routes.about}#${anchors.awards}` },
  { name: 'Platform logins', to: routes.platforms },
  { name: 'Contact', to: routes.contact },
]

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/** Draws the wordmark white on black, in the site's own face, for the particles to sample. */
async function wordmarkImage(): Promise<string> {
  const family = getComputedStyle(document.body).fontFamily
  await document.fonts?.load(`800 100px ${family}`).catch(() => undefined)
  const width = 1200
  const height = Math.round(width / BAND_RATIO)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, width, height)
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  let size = height
  ctx.font = `800 ${size}px ${family}`
  size *= (width * 0.94) / ctx.measureText(WORDMARK).width
  ctx.font = `800 ${Math.min(size, height * 0.92)}px ${family}`
  ctx.fillText(WORDMARK, width / 2, height * 0.54)
  return canvas.toDataURL('image/png')
}

/**
 * The giant wordmark at the foot of the page, drawn in particles that scatter from the cursor.
 * Without WebGL, IntersectionObserver or with reduced motion it is plain outlined type.
 */
function ParticleWordmark() {
  const ref = useRef<HTMLDivElement>(null)
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === 'undefined' || !hasWebGL()) return
    let cancelled = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        wordmarkImage().then((url) => !cancelled && setSrc(url))
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
    }
  }, [])

  return (
    <div ref={ref} className={s.wordmark} data-wordmark>
      {src ? (
        <Suspense fallback={null}>
          <InteractiveParticles
            src={src}
            color="#a7d439" /* --lime: the WebGL tint cannot read a CSS token */
            maxDimension={960}
            size={1.4}
            randomness={1.6}
            depth={4}
            touchRadius={0.12}
            threshold={40}
          />
        </Suspense>
      ) : (
        <span className={s.wordmarkStatic} aria-hidden="true">
          {WORDMARK}
        </span>
      )}
    </div>
  )
}

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
          {industriesA.map((industry) => (
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

      <div className={cx('container', s.news)}>
        <div className={s.colHeading}>In the news</div>
        <div className={s.newsGrid}>
          {news.map((n) => (
            <p key={n.title} className={s.newsItem}>
              <strong>{n.outlet}</strong> {n.title}
            </p>
          ))}
        </div>
      </div>

      <div className="container">
        <ParticleWordmark />
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

import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import logoWhite from '../assets/logo-white.svg'
import { award } from '../data/content'
import { img } from '../data/images'
import { industriesA, industriesB } from '../data/industries'
import {
  companyLinks,
  connectLinks,
  drawerGroups,
  hardwareLinks,
  learnLinks,
  portalLinks,
  productLinks,
  techLinks,
  type NavLink,
} from '../data/nav'
import { anchors, routes, site } from '../data/site'
import { cx } from '../lib/cx'
import { HEADER_OFFSET, ScrollTrigger } from '../motion/gsap'
import LoginMenu from './LoginMenu'
import Media from './Media'
import SmartLink from './SmartLink'
import s from './Header.module.css'

type MenuKey = 'solutions' | 'products' | 'resources' | 'company'
type Theme = 'dark' | 'light'

const menuItems: { key: MenuKey; label: string; to: string }[] = [
  { key: 'solutions', label: 'Solutions', to: routes.solutions },
  { key: 'products', label: 'Products', to: routes.products },
  { key: 'resources', label: 'Resources', to: routes.platforms },
  { key: 'company', label: 'Company', to: routes.about },
]

/** Reads which band (dark or light) sits under the header and follows it while scrolling. */
function useBandTheme(): Theme {
  const [theme, setTheme] = useState<Theme>('light')
  const { pathname } = useLocation()
  useEffect(() => {
    const bands = Array.from(document.querySelectorAll<HTMLElement>('[data-band]'))
    const read = (el: HTMLElement): Theme => (el.dataset.band === 'dark' ? 'dark' : 'light')
    setTheme(bands[0] ? read(bands[0]) : 'light')
    const line = HEADER_OFFSET - 16
    const triggers = bands.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: `top ${line}px`,
        end: `bottom ${line}px`,
        onToggle: (self) => {
          if (self.isActive) setTheme(read(el))
        },
      }),
    )
    return () => triggers.forEach((t) => t.kill())
  }, [pathname])
  return theme
}

export default function Header() {
  const [menu, setMenu] = useState<MenuKey | null>(null)
  const [phoneOpen, setPhoneOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const theme = useBandTheme()

  const closeMenu = () => setMenu(null)
  const closeAll = () => {
    setMenu(null)
    setDrawerOpen(false)
  }
  const go = (to: string) => () => {
    closeAll()
    navigate(to)
  }

  return (
    <header className={s.header} data-theme={theme} onMouseLeave={closeMenu}>
      <div className={cx('container', s.bar)}>
        <Link to={routes.home} className={s.logo} onClick={closeAll}>
          <img src={theme === 'dark' ? logoWhite : logo} alt={site.name} />
        </Link>

        <nav className={s.nav} aria-label="Primary">
          {menuItems.map((item) => (
            <button
              key={item.key}
              type="button"
              className={cx(s.navItem, menu === item.key && s.navItemOpen)}
              aria-haspopup="true"
              aria-expanded={menu === item.key}
              onMouseEnter={() => setMenu(item.key)}
              onFocus={() => setMenu(item.key)}
              onClick={go(item.to)}
            >
              {item.label}{' '}
              <span className={s.caret} aria-hidden="true">
                ▼
              </span>
            </button>
          ))}
          <Link
            to={routes.contact}
            className={s.navItem}
            onMouseEnter={closeMenu}
            onFocus={closeMenu}
            onClick={closeAll}
          >
            Contact
          </Link>
        </nav>

        <div className={s.actions}>
          <div
            className={s.phone}
            onMouseEnter={() => setPhoneOpen(true)}
            onMouseLeave={() => setPhoneOpen(false)}
          >
            <a href={site.phoneHref} className={s.phoneLink}>
              <span className={s.dot} aria-hidden="true" />
              {site.phone} <span className={s.phoneRole}>Sales</span>
            </a>
            {phoneOpen && (
              <div className={s.phonePop}>
                <div className={s.popLabel}>Contact</div>
                <div className={s.popTitle}>Talk to Sales or Support 24/7</div>
                <a href={site.phoneHref} className={s.popCall}>
                  {site.phone}
                </a>
                <Link to={`${routes.contact}#${anchors.support}`} className={s.popHelp} onClick={closeAll}>
                  Visit the help centre
                </Link>
              </div>
            )}
          </div>
          <LoginMenu className={s.login} />
          <Link to={routes.contact} className={cx('btn', 'btn--primary', 'btn--sm', s.cta)} onClick={closeAll}>
            Get a demo
          </Link>
          <button
            type="button"
            className={s.burger}
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((open) => !open)}
          >
            <span className={cx(s.burgerLine, drawerOpen && s.burgerOpen)} aria-hidden="true" />
          </button>
        </div>
      </div>

      {menu === 'solutions' && <SolutionsMenu onNavigate={closeAll} />}
      {menu === 'products' && <ProductsMenu onNavigate={closeAll} />}
      {menu === 'resources' && <ResourcesMenu onNavigate={closeAll} />}
      {menu === 'company' && <CompanyMenu onNavigate={closeAll} />}

      {drawerOpen && <Drawer onNavigate={closeAll} />}
    </header>
  )
}

type MenuProps = { onNavigate: () => void }

function RichLink({ link, className, onNavigate }: { link: NavLink; className: string; onNavigate: () => void }) {
  return (
    <SmartLink to={link.to} className={className} onClick={onNavigate}>
      <span className={s.richName}>{link.name}</span>
      {link.short && <span className={s.richShort}>{link.short}</span>}
    </SmartLink>
  )
}

function PlainList({ links, onNavigate }: { links: NavLink[]; onNavigate: () => void }) {
  return (
    <div className={s.menuList}>
      {links.map((link) => (
        <SmartLink key={link.to + link.name} to={link.to} className={s.menuLink} onClick={onNavigate}>
          {link.name}
        </SmartLink>
      ))}
    </div>
  )
}

function SolutionsMenu({ onNavigate }: MenuProps) {
  return (
    <div className={s.menu}>
      <div className={cx('container', s.menuInner, s.cols4)}>
        <div>
          <div className={s.menuHeading}>By industry</div>
          <PlainList links={industriesA} onNavigate={onNavigate} />
        </div>
        <div>
          <div className={s.menuHeading} aria-hidden="true">
            &nbsp;
          </div>
          <PlainList links={industriesB} onNavigate={onNavigate} />
        </div>
        <div>
          <div className={s.menuHeading}>Hardware</div>
          <PlainList links={hardwareLinks} onNavigate={onNavigate} />
        </div>
        <div className={s.promo}>
          <Media image={img.cargo} radius={10} decorative className={s.promoImage} />
          <div className={s.promoTitle}>Smart Key demo: see cargo locking in action.</div>
          <Link to={`${routes.contact}#${anchors.demo}`} className="link-arrow link-arrow--sm" onClick={onNavigate}>
            Request a demo →
          </Link>
        </div>
      </div>
    </div>
  )
}

function ProductsMenu({ onNavigate }: MenuProps) {
  return (
    <div className={s.menu}>
      <div className={cx('container', s.menuInner, s.cols2)}>
        <div>
          <div className={s.menuHeading}>Products</div>
          <div className={s.productGrid}>
            {productLinks.map((link) => (
              <RichLink key={link.to} link={link} className={cx(s.rich, s.productLink)} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        <div className={cx(s.promo, s.promoDark)}>
          <Media image={img.dashcams} radius={10} decorative className={s.promoImage} />
          <div className={s.promoTitle}>Driver Safety Dash Cameras are here.</div>
          <div className={s.promoBody}>AI video surveillance, people counting, and instant alerts on violations.</div>
          <Link
            to={routes.product('driver-safety-dash-cameras')}
            className="link-arrow link-arrow--sm link-arrow--bright"
            onClick={onNavigate}
          >
            Explore dash cameras →
          </Link>
        </div>
      </div>
    </div>
  )
}

function ResourcesMenu({ onNavigate }: MenuProps) {
  return (
    <div className={s.menu}>
      <div className={cx('container', s.menuInner, s.cols3a)}>
        <div>
          <div className={s.menuHeading}>Explore</div>
          <div className={s.menuList}>
            {learnLinks.map((l) => (
              <RichLink key={l.to} link={l} className={s.rich} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        <div>
          <div className={s.menuHeading}>Technical resources</div>
          <div className={s.menuList}>
            {techLinks.map((l) => (
              <RichLink key={l.to} link={l} className={s.rich} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        <div className={s.promo}>
          <Media image={award.image} radius={10} decorative className={cx(s.promoImage, s.promoBadge)} />
          <div className={s.promoTitle}>Recognised by KPMG for fleet innovation in East Africa.</div>
          <Link to={award.to} className="link-arrow link-arrow--sm" onClick={onNavigate}>
            Our awards →
          </Link>
        </div>
      </div>
    </div>
  )
}

function CompanyMenu({ onNavigate }: MenuProps) {
  return (
    <div className={s.menu}>
      <div className={cx('container', s.menuInner, s.cols3)}>
        <div>
          <div className={s.menuHeading}>Get to know Smartwatch</div>
          <div className={s.menuList}>
            {companyLinks.map((l) => (
              <RichLink key={l.to} link={l} className={s.rich} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        <div>
          <div className={s.menuHeading}>Connect</div>
          <div className={s.menuList}>
            {connectLinks.map((l) => (
              <RichLink key={l.to} link={l} className={s.rich} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        <div className={cx(s.promo, s.promoDark)}>
          <Media image={img.ngo} radius={10} decorative className={s.promoImage} />
          <div className={s.promoTitle}>A decade of connecting and protecting fleets.</div>
          <div className={s.promoBody}>Founded in 2011. Offices in Kampala, Nairobi and the Netherlands.</div>
          <Link to={routes.about} className="link-arrow link-arrow--sm link-arrow--bright" onClick={onNavigate}>
            About Smartwatch →
          </Link>
        </div>
      </div>
    </div>
  )
}

function Drawer({ onNavigate }: MenuProps) {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className={s.drawer} role="dialog" aria-label="Menu">
      <nav className={s.drawerNav} aria-label="Mobile">
        {drawerGroups.map((group) => {
          const isOpen = open === group.label
          return (
            <div key={group.label} className={s.drawerGroup}>
              <button
                type="button"
                className={s.drawerToggle}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : group.label)}
              >
                {group.label}
                <span className={cx(s.caret, isOpen && s.caretOpen)} aria-hidden="true">
                  ▼
                </span>
              </button>
              {isOpen && (
                <div className={s.drawerList}>
                  {group.links.map((link) => (
                    <SmartLink key={link.to + link.name} to={link.to} className={s.drawerLink} onClick={onNavigate}>
                      {link.name}
                    </SmartLink>
                  ))}
                </div>
              )}
            </div>
          )
        })}
        <Link to={routes.contact} className={s.drawerToggle} onClick={onNavigate}>
          Contact
        </Link>
      </nav>
      <div className={s.drawerFooter}>
        <div className={s.drawerPortals}>
          <div className={s.menuHeading}>Platform logins</div>
          {portalLinks.map((link) => (
            <SmartLink key={link.to} to={link.to} className={s.drawerLink}>
              {link.name}
            </SmartLink>
          ))}
        </div>
        <a href={site.phoneHref} className={s.drawerPhone}>
          <span className={s.dot} aria-hidden="true" />
          {site.phone} <span className={s.phoneRole}>Sales</span>
        </a>
      </div>
    </div>
  )
}

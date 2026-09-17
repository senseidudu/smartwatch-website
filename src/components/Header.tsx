import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import {
  companyLinks,
  connectLinks,
  hardwareLinks,
  learnLinks,
  primaryNav,
  techLinks,
  type NavLink,
} from '../data/nav'
import { industriesA, industriesB } from '../data/industries'
import { pillars } from '../data/pillars'
import { routes, site } from '../data/site'
import { cx } from '../lib/cx'
import Placeholder from './Placeholder'
import s from './Header.module.css'

type MenuKey = 'solutions' | 'products' | 'resources' | 'company'

const menuItems: { key: MenuKey; label: string; to: string }[] = [
  { key: 'solutions', label: 'Solutions', to: routes.solutions },
  { key: 'products', label: 'Products', to: routes.products },
  { key: 'resources', label: 'Resources', to: routes.company },
  { key: 'company', label: 'Company', to: routes.company },
]

export default function Header() {
  const [menu, setMenu] = useState<MenuKey | null>(null)
  const [phoneOpen, setPhoneOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()

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
    <header className={s.header} onMouseLeave={closeMenu}>
      <div className={cx('container', s.bar)}>
        <Link to={routes.home} className={s.logo} onClick={closeAll}>
          <img src={logo} alt={site.name} />
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
                <a href="#" className={s.popHelp}>
                  Visit Help Center
                </a>
              </div>
            )}
          </div>
          <a href="#" className={s.login}>
            Login
          </a>
          <Link
            to={routes.contact}
            className={cx('btn', 'btn--primary', 'btn--sm', s.cta)}
            onClick={closeAll}
          >
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

      {drawerOpen && (
        <div className={s.drawer} role="dialog" aria-label="Menu">
          <nav className={s.drawerNav} aria-label="Mobile">
            {primaryNav.map((item) => (
              <Link key={item.name} to={item.to} className={s.drawerLink} onClick={closeAll}>
                {item.name}
              </Link>
            ))}
          </nav>
          <div className={s.drawerFooter}>
            <a href={site.phoneHref} className={s.drawerPhone}>
              <span className={s.dot} aria-hidden="true" />
              {site.phone} <span className={s.phoneRole}>Sales</span>
            </a>
            <a href="#" className={s.login}>
              Login
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

type MenuProps = { onNavigate: () => void }

function MenuLink({
  link,
  className,
  onNavigate,
}: {
  link: NavLink
  className: string
  onNavigate: () => void
}) {
  const body = (
    <>
      <span className={s.richName}>{link.name}</span>
      <span className={s.richShort}>{link.short}</span>
    </>
  )
  return link.to ? (
    <Link to={link.to} className={className} onClick={onNavigate}>
      {body}
    </Link>
  ) : (
    <a href="#" className={className}>
      {body}
    </a>
  )
}

function SolutionsMenu({ onNavigate }: MenuProps) {
  return (
    <div className={s.menu}>
      <div className={cx('container', s.menuInner, s.cols4)}>
        <div>
          <div className={s.menuHeading}>By industry</div>
          <div className={s.menuList}>
            {industriesA.map((name) => (
              <Link key={name} to={routes.solutions} className={s.menuLink} onClick={onNavigate}>
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className={s.menuHeading} aria-hidden="true">
            &nbsp;
          </div>
          <div className={s.menuList}>
            {industriesB.map((name) => (
              <Link key={name} to={routes.solutions} className={s.menuLink} onClick={onNavigate}>
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className={s.menuHeading}>Hardware</div>
          <div className={s.menuList}>
            {hardwareLinks.map((name) => (
              <Link key={name} to={routes.products} className={s.menuLink} onClick={onNavigate}>
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div className={s.promo}>
          <Placeholder label="customer photo" radius={10} stripe={10} className={s.promoImage} />
          <div className={s.promoTitle}>Smart Key demo: see cargo locking in action.</div>
          <Link to={routes.contact} className="link-arrow link-arrow--sm" onClick={onNavigate}>
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
            {pillars.map((p) => (
              <Link
                key={p.name}
                to={routes.products}
                className={cx(s.rich, s.productLink)}
                onClick={onNavigate}
              >
                <span className={s.richName}>{p.name}</span>
                <span className={s.richShort}>{p.short}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className={cx(s.promo, s.promoDark)}>
          <Placeholder
            label="dash cam product shot"
            radius={10}
            stripe={10}
            dark
            className={s.promoImage}
          />
          <div className={s.promoTitle}>Driver Safety Dash Cameras are here.</div>
          <div className={s.promoBody}>
            AI video surveillance, people counting, and instant alerts on violations.
          </div>
          <Link
            to={routes.products}
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
          <div className={s.menuHeading}>Learn</div>
          <div className={s.menuList}>
            {learnLinks.map((l) => (
              <MenuLink key={l.name} link={l} className={s.rich} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        <div>
          <div className={s.menuHeading}>Technical resources</div>
          <div className={s.menuList}>
            {techLinks.map((l) => (
              <MenuLink key={l.name} link={l} className={s.rich} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        <div className={s.promo}>
          <Placeholder label="award badge" radius={10} stripe={10} className={s.promoImage} />
          <div className={s.promoTitle}>Recognised by KPMG for fleet innovation in East Africa.</div>
          <Link to={routes.company} className="link-arrow link-arrow--sm" onClick={onNavigate}>
            Read our reviews →
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
              <MenuLink key={l.name} link={l} className={s.rich} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        <div>
          <div className={s.menuHeading}>Connect</div>
          <div className={s.menuList}>
            {connectLinks.map((l) => (
              <MenuLink key={l.name} link={l} className={s.rich} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        <div className={cx(s.promo, s.promoDark)}>
          <Placeholder label="team photo" radius={10} stripe={10} dark className={s.promoImage} />
          <div className={s.promoTitle}>A decade of connecting and protecting fleets.</div>
          <div className={s.promoBody}>Founded in 2011. Offices in Kampala and Nairobi.</div>
          <Link
            to={routes.company}
            className="link-arrow link-arrow--sm link-arrow--bright"
            onClick={onNavigate}
          >
            About Smartwatch →
          </Link>
        </div>
      </div>
    </div>
  )
}

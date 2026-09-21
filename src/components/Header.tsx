import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import logoWhite from '../assets/logo-white.svg'
import { award } from '../data/content'
import { img } from '../data/images'
import {
  companyLinks,
  connectLinks,
  drawerGroups,
  hardwareLinks,
  learnLinks,
  portalLinks,
  productLinks,
  solutionLinks,
  techLinks,
  viewAll,
  type NavLink,
} from '../data/nav'
import { anchors, routes, site } from '../data/site'
import type { Img } from '../data/types'
import { cx } from '../lib/cx'
import { HEADER_OFFSET, ScrollTrigger } from '../motion/gsap'
import Icon from './Icon'
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

function Chevron() {
  return (
    <svg className={s.caret} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

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
  const [contactOpen, setContactOpen] = useState(false)
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
              {item.label}
              <Chevron />
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
            className={s.contact}
            onMouseEnter={() => setContactOpen(true)}
            onMouseLeave={() => setContactOpen(false)}
          >
            <a href={site.phoneHref} className={s.contactLink}>
              <span className={s.dot} aria-hidden="true" />
              {site.phone} <span className={s.contactRole}>Sales</span>
            </a>
            {contactOpen && (
              <div className={s.pop}>
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
          <Link to={routes.contact} className={cx(s.cta)} onClick={closeAll}>
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

/** Icon + title + one-line description, the standard mega-menu row. */
function MenuItem({
  link,
  onNavigate,
  compact = false,
  showIcon = true,
}: {
  link: NavLink
  onNavigate: () => void
  compact?: boolean
  /** Off for the industry grid, where only a few entries have an icon. */
  showIcon?: boolean
}) {
  return (
    <SmartLink to={link.to} className={cx(s.item, compact && s.itemCompact)} onClick={onNavigate}>
      {showIcon && link.icon && (
        <span className={s.itemIcon}>
          <Icon name={link.icon} size={20} />
        </span>
      )}
      <span className={s.itemText}>
        <span className={s.itemTitle}>{link.name}</span>
        {!compact && link.short && <span className={s.itemDesc}>{link.short}</span>}
      </span>
    </SmartLink>
  )
}

/** Plain text link list used in the narrow featured column. */
function TextList({ links, onNavigate }: { links: NavLink[]; onNavigate: () => void }) {
  return (
    <div className={s.textList}>
      {links.map((link) => (
        <SmartLink key={link.to + link.name} to={link.to} className={s.textLink} onClick={onNavigate}>
          {link.name}
        </SmartLink>
      ))}
    </div>
  )
}

function ViewAll({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  return (
    <SmartLink to={link.to} className={s.viewAll} onClick={onNavigate}>
      {link.name}
      <span aria-hidden="true">→</span>
    </SmartLink>
  )
}

/** Whole-card promo tile pinned to the right of every menu. */
function Promo({
  image,
  title,
  body,
  to,
  onNavigate,
  contain = false,
}: {
  image: Img
  title: string
  body?: string
  to: string
  onNavigate: () => void
  contain?: boolean
}) {
  return (
    <SmartLink to={to} className={s.promo} onClick={onNavigate}>
      <Media image={image} ratio="16 / 9" radius={0} decorative className={cx(s.promoImage, contain && s.promoContain)} />
      <span className={s.promoBody}>
        <span className={s.promoTitle}>{title}</span>
        {body && <span className={s.promoText}>{body}</span>}
      </span>
    </SmartLink>
  )
}

function MenuPanel({ children }: { children: ReactNode }) {
  return (
    <div className={s.menu}>
      <div className={cx('container', s.menuInner)}>{children}</div>
    </div>
  )
}

function SolutionsMenu({ onNavigate }: MenuProps) {
  return (
    <MenuPanel>
      <div className={s.col50}>
        <div className={s.menuHeading}>By industry</div>
        <div className={s.menuGrid}>
          {solutionLinks.map((link) => (
            <MenuItem key={link.to} link={link} onNavigate={onNavigate} compact showIcon={false} />
          ))}
        </div>
        <ViewAll link={viewAll.solutions} onNavigate={onNavigate} />
      </div>
      <div className={s.col25}>
        <div className={s.menuHeading}>Hardware</div>
        <TextList links={hardwareLinks} onNavigate={onNavigate} />
      </div>
      <div className={s.colPromo}>
        <Promo
          image={img.cargo}
          title="Smart Key demo: see cargo locking in action."
          body="Book a 30-minute walkthrough with our Kampala or Nairobi team."
          to={`${routes.contact}#${anchors.demo}`}
          onNavigate={onNavigate}
        />
      </div>
    </MenuPanel>
  )
}

function ProductsMenu({ onNavigate }: MenuProps) {
  return (
    <MenuPanel>
      <div className={s.col50}>
        <div className={s.menuHeading}>Products</div>
        <div className={s.menuGrid}>
          {productLinks.slice(0, 7).map((link) => (
            <MenuItem key={link.to} link={link} onNavigate={onNavigate} />
          ))}
        </div>
        <ViewAll link={viewAll.products} onNavigate={onNavigate} />
      </div>
      <div className={s.col25}>
        <div className={s.menuHeading}>Hardware</div>
        <TextList links={hardwareLinks} onNavigate={onNavigate} />
      </div>
      <div className={s.colPromo}>
        <Promo
          image={img.dashcams}
          title="Driver Safety Dash Cameras are here."
          body="AI video surveillance, people counting, and instant alerts on violations."
          to={routes.product('driver-safety-dash-cameras')}
          onNavigate={onNavigate}
        />
      </div>
    </MenuPanel>
  )
}

function ResourcesMenu({ onNavigate }: MenuProps) {
  return (
    <MenuPanel>
      <div className={s.col50}>
        <div className={s.menuHeading}>Explore</div>
        <div className={s.menuGrid}>
          {learnLinks.map((link) => (
            <MenuItem key={link.to} link={link} onNavigate={onNavigate} />
          ))}
        </div>
        <ViewAll link={viewAll.resources} onNavigate={onNavigate} />
      </div>
      <div className={s.col25}>
        <div className={s.menuHeading}>Technical resources</div>
        <div className={s.menuStack}>
          {techLinks.map((link) => (
            <MenuItem key={link.to} link={link} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
      <div className={s.colPromo}>
        <Promo
          image={award.image}
          title="Recognised by KPMG for fleet innovation in East Africa."
          to={award.to}
          onNavigate={onNavigate}
          contain
        />
      </div>
    </MenuPanel>
  )
}

function CompanyMenu({ onNavigate }: MenuProps) {
  return (
    <MenuPanel>
      <div className={s.col25First}>
        <div className={s.menuHeading}>Get to know Smartwatch</div>
        <div className={s.menuStack}>
          {companyLinks.map((link) => (
            <MenuItem key={link.to} link={link} onNavigate={onNavigate} />
          ))}
        </div>
        <ViewAll link={viewAll.company} onNavigate={onNavigate} />
      </div>
      <div className={s.col25}>
        <div className={s.menuHeading}>Connect</div>
        <div className={s.menuStack}>
          {connectLinks.map((link) => (
            <MenuItem key={link.to} link={link} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
      <div className={s.colPromo}>
        <Promo
          image={img.ngo}
          title="A decade of connecting and protecting fleets."
          body="Founded in 2011. Offices in Kampala, Nairobi and the Netherlands."
          to={routes.about}
          onNavigate={onNavigate}
        />
      </div>
    </MenuPanel>
  )
}

function Drawer({ onNavigate }: MenuProps) {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className={s.drawer} role="dialog" aria-label="Menu">
      <div className={s.drawerScroll}>
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
                  <Chevron />
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
        <div className={s.drawerPortals}>
          <div className={s.menuHeading}>Platform logins</div>
          {portalLinks.map((link) => (
            <SmartLink key={link.to} to={link.to} className={s.drawerLink}>
              {link.name}
            </SmartLink>
          ))}
        </div>
      </div>
      <div className={s.drawerFooter}>
        <a href={site.phoneHref} className={s.drawerPhone}>
          <span className={s.dot} aria-hidden="true" />
          {site.phone}
        </a>
        <Link to={routes.contact} className={s.cta} onClick={onNavigate}>
          Get a demo
        </Link>
      </div>
    </div>
  )
}

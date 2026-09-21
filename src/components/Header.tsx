import { useEffect, useRef, useState, type ReactNode, type SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import Icon from './Icon'
import Media from './Media'
import SmartLink from './SmartLink'
import s from './Header.module.css'

type MenuKey = 'products' | 'solutions' | 'resources' | 'company'

const menuItems: { key: MenuKey; label: string; to: string }[] = [
  { key: 'products', label: 'Products', to: routes.products },
  { key: 'solutions', label: 'Solutions', to: routes.solutions },
  { key: 'resources', label: 'Resources', to: routes.platforms },
  { key: 'company', label: 'Company', to: routes.about },
]

const featuredProducts: NavLink[] = [
  ...hardwareLinks,
  { name: 'All products', short: '', to: routes.products },
]

const NARROW_CARD = 920

function Chevron() {
  return (
    <svg className={s.caret} width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** True once the page has scrolled past the top; the bar turns white at that point. */
function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > threshold)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [threshold])
  return scrolled
}

export default function Header() {
  const [menu, setMenu] = useState<MenuKey | null>(null)
  const [anchor, setAnchor] = useState(0)
  const [contactOpen, setContactOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const scrolled = useScrolled()
  const theme = scrolled ? 'light' : 'dark'

  const closeMenu = () => setMenu(null)
  const closeAll = () => {
    setMenu(null)
    setDrawerOpen(false)
  }
  const go = (to: string) => () => {
    closeAll()
    navigate(to)
  }
  /** Opens a menu and remembers where its trigger sits so narrow cards can hang beneath it. */
  const openMenu = (key: MenuKey) => (event: SyntheticEvent<HTMLButtonElement>) => {
    const headerRect = headerRef.current?.getBoundingClientRect()
    const rect = event.currentTarget.getBoundingClientRect()
    const headerWidth = headerRect?.width ?? 0
    const wanted = rect.left - (headerRect?.left ?? 0) - 32
    const maxLeft = headerWidth - NARROW_CARD - 24
    setAnchor(Math.max(24, Math.min(wanted, maxLeft)))
    setMenu(key)
  }

  return (
    <header ref={headerRef} className={s.header} data-theme={theme} onMouseLeave={closeMenu}>
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
              onMouseEnter={openMenu(item.key)}
              onFocus={openMenu(item.key)}
              onClick={go(item.to)}
            >
              {item.label}
              <Chevron />
            </button>
          ))}
        </nav>

        <div className={s.actions}>
          <div
            className={s.contact}
            onMouseEnter={() => setContactOpen(true)}
            onMouseLeave={() => setContactOpen(false)}
          >
            <Link
              to={routes.contact}
              className={s.contactLink}
              onMouseEnter={closeMenu}
              onFocus={closeMenu}
              onClick={closeAll}
            >
              <Icon name="phone" size={16} />
              Contact
            </Link>
            {contactOpen && (
              <div className={s.pop}>
                <div className={s.popLabel}>Contact</div>
                <div className={s.popTitle}>Talk to Sales or Support 24/7</div>
                <a href={site.phoneHref} className={s.popCall}>
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className={s.popLink}>
                  {site.email}
                </a>
                <Link to={`${routes.contact}#${anchors.support}`} className={s.popHelp} onClick={closeAll}>
                  Visit the help centre
                </Link>
              </div>
            )}
          </div>
          <Link to={routes.contact} className={cx('btn', 'btn--accent', s.cta)} onClick={closeAll}>
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

      {menu === 'products' && <ProductsMenu onNavigate={closeAll} />}
      {menu === 'solutions' && <SolutionsMenu onNavigate={closeAll} anchor={anchor} />}
      {menu === 'resources' && <ResourcesMenu onNavigate={closeAll} />}
      {menu === 'company' && <CompanyMenu onNavigate={closeAll} />}

      {drawerOpen && <Drawer onNavigate={closeAll} />}
    </header>
  )
}

type MenuProps = { onNavigate: () => void }

/** Floating white card that hangs below the bar. Wide cards span the container; narrow ones sit under their trigger. */
function MenuCard({ children, anchor }: { children: ReactNode; anchor?: number }) {
  const narrow = anchor !== undefined
  return (
    <div className={cx(s.menu, narrow ? s.menuNarrow : s.menuWide)} style={narrow ? { left: anchor } : undefined}>
      {children}
    </div>
  )
}

/** Optional icon tile + title + one-line description. */
function MenuItem({ link, onNavigate, compact = false }: { link: NavLink; onNavigate: () => void; compact?: boolean }) {
  return (
    <SmartLink to={link.to} className={cx(s.item, compact && s.itemCompact)} onClick={onNavigate}>
      {!compact && link.icon && (
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

function FeaturedList({ links, onNavigate }: { links: NavLink[]; onNavigate: () => void }) {
  return (
    <div className={s.featuredList}>
      {links.map((link) => (
        <SmartLink key={link.to + link.name} to={link.to} className={s.featuredLink} onClick={onNavigate}>
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

/** Dark promo tile pinned to the right of every menu; the whole card is the link. */
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
      <Media image={image} ratio="16 / 10" radius={12} decorative className={cx(s.promoImage, contain && s.promoContain)} />
      <span className={s.promoTitle}>{title}</span>
      {body && <span className={s.promoText}>{body}</span>}
    </SmartLink>
  )
}

function ProductsMenu({ onNavigate }: MenuProps) {
  return (
    <MenuCard>
      <div className={s.main}>
        <div className={s.eyebrow}>Products</div>
        <div className={s.grid}>
          {productLinks.slice(0, 7).map((link) => (
            <MenuItem key={link.to} link={link} onNavigate={onNavigate} />
          ))}
        </div>
        <ViewAll link={viewAll.products} onNavigate={onNavigate} />
      </div>
      <div className={s.featured}>
        <div className={s.eyebrow}>Featured</div>
        <FeaturedList links={featuredProducts} onNavigate={onNavigate} />
      </div>
      <Promo
        image={img.dashcams}
        title="Driver Safety Dash Cameras are here."
        body="AI video surveillance, people counting, and instant alerts on violations."
        to={routes.product('driver-safety-dash-cameras')}
        onNavigate={onNavigate}
      />
    </MenuCard>
  )
}

function SolutionsMenu({ onNavigate, anchor }: MenuProps & { anchor: number }) {
  return (
    <MenuCard anchor={anchor}>
      <div className={s.main}>
        <div className={s.eyebrow}>By industry</div>
        <div className={s.grid}>
          {solutionLinks.map((link) => (
            <MenuItem key={link.to} link={link} onNavigate={onNavigate} compact />
          ))}
        </div>
        <ViewAll link={viewAll.solutions} onNavigate={onNavigate} />
      </div>
      <Promo
        image={img.cargo}
        title="Smart Key demo: see cargo locking in action."
        body="Book a 30-minute walkthrough with our Kampala or Nairobi team."
        to={`${routes.contact}#${anchors.demo}`}
        onNavigate={onNavigate}
      />
    </MenuCard>
  )
}

function ResourcesMenu({ onNavigate }: MenuProps) {
  return (
    <MenuCard>
      <div className={s.main}>
        <div className={s.eyebrow}>Explore</div>
        <div className={s.grid}>
          {learnLinks.map((link) => (
            <MenuItem key={link.to} link={link} onNavigate={onNavigate} />
          ))}
        </div>
        <ViewAll link={viewAll.resources} onNavigate={onNavigate} />
      </div>
      <div className={s.featured}>
        <div className={s.eyebrow}>Technical resources</div>
        <div className={s.stack}>
          {techLinks.map((link) => (
            <MenuItem key={link.to} link={link} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
      <Promo
        image={award.image}
        title="Recognised by KPMG for fleet innovation in East Africa."
        to={award.to}
        onNavigate={onNavigate}
        contain
      />
    </MenuCard>
  )
}

function CompanyMenu({ onNavigate }: MenuProps) {
  return (
    <MenuCard>
      <div className={s.main}>
        <div className={s.eyebrow}>Get to know Smartwatch</div>
        <div className={s.grid}>
          {companyLinks.map((link) => (
            <MenuItem key={link.to} link={link} onNavigate={onNavigate} />
          ))}
        </div>
        <ViewAll link={viewAll.company} onNavigate={onNavigate} />
      </div>
      <div className={s.featured}>
        <div className={s.eyebrow}>Connect</div>
        <div className={s.stack}>
          {connectLinks.map((link) => (
            <MenuItem key={link.to} link={link} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
      <Promo
        image={img.ngo}
        title="A decade of connecting and protecting fleets."
        body="Founded in 2011. Offices in Kampala, Nairobi and the Netherlands."
        to={routes.about}
        onNavigate={onNavigate}
      />
    </MenuCard>
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
          <div className={s.eyebrow}>Platform logins</div>
          {portalLinks.map((link) => (
            <SmartLink key={link.to} to={link.to} className={s.drawerLink}>
              {link.name}
            </SmartLink>
          ))}
        </div>
      </div>
      <div className={s.drawerFooter}>
        <Link to={routes.contact} className={s.drawerContact} onClick={onNavigate}>
          <Icon name="phone" size={16} />
          Contact
        </Link>
        <Link to={routes.contact} className={cx('btn', 'btn--accent', s.cta)} onClick={onNavigate}>
          Get a demo
        </Link>
      </div>
    </div>
  )
}

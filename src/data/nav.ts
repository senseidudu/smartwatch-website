import { industries } from './industries'
import { pillars } from './pillars'
import { anchors, portals, routes } from './site'
import type { IconName } from './types'

export type NavLink = { name: string; short: string; to: string; icon?: IconName }

/** Resources › Explore */
export const learnLinks: NavLink[] = [
  { name: 'Products overview', short: 'The full Smartwatch FM suite', to: routes.products },
  { name: 'Solutions by industry', short: 'Fleets we serve across East Africa', to: routes.solutions },
  { name: 'Hardware & accessories', short: 'Trackers, cameras, sensors', to: routes.hardware },
  { name: 'Our heritage', short: 'Connecting fleets since 2011', to: `${routes.about}#${anchors.heritage}` },
]

/** Resources › Technical resources */
export const techLinks: NavLink[] = [
  { name: 'Help centre', short: 'Talk to support, 24/7', to: `${routes.contact}#${anchors.support}` },
  { name: 'Platform logins', short: 'Smartwatch FM, VSS and Smart FM', to: routes.platforms },
]

/** Company › Get to know Smartwatch */
export const companyLinks: NavLink[] = [
  { name: 'About Smartwatch', short: 'Who we are and what we build', to: routes.about },
  { name: 'Our heritage', short: 'A decade of connected fleets', to: `${routes.about}#${anchors.heritage}` },
  { name: 'Reviews & awards', short: 'Recognised by KPMG', to: `${routes.about}#${anchors.awards}` },
  { name: 'Why Smartwatch', short: 'Our trade, our promise, our support', to: `${routes.about}#${anchors.whyUs}` },
]

/** Company › Connect */
export const connectLinks: NavLink[] = [
  { name: 'Contact us', short: 'Connect with sales or support', to: routes.contact },
  { name: 'Customer support', short: 'Help with an installed device', to: `${routes.contact}#${anchors.support}` },
  { name: 'Schedule a demo', short: 'See Smartwatch solutions in action', to: `${routes.contact}#${anchors.demo}` },
]

/** Solutions › Hardware column */
export const hardwareLinks: NavLink[] = [
  { name: 'Devices', short: '', to: `${routes.hardware}#${anchors.devices}` },
  { name: 'Accessories', short: '', to: `${routes.hardware}#${anchors.accessories}` },
  { name: 'Installation & support', short: '', to: `${routes.contact}#${anchors.support}` },
]

/** "View all" link pinned to the bottom of each mega menu's main column. */
export const viewAll = {
  solutions: { name: 'View all solutions', short: '', to: routes.solutions },
  products: { name: 'View all products', short: '', to: routes.products },
  resources: { name: 'View all resources', short: '', to: routes.products },
  company: { name: 'About Smartwatch', short: '', to: routes.about },
} satisfies Record<string, NavLink>

/** Products menu: the seven pillars plus the index. */
export const productLinks: NavLink[] = [
  ...pillars.map((p) => ({ name: p.name, short: p.short, to: p.to, icon: p.icon })),
  { name: 'All products', short: 'Every product and device', to: routes.products, icon: 'platform' as const },
]

/** Solutions menu: every industry we serve, plus hardware. */
export const solutionLinks: NavLink[] = industries.map((i) => ({
  name: i.name,
  short: i.short,
  to: i.to,
  icon: i.icon,
}))

/** Mobile drawer groups (click accordions) and its plain links. */
export const drawerGroups: { label: string; links: NavLink[] }[] = [
  { label: 'Products', links: productLinks },
  { label: 'Solutions', links: solutionLinks },
  { label: 'Resources', links: [...learnLinks, ...techLinks] },
  { label: 'Company', links: [...companyLinks, ...connectLinks] },
]

export const portalLinks: NavLink[] = portals.map((p) => ({ name: p.name, short: p.short, to: p.href }))

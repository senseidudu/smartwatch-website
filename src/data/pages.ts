import { img } from './images'
import { pillars } from './pillars'
import { routes } from './site'
import type { IconName, Img } from './types'

/** Enough about a page to render a card or menu item that links to it. */
export type PageRef = { to: string; name: string; short: string; image?: Img; icon?: IconName }

const staticPages: PageRef[] = [
  {
    to: routes.hardware,
    name: 'Hardware & accessories',
    short: 'Trackers, dash cameras, sensors and accessories built for Africa’s roads.',
    image: img.products,
    icon: 'hardware',
  },
  { to: routes.products, name: 'All products', short: 'The full Smartwatch FM product suite.', icon: 'platform' },
  { to: routes.solutions, name: 'All solutions', short: 'Solutions for every industry we serve.', icon: 'tracking' },
  { to: routes.about, name: 'About Smartwatch', short: 'A decade of connecting fleets across industries.', image: img.ngo },
  { to: routes.contact, name: 'Contact', short: 'Talk to sales or support, 24/7.', icon: 'sales' },
  { to: routes.platforms, name: 'Platform logins', short: 'Log in to Smartwatch FM, VSS or Smart FM.', icon: 'platform' },
]

const pillarPages: PageRef[] = pillars.map((p) => ({
  to: p.to,
  name: p.name,
  short: p.short,
  image: p.image,
  icon: p.icon,
}))

let registered: PageRef[] = []

/** Data modules register their pages so `resolvePage` can describe any site path. */
export function registerPages(refs: PageRef[]) {
  registered = registered.concat(refs.filter((r) => !registered.some((x) => x.to === r.to)))
}

function titleFromPath(path: string): string {
  const last = path.split('#')[0].split('/').filter(Boolean).pop() ?? ''
  return last.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
}

/** Describes a site path for cards and menus; falls back to a title derived from the slug. */
export function resolvePage(path: string): PageRef {
  const base = path.split('#')[0]
  return (
    registered.find((p) => p.to === base) ??
    pillarPages.find((p) => p.to === base) ??
    staticPages.find((p) => p.to === base) ?? { to: path, name: titleFromPath(path), short: '' }
  )
}

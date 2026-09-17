import { routes } from './site'

export type NavLink = { name: string; short: string; to?: string }

export const learnLinks: NavLink[] = [
  { name: 'Content library', short: 'Reports, briefs, spec sheets' },
  { name: 'Customer stories', short: 'Fleets succeeding with Smartwatch' },
  { name: 'Webinars', short: 'Tune in for actionable insights' },
  { name: 'Blog', short: 'Stay up to date with Smartwatch news' },
  { name: 'Guides', short: 'A deep dive into fleet management' },
]

export const techLinks: NavLink[] = [
  { name: 'Developer portal', short: 'Integrate with Smartwatch APIs' },
  { name: 'Help center', short: 'Install, set up and use Smartwatch' },
  { name: 'Platform logins', short: 'SmartwatchFM, VSS and Smart FM' },
]

export const companyLinks: NavLink[] = [
  { name: 'Leadership', short: 'Smartwatch executives and board', to: routes.company },
  { name: 'Newsroom', short: 'Press releases and articles', to: routes.company },
  { name: 'Reviews & awards', short: 'Platform and workplace merits', to: routes.company },
  { name: 'Careers', short: 'Join our team in Kampala or Nairobi', to: routes.company },
]

export const connectLinks: NavLink[] = [
  { name: 'Contact us', short: 'Connect with sales or support', to: routes.contact },
  { name: 'Partners', short: 'Join our partner program', to: routes.contact },
  { name: 'Schedule a demo', short: 'See Smartwatch solutions in action', to: routes.contact },
]

export const hardwareLinks = ['Devices', 'Accessories', 'Installation & support']

/** Top-level pages, used by the mobile drawer. */
export const primaryNav = [
  { name: 'Solutions', to: routes.solutions },
  { name: 'Products', to: routes.products },
  { name: 'Resources', to: routes.company },
  { name: 'Company', to: routes.company },
  { name: 'Contact', to: routes.contact },
]

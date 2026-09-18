import { img } from './images'
import { routes } from './site'

export const heroWords = ['safety', 'productivity', 'profitability']

export const logos = [
  'Aramex',
  'KLM',
  'British Airways',
  'Barclays',
  'World Vision',
  'CNOOC',
  'KIA',
  'Rubis',
  'KCB',
  'Serena Hotels',
  'Posta Uganda',
  'NTV',
]

/** The eight names shown in the customer credibility band and on solution pages. */
export const customerLogos = [
  'KLM',
  'British Airways',
  'Barclays',
  'World Vision',
  'CNOOC',
  'KCB',
  'Serena Hotels',
  'Aramex',
]

export const proofLine = {
  text: 'Recognised by KPMG as a Top 100 mid-sized company. Serving fleets across East Africa since 2011.',
  linkLabel: 'Our awards →',
  to: '/about#awards',
}

export const whys = [
  { title: 'All-in-one', body: 'SmartwatchFM is the single solution for all your fleet management needs.' },
  { title: 'Easy to use', body: 'Anyone with a mobile or desktop device can access the platform.' },
  { title: 'Quick setup', body: 'Our Professional Services team gets you up and running sooner.' },
  { title: 'Dedicated support', body: '24/7 support to resolve your service queries.' },
]

export const featuredPost = {
  kind: 'Product',
  title: 'Driver Safety Dash Cameras: AI video, people counting and instant alerts.',
  body: 'Video surveillance, passenger information, AI analytics and people counting, dispatch system and terminal with ticket system.',
  image: img.dashcams,
  to: routes.product('driver-safety-dash-cameras'),
}

export const posts = [
  {
    kind: 'Product',
    title: 'Take a proactive fleet maintenance strategy',
    image: img.laptop,
    to: routes.product('maintenance'),
  },
  {
    kind: 'Product',
    title: 'Save up to 40% on fuel with fleet fuel management',
    image: undefined,
    to: routes.product('sustainability'),
  },
  {
    kind: 'Solution',
    title: 'Faster inspection and clearance on trading corridors',
    image: img.cargo,
    to: routes.solution('electronic-cargo-tracking'),
  },
]

export const award = {
  name: 'KPMG Top 100 Mid-Sized Companies',
  label: 'Recognised by KPMG',
  image: img.kpmg,
  to: '/about#awards',
}

export const demoBenefits = [
  'Comply with local and international fleet regulations.',
  'Identify risks and coach drivers with real-time alerts.',
  'See every vehicle, asset and driver in one place.',
]

export const leadSources = [
  'TV',
  'Radio',
  'Social media',
  'Search engine',
  'Trade show / Event',
  'Referral',
  'Online ad',
  'Other',
]

export const fleetSizes = ['1 – 9', '10 – 49', '50 – 174', '175 – 999', '1,000+']

export const countries = ['Uganda', 'Kenya', 'Tanzania', 'Other']

export const news = [
  {
    outlet: 'Daily Monitor',
    title: 'Smartwatch Solutions rolls out AI dash cameras for Ugandan bus operators',
  },
  {
    outlet: 'Business Daily Africa',
    title: 'Electronic cargo tracking cuts transit theft on the Northern Corridor',
  },
  { outlet: 'New Vision', title: 'Kampala fleet-tech firm marks 15 years of connected fleets' },
  { outlet: 'The EastAfrican', title: 'Fleet fuel management gains ground as diesel prices climb' },
]

export type ProductFeature = {
  label: string
  image: string
  headline: string
  body: string
  points: { title: string; body: string }[]
}

export const productFeatures: ProductFeature[] = [
  {
    label: 'Video surveillance',
    image: 'multi-camera in-cab view',
    headline: 'See every trip from every angle.',
    body: 'Road-facing and in-cab cameras record continuously, with AI flagging harsh braking, speeding and distraction the moment it happens.',
    points: [
      { title: 'Instant alerts', body: 'Sound buzzer warns drivers before exceeding the speed limit.' },
      { title: 'Event clips', body: 'Violation footage lands in your inbox within minutes.' },
    ],
  },
  {
    label: 'AI analytics',
    image: 'people counting overlay on bus door',
    headline: 'Passenger information and people counting, built in.',
    body: 'Know how many riders board, where, and when, then feed that into dispatch and ticketing without a separate system.',
    points: [
      { title: 'People counting', body: 'Door cameras count boardings and alightings automatically.' },
      {
        title: 'Dispatch & ticketing',
        body: 'Terminal with ticket system for bus and public transport operators.',
      },
    ],
  },
  {
    label: 'Driver coaching',
    image: 'driver score card in mobile app',
    headline: 'Get time back with self-coaching tools.',
    body: 'Eliminate repetitive tasks with custom safety definitions and driver scores that improve on their own.',
    points: [
      { title: '70% fewer accidents', body: 'Interactive alerts change behavior on the road, not after.' },
      {
        title: 'Driver app',
        body: 'Complete tasks and inspection reports faster, avoid HSE violations and fines.',
      },
    ],
  },
]

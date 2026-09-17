export const routes = {
  home: '/',
  products: '/products',
  solutions: '/solutions',
  company: '/company',
  contact: '/contact',
} as const

export const site = {
  name: 'Smartwatch Solutions',
  phone: '+256 392 177 300',
  phoneHref: 'tel:+256392177300',
  email: 'customersupport@smartwatchsolutions.com',
  regions: 'Uganda · Kenya',
  tagline:
    'Affordable, user-friendly fleet and asset management solutions that enhance efficiency and support long-term business growth.',
  copyright: '© 2011–2026 Smartwatch Solutions Ltd.',
  social: [
    { name: 'Facebook', href: 'http://www.facebook.com/SWSUG256' },
    { name: 'X', href: 'https://x.com/SWSolutionsUG' },
    { name: 'LinkedIn', href: 'https://ug.linkedin.com/company/smartwatch-solutions-ug' },
  ],
}

export const offices = [
  {
    city: 'Kampala, Uganda',
    addr: 'Head office · Mon–Fri 8:00–18:00 EAT, support 24/7',
    tel: '+256 392 177 300',
    telHref: 'tel:+256392177300',
  },
  {
    city: 'Nairobi, Kenya',
    addr: 'Regional office · Sales and installation support',
    tel: '+254 (0) 20 000 0000',
    telHref: 'tel:+254200000000',
  },
]

export const stats = [
  { value: '800+', label: 'Companies on Smartwatch' },
  { value: '2011', label: 'Founded in Kampala' },
  { value: '70%', label: 'Fewer accidents with instant alerts' },
  { value: '24/7', label: 'Dedicated support' },
]

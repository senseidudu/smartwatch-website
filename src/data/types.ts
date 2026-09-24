export type IconName =
  | 'compliance'
  | 'dashcam'
  | 'tracking'
  | 'maintenance'
  | 'cargo'
  | 'sustainability'
  | 'insurance'
  | 'hardware'
  | 'platform'
  | 'support'
  | 'sales'
  | 'help'
  | 'phone'
  | 'assets'
  | 'fuel'
  | 'bus'
  | 'signal'
  | 'government'
  | 'food'
  | 'field'
  | 'satellite'
  | 'truck'
  | 'van'
  | 'ev'
  | 'site'

export type Img = {
  src: string
  alt: string
  width: number
  height: number
  /** 'contain' keeps cut-out product shots whole instead of cropping them to the frame. */
  fit?: 'cover' | 'contain'
}

export type Cta = { label: string; to: string; variant?: 'primary' | 'outline' | 'outline-light' }

export type Stat = { value: number; prefix?: string; suffix?: string; label: string }

export type Point = string | { title: string; body: string }

export type CardItem = {
  title: string
  body?: string
  points?: string[]
  image?: Img
  /** Placeholder label shown when a card's image has been withdrawn and not yet replaced. */
  imageLabel?: string
  icon?: IconName
  href?: string
}

type Base = { id?: string; eyebrow?: string; title?: string; intro?: string }

export type Section =
  | (Base & { kind: 'cards'; items: CardItem[]; columns?: 2 | 3 | 4 })
  | (Base & { kind: 'bullets'; items: string[]; columns?: 1 | 2 | 3 })
  | (Base & {
      kind: 'split'
      title: string
      body: string | string[]
      points?: Point[]
      media?: Img
      mediaLabel?: string
      reverse?: boolean
      cta?: Cta
    })
  | (Base & {
      /** A long company story broken into a lede with key facts, themed cards and a named-client row. */
      kind: 'story'
      title: string
      lede: string
      facts?: { value: string; label: string }[]
      media?: Img
      mediaLabel?: string
      themes: CardItem[]
      /** Named clients; a tile shows the logo when one exists and the name otherwise. */
      clients?: { title: string; items: { name: string; logo?: Img }[] }
      closing?: string
      cta?: Cta
    })
  | (Base & { kind: 'stats'; items: Stat[] })
  | (Base & {
      kind: 'beforeAfter'
      title: string
      body?: string
      before: string[]
      after: string[]
      /** Module graphic shown beside the heading. */
      media?: Img
    })
  | (Base & {
      kind: 'tabs'
      tabs: { label: string; title?: string; body: string | string[]; points?: string[] }[]
    })
  | (Base & { kind: 'steps'; items: { title: string; body: string }[] })
  | (Base & {
      kind: 'spotlight'
      title: string
      body: string
      specs?: { value: string; label: string }[]
      media?: Img
      mediaLabel?: string
      cta: Cta
    })
  | (Base & { kind: 'links'; columns: { title: string; links: Cta[] }[] })
  | (Base & { kind: 'faq'; items: { q: string; a: string }[]; reviewed?: boolean })
  | (Base & { kind: 'logos'; items: string[] })
  | (Base & { kind: 'related'; slugs: string[] })

export type SectionKind = Section['kind']

export type DetailPage = {
  slug: string
  kind: 'solution' | 'product' | 'page'
  name: string
  short: string
  icon?: IconName
  hero: {
    eyebrow: string
    title: string
    intro: string
    tone?: 'dark' | 'light' | 'photo'
    media?: Img
    mediaLabel?: string
    ctas?: Cta[]
  }
  sections: Section[]
  /** Closing CTA band. Omit for the default "See it in action" band; `false` hides it. */
  cta?: { title: string; body: string; ctas: Cta[] } | false
  meta: { title: string; description: string }
}

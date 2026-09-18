import type { Section } from '../../data/types'
import BeforeAfterSection from './BeforeAfterSection'
import BulletsSection from './BulletsSection'
import CardsSection from './CardsSection'
import FaqSection from './FaqSection'
import LinksSection from './LinksSection'
import LogoWall from './LogoWall'
import RelatedSection from './RelatedSection'
import SplitSection from './SplitSection'
import SpotlightSection from './SpotlightSection'
import StatsSection from './StatsSection'
import StepsSection from './StepsSection'
import TabsSection from './TabsSection'

export default function SectionRenderer({ section }: { section: Section }) {
  switch (section.kind) {
    case 'cards':
      return <CardsSection section={section} />
    case 'bullets':
      return <BulletsSection section={section} />
    case 'split':
      return <SplitSection section={section} />
    case 'stats':
      return <StatsSection section={section} />
    case 'beforeAfter':
      return <BeforeAfterSection section={section} />
    case 'tabs':
      return <TabsSection section={section} />
    case 'steps':
      return <StepsSection section={section} />
    case 'spotlight':
      return <SpotlightSection section={section} />
    case 'links':
      return <LinksSection section={section} />
    case 'faq':
      return <FaqSection section={section} />
    case 'logos':
      return <LogoWall id={section.id} title={section.title} items={section.items} />
    case 'related':
      return <RelatedSection section={section} />
    default: {
      const never: never = section
      return never
    }
  }
}

import CtaBand from '../components/sections/CtaBand'
import { defaultCta } from '../components/sections/cta'
import DetailHero from '../components/sections/DetailHero'
import LogoWall from '../components/sections/LogoWall'
import ProofStrip from '../components/sections/ProofStrip'
import SectionRenderer from '../components/sections/SectionRenderer'
import StickyRail, { railLabel } from '../components/sections/StickyRail'
import { customerLogos } from '../data/content'
import type { DetailPage as Page } from '../data/types'
import { usePageMeta } from '../hooks/usePageMeta'
import s from './DetailPage.module.css'

/**
 * One template for every product, solution and company page.
 * Section order comes from the data; the template adds the hero, the rail (products),
 * the proof strip and customer logos (solutions), and the closing band.
 */
export default function DetailPage({ page }: { page: Page }) {
  usePageMeta(page.meta)
  const related = page.sections.filter((sec) => sec.kind === 'related')
  const main = page.sections.filter((sec) => sec.kind !== 'related')
  const rail =
    page.kind === 'product'
      ? page.sections
          .filter((sec) => sec.id)
          .map((sec) => ({ id: sec.id!, label: railLabel(sec.id!, sec.title) }))
      : []

  return (
    <div className={s.page}>
      <DetailHero page={page} />
      <div className={s.panel} data-band="light">
        {rail.length > 0 && <StickyRail items={rail} />}
        {page.kind === 'solution' && <ProofStrip />}
        {main.map((section, i) => (
          <SectionRenderer key={section.id ?? `${section.kind}-${i}`} section={section} />
        ))}
        {page.kind === 'solution' && <LogoWall items={customerLogos} title="Trusted by" />}
        {related.map((section, i) => (
          <SectionRenderer key={section.id ?? `related-${i}`} section={section} />
        ))}
        {page.cta !== false && <CtaBand {...(page.cta ?? defaultCta)} />}
      </div>
    </div>
  )
}

import Media from '../components/Media'
import Panel from '../components/Panel'
import CtaBand from '../components/sections/CtaBand'
import { defaultCta } from '../components/sections/cta'
import SmartLink from '../components/SmartLink'
import { industries } from '../data/industries'
import { usePageMeta } from '../hooks/usePageMeta'
import { cx } from '../lib/cx'
import s from './SolutionsPage.module.css'

export default function SolutionsPage() {
  usePageMeta({
    title: 'Solutions',
    description:
      'Fleet management solutions for oil and gas, trucking and logistics, public transport, government, NGOs, food and manufacturing, EV fleets and more across East Africa.',
  })

  return (
    <div className={s.page}>
      <section className={s.band} data-band="dark">
        <div className={cx('container', s.bandInner)}>
          <div className="eyebrow eyebrow--bright">Solutions</div>
          <h1 className="h-page">Built for the industries that keep East Africa moving.</h1>
          <p className={s.lead}>
            From oil and gas convoys to city buses and NGO field teams, Smartwatch adapts to how your
            operation runs.
          </p>
        </div>
      </section>

      <Panel className={s.panel}>
        <section className={cx('container', s.gridWrap)} aria-label="Solutions by industry">
          <div className={s.grid}>
            {industries.map((industry) => (
              <SmartLink key={industry.to} to={industry.to} className={cx(s.card, 'lift')}>
                <Media image={industry.image} label={industry.name} ratio="16 / 10" radius={0} decorative stripe={10} />
                <div className={s.cardBody}>
                  <div className={s.cardName}>{industry.name}</div>
                  <div className={s.cardText}>{industry.short}</div>
                  <div className={s.cardMore}>Explore →</div>
                </div>
              </SmartLink>
            ))}
          </div>
        </section>
        <CtaBand
          {...defaultCta}
          title="Not sure which solution fits?"
          body="Tell us about your fleet and we will map the platform to the way your operation runs."
        />
      </Panel>
    </div>
  )
}

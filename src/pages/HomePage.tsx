import Panel from '../components/Panel'
import CustomersBand from '../components/home/CustomersBand'
import DemoSection from '../components/home/DemoSection'
import Hero from '../components/home/Hero'
import PlatformIntro from '../components/home/PlatformIntro'
import ProductRail from '../components/home/ProductRail'
import ProductRows from '../components/home/ProductRows'
import Resources from '../components/home/Resources'
import { site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import s from './HomePage.module.css'

export default function HomePage() {
  usePageMeta({
    description:
      'Smartwatch Solutions: fleet and mobile asset management for East Africa since 2011. Tracking, telematics, dash cameras, compliance, maintenance and cargo security on one platform.',
  })
  return (
    <div className={s.home}>
      {/* The hero pins while this first panel scrolls up over it; the wrapper bounds the pin. */}
      <div className={s.stage}>
        <Hero />
        <Panel className={s.panel}>
          <PlatformIntro />
          <ProductRail />
          <ProductRows />
        </Panel>
      </div>
      <CustomersBand />
      <Panel className={s.panel}>
        <Resources />
      </Panel>
      <DemoSection />
      <div className={s.disclaimer}>
        <div className="container">{site.disclaimer}</div>
      </div>
    </div>
  )
}

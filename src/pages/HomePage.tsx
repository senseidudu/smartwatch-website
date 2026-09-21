import Customers from '../components/home/Customers'
import DemoSection from '../components/home/DemoSection'
import Hero from '../components/home/Hero'
import IndustriesStrip from '../components/home/IndustriesStrip'
import PlatformPillars from '../components/home/PlatformPillars'
import Resources from '../components/home/Resources'
import Stats from '../components/home/Stats'
import WhySmartwatch from '../components/home/WhySmartwatch'
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
      {/* The hero pins while the platform band scrolls up over it; the wrapper bounds the pin. */}
      <div className={s.stage}>
        <Hero />
        <PlatformPillars />
      </div>
      <Stats />
      <Customers />
      <WhySmartwatch />
      <IndustriesStrip />
      <Resources />
      <DemoSection />
      <div className={s.disclaimer}>
        <div className="container">{site.disclaimer}</div>
      </div>
    </div>
  )
}

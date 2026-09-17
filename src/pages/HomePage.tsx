import Customers from '../components/home/Customers'
import DemoSection from '../components/home/DemoSection'
import Hero from '../components/home/Hero'
import IndustriesStrip from '../components/home/IndustriesStrip'
import PlatformPillars from '../components/home/PlatformPillars'
import Resources from '../components/home/Resources'
import Stats from '../components/home/Stats'
import WhySmartwatch from '../components/home/WhySmartwatch'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <PlatformPillars />
      <Customers />
      <WhySmartwatch />
      <IndustriesStrip />
      <Resources />
      <DemoSection />
    </>
  )
}

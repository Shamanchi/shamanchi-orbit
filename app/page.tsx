import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Physics from '@/components/Physics'
import OrbitMap from '@/components/OrbitMap'
import Process from '@/components/Process'
import Marquee from '@/components/Marquee'
import Works from '@/components/Works'
import Proof from '@/components/Proof'
import Metrics from '@/components/Metrics'
import Principles from '@/components/Principles'
import Pricing from '@/components/Pricing'
import Audit from '@/components/Audit'
import Footer from '@/components/Footer'
import MotionProvider from '@/components/MotionProvider'
import SmoothScroll from '@/components/SmoothScroll'
import SectionNav from '@/components/SectionNav'

export default function Home() {
  return (
    <MotionProvider>
      <SmoothScroll>
        <Navbar />
        <main className="relative overflow-x-clip">
          <Hero />
          <Physics />
          <OrbitMap />
          <Process />
          <Marquee />
          <Works />
          <Proof />
          <Metrics />
          <Principles />
          <Pricing />
          <Audit />
        </main>
        <Footer />
        <SectionNav />
      </SmoothScroll>
    </MotionProvider>
  )
}

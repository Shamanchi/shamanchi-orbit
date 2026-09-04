import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Physics from '@/components/Physics'
import OrbitMap from '@/components/OrbitMap'
import Process from '@/components/Process'
import Works from '@/components/Works'
import Metrics from '@/components/Metrics'
import Principles from '@/components/Principles'
import Pricing from '@/components/Pricing'
import Audit from '@/components/Audit'
import Footer from '@/components/Footer'
import MotionProvider from '@/components/MotionProvider'

export default function Home() {
  return (
    <MotionProvider>
      <Navbar />
      <main className="relative overflow-x-clip">
        <Hero />
        <Physics />
        <OrbitMap />
        <Process />
        <Works />
        <Metrics />
        <Principles />
        <Pricing />
        <Audit />
      </main>
      <Footer />
    </MotionProvider>
  )
}
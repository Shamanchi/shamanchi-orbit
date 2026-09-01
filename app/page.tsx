import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Pain from '@/components/Pain'
import Process from '@/components/Process'
import Works from '@/components/Works'
import WhyMe from '@/components/WhyMe'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'
import ParticlesBackground from '@/components/ParticlesBackground'
import CursorGlow from '@/components/CursorGlow'
import LiveStats from '@/components/LiveStats'
import ROICalculator from '@/components/ROICalculator'
import Analytics from '@/components/Analytics'

export default function Home() {
  return (
    <main className="min-h-screen bg-orbit-bg text-white overflow-x-hidden relative">
      <Analytics />
      <ParticlesBackground />
      <CursorGlow />
      <Navbar />
      <Hero />
      <Pain />
      <LiveStats />
      <Process />
      <ROICalculator />
      <Works />
      <WhyMe />
      <Pricing />
      <Footer />
    </main>
  )
}

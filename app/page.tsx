import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Pain from '@/components/Pain'
import LiveStats from '@/components/LiveStats'
import RoundTable from '@/components/RoundTable'
import Cases from '@/components/Cases'
import Testimonials from '@/components/Testimonials'
import ComparisonTable from '@/components/ComparisonTable'
import About from '@/components/About'
import EmailCapture from '@/components/EmailCapture'
import FOMO from '@/components/FOMO'
import Process from '@/components/Process'
import ROICalculator from '@/components/ROICalculator'
import Works from '@/components/Works'
import WhyMe from '@/components/WhyMe'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'
import OrbitalSystem from '@/components/OrbitalSystem'
import CursorGlow from '@/components/CursorGlow'
import Analytics from '@/components/Analytics'

export default function Home() {
  return (
    <main className="min-h-screen bg-orbit-bg text-white overflow-x-hidden relative">
      <Analytics />
      <OrbitalSystem />
      <CursorGlow />
      <Navbar />
      <Hero />
      <Pain />
      <LiveStats />
      <RoundTable />
      <Cases />
      <Testimonials />
      <ComparisonTable />
      <About />
      <EmailCapture />
      <FOMO />
      <Process />
      <ROICalculator />
      <Works />
      <WhyMe />
      <Pricing />
      <Footer />
    </main>
  )
}

import { LandingHeader } from "@/components/landing/landing-header"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Trust } from "@/components/landing/trust"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        <Hero />
        <Features />
        <Trust />
      </main>
      <LandingFooter />
    </div>
  )
}

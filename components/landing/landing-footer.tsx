import { BrandLogo } from "@/components/brand/logo"

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row">
          <div className="max-w-sm">
            <BrandLogo size="md" />
            <p className="mt-3 text-sm text-muted-foreground">
              An AI-powered business advisory platform helping rural micro-entrepreneurs make confident, evidence-backed
              decisions before borrowing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-2 font-semibold text-foreground">Platform</p>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>Business Assessment</li>
                <li>Market Intelligence</li>
                <li>Financial Plan</li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-semibold text-foreground">Support</p>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>Government Schemes</li>
                <li>Helpline 1800-000-000</li>
                <li>Help Center</li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-semibold text-foreground">About</p>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>Digital India</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          Smart India Hackathon 2026 · UdyamSetu AI. A demonstration prototype with illustrative data.
        </div>
      </div>
    </footer>
  )
}

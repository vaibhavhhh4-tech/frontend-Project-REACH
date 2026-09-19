"use client"

import { Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/ui/progress-bar"
import { AiEstimate } from "@/components/shared/ai-estimate"
import { scoreTone } from "@/components/shared/status-badge"
import { useI18n } from "@/lib/i18n"
import { alternatives, type AlternativeFactor } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const factorLabels: { key: keyof AlternativeFactor; label: string }[] = [
  { key: "demand", label: "Demand" },
  { key: "competition", label: "Competition" },
  { key: "capitalFit", label: "Capital Fit" },
  { key: "risk", label: "Risk" },
]

export default function AlternativesPage() {
  const { t } = useI18n()
  const ranked = [...alternatives].sort((a, b) => b.score - a.score)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">{t("nav.alternatives")}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Business Alternatives
          </h1>
          <p className="mt-1.5 max-w-2xl text-muted-foreground">
            Other businesses suited to your location and capital, ranked on the same evidence-based factors as your
            assessment.
          </p>
        </div>
        <AiEstimate confidence={71} />
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-border bg-accent/40 p-4">
        <Info className="mt-0.5 size-5 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          These scores are not arbitrary. Each is built from four measurable factors — demand, competition, capital
          fit and risk — using the same local data as your main analysis.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ranked.map((alt, index) => (
          <Card key={alt.id} className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-sm font-bold text-muted-foreground">
                  {index + 1}
                </span>
                <div>
                  <p className="text-lg font-semibold text-foreground">{alt.name}</p>
                  {index === 0 && <Badge variant="success">Best match</Badge>}
                </div>
              </div>
              <div className="text-right">
                <p className={cn("text-2xl font-bold tabular-nums", scoreTone(alt.score))}>{alt.score}</p>
                <p className="text-xs text-muted-foreground">of 100</p>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{alt.summary}</p>

            <div className="mt-4 space-y-3">
              {factorLabels.map((f) => (
                <ProgressBar key={f.key} label={f.label} value={alt.factors[f.key]} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import { ArrowUpRight, ArrowDownRight, Minus, Database, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ActionLink } from "@/components/ui/action"
import { ProgressBar } from "@/components/ui/progress-bar"
import { ScoreRing } from "@/components/ui/charts"
import { Disclosure } from "@/components/shared/disclosure"
import { ConfidenceMeter } from "@/components/shared/ai-estimate"
import { StatusBadge } from "@/components/shared/status-badge"
import { useI18n } from "@/lib/i18n"
import { analysisSummary, scoreFactors, whyThisScore, dataSources, assumptions } from "@/lib/mock-data"

const impactMeta = {
  positive: { icon: ArrowUpRight, cls: "text-success", badge: "success" as const, label: "Boosts score" },
  negative: { icon: ArrowDownRight, cls: "text-destructive", badge: "danger" as const, label: "Lowers score" },
  neutral: { icon: Minus, cls: "text-muted-foreground", badge: "outline" as const, label: "Neutral" },
}

export default function AnalysisPage() {
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">{t("nav.analysis")}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {analysisSummary.businessName}
        </h1>
        <p className="mt-1.5 text-muted-foreground">
          {analysisSummary.category} · {analysisSummary.location}
        </p>
      </div>

      {/* Headline score */}
      <Card>
        <CardContent className="flex flex-col items-center gap-6 pt-6 sm:flex-row sm:gap-8">
          <ScoreRing value={analysisSummary.overallScore} label="of 100" />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Overall Business Viability
            </p>
            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row sm:items-center">
              <StatusBadge status={analysisSummary.recommendation} />
              <ConfidenceMeter value={analysisSummary.confidence} />
            </div>
            <p className="mt-3 max-w-lg text-sm text-muted-foreground">
              This business can succeed at your location with a few adjustments to loan size and operations.
              Review the factors below before you borrow.
            </p>
          </div>
          <ActionLink href="/reports" variant="outline" className="shrink-0">
            <FileText />
            View full report
          </ActionLink>
        </CardContent>
      </Card>

      {/* Factor cards */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Score breakdown
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {scoreFactors.map((f) => (
            <Card key={f.id} className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-semibold text-foreground">{f.label}</p>
                <span className="text-lg font-bold tabular-nums text-foreground">{f.score}</span>
              </div>
              <ProgressBar value={f.score} showValue={false} />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.note}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Why this score */}
      <Card>
        <CardHeader>
          <CardTitle>Why this score?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {whyThisScore.map((w) => {
            const meta = impactMeta[w.impact]
            const Icon = meta.icon
            return (
              <div key={w.id} className="flex items-start gap-3 rounded-xl border border-border p-4">
                <span className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary ${meta.cls}`}>
                  <Icon className="size-4" />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-foreground">{w.factor}</p>
                    <Badge variant={meta.badge}>{meta.label}</Badge>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Data sources & assumptions */}
      <Disclosure title="Data Sources & Assumptions" icon={<Database className="size-5 text-primary" />}>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">Data sources</p>
            <ul className="space-y-3">
              {dataSources.map((d) => (
                <li key={d.id} className="rounded-xl bg-secondary/50 p-3">
                  <p className="text-sm font-medium text-foreground">{d.source}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{d.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">Assumptions</p>
            <ul className="space-y-2">
              {assumptions.map((a, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Disclosure>
    </div>
  )
}

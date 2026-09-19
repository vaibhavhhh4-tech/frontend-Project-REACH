"use client"

import Link from "next/link"
import { ArrowRight, ClipboardCheck, FileText, ChevronRight, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ActionLink } from "@/components/ui/action"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge, scoreTone } from "@/components/shared/status-badge"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import {
  dashboardStats,
  recentAssessments,
  savedReports,
  recommendedActions,
} from "@/lib/mock-data"

export default function DashboardPage() {
  const { t } = useI18n()

  return (
    <div className="space-y-8">
      {/* Welcome + primary CTA */}
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-sm font-medium text-primary">Namaste, Ramesh</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome back to your dashboard
            </h1>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Check whether your business idea is viable in your location before you borrow.
            </p>
          </div>
          <ActionLink href="/assessment" size="lg" className="shrink-0">
            <ClipboardCheck />
            Start a Business Assessment
            <ArrowRight />
          </ActionLink>
        </div>
      </section>

      {/* Quick stats */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Quick statistics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((s) => (
            <StatCard key={s.id} label={s.label} value={s.value} trend={s.trend} changeLabel={s.changeLabel} />
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent assessments */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Recent assessments</CardTitle>
            <Link href="/reports" className="text-sm font-medium text-primary hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentAssessments.map((a) => (
              <Link
                key={a.id}
                href="/analysis"
                className="flex items-center justify-between gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-secondary"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-foreground">{a.businessName}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {a.category} · {a.location}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{a.date}</p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <div className="text-right">
                    <p className={cn("text-xl font-bold tabular-nums", scoreTone(a.score))}>{a.score}</p>
                    <StatusBadge status={a.status} />
                  </div>
                  <ChevronRight className="size-5 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recommended actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              Recommended actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendedActions.map((action) => (
              <div key={action.id} className="rounded-xl border border-border p-4">
                <p className="font-semibold text-foreground">{action.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{action.desc}</p>
                <Link
                  href={action.href}
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {action.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Saved reports */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Saved reports</CardTitle>
          <Link href="/reports" className="text-sm font-medium text-primary hover:underline">
            {t("nav.reports")}
          </Link>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {savedReports.map((r) => (
            <Link
              key={r.id}
              href="/reports"
              className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:bg-secondary"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold text-foreground">{r.title}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {r.location} · {r.pages} pages · {r.createdOn}
                </p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { ArrowRight, Landmark, ShieldCheck, Languages, TrendingUp, MapPin } from "lucide-react"
import { ActionLink } from "@/components/ui/action"
import { ScoreRing } from "@/components/ui/charts"
import { ProgressBar } from "@/components/ui/progress-bar"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"

export function Hero() {
  const { t } = useI18n()
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <Badge variant="info" className="mb-5">
            <ShieldCheck className="size-3.5" />
            A Digital India initiative for rural entrepreneurs
          </Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            {t("brand.tagline")}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{t("landing.intro")}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ActionLink href="/assessment" size="lg">
              {t("common.analyze")}
              <ArrowRight />
            </ActionLink>
            <ActionLink href="/schemes" size="lg" variant="outline">
              <Landmark />
              {t("common.exploreSchemes")}
            </ActionLink>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Languages className="size-4 text-primary" />
            {t("landing.multilingual")}
          </div>
        </div>

        {/* Illustrative result preview card */}
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/5 via-chart-2/5 to-success/5" />
          <div className="rounded-3xl border border-border bg-card p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Business Viability</p>
                <p className="text-lg font-semibold">Amrit Dairy Unit</p>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" /> Rampur, Barabanki
                </p>
              </div>
              <ScoreRing value={78} size={104} strokeWidth={10} label="/ 100" />
            </div>
            <div className="mt-5 space-y-3">
              <ProgressBar label="Demand" value={82} />
              <ProgressBar label="Competition" value={68} />
              <ProgressBar label="Financial Fit" value={73} />
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-success/10 p-3 text-sm text-success">
              <TrendingUp className="size-4" />
              <span className="font-medium">Viable with modifications · 74% confidence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { ShieldCheck, FileSearch, Database, Languages } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const points = [
  { icon: FileSearch, title: "Traceable scores", desc: "Every rating links to the factors and data behind it." },
  { icon: Database, title: "Real data sources", desc: "Census, NABARD, eNAM and open map data — not guesses." },
  { icon: Languages, title: "Built for everyone", desc: "Simple language, voice input and English / हिन्दी support." },
]

export function Trust() {
  const { t } = useI18n()
  return (
    <section className="border-y border-border bg-accent/40">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-success/12 text-success">
            <ShieldCheck className="size-6" />
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t("landing.trust.title")}
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">{t("landing.trust.desc")}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:gap-3">
          {points.map((p) => {
            const Icon = p.icon
            return (
              <div key={p.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <Icon className="mb-3 size-6 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

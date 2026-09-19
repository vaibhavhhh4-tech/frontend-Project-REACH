"use client"

import { MapPinned, Wallet, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n"

const features = [
  { icon: MapPinned, titleKey: "landing.feature1.title", descKey: "landing.feature1.desc" },
  { icon: Wallet, titleKey: "landing.feature2.title", descKey: "landing.feature2.desc" },
  { icon: Sparkles, titleKey: "landing.feature3.title", descKey: "landing.feature3.desc" },
]

export function Features() {
  const { t } = useI18n()
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
      <div className="grid gap-5 md:grid-cols-3">
        {features.map((f) => {
          const Icon = f.icon
          return (
            <Card key={f.titleKey} className="transition-shadow hover:shadow-md">
              <CardContent className="pt-6">
                <span className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">{t(f.titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(f.descKey)}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

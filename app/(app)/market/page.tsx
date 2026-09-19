"use client"

import { Users, Ruler, TrendingUp, IndianRupee, Star, CheckCircle2, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MapPreview } from "@/components/shared/map-preview"
import { AiEstimate } from "@/components/shared/ai-estimate"
import { BarChart, AreaChart } from "@/components/ui/charts"
import { useI18n } from "@/lib/i18n"
import {
  competitors,
  marketMetrics,
  competitionByDistance,
  demandTrend,
  nearbyInfrastructure,
} from "@/lib/mock-data"

const metricCards = [
  { icon: Users, label: "Competitors nearby", value: String(marketMetrics.competitorCount) },
  { icon: Ruler, label: "Customer radius", value: `${marketMetrics.customerRadiusKm} km` },
  { icon: TrendingUp, label: "Demand estimate", value: marketMetrics.demandEstimate },
  { icon: IndianRupee, label: "Price range", value: `₹${marketMetrics.priceRangeMin}–${marketMetrics.priceRangeMax}` },
]

export default function MarketPage() {
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">{t("nav.market")}</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Hyper-Local Market Intelligence
          </h1>
          <p className="mt-1.5 text-muted-foreground">Rampur, Barabanki · within a 5 km catchment</p>
        </div>
        <AiEstimate confidence={marketMetrics.confidence} />
      </div>

      {/* Map + metrics */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Competitor map</CardTitle>
              <CardDescription>Existing dairy suppliers around your location.</CardDescription>
            </div>
            <AiEstimate />
          </CardHeader>
          <CardContent>
            <MapPreview
              height={320}
              caption="Dashed ring = ~5 km customer radius"
              markers={[
                { id: "m1", x: 32, y: 40, label: "Shivam", tone: "primary" },
                { id: "m2", x: 66, y: 30, label: "Gramin", tone: "primary" },
                { id: "m3", x: 60, y: 66, label: "Doodh Bhandar", tone: "primary" },
              ]}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
          {metricCards.map((m) => {
            const Icon = m.icon
            return (
              <Card key={m.label} className="p-5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <p className="mt-3 text-sm text-muted-foreground">{m.label}</p>
                <p className="mt-0.5 text-xl font-bold tabular-nums text-foreground">{m.value}</p>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Competition by distance</CardTitle>
              <CardDescription>Number of competing suppliers per distance band.</CardDescription>
            </div>
            <AiEstimate />
          </CardHeader>
          <CardContent>
            <BarChart data={competitionByDistance} colorIndex={2} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Demand trend</CardTitle>
              <CardDescription>Relative local demand index over 6 months.</CardDescription>
            </div>
            <AiEstimate />
          </CardHeader>
          <CardContent>
            <AreaChart data={demandTrend} />
          </CardContent>
        </Card>
      </div>

      {/* Competitors + infrastructure */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Nearby competitors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {competitors.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-3 rounded-xl border border-border p-4">
                <div>
                  <p className="font-semibold text-foreground">{c.name}</p>
                  <p className="text-sm text-muted-foreground">{c.type}</p>
                </div>
                <div className="text-right">
                  <p className="flex items-center justify-end gap-1 text-sm font-medium text-foreground">
                    <Star className="size-3.5 fill-warning text-warning" />
                    {c.rating}
                  </p>
                  <p className="text-sm text-muted-foreground">{c.distanceKm} km away</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nearby infrastructure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {nearbyInfrastructure.map((i) => (
              <div key={i.id} className="flex items-center justify-between gap-3 rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  {i.available ? (
                    <CheckCircle2 className="size-5 text-success" />
                  ) : (
                    <XCircle className="size-5 text-muted-foreground" />
                  )}
                  <p className="font-medium text-foreground">{i.label}</p>
                </div>
                <p className="text-sm text-muted-foreground">{i.distance}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

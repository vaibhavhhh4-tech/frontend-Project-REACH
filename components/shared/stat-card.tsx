import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { Trend } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const trendIcon = { up: TrendingUp, down: TrendingDown, flat: Minus }
const trendTone = { up: "text-success", down: "text-destructive", flat: "text-muted-foreground" }

export function StatCard({
  label,
  value,
  trend,
  changeLabel,
}: {
  label: string
  value: string
  trend?: Trend
  changeLabel?: string
}) {
  const Icon = trend ? trendIcon[trend] : null
  return (
    <Card className="p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1.5 text-2xl font-bold tabular-nums text-foreground">{value}</p>
      {changeLabel && (
        <p className={cn("mt-1 flex items-center gap-1 text-xs font-medium", trend ? trendTone[trend] : "")}>
          {Icon && <Icon className="size-3.5" />}
          {changeLabel}
        </p>
      )}
    </Card>
  )
}

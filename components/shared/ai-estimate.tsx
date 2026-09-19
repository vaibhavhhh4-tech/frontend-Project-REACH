import { Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function AiEstimate({ confidence }: { confidence?: number }) {
  return (
    <Badge variant="info" className="gap-1">
      <Sparkles className="size-3" />
      AI Estimated{typeof confidence === "number" ? ` · ${confidence}% confidence` : ""}
    </Badge>
  )
}

export function ConfidenceMeter({ value, label = "Confidence" }: { value: number; label?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-semibold tabular-nums text-foreground">{value}%</span>
    </div>
  )
}

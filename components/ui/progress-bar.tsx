import { cn } from "@/lib/utils"

function toneFor(value: number) {
  if (value >= 75) return "bg-success"
  if (value >= 60) return "bg-primary"
  if (value >= 45) return "bg-warning"
  return "bg-destructive"
}

export function ProgressBar({
  value,
  label,
  showValue = true,
  tone,
  className,
}: {
  value: number
  label?: string
  showValue?: boolean
  tone?: string
  className?: string
}) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between gap-2">
          {label && <span className="text-sm font-medium text-foreground">{label}</span>}
          {showValue && <span className="text-sm font-semibold tabular-nums text-muted-foreground">{clamped}</span>}
        </div>
      )}
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", tone ?? toneFor(clamped))}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}

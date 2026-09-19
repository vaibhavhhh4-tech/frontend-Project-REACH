import { cn } from "@/lib/utils"

// Lightweight, dependency-free SVG charts tuned for the government-tech aesthetic.

export function ScoreRing({
  value,
  max = 100,
  size = 132,
  strokeWidth = 12,
  label,
  className,
}: {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  label?: string
  className?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.max(0, Math.min(1, value / max))
  const dash = circumference * pct
  const tone = pct >= 0.75 ? "text-success" : pct >= 0.6 ? "text-primary" : pct >= 0.45 ? "text-warning" : "text-destructive"

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-secondary" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          className={cn("transition-all duration-700", tone)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold tabular-nums">{value}</span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    </div>
  )
}

const barColors = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"]

export function BarChart({
  data,
  height = 180,
  valuePrefix = "",
  className,
  colorIndex,
}: {
  data: { label: string; value: number }[]
  height?: number
  valuePrefix?: string
  className?: string
  colorIndex?: number
}) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end gap-3" style={{ height }}>
        {data.map((d, i) => {
          const h = (d.value / max) * 100
          const color = barColors[colorIndex ?? i % barColors.length]
          return (
            <div key={d.label} className="flex flex-1 flex-col items-center justify-end gap-2">
              <span className="text-xs font-semibold tabular-nums text-foreground">
                {valuePrefix}
                {d.value}
              </span>
              <div className="flex w-full items-end justify-center">
                <div
                  className={cn("w-full max-w-14 rounded-t-lg transition-all duration-500", color)}
                  style={{ height: `${Math.max(h, 3)}%`, minHeight: 4 }}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex gap-3 border-t border-border pt-2">
        {data.map((d) => (
          <span key={d.label} className="flex-1 text-center text-xs text-muted-foreground">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export function AreaChart({
  data,
  height = 180,
  className,
}: {
  data: { label: string; value: number }[]
  height?: number
  className?: string
}) {
  const width = 100
  const max = Math.max(...data.map((d) => d.value), 1)
  const min = Math.min(...data.map((d) => d.value), 0)
  const range = max - min || 1
  const step = width / (data.length - 1 || 1)
  const points = data.map((d, i) => {
    const x = i * step
    const y = 100 - ((d.value - min) / range) * 90 - 5
    return { x, y }
  })
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")
  const area = `${line} L ${width} 100 L 0 100 Z`

  return (
    <div className={cn("w-full", className)}>
      <svg viewBox={`0 0 ${width} 100`} preserveAspectRatio="none" style={{ height }} className="w-full">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#areaFill)" />
        <path d={line} fill="none" stroke="var(--color-chart-2)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.4" fill="var(--color-chart-2)" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="mt-2 flex justify-between border-t border-border pt-2">
        {data.map((d) => (
          <span key={d.label} className="text-xs text-muted-foreground">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export function DonutChart({
  segments,
  size = 160,
  strokeWidth = 26,
  centerLabel,
  centerValue,
}: {
  segments: { label: string; value: number; color: string }[]
  size?: number
  strokeWidth?: number
  centerLabel?: string
  centerValue?: string
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        {segments.map((seg, i) => {
          const frac = seg.value / total
          const dash = frac * circumference
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
            />
          )
          offset += dash
          return el
        })}
      </svg>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && <span className="text-lg font-bold tabular-nums">{centerValue}</span>}
          {centerLabel && <span className="text-xs text-muted-foreground">{centerLabel}</span>}
        </div>
      )}
    </div>
  )
}

export const chartPalette = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

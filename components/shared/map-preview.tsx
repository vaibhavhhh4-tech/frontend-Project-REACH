import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface Marker {
  id: string
  x: number // 0-100 %
  y: number // 0-100 %
  label?: string
  tone?: "primary" | "muted"
}

// Stylized, static map preview. Not a real map — clearly a schematic reference.
export function MapPreview({
  className,
  height = 260,
  center = { x: 50, y: 52 },
  radius = true,
  markers = [],
  caption,
}: {
  className?: string
  height?: number
  center?: { x: number; y: number }
  radius?: boolean
  markers?: Marker[]
  caption?: string
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-secondary/40", className)} style={{ height }}>
      {/* schematic road / grid lines */}
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="mapgrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M8 0H0V8" fill="none" stroke="var(--color-border)" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="60" fill="url(#mapgrid)" />
        <path d="M0 40 Q 30 30 55 44 T 100 38" fill="none" stroke="var(--color-chart-2)" strokeWidth="0.8" opacity="0.6" />
        <path d="M22 0 Q 30 30 20 60" fill="none" stroke="var(--color-border)" strokeWidth="0.8" />
        <path d="M70 0 Q 62 34 80 60" fill="none" stroke="var(--color-border)" strokeWidth="0.8" />
        <path d="M0 18 H100" stroke="var(--color-border)" strokeWidth="0.6" opacity="0.7" />
        <ellipse cx="82" cy="12" rx="10" ry="6" fill="var(--color-chart-3)" opacity="0.14" />
        <ellipse cx="15" cy="50" rx="9" ry="5" fill="var(--color-chart-3)" opacity="0.14" />
      </svg>

      {/* customer radius */}
      {radius && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/40 bg-primary/5"
          style={{ left: `${center.x}%`, top: `${center.y}%`, width: "58%", height: "70%" }}
        />
      )}

      {/* competitor / poi markers */}
      {markers.map((m) => (
        <div
          key={m.id}
          className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
          style={{ left: `${m.x}%`, top: `${m.y}%` }}
        >
          <MapPin
            className={cn("size-5 drop-shadow", m.tone === "muted" ? "text-muted-foreground" : "text-chart-2")}
            fill="currentColor"
          />
          {m.label && <span className="mt-0.5 rounded bg-card/90 px-1 text-[10px] font-medium text-foreground shadow-sm">{m.label}</span>}
        </div>
      ))}

      {/* center marker */}
      <div
        className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
        style={{ left: `${center.x}%`, top: `${center.y}%` }}
      >
        <span className="relative flex size-6 items-center justify-center">
          <span className="absolute inline-flex size-6 animate-ping rounded-full bg-primary/30" />
          <MapPin className="relative size-6 text-primary" fill="currentColor" />
        </span>
      </div>

      {caption && (
        <div className="absolute bottom-2 left-2 rounded-lg bg-card/90 px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
          {caption}
        </div>
      )}
    </div>
  )
}

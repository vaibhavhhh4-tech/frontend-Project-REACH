import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  const pct = (current / (steps.length - 1)) * 100
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">
          Step {current + 1} of {steps.length}
        </p>
        <p className="text-sm text-muted-foreground">{steps[current]}</p>
      </div>
      {/* Mobile: simple progress bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary sm:hidden">
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      {/* Desktop: labelled steps */}
      <ol className="hidden items-center gap-2 sm:flex">
        {steps.map((label, i) => {
          const done = i < current
          const active = i === current
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    done && "bg-success text-white",
                    active && "bg-primary text-primary-foreground",
                    !done && !active && "bg-secondary text-muted-foreground",
                  )}
                >
                  {done ? <Check className="size-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span className={cn("h-0.5 flex-1 rounded-full", done ? "bg-success" : "bg-border")} />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type Variant = "default" | "success" | "warning" | "danger" | "info" | "outline"

const variants: Record<Variant, string> = {
  default: "bg-secondary text-secondary-foreground",
  success: "bg-success/12 text-success",
  warning: "bg-warning/15 text-warning-foreground",
  danger: "bg-destructive/12 text-destructive",
  info: "bg-primary/10 text-primary",
  outline: "border border-border text-muted-foreground",
}

export function Badge({
  className,
  variant = "default",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}

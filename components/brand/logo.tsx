import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-1/2" xmlns="http://www.w3.org/2000/svg">
        {/* bridge (setu) motif */}
        <path d="M3 15c3-4 6-6 9-6s6 2 9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M3 19h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 19v-3.2M16 19v-3.2M12 19v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export function BrandLogo({
  size = "md",
  showTagline = false,
  tagline,
  name,
  className,
}: {
  size?: "sm" | "md" | "lg"
  showTagline?: boolean
  tagline?: string
  name?: string
  className?: string
}) {
  const markSize = size === "lg" ? "size-11" : size === "sm" ? "size-8" : "size-10"
  const nameSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg"
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoMark className={markSize} />
      <div className="flex flex-col leading-tight">
        <span className={cn("font-bold tracking-tight text-foreground", nameSize)}>{name ?? "UdyamSetu AI"}</span>
        {showTagline && tagline && <span className="text-xs text-muted-foreground">{tagline}</span>}
      </div>
    </div>
  )
}

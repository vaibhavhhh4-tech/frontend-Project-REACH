import { Badge } from "@/components/ui/badge"

export function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "Viable" ? "success" : status === "Viable with modifications" ? "warning" : "danger"
  return <Badge variant={variant}>{status}</Badge>
}

export function scoreTone(score: number) {
  if (score >= 75) return "text-success"
  if (score >= 60) return "text-primary"
  if (score >= 45) return "text-warning-foreground"
  return "text-destructive"
}

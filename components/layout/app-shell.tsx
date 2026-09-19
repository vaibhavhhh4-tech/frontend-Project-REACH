"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  ClipboardCheck,
  MapPinned,
  Wallet,
  Landmark,
  FileText,
  Settings,
  Sparkles,
  Repeat2,
  Menu,
  X,
  HelpCircle,
} from "lucide-react"
import { BrandLogo } from "@/components/brand/logo"
import { LanguageToggle } from "@/components/shared/language-toggle"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard },
  { href: "/assessment", labelKey: "nav.assessment", icon: ClipboardCheck },
  { href: "/analysis", labelKey: "nav.analysis", icon: Sparkles },
  { href: "/market", labelKey: "nav.market", icon: MapPinned },
  { href: "/financial", labelKey: "nav.financial", icon: Wallet },
  { href: "/schemes", labelKey: "nav.schemes", icon: Landmark },
  { href: "/alternatives", labelKey: "nav.alternatives", icon: Repeat2 },
  { href: "/reports", labelKey: "nav.reports", icon: FileText },
  { href: "/settings", labelKey: "nav.settings", icon: Settings },
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { t } = useI18n()
  return (
    <nav className="flex flex-col gap-1">
      {nav.map((item) => {
        const active = pathname === item.href
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/60",
            )}
          >
            <Icon className={cn("size-5 shrink-0", active ? "text-primary" : "text-muted-foreground")} />
            <span>{t(item.labelKey)}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-5">
          <Link href="/">
            <BrandLogo size="md" />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <NavLinks />
        </div>
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-start gap-3 rounded-xl bg-accent/60 p-3">
            <HelpCircle className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Need help?</p>
              <p className="text-xs text-muted-foreground">Call our toll-free helpline 1800-000-000</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} aria-hidden />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-sidebar shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
              <BrandLogo size="sm" />
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-lg p-2 hover:bg-secondary">
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/85 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-lg p-2 hover:bg-secondary lg:hidden"
            >
              <Menu className="size-5" />
            </button>
            <span className="hidden text-sm text-muted-foreground sm:inline">{t("brand.tagline")}</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <div className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 shadow-sm">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                RV
              </span>
              <span className="hidden text-sm font-medium sm:inline">Ramesh V.</span>
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  )
}

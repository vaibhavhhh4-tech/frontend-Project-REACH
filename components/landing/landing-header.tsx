"use client"

import Link from "next/link"
import { BrandLogo } from "@/components/brand/logo"
import { LanguageToggle } from "@/components/shared/language-toggle"
import { ActionLink } from "@/components/ui/action"
import { useI18n } from "@/lib/i18n"

export function LandingHeader() {
  const { t } = useI18n()
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="UdyamSetu AI home">
          <BrandLogo size="md" />
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/schemes"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline"
          >
            {t("nav.schemes")}
          </Link>
          <LanguageToggle />
          <ActionLink href="/dashboard" size="md" className="hidden sm:inline-flex">
            {t("common.getStarted")}
          </ActionLink>
        </div>
      </div>
    </header>
  )
}

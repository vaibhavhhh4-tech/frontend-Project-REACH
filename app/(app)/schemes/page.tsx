"use client"

import { CheckCircle2, XCircle, FileText, IndianRupee, Percent, Calendar, Clock, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Action } from "@/components/ui/action"
import { Disclosure } from "@/components/shared/disclosure"
import { useI18n } from "@/lib/i18n"
import { schemes } from "@/lib/mock-data"

export default function SchemesPage() {
  const { t } = useI18n()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">{t("nav.schemes")}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Government Schemes</h1>
        <p className="mt-1.5 max-w-2xl text-muted-foreground">
          Central and state schemes matched to your business profile, location and requested loan.
        </p>
      </div>

      <Disclosure
        title="Why were these schemes recommended?"
        icon={<Lightbulb className="size-5 text-primary" />}
        defaultOpen
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          We matched your dairy unit (₹2,00,000 loan, rural Barabanki) against scheme rules — sector, loan ceiling,
          location and applicant category. Schemes are ranked by how well their subsidy, tenure and moratorium fit
          your projected cash flow. Eligibility shown here is indicative; final approval rests with the lending bank.
        </p>
      </Disclosure>

      <div className="grid gap-5 lg:grid-cols-2">
        {schemes.map((scheme) => {
          const terms = [
            { icon: IndianRupee, label: "Max loan", value: scheme.maxLoan },
            { icon: Percent, label: "Interest", value: scheme.interestRate },
            { icon: Calendar, label: "Tenure", value: scheme.tenure },
            { icon: Clock, label: "Moratorium", value: scheme.moratorium },
          ]
          return (
            <Card key={scheme.id} className="flex flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-base">{scheme.name}</CardTitle>
                <Badge variant={scheme.eligible ? "success" : "outline"} className="shrink-0">
                  {scheme.eligible ? <CheckCircle2 className="size-3.5" /> : <XCircle className="size-3.5" />}
                  {scheme.eligible ? "Eligible" : "Not eligible"}
                </Badge>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {terms.map((tm) => {
                  const Icon = tm.icon
                  return (
                    <div key={tm.label} className="rounded-xl bg-secondary/50 p-3">
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon className="size-3.5" />
                        {tm.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-foreground">{tm.value}</p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 rounded-xl border border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Why this matches</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{scheme.match}</p>
              </div>

              <div className="mt-4">
                <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                  <FileText className="size-4 text-muted-foreground" />
                  Required documents
                </p>
                <div className="flex flex-wrap gap-2">
                  {scheme.documents.map((doc) => (
                    <Badge key={doc} variant="default">
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-1">
                <Action variant={scheme.eligible ? "primary" : "outline"} className="w-full justify-center">
                  View Details
                </Action>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import { CheckCircle2, TrendingUp, Wallet, Percent, Calendar, Clock, Banknote } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DonutChart, BarChart, chartPalette } from "@/components/ui/charts"
import { useI18n } from "@/lib/i18n"
import { financialPlan, costBreakdown, cashFlow, cashFlowSeries } from "@/lib/mock-data"

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`

export default function FinancialPage() {
  const { t } = useI18n()

  const terms = [
    { icon: Wallet, label: "Own contribution", value: inr(financialPlan.ownContribution) },
    { icon: Banknote, label: "Project cost", value: inr(financialPlan.projectCost) },
    { icon: TrendingUp, label: "Required loan", value: inr(financialPlan.requiredLoan) },
    { icon: Percent, label: "Interest rate", value: `${financialPlan.interestRate}% p.a.` },
    { icon: Calendar, label: "Tenure", value: `${financialPlan.tenureMonths} months` },
    { icon: Clock, label: "Moratorium", value: `${financialPlan.moratoriumMonths} months` },
  ]

  const donutSegments = costBreakdown.map((c, i) => ({
    label: c.label,
    value: c.value,
    color: chartPalette[i % chartPalette.length],
  }))

  const affordable = cashFlow.repaymentCoverage >= 1.5

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-primary">{t("nav.financial")}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Financial Plan</h1>
        <p className="mt-1.5 text-muted-foreground">Structured loan and repayment plan for Amrit Dairy Unit.</p>
      </div>

      {/* Loan terms grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {terms.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.label} className="flex items-center gap-4 p-5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-lg font-bold tabular-nums text-foreground">{item.value}</p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Estimated repayment highlight */}
      <Card className="bg-primary/5">
        <CardContent className="flex flex-col items-start gap-2 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Estimated monthly repayment (EMI)</p>
            <p className="mt-1 text-3xl font-bold tabular-nums text-primary">{inr(financialPlan.estimatedEmi)}</p>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Repayment begins after the {financialPlan.moratoriumMonths}-month moratorium, giving your unit time to
            reach steady output.
          </p>
        </CardContent>
      </Card>

      {/* Breakdown + cash flow */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project cost breakdown</CardTitle>
            <CardDescription>How the total project cost is allocated.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6 sm:flex-row">
            <DonutChart segments={donutSegments} centerValue={inr(financialPlan.projectCost)} centerLabel="Total" />
            <ul className="flex-1 space-y-2">
              {donutSegments.map((s) => (
                <li key={s.label} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2">
                    <span className="size-3 rounded-sm" style={{ backgroundColor: s.color }} />
                    <span className="text-muted-foreground">{s.label}</span>
                  </span>
                  <span className="font-semibold tabular-nums text-foreground">{inr(s.value)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cash flow simulation</CardTitle>
            <CardDescription>Quarterly revenue, operating cost and surplus.</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={cashFlowSeries.map((q) => ({ label: q.label, value: Math.round(q.surplus / 1000) }))}
              valuePrefix="₹"
              colorIndex={0}
            />
            <p className="mt-2 text-center text-xs text-muted-foreground">Surplus per quarter (₹ thousands)</p>
          </CardContent>
        </Card>
      </div>

      {/* Cash flow figures */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly cash flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Revenue", value: inr(cashFlow.monthlyRevenue), tone: "text-foreground" },
              { label: "Operating costs", value: inr(cashFlow.monthlyOperatingCost), tone: "text-foreground" },
              { label: "Monthly surplus", value: inr(cashFlow.monthlySurplus), tone: "text-success" },
              { label: "Loan repayment", value: inr(cashFlow.monthlyRepayment), tone: "text-foreground" },
            ].map((f) => (
              <div key={f.label} className="rounded-xl border border-border p-4">
                <p className="text-sm text-muted-foreground">{f.label}</p>
                <p className={`mt-1 text-xl font-bold tabular-nums ${f.tone}`}>{f.value}</p>
              </div>
            ))}
          </div>

          {/* Affordability indicator */}
          <div className="mt-5 flex flex-col gap-3 rounded-xl border border-border bg-secondary/40 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className={affordable ? "size-6 text-success" : "size-6 text-warning"} />
              <div>
                <p className="font-semibold text-foreground">
                  {affordable ? "Affordable" : "Tight — review loan size"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Your surplus covers the repayment {cashFlow.repaymentCoverage}× over.
                </p>
              </div>
            </div>
            <Badge variant={affordable ? "success" : "warning"}>
              Repayment coverage {cashFlow.repaymentCoverage}×
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

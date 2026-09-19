"use client"

import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, ArrowRight, LogOut, MapPin, Wallet, Lightbulb, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Field, Input, Select, Textarea } from "@/components/ui/form"
import { ActionButton } from "@/components/ui/action"
import { Stepper } from "@/components/assessment/stepper"
import { VoiceButton } from "@/components/shared/voice-button"
import { MapPreview } from "@/components/shared/map-preview"
import { useI18n } from "@/lib/i18n"
import { BUSINESS_IDEA_STORAGE_KEY } from "@/components/landing/business-idea-cta"
import {
  states,
  districtsByState,
  blocks,
  villages,
  businessCategories,
  experienceLevels,
  infrastructureOptions,
  customerOptions,
} from "@/lib/mock-data"

interface FormState {
  state: string
  district: string
  block: string
  village: string
  ownCapital: string
  additionalInvestment: string
  loanAmount: string
  category: string
  businessName: string
  description: string
  experience: string
  infrastructure: string[]
  customers: string[]
}

const initial: FormState = {
  state: "Uttar Pradesh",
  district: "Barabanki",
  block: "Haidergarh",
  village: "Rampur",
  ownCapital: "60000",
  additionalInvestment: "0",
  loanAmount: "200000",
  category: "Dairy",
  businessName: "",
  description: "",
  experience: "Less than 1 year",
  infrastructure: ["Own land / shop", "Electricity connection"],
  customers: ["Local villagers"],
}

const stepIcons = [MapPin, Wallet, Lightbulb, Info]

export default function AssessmentPage() {
  const { t } = useI18n()
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(initial)

  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = sessionStorage.getItem(BUSINESS_IDEA_STORAGE_KEY)
    if (!saved) return
    setForm((f) => (f.description ? f : { ...f, description: saved }))
    sessionStorage.removeItem(BUSINESS_IDEA_STORAGE_KEY)
  }, [])

  const steps = ["Location", "Financial Capacity", "Business Idea", "Additional Info"]
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((f) => ({ ...f, [key]: value }))
  const toggle = (key: "infrastructure" | "customers", value: string) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }))

  const districts = useMemo(() => districtsByState[form.state] ?? [], [form.state])
  const StepIcon = stepIcons[step]

  const next = () => (step < steps.length - 1 ? setStep(step + 1) : router.push("/analysis"))
  const back = () => step > 0 && setStep(step - 1)

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{t("nav.assessment")}</h1>
        <p className="mt-1.5 text-muted-foreground">
          Answer a few questions about your location, capital and business idea. It takes about 3 minutes.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Stepper steps={steps} current={step} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <StepIcon className="size-5" />
            </span>
            {steps[step]}
          </CardTitle>
          <CardDescription>
            {step === 0 && "Where will your business operate? This shapes the local market analysis."}
            {step === 1 && "Tell us how much you can invest and how much you plan to borrow."}
            {step === 2 && "What business are you considering?"}
            {step === 3 && "A little more context helps us refine the recommendation."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Step 1: Location */}
          {step === 0 && (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="State" htmlFor="state">
                  <Select id="state" value={form.state} onChange={(e) => { set("state", e.target.value); set("district", districtsByState[e.target.value]?.[0] ?? "") }}>
                    {states.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </Select>
                </Field>
                <Field label="District" htmlFor="district">
                  <Select id="district" value={form.district} onChange={(e) => set("district", e.target.value)}>
                    {districts.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </Select>
                </Field>
                <Field label="Block" htmlFor="block">
                  <Select id="block" value={form.block} onChange={(e) => set("block", e.target.value)}>
                    {blocks.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </Select>
                </Field>
                <Field label="Village" htmlFor="village">
                  <Select id="village" value={form.village} onChange={(e) => set("village", e.target.value)}>
                    {villages.map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </Select>
                </Field>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">Location preview</p>
                <MapPreview caption={`${form.village}, ${form.block}, ${form.district}`} />
              </div>
            </>
          )}

          {/* Step 2: Financial capacity */}
          {step === 1 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Available own capital (₹)" htmlFor="ownCapital" hint="Money you can invest yourself.">
                <Input id="ownCapital" inputMode="numeric" value={form.ownCapital} onChange={(e) => set("ownCapital", e.target.value)} />
              </Field>
              <Field label="Expected additional investment (₹)" htmlFor="addInvest" hint="From family or partners, if any.">
                <Input id="addInvest" inputMode="numeric" value={form.additionalInvestment} onChange={(e) => set("additionalInvestment", e.target.value)} />
              </Field>
              <Field label="Preferred loan amount (₹)" htmlFor="loan" hint="How much you want to borrow." className="sm:col-span-2">
                <Input id="loan" inputMode="numeric" value={form.loanAmount} onChange={(e) => set("loanAmount", e.target.value)} />
              </Field>
              <div className="rounded-xl border border-border bg-accent/40 p-4 text-sm sm:col-span-2">
                <p className="font-medium text-foreground">Total project capacity</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-primary">
                  ₹{(Number(form.ownCapital || 0) + Number(form.additionalInvestment || 0) + Number(form.loanAmount || 0)).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Business idea */}
          {step === 2 && (
            <div className="space-y-5">
              <Field label="Business category" htmlFor="category">
                <Select id="category" value={form.category} onChange={(e) => set("category", e.target.value)}>
                  {businessCategories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>
              <Field
                label="Business name / type"
                htmlFor="bizName"
                action={<VoiceButton size="sm" onResult={(txt) => set("businessName", txt)} />}
              >
                <Input id="bizName" placeholder="e.g. Amrit Dairy Unit" value={form.businessName} onChange={(e) => set("businessName", e.target.value)} />
              </Field>
              <Field
                label="Description (optional)"
                htmlFor="desc"
                hint="Describe your plan in your own words."
                action={<VoiceButton size="sm" onResult={(txt) => set("description", txt)} />}
              >
                <Textarea id="desc" placeholder="e.g. I want to start a small dairy with 4 cows and sell milk locally." value={form.description} onChange={(e) => set("description", e.target.value)} />
              </Field>
            </div>
          )}

          {/* Step 4: Additional info */}
          {step === 3 && (
            <div className="space-y-6">
              <Field label="Experience in this business" htmlFor="exp">
                <Select id="exp" value={form.experience} onChange={(e) => set("experience", e.target.value)}>
                  {experienceLevels.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </Select>
              </Field>
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">Available infrastructure</p>
                <div className="flex flex-wrap gap-2">
                  {infrastructureOptions.map((opt) => {
                    const active = form.infrastructure.includes(opt)
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggle("infrastructure", opt)}
                        aria-pressed={active}
                        className={
                          "rounded-full border px-3.5 py-2 text-sm font-medium transition-colors " +
                          (active ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/50")
                        }
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">Target customers</p>
                <div className="flex flex-wrap gap-2">
                  {customerOptions.map((opt) => {
                    const active = form.customers.includes(opt)
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggle("customers", opt)}
                        aria-pressed={active}
                        className={
                          "rounded-full border px-3.5 py-2 text-sm font-medium transition-colors " +
                          (active ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/50")
                        }
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {step > 0 && (
            <ActionButton variant="outline" onClick={back}>
              <ArrowLeft />
              {t("common.back")}
            </ActionButton>
          )}
          <ActionButton variant="ghost" onClick={() => router.push("/dashboard")}>
            <LogOut />
            {t("common.saveExit")}
          </ActionButton>
        </div>
        <ActionButton onClick={next} size="lg">
          {step === steps.length - 1 ? "Run AI Analysis" : t("common.continue")}
          <ArrowRight />
        </ActionButton>
      </div>
    </div>
  )
}

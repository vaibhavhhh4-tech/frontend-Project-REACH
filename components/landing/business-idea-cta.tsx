"use client"

import { useEffect, useId, useState } from "react"
import { useRouter } from "next/navigation"
import { Lightbulb, X } from "lucide-react"
import { ActionButton } from "@/components/ui/action"
import { Field, Textarea } from "@/components/ui/form"
import { useI18n } from "@/lib/i18n"

export const BUSINESS_IDEA_STORAGE_KEY = "udyamsetu-business-idea"

export function BusinessIdeaCta() {
  const { t } = useI18n()
  const router = useRouter()
  const textareaId = useId()
  const errorId = useId()
  const [open, setOpen] = useState(false)
  const [idea, setIdea] = useState("")
  const [error, setError] = useState<string | null>(null)

  const close = () => {
    setOpen(false)
    setError(null)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const submit = () => {
    const trimmed = idea.trim()
    if (!trimmed) {
      setError("Please describe your business idea to continue.")
      return
    }
    setError(null)
    sessionStorage.setItem(BUSINESS_IDEA_STORAGE_KEY, trimmed)
    close()
    router.push("/assessment")
  }

  return (
    <>
      <ActionButton type="button" size="lg" variant="secondary" onClick={() => setOpen(true)}>
        <Lightbulb />
        {t("common.describeIdea")}
      </ActionButton>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-foreground/40"
            onClick={close}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="business-idea-title"
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-lg"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
              <div>
                <h2 id="business-idea-title" className="text-lg font-semibold leading-tight tracking-tight">
                  {t("common.describeIdea")}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Tell us what you want to start. We will use this in your business assessment.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex size-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-5" />
              </button>
            </div>

            <form
              className="flex flex-col gap-5 p-5 sm:p-6"
              onSubmit={(e) => {
                e.preventDefault()
                submit()
              }}
            >
              <Field label="Your business idea" htmlFor={textareaId}>
                <Textarea
                  id={textareaId}
                  value={idea}
                  rows={5}
                  autoFocus
                  placeholder={t("landing.ideaPlaceholder")}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  onChange={(e) => {
                    setIdea(e.target.value)
                    if (error) setError(null)
                  }}
                />
              </Field>
              {error && (
                <p id={errorId} role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <ActionButton type="button" variant="outline" onClick={close} className="w-full sm:w-auto">
                  Cancel
                </ActionButton>
                <ActionButton type="submit" size="lg" className="w-full sm:w-auto">
                  {t("common.continue")}
                </ActionButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

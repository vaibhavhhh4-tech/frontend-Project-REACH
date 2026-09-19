"use client"

import { useEffect, useId, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Lightbulb, X } from "lucide-react"
import { ActionButton } from "@/components/ui/action"
import { Field, Textarea } from "@/components/ui/form"
import { useI18n } from "@/lib/i18n"

export const BUSINESS_IDEA_STORAGE_KEY = "udyamsetu-business-idea"

export function BusinessIdeaCta() {
  const { t } = useI18n()
  const router = useRouter()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const textareaId = useId()
  const errorId = useId()
  const [open, setOpen] = useState(false)
  const [idea, setIdea] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open) {
      if (!dialog.open) dialog.showModal()
    } else if (dialog.open) {
      dialog.close()
    }
  }, [open])

  const close = () => {
    setOpen(false)
    setError(null)
  }

  const submit = () => {
    const trimmed = idea.trim()
    if (!trimmed) {
      setError("Please describe your business idea to continue.")
      return
    }
    setError(null)
    if (typeof window !== "undefined") {
      sessionStorage.setItem(BUSINESS_IDEA_STORAGE_KEY, trimmed)
    }
    close()
    router.push("/assessment")
  }

  return (
    <>
      <ActionButton type="button" size="lg" variant="secondary" onClick={() => setOpen(true)}>
        <Lightbulb />
        {t("common.describeIdea")}
      </ActionButton>

      <dialog
        ref={dialogRef}
        aria-labelledby="business-idea-title"
        onClose={close}
        onCancel={(e) => {
          e.preventDefault()
          close()
        }}
        className="fixed inset-0 z-50 m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-border bg-card p-0 text-card-foreground shadow-lg backdrop:bg-foreground/40 open:flex open:flex-col"
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
      </dialog>
    </>
  )
}

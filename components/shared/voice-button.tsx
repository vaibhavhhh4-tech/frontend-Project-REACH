"use client"

import { Mic, MicOff } from "lucide-react"
import { useState } from "react"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

// A voice input affordance. Uses the Web Speech API when available and
// gracefully degrades to a visual-only toggle otherwise.
export function VoiceButton({
  onResult,
  size = "md",
  className,
}: {
  onResult?: (text: string) => void
  size?: "sm" | "md"
  className?: string
}) {
  const { t, lang } = useI18n()
  const [listening, setListening] = useState(false)
  const dim = size === "sm" ? "size-8" : "size-10"

  const handleClick = () => {
    if (typeof window === "undefined") return
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition

    if (!SpeechRecognition) {
      // No support: just toggle a brief visual state so the affordance still responds.
      setListening(true)
      setTimeout(() => setListening(false), 1200)
      return
    }

    const RecognitionCtor = SpeechRecognition as new () => {
      lang: string
      interimResults: boolean
      onresult: (e: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void
      onend: () => void
      start: () => void
    }
    const recognition = new RecognitionCtor()
    recognition.lang = lang === "hi" ? "hi-IN" : "en-IN"
    recognition.interimResults = false
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript
      onResult?.(text)
    }
    recognition.onend = () => setListening(false)
    setListening(true)
    recognition.start()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t("common.voiceInput")}
      aria-pressed={listening}
      title={listening ? t("common.listening") : t("common.voiceInput")}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        dim,
        listening
          ? "border-primary bg-primary text-primary-foreground animate-pulse"
          : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary",
        className,
      )}
    >
      {listening ? <Mic className="size-4" /> : <MicOff className="size-4" />}
      <span className="sr-only">{listening ? t("common.listening") : t("common.voiceInput")}</span>
    </button>
  )
}

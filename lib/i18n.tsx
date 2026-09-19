"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Lang = "en" | "hi"

type Dict = Record<string, { en: string; hi: string }>

// Centralized translation dictionary. Keys are namespaced by area.
export const dictionary: Dict = {
  "brand.name": { en: "UdyamSetu AI", hi: "उद्यमसेतु AI" },
  "brand.tagline": {
    en: "Before You Borrow, Know Your Business.",
    hi: "उधार लेने से पहले, अपना व्यवसाय जानें।",
  },
  "common.analyze": { en: "Analyze My Business", hi: "मेरे व्यवसाय का विश्लेषण करें" },
  "common.describeIdea": { en: "Describe your Business Idea", hi: "अपना व्यवसाय विचार बताएँ" },
  "common.exploreSchemes": { en: "Explore Schemes", hi: "योजनाएँ देखें" },
  "common.continue": { en: "Continue", hi: "आगे बढ़ें" },
  "common.back": { en: "Back", hi: "पीछे" },
  "common.saveExit": { en: "Save & Exit", hi: "सहेजें और बाहर" },
  "common.viewDetails": { en: "View Details", hi: "विवरण देखें" },
  "common.downloadPdf": { en: "Download PDF", hi: "PDF डाउनलोड करें" },
  "common.shareReport": { en: "Share Report", hi: "रिपोर्ट साझा करें" },
  "common.aiEstimated": { en: "AI Estimated", hi: "AI अनुमानित" },
  "common.confidence": { en: "Confidence", hi: "विश्वास स्तर" },
  "common.getStarted": { en: "Get Started", hi: "शुरू करें" },
  "common.voiceInput": { en: "Voice input", hi: "आवाज़ इनपुट" },
  "common.listening": { en: "Listening…", hi: "सुन रहे हैं…" },
  "common.language": { en: "Language", hi: "भाषा" },

  "nav.dashboard": { en: "Dashboard", hi: "डैशबोर्ड" },
  "nav.assessment": { en: "Business Assessment", hi: "व्यवसाय मूल्यांकन" },
  "nav.market": { en: "Market Intelligence", hi: "बाज़ार जानकारी" },
  "nav.financial": { en: "Financial Plan", hi: "वित्तीय योजना" },
  "nav.schemes": { en: "Government Schemes", hi: "सरकारी योजनाएँ" },
  "nav.analysis": { en: "AI Analysis", hi: "AI विश्लेषण" },
  "nav.alternatives": { en: "Alternatives", hi: "विकल्प" },
  "nav.reports": { en: "Reports", hi: "रिपोर्ट" },
  "nav.settings": { en: "Settings", hi: "सेटिंग्स" },

  "landing.intro": {
    en: "An AI-powered hyper-local business advisory and financial structuring platform for rural micro-entrepreneurs. Understand whether your business is viable in your location before you take a loan.",
    hi: "ग्रामीण सूक्ष्म-उद्यमियों के लिए AI-संचालित स्थानीय व्यवसाय सलाह और वित्तीय संरचना मंच। ऋण लेने से पहले जानें कि आपका व्यवसाय आपके स्थान पर व्यवहार्य है या नहीं।",
  },
  "landing.feature1.title": { en: "Hyper-Local Market Intelligence", hi: "स्थानीय बाज़ार जानकारी" },
  "landing.feature1.desc": {
    en: "Understand demand, competition and customer reach around your exact village or block.",
    hi: "अपने गाँव या ब्लॉक के आसपास माँग, प्रतिस्पर्धा और ग्राहक पहुँच को समझें।",
  },
  "landing.feature2.title": { en: "Financial Structuring", hi: "वित्तीय संरचना" },
  "landing.feature2.desc": {
    en: "Right-size your loan, plan repayments and check affordability with clear cash-flow simulations.",
    hi: "अपने ऋण का सही आकार तय करें, चुकौती की योजना बनाएं और नकदी प्रवाह के साथ वहनीयता जांचें।",
  },
  "landing.feature3.title": { en: "AI Business Advisory", hi: "AI व्यवसाय सलाह" },
  "landing.feature3.desc": {
    en: "Get evidence-backed recommendations and safer business alternatives for your capital.",
    hi: "अपनी पूँजी के लिए प्रमाण-आधारित सिफारिशें और सुरक्षित व्यवसाय विकल्प प्राप्त करें।",
  },
  "landing.trust.title": { en: "Evidence-backed recommendations", hi: "प्रमाण-आधारित सिफारिशें" },
  "landing.trust.desc": {
    en: "Every score and suggestion is traceable to data sources and clearly stated assumptions — no black-box advice.",
    hi: "प्रत्येक स्कोर और सुझाव डेटा स्रोतों और स्पष्ट मान्यताओं से जुड़ा है — कोई गुप्त सलाह नहीं।",
  },
  "landing.multilingual": { en: "Available in English & हिन्दी", hi: "English और हिन्दी में उपलब्ध" },
  "landing.ideaPlaceholder": {
    en: "Describe your business idea...",
    hi: "अपना व्यवसाय विचार लिखें...",
  },
}

type I18nContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en")

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("udyamsetu-lang") as Lang | null) : null
    if (stored === "en" || stored === "hi") setLangState(stored)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    if (typeof window !== "undefined") localStorage.setItem("udyamsetu-lang", l)
  }

  const toggle = () => setLang(lang === "en" ? "hi" : "en")

  const t = (key: string) => {
    const entry = dictionary[key]
    if (!entry) return key
    return entry[lang]
  }

  return <I18nContext.Provider value={{ lang, setLang, toggle, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}

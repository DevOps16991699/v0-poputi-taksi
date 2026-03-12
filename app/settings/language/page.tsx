"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Check,
  Globe
} from "lucide-react"
import Link from "next/link"

const languages = [
  {
    id: "uz",
    label: "O'zbek",
    nativeLabel: "O'zbekcha",
    flag: "🇺🇿"
  },
  {
    id: "ru",
    label: "Rus",
    nativeLabel: "Русский",
    flag: "🇷🇺"
  },
  {
    id: "en",
    label: "Ingliz",
    nativeLabel: "English",
    flag: "🇬🇧"
  },
  {
    id: "kk",
    label: "Qozoq",
    nativeLabel: "Қазақша",
    flag: "🇰🇿"
  },
  {
    id: "tg",
    label: "Tojik",
    nativeLabel: "Тоҷикӣ",
    flag: "🇹🇯"
  }
]

export default function LanguageSettingsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("uz")

  const handleLanguageChange = (langId: string) => {
    setSelectedLanguage(langId)
    // In a real app, this would update the app's locale
  }

  return (
    <MobileLayout showSidebarToggle={false}>
      <div className="flex flex-col min-h-full bg-linear-to-br from-primary/5 to-background">
        {/* Header */}
        <header className="flex items-center gap-4 px-4 py-4 border-b border-border/50">
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-foreground">Til</h1>
            <p className="text-xs text-muted-foreground">Ilova tilini tanlang</p>
          </div>
        </header>

        {/* Language Options */}
        <div className="flex-1 px-6 py-6">
          <div className="bg-background rounded-2xl shadow-lg border border-border/50 overflow-hidden">
            {languages.map((language, index) => (
              <button
                key={language.id}
                onClick={() => handleLanguageChange(language.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 hover:bg-muted transition-colors text-left ${
                  index !== languages.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-2xl">
                  {language.flag}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{language.label}</p>
                  <p className="text-xs text-muted-foreground">{language.nativeLabel}</p>
                </div>
                {selectedLanguage === language.id && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-muted/50 rounded-2xl">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Til haqida</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Tilni o'zgartirish ilovadagi barcha matn va xabarlarni tanlangan tilga o'zgartiradi. 
                  Ba'zi kontent foydalanuvchilar tomonidan kiritilgan bo'lishi mumkin va tarjima qilinmasligi mumkin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

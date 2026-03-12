"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { SmartBackButton } from "@/components/smart-back-button"
import { Button } from "@/components/ui/button"
import {
  Sun,
  Moon,
  Monitor,
  Check
} from "lucide-react"

const themes = [
  {
    id: "light",
    label: "Yorug'",
    description: "Kunduzi ishlatish uchun qulay",
    icon: Sun
  },
  {
    id: "dark",
    label: "Qorong'i",
    description: "Kechasi ko'zni charchatmaydi",
    icon: Moon
  },
  {
    id: "system",
    label: "Tizim",
    description: "Qurilma sozlamalariga moslashadi",
    icon: Monitor
  }
]

export default function AppearanceSettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <MobileLayout showSidebarToggle={false}>
        <div className="flex flex-col min-h-full bg-linear-to-br from-primary/5 to-background">
          <header className="flex items-center gap-4 px-4 py-4 border-b border-border/50">
            <SmartBackButton fallbackUrl="/settings" className="rounded-full" />
            <div>
              <h1 className="text-lg font-bold text-foreground">Ko'rinish</h1>
              <p className="text-xs text-muted-foreground">Tema sozlamalari</p>
            </div>
          </header>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout showSidebarToggle={false}>
      <div className="flex flex-col min-h-full bg-linear-to-br from-primary/5 to-background">
{/* Header */}
          <header className="flex items-center gap-4 px-4 py-4 border-b border-border/50">
            <SmartBackButton fallbackUrl="/settings" className="rounded-full" />
          <div>
            <h1 className="text-lg font-bold text-foreground">Ko'rinish</h1>
            <p className="text-xs text-muted-foreground">Tema sozlamalari</p>
          </div>
        </header>

        {/* Theme Options */}
        <div className="flex-1 px-6 py-6">
          <div className="bg-background rounded-2xl shadow-lg border border-border/50 overflow-hidden">
            {themes.map((themeOption, index) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 hover:bg-muted transition-colors text-left ${
                  index !== themes.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  theme === themeOption.id ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}>
                  <themeOption.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{themeOption.label}</p>
                  <p className="text-xs text-muted-foreground">{themeOption.description}</p>
                </div>
                {theme === themeOption.id && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="mt-6">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              Ko'rinish
            </h2>
            <div className="bg-background rounded-2xl shadow-lg border border-border/50 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20"></div>
                <div className="flex-1">
                  <div className="h-3 w-24 bg-foreground/20 rounded"></div>
                  <div className="h-2 w-16 bg-muted-foreground/20 rounded mt-1"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-muted rounded"></div>
                <div className="h-2 w-4/5 bg-muted rounded"></div>
                <div className="h-2 w-3/5 bg-muted rounded"></div>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="h-8 flex-1 bg-primary rounded-lg"></div>
                <div className="h-8 flex-1 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

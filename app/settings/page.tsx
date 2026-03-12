"use client"

import { useState, useEffect } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import {
  Bell,
  Moon,
  Globe,
  Shield,
  HelpCircle,
  ChevronRight,
  Smartphone,
  Play,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { useSplash } from "@/components/splash-provider"
import { Switch } from "@/components/ui/switch"

const settingsGroups = [
  {
    title: "Ilova",
    items: [
      { icon: Bell, label: "Bildirishnomalar", description: "Push xabarnomalari", href: "/settings/notifications" },
      { icon: Moon, label: "Ko'rinish", description: "Yorug' / Qorong'i rejim", href: "/settings/appearance" },
      { icon: Globe, label: "Til", description: "O'zbek", href: "/settings/language" },
    ],
  },
  {
    title: "Hisob",
    items: [
      { icon: Shield, label: "Maxfiylik", description: "Ma'lumotlar xavfsizligi", href: "/settings/privacy" },
      { icon: Smartphone, label: "Qurilmalar", description: "Ulangan qurilmalar", href: "/settings/devices" },
    ],
  },
  {
    title: "Qo'llab-quvvatlash",
    items: [
      { icon: HelpCircle, label: "Yordam", description: "Ko'p so'raladigan savollar", href: "/settings/help" },
    ],
  },
]

export default function SettingsPage() {
  const { adEnabled, setAdEnabled, showAdNow } = useSplash()

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-full bg-linear-to-br from-primary/5 to-background">
        {/* Header */}
        <header className="px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Sozlamalar
          </h1>
          <p className="text-sm text-muted-foreground">
            Ilova sozlamalarini boshqaring
          </p>
        </header>

        {/* Settings Groups */}
        <div className="flex-1 px-6 pb-6 space-y-6">
          
          {/* Reklama sozlamalari */}
          <div>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              Reklama
            </h2>
            <div className="bg-background rounded-2xl shadow-lg border border-border/50 overflow-hidden">
              {/* Ad toggle */}
              <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Animatsion reklama</p>
                  <p className="text-xs text-muted-foreground">Faolsiz paytda ko'rsatish</p>
                </div>
                <Switch
                  checked={adEnabled}
                  onCheckedChange={setAdEnabled}
                />
              </div>
              
              {/* Show ad now button */}
              <button
                onClick={showAdNow}
                className="flex items-center gap-4 px-4 py-4 hover:bg-muted transition-colors w-full text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Reklamani ko'rish</p>
                  <p className="text-xs text-muted-foreground">Animatsiyani hozir ko'rsatish</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
          {settingsGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                {group.title}
              </h2>
              <div className="bg-background rounded-2xl shadow-lg border border-border/50 overflow-hidden">
                {group.items.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-4 hover:bg-muted transition-colors ${
                      index !== group.items.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* App Version */}
          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground">Poputi Taxi</p>
            <p className="text-xs text-muted-foreground/70">Versiya 1.0.0</p>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

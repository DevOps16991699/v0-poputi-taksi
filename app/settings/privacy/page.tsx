"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  Eye,
  MapPin,
  Phone,
  Star,
  Users,
  Shield,
  Trash2
} from "lucide-react"
import Link from "next/link"

interface PrivacySetting {
  id: string
  icon: React.ElementType
  label: string
  description: string
  enabled: boolean
}

export default function PrivacySettingsPage() {
  const [settings, setSettings] = useState<PrivacySetting[]>([
    {
      id: "profile_visibility",
      icon: Eye,
      label: "Profil ko'rinishi",
      description: "Boshqalar profilingizni ko'rishi",
      enabled: true
    },
    {
      id: "location_sharing",
      icon: MapPin,
      label: "Joylashuvni ulashish",
      description: "Safar vaqtida joylashuvni ko'rsatish",
      enabled: true
    },
    {
      id: "phone_visibility",
      icon: Phone,
      label: "Telefon raqami",
      description: "Haydovchi/yo'lovchiga raqamni ko'rsatish",
      enabled: false
    },
    {
      id: "rating_visibility",
      icon: Star,
      label: "Reyting ko'rinishi",
      description: "Reytingingizni boshqalarga ko'rsatish",
      enabled: true
    },
    {
      id: "activity_status",
      icon: Users,
      label: "Faollik holati",
      description: "Onlayn holatni ko'rsatish",
      enabled: true
    }
  ])

  const toggleSetting = (id: string) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    )
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
            <h1 className="text-lg font-bold text-foreground">Maxfiylik</h1>
            <p className="text-xs text-muted-foreground">Ma'lumotlar xavfsizligi</p>
          </div>
        </header>

        {/* Privacy Settings */}
        <div className="flex-1 px-6 py-6 space-y-6">
          {/* Visibility Settings */}
          <div>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              Ko'rinish sozlamalari
            </h2>
            <div className="bg-background rounded-2xl shadow-lg border border-border/50 overflow-hidden">
              {settings.map((setting, index) => (
                <div
                  key={setting.id}
                  className={`flex items-center gap-4 px-4 py-4 ${
                    index !== settings.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    setting.enabled ? "bg-primary/10" : "bg-muted"
                  }`}>
                    <setting.icon className={`w-5 h-5 ${
                      setting.enabled ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{setting.label}</p>
                    <p className="text-xs text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() => toggleSetting(setting.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Security Info */}
          <div>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              Xavfsizlik
            </h2>
            <div className="bg-background rounded-2xl shadow-lg border border-border/50 overflow-hidden">
              <div className="flex items-center gap-4 px-4 py-4 border-b border-border">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Ma'lumotlar himoyasi</p>
                  <p className="text-xs text-muted-foreground">Sizning ma'lumotlaringiz shifrlangan</p>
                </div>
                <span className="text-xs text-green-500 font-medium">Faol</span>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <h2 className="text-xs font-semibold text-destructive uppercase tracking-wider mb-3 px-1">
              Xavfli zona
            </h2>
            <div className="bg-background rounded-2xl shadow-lg border border-destructive/30 overflow-hidden">
              <button className="w-full flex items-center gap-4 px-4 py-4 hover:bg-destructive/5 transition-colors text-left">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-destructive">Hisobni o'chirish</p>
                  <p className="text-xs text-muted-foreground">Barcha ma'lumotlar o'chiriladi</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}

"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  Bell,
  MessageSquare,
  Car,
  CreditCard,
  Megaphone,
  Shield
} from "lucide-react"
import Link from "next/link"

interface NotificationSetting {
  id: string
  icon: React.ElementType
  label: string
  description: string
  enabled: boolean
}

export default function NotificationsSettingsPage() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "push",
      icon: Bell,
      label: "Push bildirishnomalar",
      description: "Barcha push xabarnomalari",
      enabled: true
    },
    {
      id: "messages",
      icon: MessageSquare,
      label: "Xabarlar",
      description: "Yangi xabarlar haqida xabar berish",
      enabled: true
    },
    {
      id: "rides",
      icon: Car,
      label: "Safar yangiliklari",
      description: "Safar holati o'zgarganda xabar berish",
      enabled: true
    },
    {
      id: "payments",
      icon: CreditCard,
      label: "To'lov bildirnomalari",
      description: "To'lovlar haqida xabar berish",
      enabled: false
    },
    {
      id: "promotions",
      icon: Megaphone,
      label: "Aksiya va takliflar",
      description: "Maxsus takliflar haqida xabar berish",
      enabled: false
    },
    {
      id: "security",
      icon: Shield,
      label: "Xavfsizlik ogohlantirishlari",
      description: "Hisobga kirish va xavfsizlik",
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

  const enableAll = () => {
    setSettings(prev => prev.map(setting => ({ ...setting, enabled: true })))
  }

  const disableAll = () => {
    setSettings(prev => prev.map(setting => ({ ...setting, enabled: false })))
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
            <h1 className="text-lg font-bold text-foreground">Bildirishnomalar</h1>
            <p className="text-xs text-muted-foreground">Xabarnomalarni sozlash</p>
          </div>
        </header>

        {/* Quick Actions */}
        <div className="px-6 py-4 flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 rounded-xl"
            onClick={enableAll}
          >
            Barchasini yoqish
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 rounded-xl"
            onClick={disableAll}
          >
            Barchasini o'chirish
          </Button>
        </div>

        {/* Settings List */}
        <div className="flex-1 px-6 pb-6">
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

          {/* Info */}
          <p className="text-xs text-muted-foreground text-center mt-4 px-4">
            Bildirishnomalarni o'chirish muhim yangilanishlarni o'tkazib yuborishga olib kelishi mumkin
          </p>
        </div>
      </div>
    </MobileLayout>
  )
}

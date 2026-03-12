"use client"

import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import {
  User,
  Phone,
  Car,
  Star,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  Edit2
} from "lucide-react"
import Link from "next/link"

const userStats = [
  { label: "Safarlar", value: 48, icon: MapPin },
  { label: "Reyting", value: "4.8", icon: Star },
  { label: "E'lonlar", value: 12, icon: Car },
]

const menuItems = [
  { icon: Edit2, label: "Profilni tahrirlash", href: "#" },
  { icon: Car, label: "Mening avtomobillarim", href: "#" },
  { icon: Settings, label: "Sozlamalar", href: "/settings" },
]

export default function ProfilePage() {
  return (
    <MobileLayout>
      <div className="flex flex-col min-h-full bg-linear-to-br from-primary/5 to-background">
        {/* Header with Avatar */}
        <div className="relative bg-linear-to-br from-primary to-primary/80 px-6 pt-6 pb-16">
          <h1 className="text-xl font-bold text-primary-foreground mb-6">
            Profil
          </h1>

          {/* User Info Card - Overlapping */}
          <div className="absolute left-6 right-6 -bottom-12 bg-background rounded-2xl p-4 shadow-xl border border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground">Jamshid Karimov</h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  +998 90 123 45 67
                </p>
              </div>
              <div className="px-3 py-1 bg-emerald-500/10 rounded-full">
                <span className="text-xs font-medium text-emerald-600">Faol</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 pt-16 pb-4">
          <div className="grid grid-cols-3 gap-3">
            {userStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-background rounded-2xl p-4 shadow-lg border border-border/50 text-center"
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div className="px-6 py-4">
          <div className="bg-background rounded-2xl shadow-lg border border-border/50 overflow-hidden">
            {menuItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-4 hover:bg-muted transition-colors ${
                  index !== menuItems.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="flex-1 font-medium text-foreground">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="px-6 py-4 mt-auto">
          <Link href="/login">
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-2xl h-14 text-base font-semibold border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Chiqish
            </Button>
          </Link>
        </div>
      </div>
    </MobileLayout>
  )
}

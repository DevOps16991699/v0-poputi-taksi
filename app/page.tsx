"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import {
  Car,
  Users,
  Clock,
  CheckCircle2,
  MapPin,
  Menu,
  Search
} from "lucide-react"
import { PoputiLogo, PoputiLogoIcon } from "@/components/poputi-logo"
import Link from "next/link"

const rideStats = [
  {
    label: "Jami E'lonlar",
    value: 156,
    icon: Car,
    gradient: "from-primary to-primary/70",
    shadow: "shadow-primary/30",
  },
  {
    label: "Faol Safar",
    value: 24,
    icon: MapPin,
    gradient: "from-emerald-500 to-emerald-400",
    shadow: "shadow-emerald-500/30",
  },
  {
    label: "Kutilmoqda",
    value: 8,
    icon: Clock,
    gradient: "from-amber-500 to-amber-400",
    shadow: "shadow-amber-500/30",
  },
  {
    label: "Yakunlangan",
    value: 124,
    icon: CheckCircle2,
    gradient: "from-violet-500 to-violet-400",
    shadow: "shadow-violet-500/30",
  },
]

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <MobileLayout lockScroll={sidebarOpen} sidebar={<AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />}>
      <div className="relative flex flex-col min-h-full bg-linear-to-br from-primary/5 to-background">

        {/* Header with Menu and Logo */}
        <header className="px-6 py-4">
          <div className="bg-background rounded-2xl p-3 shadow-lg border border-border/50 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Menu className="w-5 h-5 text-primary" />
            </button>
            <div className="flex items-center gap-2">
              <PoputiLogoIcon className="w-8 h-8" />
              <div>
                <h1 className="text-base font-bold text-foreground">Poputi</h1>
                <p className="text-muted-foreground text-[10px] -mt-0.5">TAKSI</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 px-6 pb-6">
          {/* Quick Search Bar */}
          <Link href="/search" className="block mb-6">
            <div className="bg-background rounded-2xl p-4 shadow-lg border border-border/50 flex items-center gap-3 hover:border-primary/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Search className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Safar qidirish</p>
                <p className="text-xs text-muted-foreground">Qayerdan - Qayerga?</p>
              </div>
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>

          {/* Role Selection */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-foreground mb-3">
              Siz kim sifatida foydalanasiz?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/driver" className="block">
                <div className="bg-background rounded-2xl p-4 shadow-lg border border-border/50 hover:border-primary/50 hover:shadow-primary/10 transition-all text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-linear-to-br from-primary to-primary/70 flex items-center justify-center mb-2 shadow-lg shadow-primary/30">
                    <Car className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <p className="font-semibold text-foreground">Haydovchi</p>
                  <p className="text-xs text-muted-foreground">E'lon joylash</p>
                </div>
              </Link>
              <Link href="/rides" className="block">
                <div className="bg-background rounded-2xl p-4 shadow-lg border border-border/50 hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-linear-to-br from-emerald-500 to-emerald-400 flex items-center justify-center mb-2 shadow-lg shadow-emerald-500/30">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">Yo'lovchi</p>
                  <p className="text-xs text-muted-foreground">Safar izlash</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Statistics */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-foreground mb-3">
              Statistika
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {rideStats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link href="/rides" className="block">
            <Button
              size="lg"
              className="w-full rounded-2xl h-14 text-base font-semibold shadow-lg shadow-primary/30 bg-primary hover:bg-primary/90"
            >
              Safarlarni ko'rish
            </Button>
          </Link>
        </div>
      </div>
    </MobileLayout>
  )
}

interface StatCardProps {
  label: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  shadow: string
}

function StatCard({ label, value, icon: Icon, gradient, shadow }: StatCardProps) {
  return (
    <div className="bg-background rounded-2xl p-4 shadow-lg border border-border/50 hover:scale-[1.02] transition-transform cursor-pointer">
      <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${gradient} flex items-center justify-center mb-2 shadow-md ${shadow}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

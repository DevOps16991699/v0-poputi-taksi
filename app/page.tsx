"use client"

import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import {
  Car,
  Users,
  Clock,
  CheckCircle2,
  MapPin,
  Search,
  Plus,
  Ticket
} from "lucide-react"
import { PoputiLogo, PoputiLogoIcon } from "@/components/poputi-logo"
import Link from "next/link"
import { useRole } from "@/contexts/role-context"

// Haydovchi uchun statistika
const driverStats = [
  {
    label: "Jami E'lonlar",
    value: 12,
    icon: Car,
    gradient: "from-primary to-primary/70",
    shadow: "shadow-primary/30",
  },
  {
    label: "Faol E'lon",
    value: 3,
    icon: MapPin,
    gradient: "from-emerald-500 to-emerald-400",
    shadow: "shadow-emerald-500/30",
  },
  {
    label: "Kutilmoqda",
    value: 2,
    icon: Clock,
    gradient: "from-amber-500 to-amber-400",
    shadow: "shadow-amber-500/30",
  },
  {
    label: "Yakunlangan",
    value: 7,
    icon: CheckCircle2,
    gradient: "from-sky-500 to-sky-400",
    shadow: "shadow-sky-500/30",
  },
]

// Yo'lovchi uchun statistika
const passengerStats = [
  {
    label: "Band qilingan",
    value: 8,
    icon: Ticket,
    gradient: "from-emerald-500 to-emerald-400",
    shadow: "shadow-emerald-500/30",
  },
  {
    label: "Faol Safar",
    value: 1,
    icon: MapPin,
    gradient: "from-primary to-primary/70",
    shadow: "shadow-primary/30",
  },
  {
    label: "Kutilmoqda",
    value: 2,
    icon: Clock,
    gradient: "from-amber-500 to-amber-400",
    shadow: "shadow-amber-500/30",
  },
  {
    label: "Yakunlangan",
    value: 5,
    icon: CheckCircle2,
    gradient: "from-sky-500 to-sky-400",
    shadow: "shadow-sky-500/30",
  },
]

export default function HomePage() {
  const { role } = useRole()
  
  const stats = role === "driver" ? driverStats : passengerStats
  const isDriver = role === "driver"

  return (
    <MobileLayout>
      <div className="relative flex flex-col min-h-full bg-linear-to-br from-primary/5 to-background">

        {/* Header with Role Badge and Logo */}
        <header className="px-6 py-4">
          <div className="bg-background rounded-2xl p-3 shadow-lg border border-border/50 flex items-center justify-between">
            {/* Role Badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
              isDriver 
                ? "bg-primary/10 text-primary" 
                : "bg-emerald-500/10 text-emerald-600"
            }`}>
              {isDriver ? <Car className="w-3.5 h-3.5" /> : <Users className="w-3.5 h-3.5" />}
              {isDriver ? "Haydovchi" : "Yo'lovchi"}
            </div>
            
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

          {/* Quick Action Card */}
          <Link href={isDriver ? "/driver" : "/search"} className="block mb-6">
            <div className={`bg-background rounded-2xl p-4 shadow-lg border border-border/50 flex items-center gap-3 transition-colors ${
              isDriver ? "hover:border-primary/50" : "hover:border-emerald-500/50"
            }`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDriver ? "bg-primary/10" : "bg-emerald-500/10"
              }`}>
                {isDriver ? (
                  <Plus className={`w-5 h-5 ${isDriver ? "text-primary" : "text-emerald-500"}`} />
                ) : (
                  <Search className="w-5 h-5 text-emerald-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {isDriver ? "Yangi e'lon joylash" : "Safar qidirish"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isDriver ? "Safar ma'lumotlarini kiriting" : "Qayerdan - Qayerga?"}
                </p>
              </div>
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>

          {/* Statistics */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-foreground mb-3">
              {isDriver ? "Mening e'lonlarim" : "Mening safarlarim"}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link href={isDriver ? "/tickets" : "/rides"} className="block">
            <Button
              size="lg"
              className={`w-full rounded-2xl h-14 text-base font-semibold shadow-lg ${
                isDriver 
                  ? "shadow-primary/30 bg-primary hover:bg-primary/90" 
                  : "shadow-emerald-500/30 bg-emerald-500 hover:bg-emerald-500/90"
              }`}
            >
              {isDriver ? "Mening e'lonlarim" : "Safarlarni ko'rish"}
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

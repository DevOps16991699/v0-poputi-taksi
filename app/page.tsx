"use client"

import { useEffect, useRef } from "react"
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
  Ticket,
  Star,
  ArrowRight
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

// Yo'lovchi uchun mavjud safarlar (e'lonlar)
const availableRides = [
  {
    id: 1,
    driver: "Akbar R.",
    from: "Toshkent",
    to: "Samarqand",
    time: "14:00",
    date: "Bugun",
    price: "80,000",
    seats: 3,
    car: "Cobalt",
    rating: 4.8,
  },
  {
    id: 2,
    driver: "Dilshod K.",
    from: "Toshkent",
    to: "Buxoro",
    time: "16:30",
    date: "Bugun",
    price: "120,000",
    seats: 2,
    car: "Gentra",
    rating: 4.9,
  },
  {
    id: 3,
    driver: "Sardor A.",
    from: "Toshkent",
    to: "Farg'ona",
    time: "08:00",
    date: "Ertaga",
    price: "100,000",
    seats: 4,
    car: "Lacetti",
    rating: 4.7,
  },
  {
    id: 4,
    driver: "Bobur T.",
    from: "Toshkent",
    to: "Namangan",
    time: "10:00",
    date: "Ertaga",
    price: "110,000",
    seats: 1,
    car: "Nexia",
    rating: 4.6,
  },
  {
    id: 5,
    driver: "Jasur S.",
    from: "Samarqand",
    to: "Toshkent",
    time: "18:00",
    date: "Bugun",
    price: "85,000",
    seats: 2,
    car: "Spark",
    rating: 4.8,
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

          {/* Quick Action Card - Driver Only */}
          {isDriver && (
            <Link href="/driver" className="block mb-6">
              <div className="bg-background rounded-2xl p-4 shadow-lg border border-border/50 flex items-center gap-3 transition-colors hover:border-primary/50">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10">
                  <Plus className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Yangi e'lon joylash</p>
                  <p className="text-xs text-muted-foreground">Safar ma'lumotlarini kiriting</p>
                </div>
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </div>
            </Link>
          )}

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

          {/* Passenger - Horizontal Scrolling Rides Announcements */}
          {!isDriver && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-foreground">Mavjud safarlar</h3>
                <Link href="/search" className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  Barchasini ko'rish
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <RidesMarquee rides={availableRides} />
            </div>
          )}

          {/* CTA Button */}
          <Link href={isDriver ? "/tickets" : "/my-rides"} className="block">
            <Button
              size="lg"
              className={`w-full rounded-2xl h-14 text-base font-semibold shadow-lg ${
                isDriver 
                  ? "shadow-primary/30 bg-primary hover:bg-primary/90" 
                  : "shadow-emerald-500/30 bg-emerald-500 hover:bg-emerald-500/90"
              }`}
            >
              {isDriver ? "Mening e'lonlarim" : "Mening safarlarim"}
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

// Rides Marquee Component
interface RideAnnouncement {
  id: number
  driver: string
  from: string
  to: string
  time: string
  date: string
  price: string
  seats: number
  car: string
  rating: number
}

function RidesMarquee({ rides }: { rides: RideAnnouncement[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return
    
    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5
    
    const animate = () => {
      scrollPosition += scrollSpeed
      
      // Reset position when first set of items is scrolled out
      const firstSetWidth = scrollContainer.scrollWidth / 2
      if (scrollPosition >= firstSetWidth) {
        scrollPosition = 0
      }
      
      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    
    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate)
    }
    
    scrollContainer.addEventListener("mouseenter", handleMouseEnter)
    scrollContainer.addEventListener("mouseleave", handleMouseLeave)
    
    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter)
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])
  
  // Duplicate rides for seamless loop
  const duplicatedRides = [...rides, ...rides]
  
  return (
    <div 
      ref={scrollRef}
      className="flex gap-3 overflow-hidden"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {duplicatedRides.map((ride, index) => (
        <Link 
          key={`${ride.id}-${index}`} 
          href={`/ride/${ride.id}`}
          className="shrink-0"
        >
          <div className="w-64 bg-background rounded-2xl p-4 shadow-lg border border-border/50 hover:border-emerald-500/50 transition-all hover:shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-emerald-600">
                    {ride.driver.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{ride.driver}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-muted-foreground">{ride.rating}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-medium">
                {ride.date}
              </span>
            </div>
            
            {/* Route */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <div className="w-0.5 h-4 bg-border" />
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{ride.from}</p>
                <p className="text-sm text-muted-foreground">{ride.to}</p>
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {ride.time}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {ride.seats} o'rin
                </span>
              </div>
              <p className="text-sm font-bold text-emerald-600">{ride.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

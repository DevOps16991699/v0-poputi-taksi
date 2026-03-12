"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Navigation,
  Clock,
  Users,
  Car,
  Phone,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"

const myRides = [
  {
    id: 1,
    from: "Toshkent",
    to: "Samarqand",
    date: "Bugun, 14:00",
    seats: 3,
    bookedSeats: 2,
    price: "80,000",
    car: "Cobalt",
    status: "active",
  },
  {
    id: 2,
    from: "Toshkent",
    to: "Buxoro",
    date: "Ertaga, 08:00",
    seats: 4,
    bookedSeats: 1,
    price: "120,000",
    car: "Gentra",
    status: "active",
  },
  {
    id: 3,
    from: "Toshkent",
    to: "Farg'ona",
    date: "12-mart, 10:00",
    seats: 3,
    bookedSeats: 3,
    price: "100,000",
    car: "Lacetti",
    status: "completed",
  },
]

export default function TicketsPage() {
  const activeRides = myRides.filter(r => r.status === "active")
  const completedRides = myRides.filter(r => r.status === "completed")

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-full bg-linear-to-br from-primary/5 to-background">
        {/* Header */}
        <header className="px-6 py-4">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold text-foreground">
              Mening e'lonlarim
            </h1>
            <Link href="/driver">
              <Button size="sm" className="rounded-xl bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-1" />
                Yangi
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Jami {myRides.length} ta e'lon
          </p>
        </header>

        {/* Active Rides */}
        {activeRides.length > 0 && (
          <div className="px-6 mb-4">
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              Faol e'lonlar ({activeRides.length})
            </h2>
            <div className="space-y-3">
              {activeRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          </div>
        )}

        {/* Completed Rides */}
        {completedRides.length > 0 && (
          <div className="px-6 pb-6">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Yakunlangan ({completedRides.length})
            </h2>
            <div className="space-y-3">
              {completedRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {myRides.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Car className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center mb-4">
              Sizda hali e'lonlar yo'q
            </p>
            <Link href="/driver">
              <Button className="rounded-xl bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                E'lon joylash
              </Button>
            </Link>
          </div>
        )}
      </div>
    </MobileLayout>
  )
}

interface Ride {
  id: number
  from: string
  to: string
  date: string
  seats: number
  bookedSeats: number
  price: string
  car: string
  status: string
}

function RideCard({ ride }: { ride: Ride }) {
  const [showMenu, setShowMenu] = useState(false)
  const isCompleted = ride.status === "completed"
  const availableSeats = ride.seats - ride.bookedSeats

  return (
    <div className={`bg-background rounded-2xl p-4 shadow-lg border ${
      isCompleted ? "border-border/30 opacity-75" : "border-border/50"
    }`}>
      {/* Route */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <div className="w-0.5 h-8 bg-border" />
          <div className="w-3 h-3 rounded-full bg-primary" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{ride.from}</p>
          <div className="h-4" />
          <p className="font-semibold text-foreground">{ride.to}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary">{ride.price}</p>
          <p className="text-xs text-muted-foreground">so'm</p>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center gap-4 py-3 border-t border-border">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{ride.date}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Car className="w-4 h-4" />
          <span className="text-sm">{ride.car}</span>
        </div>
      </div>

      {/* Seats & Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-foreground">
            <span className="font-semibold text-primary">{ride.bookedSeats}</span>
            <span className="text-muted-foreground">/{ride.seats} band</span>
          </span>
          {availableSeats > 0 && !isCompleted && (
            <span className="text-xs bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full">
              {availableSeats} bo'sh
            </span>
          )}
        </div>
        
        {!isCompleted && (
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-lg"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
            
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-background rounded-xl shadow-lg border border-border py-1 min-w-[140px] z-10">
                <button className="w-full px-4 py-2 text-sm text-left hover:bg-muted flex items-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Tahrirlash
                </button>
                <button className="w-full px-4 py-2 text-sm text-left hover:bg-muted flex items-center gap-2 text-rose-600">
                  <Trash2 className="w-4 h-4" />
                  O'chirish
                </button>
              </div>
            )}
          </div>
        )}

        {isCompleted && (
          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Yakunlangan
          </span>
        )}
      </div>
    </div>
  )
}

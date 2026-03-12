"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  MapPin,
  Navigation,
  Clock,
  Users,
  Search,
  Car,
  Phone
} from "lucide-react"

const availableRides = [
  {
    id: 1,
    driver: "Akbar Rahimov",
    from: "Toshkent",
    to: "Samarqand",
    date: "Bugun, 14:00",
    seats: 3,
    price: "80,000",
    car: "Cobalt",
  },
  {
    id: 2,
    driver: "Dilshod Karimov",
    from: "Toshkent",
    to: "Buxoro",
    date: "Bugun, 16:30",
    seats: 2,
    price: "120,000",
    car: "Gentra",
  },
  {
    id: 3,
    driver: "Sardor Aliyev",
    from: "Toshkent",
    to: "Farg'ona",
    date: "Ertaga, 08:00",
    seats: 4,
    price: "100,000",
    car: "Lacetti",
  },
  {
    id: 4,
    driver: "Bobur Toshmatov",
    from: "Toshkent",
    to: "Namangan",
    date: "Ertaga, 10:00",
    seats: 1,
    price: "110,000",
    car: "Nexia",
  },
]

export default function RidesPage() {
  const [searchFrom, setSearchFrom] = useState("")
  const [searchTo, setSearchTo] = useState("")

  const filteredRides = availableRides.filter((ride) => {
    const fromMatch = ride.from.toLowerCase().includes(searchFrom.toLowerCase())
    const toMatch = ride.to.toLowerCase().includes(searchTo.toLowerCase())
    return fromMatch && toMatch
  })

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-full bg-linear-to-br from-primary/5 to-background">
        {/* Header */}
        <header className="px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Safarlar
          </h1>
          <p className="text-sm text-muted-foreground">
            Mavjud e'lonlardan safar tanlang
          </p>
        </header>

        {/* Search */}
        <div className="px-6 mb-4">
          <div className="bg-background rounded-2xl p-4 shadow-lg border border-border/50">
            <div className="relative mb-3">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
              <Input
                placeholder="Qayerdan?"
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
                className="pl-10 h-12 rounded-xl border-border"
              />
            </div>
            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <Input
                placeholder="Qayerga?"
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
                className="pl-10 h-12 rounded-xl border-border"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="px-6 mb-3">
          <p className="text-sm text-muted-foreground">
            {filteredRides.length} ta safar topildi
          </p>
        </div>

        {/* Rides List */}
        <div className="flex-1 px-6 pb-6 space-y-3">
          {filteredRides.length > 0 ? (
            filteredRides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-center">
                Safarlar topilmadi
              </p>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  )
}

interface Ride {
  id: number
  driver: string
  from: string
  to: string
  date: string
  seats: number
  price: string
  car: string
}

function RideCard({ ride }: { ride: Ride }) {
  const [showContact, setShowContact] = useState(false)

  return (
    <div className="bg-background rounded-2xl p-4 shadow-lg border border-border/50">
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
          <Users className="w-4 h-4" />
          <span className="text-sm">{ride.seats} joy</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Car className="w-4 h-4" />
          <span className="text-sm">{ride.car}</span>
        </div>
      </div>

      {/* Driver & Action */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {ride.driver.charAt(0)}
            </span>
          </div>
          <span className="text-sm font-medium text-foreground">{ride.driver}</span>
        </div>
        <Button
          size="sm"
          onClick={() => setShowContact(!showContact)}
          className="rounded-xl bg-primary hover:bg-primary/90"
        >
          {showContact ? (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              +998 90 XXX
            </span>
          ) : (
            "Band qilish"
          )}
        </Button>
      </div>
    </div>
  )
}

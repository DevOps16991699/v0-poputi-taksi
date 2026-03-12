"use client"

import { useState, useMemo } from "react"
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
  Phone,
  SlidersHorizontal,
  X,
  Calendar,
  ArrowRight
} from "lucide-react"

const allRides = [
  {
    id: 1,
    driver: "Akbar Rahimov",
    from: "Toshkent",
    to: "Samarqand",
    date: "Bugun, 14:00",
    seats: 3,
    price: "80,000",
    car: "Cobalt",
    phone: "+998 90 123 45 67",
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
    phone: "+998 91 234 56 78",
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
    phone: "+998 93 345 67 89",
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
    phone: "+998 94 456 78 90",
  },
  {
    id: 5,
    driver: "Jasur Sodiqov",
    from: "Samarqand",
    to: "Toshkent",
    date: "Bugun, 18:00",
    seats: 2,
    price: "85,000",
    car: "Spark",
    phone: "+998 95 567 89 01",
  },
  {
    id: 6,
    driver: "Nodir Xolmatov",
    from: "Buxoro",
    to: "Toshkent",
    date: "Ertaga, 06:00",
    seats: 3,
    price: "125,000",
    car: "Malibu",
    phone: "+998 97 678 90 12",
  },
]

const popularRoutes = [
  { from: "Toshkent", to: "Samarqand" },
  { from: "Toshkent", to: "Buxoro" },
  { from: "Toshkent", to: "Farg'ona" },
  { from: "Samarqand", to: "Toshkent" },
]

export default function SearchPage() {
  const [searchFrom, setSearchFrom] = useState("")
  const [searchTo, setSearchTo] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filteredRides = useMemo(() => {
    if (!searchFrom && !searchTo) return []
    return allRides.filter((ride) => {
      const fromMatch = !searchFrom || ride.from.toLowerCase().includes(searchFrom.toLowerCase())
      const toMatch = !searchTo || ride.to.toLowerCase().includes(searchTo.toLowerCase())
      return fromMatch && toMatch
    })
  }, [searchFrom, searchTo])

  const handleSearch = () => {
    setIsSearching(true)
  }

  const handleQuickRoute = (from: string, to: string) => {
    setSearchFrom(from)
    setSearchTo(to)
    setIsSearching(true)
  }

  const clearSearch = () => {
    setSearchFrom("")
    setSearchTo("")
    setIsSearching(false)
  }

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-full bg-linear-to-br from-primary/5 to-background">
        {/* Header */}
        <header className="px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Safar Qidirish
          </h1>
          <p className="text-sm text-muted-foreground">
            Yo'nalish va sanani tanlang
          </p>
        </header>

        {/* Search Card */}
        <div className="px-6 mb-4">
          <div className="bg-background rounded-2xl p-4 shadow-lg border border-border/50">
            {/* From Input */}
            <div className="relative mb-3">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <Input
                placeholder="Qayerdan?"
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
                className="pl-12 h-12 rounded-xl border-border bg-muted/50"
              />
              {searchFrom && (
                <button
                  onClick={() => setSearchFrom("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* To Input */}
            <div className="relative mb-3">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Navigation className="w-3.5 h-3.5 text-primary" />
              </div>
              <Input
                placeholder="Qayerga?"
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
                className="pl-12 h-12 rounded-xl border-border bg-muted/50"
              />
              {searchTo && (
                <button
                  onClick={() => setSearchTo("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleSearch}
                disabled={!searchFrom && !searchTo}
                className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 gap-2"
              >
                <Search className="w-4 h-4" />
                Qidirish
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 w-12 rounded-xl border-border"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </div>

            {/* Filters (if open) */}
            {showFilters && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Sana bo'yicha</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-xl text-xs">
                    Bugun
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl text-xs">
                    Ertaga
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl text-xs">
                    Barchasi
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Routes or Results */}
        <div className="flex-1 px-6 pb-6">
          {!isSearching && !searchFrom && !searchTo ? (
            <>
              {/* Popular Routes */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Mashhur yo'nalishlar
                </h3>
                <div className="space-y-2">
                  {popularRoutes.map((route, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickRoute(route.from, route.to)}
                      className="w-full bg-background rounded-xl p-3 shadow-sm border border-border/50 flex items-center justify-between hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Car className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium text-foreground">{route.from}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="font-medium text-foreground">{route.to}</span>
                        </div>
                      </div>
                      <Search className="w-4 h-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches Placeholder */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  So'nggi qidiruvlar
                </h3>
                <div className="bg-muted/50 rounded-xl p-6 text-center">
                  <Search className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Qidiruv tarixi bo'sh
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Results Header */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">
                  {filteredRides.length} ta safar topildi
                </p>
                {isSearching && (
                  <button
                    onClick={clearSearch}
                    className="text-sm text-primary font-medium"
                  >
                    Tozalash
                  </button>
                )}
              </div>

              {/* Results List */}
              <div className="space-y-3">
                {filteredRides.length > 0 ? (
                  filteredRides.map((ride) => (
                    <RideCard key={ride.id} ride={ride} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground text-center mb-1">
                      Safarlar topilmadi
                    </p>
                    <p className="text-xs text-muted-foreground text-center">
                      Boshqa yo'nalishni sinab ko'ring
                    </p>
                  </div>
                )}
              </div>
            </>
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
  phone: string
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
              {ride.phone.slice(0, 12)}...
            </span>
          ) : (
            "Band qilish"
          )}
        </Button>
      </div>
    </div>
  )
}

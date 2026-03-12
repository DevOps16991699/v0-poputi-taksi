"use client"

import { useState, useMemo, useEffect } from "react"
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
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Map,
  List,
  Trash2
} from "lucide-react"

const allRides = [
  {
    id: 1,
    driver: "Akbar Rahimov",
    from: "Toshkent",
    to: "Samarqand",
    date: "Bugun",
    time: "14:00",
    seats: 3,
    price: 80000,
    car: "Cobalt",
    phone: "+998 90 123 45 67",
  },
  {
    id: 2,
    driver: "Dilshod Karimov",
    from: "Toshkent",
    to: "Buxoro",
    date: "Bugun",
    time: "16:30",
    seats: 2,
    price: 120000,
    car: "Gentra",
    phone: "+998 91 234 56 78",
  },
  {
    id: 3,
    driver: "Sardor Aliyev",
    from: "Toshkent",
    to: "Farg'ona",
    date: "Ertaga",
    time: "08:00",
    seats: 4,
    price: 100000,
    car: "Lacetti",
    phone: "+998 93 345 67 89",
  },
  {
    id: 4,
    driver: "Bobur Toshmatov",
    from: "Toshkent",
    to: "Namangan",
    date: "Ertaga",
    time: "10:00",
    seats: 1,
    price: 110000,
    car: "Nexia",
    phone: "+998 94 456 78 90",
  },
  {
    id: 5,
    driver: "Jasur Sodiqov",
    from: "Samarqand",
    to: "Toshkent",
    date: "Bugun",
    time: "18:00",
    seats: 2,
    price: 85000,
    car: "Spark",
    phone: "+998 95 567 89 01",
  },
  {
    id: 6,
    driver: "Nodir Xolmatov",
    from: "Buxoro",
    to: "Toshkent",
    date: "Ertaga",
    time: "06:00",
    seats: 3,
    price: 125000,
    car: "Malibu",
    phone: "+998 97 678 90 12",
  },
  {
    id: 7,
    driver: "Anvar Qodirov",
    from: "Toshkent",
    to: "Samarqand",
    date: "Bugun",
    time: "09:00",
    seats: 2,
    price: 75000,
    car: "Damas",
    phone: "+998 90 111 22 33",
  },
  {
    id: 8,
    driver: "Sherzod Yusupov",
    from: "Toshkent",
    to: "Buxoro",
    date: "Ertaga",
    time: "07:00",
    seats: 3,
    price: 130000,
    car: "Captiva",
    phone: "+998 91 444 55 66",
  },
]

const popularRoutes = [
  { from: "Toshkent", to: "Samarqand" },
  { from: "Toshkent", to: "Buxoro" },
  { from: "Toshkent", to: "Farg'ona" },
  { from: "Samarqand", to: "Toshkent" },
]

interface SavedSearch {
  id: string
  from: string
  to: string
  timestamp: number
}

export default function SearchPage() {
  const [searchFrom, setSearchFrom] = useState("")
  const [searchTo, setSearchTo] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  
  // Filters
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "tomorrow">("all")
  const [timeFilter, setTimeFilter] = useState<"all" | "morning" | "afternoon" | "evening">("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000])
  
  // Saved searches
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([])
  
  // Load saved searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedSearches")
    if (saved) {
      setSavedSearches(JSON.parse(saved))
    }
  }, [])
  
  // Save search
  const saveCurrentSearch = () => {
    if (!searchFrom || !searchTo) return
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      from: searchFrom,
      to: searchTo,
      timestamp: Date.now()
    }
    const updated = [newSearch, ...savedSearches.filter(s => !(s.from === searchFrom && s.to === searchTo))].slice(0, 5)
    setSavedSearches(updated)
    localStorage.setItem("savedSearches", JSON.stringify(updated))
  }
  
  // Delete saved search
  const deleteSavedSearch = (id: string) => {
    const updated = savedSearches.filter(s => s.id !== id)
    setSavedSearches(updated)
    localStorage.setItem("savedSearches", JSON.stringify(updated))
  }
  
  // Check if current search is saved
  const isSearchSaved = savedSearches.some(s => s.from === searchFrom && s.to === searchTo)

  const filteredRides = useMemo(() => {
    if (!searchFrom && !searchTo) return []
    return allRides.filter((ride) => {
      const fromMatch = !searchFrom || ride.from.toLowerCase().includes(searchFrom.toLowerCase())
      const toMatch = !searchTo || ride.to.toLowerCase().includes(searchTo.toLowerCase())
      
      // Date filter
      const dateMatch = dateFilter === "all" || 
        (dateFilter === "today" && ride.date === "Bugun") ||
        (dateFilter === "tomorrow" && ride.date === "Ertaga")
      
      // Time filter
      const hour = parseInt(ride.time.split(":")[0])
      const timeMatch = timeFilter === "all" ||
        (timeFilter === "morning" && hour >= 6 && hour < 12) ||
        (timeFilter === "afternoon" && hour >= 12 && hour < 18) ||
        (timeFilter === "evening" && hour >= 18 || hour < 6)
      
      // Price filter
      const priceMatch = ride.price >= priceRange[0] && ride.price <= priceRange[1]
      
      return fromMatch && toMatch && dateMatch && timeMatch && priceMatch
    })
  }, [searchFrom, searchTo, dateFilter, timeFilter, priceRange])

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
              <div className="mt-3 pt-3 border-t border-border space-y-4">
                {/* Date Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Sana bo'yicha</span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={dateFilter === "all" ? "default" : "outline"} 
                      size="sm" 
                      className="rounded-xl text-xs"
                      onClick={() => setDateFilter("all")}
                    >
                      Barchasi
                    </Button>
                    <Button 
                      variant={dateFilter === "today" ? "default" : "outline"} 
                      size="sm" 
                      className="rounded-xl text-xs"
                      onClick={() => setDateFilter("today")}
                    >
                      Bugun
                    </Button>
                    <Button 
                      variant={dateFilter === "tomorrow" ? "default" : "outline"} 
                      size="sm" 
                      className="rounded-xl text-xs"
                      onClick={() => setDateFilter("tomorrow")}
                    >
                      Ertaga
                    </Button>
                  </div>
                </div>
                
                {/* Time Filter */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Vaqt bo'yicha</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={timeFilter === "all" ? "default" : "outline"} 
                      size="sm" 
                      className="rounded-xl text-xs"
                      onClick={() => setTimeFilter("all")}
                    >
                      Barchasi
                    </Button>
                    <Button 
                      variant={timeFilter === "morning" ? "default" : "outline"} 
                      size="sm" 
                      className="rounded-xl text-xs"
                      onClick={() => setTimeFilter("morning")}
                    >
                      Ertalab (6-12)
                    </Button>
                    <Button 
                      variant={timeFilter === "afternoon" ? "default" : "outline"} 
                      size="sm" 
                      className="rounded-xl text-xs"
                      onClick={() => setTimeFilter("afternoon")}
                    >
                      Kunduzi (12-18)
                    </Button>
                    <Button 
                      variant={timeFilter === "evening" ? "default" : "outline"} 
                      size="sm" 
                      className="rounded-xl text-xs"
                      onClick={() => setTimeFilter("evening")}
                    >
                      Kechqurun (18+)
                    </Button>
                  </div>
                </div>
                
                {/* Price Filter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Narx bo'yicha</span>
                    </div>
                    <span className="text-xs text-primary font-medium">
                      {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} so'm
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={priceRange[1] === 200000 ? "default" : "outline"} 
                      size="sm" 
                      className="rounded-xl text-xs"
                      onClick={() => setPriceRange([0, 200000])}
                    >
                      Barchasi
                    </Button>
                    <Button 
                      variant={priceRange[1] === 100000 ? "default" : "outline"} 
                      size="sm" 
                      className="rounded-xl text-xs"
                      onClick={() => setPriceRange([0, 100000])}
                    >
                      100k gacha
                    </Button>
                    <Button 
                      variant={priceRange[0] === 100000 ? "default" : "outline"} 
                      size="sm" 
                      className="rounded-xl text-xs"
                      onClick={() => setPriceRange([100000, 200000])}
                    >
                      100k dan
                    </Button>
                  </div>
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

              {/* Saved Searches */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Saqlangan qidiruvlar
                </h3>
                {savedSearches.length > 0 ? (
                  <div className="space-y-2">
                    {savedSearches.map((search) => (
                      <div
                        key={search.id}
                        className="w-full bg-background rounded-xl p-3 shadow-sm border border-border/50 flex items-center justify-between"
                      >
                        <button
                          onClick={() => handleQuickRoute(search.from, search.to)}
                          className="flex items-center gap-3 flex-1"
                        >
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <BookmarkCheck className="w-4 h-4 text-emerald-500" />
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium text-foreground">{search.from}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="font-medium text-foreground">{search.to}</span>
                          </div>
                        </button>
                        <button
                          onClick={() => deleteSavedSearch(search.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-xl p-6 text-center">
                    <Bookmark className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Saqlangan qidiruvlar yo'q
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Qidiruv natijalarida saqlash tugmasini bosing
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Results Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    {filteredRides.length} ta safar topildi
                  </p>
                  {searchFrom && searchTo && (
                    <button
                      onClick={saveCurrentSearch}
                      className={`p-1.5 rounded-lg transition-colors ${isSearchSaved ? "text-emerald-500" : "text-muted-foreground hover:text-primary"}`}
                    >
                      {isSearchSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-muted rounded-lg p-0.5">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-background shadow-sm" : ""}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("map")}
                      className={`p-1.5 rounded-md transition-colors ${viewMode === "map" ? "bg-background shadow-sm" : ""}`}
                    >
                      <Map className="w-4 h-4" />
                    </button>
                  </div>
                  {isSearching && (
                    <button
                      onClick={clearSearch}
                      className="text-sm text-primary font-medium"
                    >
                      Tozalash
                    </button>
                  )}
                </div>
              </div>

              {/* Results - List or Map View */}
              {viewMode === "list" ? (
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
              ) : (
                <div className="bg-background rounded-2xl overflow-hidden shadow-lg border border-border/50">
                  {/* Simple Map Placeholder */}
                  <div className="relative h-64 bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-primary/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Map className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm font-medium text-foreground">Xarita ko'rinishi</p>
                        <p className="text-xs text-muted-foreground">{searchFrom} - {searchTo}</p>
                      </div>
                    </div>
                    {/* Route markers */}
                    <div className="absolute top-4 left-4 bg-background rounded-lg px-3 py-2 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-xs font-medium">{searchFrom || "Boshlanish"}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-background rounded-lg px-3 py-2 shadow-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        <span className="text-xs font-medium">{searchTo || "Manzil"}</span>
                      </div>
                    </div>
                  </div>
                  {/* Rides count on map */}
                  <div className="p-3 border-t border-border">
                    <p className="text-sm text-center text-muted-foreground">
                      <span className="font-semibold text-foreground">{filteredRides.length}</span> ta safar mavjud
                    </p>
                  </div>
                </div>
              )}
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
  time: string
  seats: number
  price: number
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
          <p className="text-lg font-bold text-primary">{ride.price.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">so'm</p>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center gap-4 py-3 border-t border-border">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{ride.date}, {ride.time}</span>
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

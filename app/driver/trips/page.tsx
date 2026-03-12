"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import {
  Clock,
  Users,
  Car,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2,
  Phone,
  MessageCircle,
  AlertCircle,
  X
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
    passengers: [
      { name: "Alisher T.", phone: "+998 90 111 22 33", seats: 1 },
      { name: "Nodira K.", phone: "+998 91 222 33 44", seats: 1 },
    ]
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
    passengers: [
      { name: "Sardor A.", phone: "+998 93 333 44 55", seats: 1 },
    ]
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
    passengers: []
  },
]

export default function DriverTripsPage() {
  const [rides, setRides] = useState(myRides)
  const activeRides = rides.filter(r => r.status === "active")
  const completedRides = rides.filter(r => r.status === "completed")

  const handleDeleteRide = (id: number) => {
    setRides(prev => prev.filter(r => r.id !== id))
  }

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-full bg-gradient-to-br from-primary/5 to-background">
        {/* Header */}
        <header className="px-5 py-4">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-xl font-bold text-foreground">
              Mening safarlarim
            </h1>
            <Link href="/driver">
              <Button size="sm" className="rounded-xl bg-primary hover:bg-primary/90 h-9">
                <Plus className="w-4 h-4 mr-1" />
                Yangi
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Jami {rides.length} ta safar, {activeRides.length} ta faol
          </p>
        </header>

        {/* Active Rides */}
        {activeRides.length > 0 && (
          <div className="px-5 mb-4">
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              Faol safarlar
            </h2>
            <div className="space-y-3">
              {activeRides.map((ride) => (
                <DriverRideCard key={ride.id} ride={ride} onDelete={handleDeleteRide} />
              ))}
            </div>
          </div>
        )}

        {/* Completed Rides */}
        {completedRides.length > 0 && (
          <div className="px-5 pb-6">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Yakunlangan
            </h2>
            <div className="space-y-3">
              {completedRides.map((ride) => (
                <DriverRideCard key={ride.id} ride={ride} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {rides.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Car className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center mb-4">
              Sizda hali safarlar yo'q
            </p>
            <Link href="/driver">
              <Button className="rounded-xl bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Safar e'lon qilish
              </Button>
            </Link>
          </div>
        )}
      </div>
    </MobileLayout>
  )
}

interface Passenger {
  name: string
  phone: string
  seats: number
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
  passengers: Passenger[]
}

function DriverRideCard({ ride, onDelete }: { ride: Ride; onDelete?: (id: number) => void }) {
  const [showMenu, setShowMenu] = useState(false)
  const [showPassengers, setShowPassengers] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const isCompleted = ride.status === "completed"
  const availableSeats = ride.seats - ride.bookedSeats

  return (
    <>
      <div className={`bg-background rounded-2xl shadow-lg border ${
        isCompleted ? "border-border/30 opacity-75" : "border-border/50"
      }`}>
        {/* Main Content */}
        <div className="p-4">
          {/* Route */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <div className="w-0.5 h-6 bg-border" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm">{ride.from}</p>
              <div className="h-3" />
              <p className="font-semibold text-foreground text-sm">{ride.to}</p>
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-primary">{ride.price}</p>
              <p className="text-[10px] text-muted-foreground">so'm/joy</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-center gap-3 py-2.5 border-t border-border">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{ride.date}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Car className="w-3.5 h-3.5" />
              <span className="text-xs">{ride.car}</span>
            </div>
          </div>

          {/* Seats & Actions */}
          <div className="flex items-center justify-between pt-2.5 border-t border-border">
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-foreground">
                <span className="font-semibold text-primary">{ride.bookedSeats}</span>
                <span className="text-muted-foreground">/{ride.seats}</span>
              </span>
              {availableSeats > 0 && !isCompleted && (
                <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded-full">
                  {availableSeats} bo'sh
                </span>
              )}
              {ride.bookedSeats > 0 && !isCompleted && (
                <button 
                  onClick={() => setShowPassengers(!showPassengers)}
                  className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full"
                >
                  Yo'lovchilar
                </button>
              )}
            </div>
            
            {!isCompleted && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-lg h-8 w-8 p-0"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
                
                {showMenu && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                    <div className="absolute right-0 top-full mt-1 bg-background rounded-xl shadow-lg border border-border py-1 min-w-[120px] z-20">
                      <Link href={`/driver?edit=${ride.id}`} className="w-full px-3 py-2 text-xs text-left hover:bg-muted flex items-center gap-2">
                        <Edit2 className="w-3.5 h-3.5" />
                        Tahrirlash
                      </Link>
                      <button 
                        onClick={() => {
                          setShowMenu(false)
                          setShowDeleteDialog(true)
                        }}
                        className="w-full px-3 py-2 text-xs text-left hover:bg-muted flex items-center gap-2 text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        O'chirish
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {isCompleted && (
              <span className="text-[10px] bg-muted text-muted-foreground px-2 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Yakunlangan
              </span>
            )}
          </div>
        </div>

        {/* Passengers List */}
        {showPassengers && ride.passengers.length > 0 && (
          <div className="border-t border-border bg-muted/30 p-3">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-2">Yo'lovchilar</p>
            <div className="space-y-2">
              {ride.passengers.map((passenger, idx) => (
                <div key={idx} className="flex items-center justify-between bg-background rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">{passenger.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{passenger.name}</p>
                      <p className="text-[10px] text-muted-foreground">{passenger.seats} joy</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <a href={`tel:${passenger.phone}`} className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <Link href="/chat" className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <MessageCircle className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div 
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowDeleteDialog(false)}
          />
          <div className="relative bg-background rounded-2xl w-full p-5 animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">Safarni o'chirish</h3>
              <p className="text-xs text-muted-foreground mb-1">
                {ride.from} - {ride.to}
              </p>
              <p className="text-[10px] text-muted-foreground mb-5">
                Bu safar va barcha band qilishlar o'chiriladi
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteDialog(false)}
                  className="flex-1 h-11 rounded-xl"
                >
                  Bekor qilish
                </Button>
                <Button 
                  onClick={() => {
                    setShowDeleteDialog(false)
                    onDelete?.(ride.id)
                  }}
                  className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600"
                >
                  O'chirish
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

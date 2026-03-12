"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import {
  Clock,
  Users,
  Car,
  Phone,
  Search,
  CheckCircle2,
  Ticket,
  X,
  AlertCircle,
  Star,
  MessageCircle
} from "lucide-react"
import Link from "next/link"

const myBookings = [
  {
    id: 1,
    driver: "Akbar Rahimov",
    driverRating: 4.8,
    from: "Toshkent",
    to: "Samarqand",
    date: "Bugun, 14:00",
    seats: 1,
    price: "80,000",
    car: "Cobalt",
    carNumber: "01 A 123 BC",
    status: "confirmed",
    phone: "+998 90 111 22 33",
  },
  {
    id: 2,
    driver: "Dilshod Karimov",
    driverRating: 4.5,
    from: "Toshkent",
    to: "Buxoro",
    date: "Ertaga, 08:00",
    seats: 2,
    price: "120,000",
    car: "Gentra",
    carNumber: "01 B 456 DE",
    status: "pending",
    phone: "+998 91 222 33 44",
  },
  {
    id: 3,
    driver: "Sardor Aliyev",
    driverRating: 4.9,
    from: "Toshkent",
    to: "Farg'ona",
    date: "10-mart, 10:00",
    seats: 1,
    price: "100,000",
    car: "Lacetti",
    carNumber: "01 C 789 FG",
    status: "completed",
    phone: "+998 93 333 44 55",
  },
]

export default function PassengerTripsPage() {
  const [bookings, setBookings] = useState(myBookings)
  
  const confirmedBookings = bookings.filter(b => b.status === "confirmed")
  const pendingBookings = bookings.filter(b => b.status === "pending")
  const completedBookings = bookings.filter(b => b.status === "completed")
  
  const handleCancelBooking = (id: number) => {
    setBookings(prev => prev.filter(b => b.id !== id))
  }

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-full bg-gradient-to-br from-emerald-500/5 to-background">
        {/* Header */}
        <header className="px-5 py-4">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-xl font-bold text-foreground">
              Mening safarlarim
            </h1>
            <Link href="/search">
              <Button size="sm" className="rounded-xl bg-emerald-500 hover:bg-emerald-500/90 h-9">
                <Search className="w-4 h-4 mr-1" />
                Izlash
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Jami {bookings.length} ta safar
          </p>
        </header>

        {/* Confirmed Bookings */}
        {confirmedBookings.length > 0 && (
          <div className="px-5 mb-4">
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              Tasdiqlangan
            </h2>
            <div className="space-y-3">
              {confirmedBookings.map((booking) => (
                <PassengerBookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />
              ))}
            </div>
          </div>
        )}

        {/* Pending Bookings */}
        {pendingBookings.length > 0 && (
          <div className="px-5 mb-4">
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
              Kutilmoqda
            </h2>
            <div className="space-y-3">
              {pendingBookings.map((booking) => (
                <PassengerBookingCard key={booking.id} booking={booking} onCancel={handleCancelBooking} />
              ))}
            </div>
          </div>
        )}

        {/* Completed Bookings */}
        {completedBookings.length > 0 && (
          <div className="px-5 pb-6">
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Yakunlangan
            </h2>
            <div className="space-y-3">
              {completedBookings.map((booking) => (
                <PassengerBookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Ticket className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center mb-4">
              Sizda hali band qilingan safarlar yo'q
            </p>
            <Link href="/search">
              <Button className="rounded-xl bg-emerald-500 hover:bg-emerald-500/90">
                <Search className="w-4 h-4 mr-2" />
                Safar izlash
              </Button>
            </Link>
          </div>
        )}
      </div>
    </MobileLayout>
  )
}

interface Booking {
  id: number
  driver: string
  driverRating: number
  from: string
  to: string
  date: string
  seats: number
  price: string
  car: string
  carNumber: string
  status: string
  phone: string
}

function PassengerBookingCard({ booking, onCancel }: { booking: Booking; onCancel?: (id: number) => void }) {
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const isCompleted = booking.status === "completed"
  const isPending = booking.status === "pending"
  const isConfirmed = booking.status === "confirmed"

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
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm">{booking.from}</p>
              <div className="h-3" />
              <p className="font-semibold text-foreground text-sm">{booking.to}</p>
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-emerald-500">{booking.price}</p>
              <p className="text-[10px] text-muted-foreground">{booking.seats} joy</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-center gap-3 py-2.5 border-t border-border">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{booking.date}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Car className="w-3.5 h-3.5" />
              <span className="text-xs">{booking.car}</span>
            </div>
            <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              {booking.carNumber}
            </span>
          </div>

          {/* Driver & Actions */}
          <div className="flex items-center justify-between pt-2.5 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-emerald-500">
                  {booking.driver.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">{booking.driver}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] text-muted-foreground">{booking.driverRating}</span>
                </div>
              </div>
            </div>
            
            {!isCompleted && (
              <div className="flex items-center gap-1.5">
                {(isConfirmed || isPending) && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowCancelDialog(true)}
                    className="rounded-lg h-8 w-8 p-0 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
                {isConfirmed && (
                  <>
                    <Link href="/chat">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg h-8 w-8 p-0"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </Link>
                    <a href={`tel:${booking.phone}`}>
                      <Button
                        size="sm"
                        className="rounded-lg h-8 bg-emerald-500 hover:bg-emerald-500/90"
                      >
                        <Phone className="w-3.5 h-3.5 mr-1" />
                        <span className="text-xs">Aloqa</span>
                      </Button>
                    </a>
                  </>
                )}
                {isPending && (
                  <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2 py-1 rounded-full">
                    Javob kutilmoqda
                  </span>
                )}
              </div>
            )}

            {isCompleted && (
              <Link href="/profile/reviews">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-lg h-8 text-xs"
                >
                  <Star className="w-3.5 h-3.5 mr-1" />
                  Baholash
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div 
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowCancelDialog(false)}
          />
          <div className="relative bg-background rounded-2xl w-full p-5 animate-in zoom-in-95 duration-200">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">Bekor qilish</h3>
              <p className="text-xs text-muted-foreground mb-1">
                {booking.from} - {booking.to}
              </p>
              <p className="text-[10px] text-muted-foreground mb-5">
                Haqiqatan ham bu safarni bekor qilmoqchimisiz?
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCancelDialog(false)}
                  className="flex-1 h-11 rounded-xl"
                >
                  Yo'q
                </Button>
                <Button 
                  onClick={() => {
                    setShowCancelDialog(false)
                    onCancel?.(booking.id)
                  }}
                  className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600"
                >
                  Ha, bekor qilish
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

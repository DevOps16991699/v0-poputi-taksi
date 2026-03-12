"use client"

import { use, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"
import { SmartBackButton } from "@/components/smart-back-button"
import { Button } from "@/components/ui/button"
import {
  Star,
  MapPin,
  Navigation,
  Clock,
  Users,
  Car,
  Phone,
  MessageCircle,
  Shield,
  Cigarette,
  Music,
  Snowflake,
  PawPrint,
  Calendar,
  CreditCard,
  Share2,
  Heart,
  CheckCircle2,
  X,
  Minus,
  Plus,
  Wallet,
  Banknote,
  AlertCircle
} from "lucide-react"

// Mock data - in real app this would come from API
const ridesData: Record<string, {
  id: number
  driver: {
    name: string
    avatar: string
    rating: number
    trips: number
    memberSince: string
    phone: string
    verified: boolean
  }
  from: string
  fromAddress: string
  to: string
  toAddress: string
  date: string
  time: string
  duration: string
  distance: string
  seats: number
  seatsAvailable: number
  price: number
  car: {
    model: string
    color: string
    year: number
    plate: string
  }
  amenities: {
    smoking: boolean
    music: boolean
    airConditioner: boolean
    pets: boolean
  }
  description: string
}> = {
  "1": {
    id: 1,
    driver: {
      name: "Akbar Rahimov",
      avatar: "A",
      rating: 4.8,
      trips: 156,
      memberSince: "2023",
      phone: "+998 90 123 45 67",
      verified: true
    },
    from: "Toshkent",
    fromAddress: "Olmazor tumani, Sergeli ko'chasi",
    to: "Samarqand",
    toAddress: "Registon maydoni yaqini",
    date: "Bugun",
    time: "14:00",
    duration: "3 soat 30 min",
    distance: "286 km",
    seats: 4,
    seatsAvailable: 3,
    price: 80000,
    car: {
      model: "Chevrolet Cobalt",
      color: "Oq",
      year: 2022,
      plate: "01 A 123 BC"
    },
    amenities: {
      smoking: false,
      music: true,
      airConditioner: true,
      pets: false
    },
    description: "Salom! Samarqandga boramiz. Yo'lda bir marta to'xtaymiz. Yuk olish mumkin."
  },
  "2": {
    id: 2,
    driver: {
      name: "Dilshod Karimov",
      avatar: "D",
      rating: 4.9,
      trips: 243,
      memberSince: "2022",
      phone: "+998 91 234 56 78",
      verified: true
    },
    from: "Toshkent",
    fromAddress: "Chilonzor tumani, Metro yaqini",
    to: "Buxoro",
    toAddress: "Markaziy avtovokzal",
    date: "Bugun",
    time: "16:30",
    duration: "5 soat",
    distance: "450 km",
    seats: 4,
    seatsAvailable: 2,
    price: 120000,
    car: {
      model: "Chevrolet Gentra",
      color: "Kumush",
      year: 2021,
      plate: "01 B 456 DE"
    },
    amenities: {
      smoking: false,
      music: true,
      airConditioner: true,
      pets: true
    },
    description: "Buxoroga qulay safar. Konditsioner bor, musiqa tinglaymiz."
  },
  "3": {
    id: 3,
    driver: {
      name: "Sardor Aliyev",
      avatar: "S",
      rating: 4.7,
      trips: 89,
      memberSince: "2024",
      phone: "+998 93 345 67 89",
      verified: true
    },
    from: "Toshkent",
    fromAddress: "Yakkasaroy tumani",
    to: "Farg'ona",
    toAddress: "Farg'ona shahri markazi",
    date: "Ertaga",
    time: "08:00",
    duration: "4 soat",
    distance: "300 km",
    seats: 4,
    seatsAvailable: 4,
    price: 100000,
    car: {
      model: "Chevrolet Lacetti",
      color: "Qora",
      year: 2020,
      plate: "01 C 789 FG"
    },
    amenities: {
      smoking: false,
      music: true,
      airConditioner: true,
      pets: false
    },
    description: "Ertalab yo'lga chiqamiz. Andijon orqali o'tamiz."
  }
}

// Default ride for unknown IDs
const defaultRide = {
  id: 0,
  driver: {
    name: "Noma'lum haydovchi",
    avatar: "?",
    rating: 0,
    trips: 0,
    memberSince: "-",
    phone: "-",
    verified: false
  },
  from: "-",
  fromAddress: "-",
  to: "-",
  toAddress: "-",
  date: "-",
  time: "-",
  duration: "-",
  distance: "-",
  seats: 0,
  seatsAvailable: 0,
  price: 0,
  car: {
    model: "-",
    color: "-",
    year: 0,
    plate: "-"
  },
  amenities: {
    smoking: false,
    music: false,
    airConditioner: false,
    pets: false
  },
  description: ""
}

export default function RideDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const ride = ridesData[id] || defaultRide
  
  // Booking state
  const [showBookingDialog, setShowBookingDialog] = useState(false)
  const [selectedSeats, setSelectedSeats] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash")
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  
  const totalPrice = ride.price * selectedSeats
  
  const handleBooking = async () => {
    setIsBooking(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsBooking(false)
    setBookingSuccess(true)
    // After 2 seconds, redirect to my-rides
    setTimeout(() => {
      router.push("/my-rides")
    }, 2000)
  }
  
  const handleCancelBooking = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setShowCancelDialog(false)
    router.push("/my-rides")
  }

  if (!ridesData[id]) {
    return (
      <MobileLayout showSidebarToggle={false} showNavigation={false}>
        <div className="flex flex-col min-h-full bg-background">
          <header className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
            <SmartBackButton fallbackUrl="/search" />
            <h1 className="text-lg font-semibold">Safar topilmadi</h1>
          </header>
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Bu safar topilmadi yoki o'chirilgan</p>
              <Link href="/search">
                <Button className="mt-4 rounded-xl">Qidiruvga qaytish</Button>
              </Link>
            </div>
          </div>
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout showSidebarToggle={false} showNavigation={false}>
      <div className="flex flex-col min-h-full bg-background">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <div className="flex items-center gap-3">
            <SmartBackButton fallbackUrl="/" />
            <h1 className="text-lg font-semibold">Safar tafsilotlari</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Heart className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          {/* Map Section */}
          <div className="relative h-48 bg-muted">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-primary/20" />
            {/* Route visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-1">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs font-medium">{ride.from}</p>
                </div>
                <div className="flex-1 flex items-center">
                  <div className="h-0.5 w-16 bg-border" />
                  <div className="px-2 py-1 bg-background rounded-full text-xs font-medium shadow-sm">
                    {ride.distance}
                  </div>
                  <div className="h-0.5 w-16 bg-border" />
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-1">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs font-medium">{ride.to}</p>
                </div>
              </div>
            </div>
            {/* Duration badge */}
            <div className="absolute top-3 right-3 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              {ride.duration}
            </div>
          </div>

          {/* Route Details */}
          <div className="px-4 py-4 border-b border-border/50">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <div className="w-0.5 h-12 bg-border my-1" />
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <p className="font-semibold text-foreground">{ride.from}</p>
                  <p className="text-sm text-muted-foreground">{ride.fromAddress}</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{ride.to}</p>
                  <p className="text-sm text-muted-foreground">{ride.toAddress}</p>
                </div>
              </div>
            </div>
            
            {/* Date & Time */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{ride.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{ride.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{ride.seatsAvailable} o'rin bor</span>
              </div>
            </div>
          </div>

          {/* Driver Section */}
          <div className="px-4 py-4 border-b border-border/50">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">HAYDOVCHI</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{ride.driver.avatar}</span>
                  </div>
                  {ride.driver.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">{ride.driver.name}</p>
                    {ride.driver.verified && (
                      <Shield className="w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-foreground">{ride.driver.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{ride.driver.trips} ta safar</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {ride.driver.memberSince} yildan beri a'zo
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/chat/1`}>
                  <button className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </button>
                </Link>
                <a href={`tel:${ride.driver.phone}`}>
                  <button className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-emerald-500" />
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Car Section */}
          <div className="px-4 py-4 border-b border-border/50">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">AVTOMOBIL</h3>
            <div className="bg-muted/50 rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-background flex items-center justify-center shadow-sm">
                  <Car className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{ride.car.model}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span>{ride.car.color}</span>
                    <span>•</span>
                    <span>{ride.car.year} yil</span>
                  </div>
                  <p className="text-sm font-mono text-muted-foreground mt-1">{ride.car.plate}</p>
                </div>
              </div>
              
              {/* Amenities */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs ${ride.amenities.airConditioner ? 'bg-emerald-500/10 text-emerald-600' : 'bg-muted text-muted-foreground line-through'}`}>
                  <Snowflake className="w-3.5 h-3.5" />
                  <span>Konditsioner</span>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs ${ride.amenities.music ? 'bg-emerald-500/10 text-emerald-600' : 'bg-muted text-muted-foreground line-through'}`}>
                  <Music className="w-3.5 h-3.5" />
                  <span>Musiqa</span>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs ${!ride.amenities.smoking ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-500'}`}>
                  <Cigarette className="w-3.5 h-3.5" />
                  <span>{ride.amenities.smoking ? 'Ruxsat' : 'Taqiqlangan'}</span>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs ${ride.amenities.pets ? 'bg-emerald-500/10 text-emerald-600' : 'bg-muted text-muted-foreground'}`}>
                  <PawPrint className="w-3.5 h-3.5" />
                  <span>{ride.amenities.pets ? 'Ruxsat' : 'Yo\'q'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {ride.description && (
            <div className="px-4 py-4 border-b border-border/50">
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">QOSHIMCHA MA'LUMOT</h3>
              <p className="text-sm text-foreground">{ride.description}</p>
            </div>
          )}

          {/* Price Section */}
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">1 yo'lovchi uchun</p>
                <p className="text-2xl font-bold text-primary">{ride.price.toLocaleString()} so'm</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                <span>Naqd yoki karta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border/50">
          <Button 
            onClick={() => setShowBookingDialog(true)}
            className="w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-500/90 text-base font-semibold"
          >
            Joy band qilish
          </Button>
        </div>

        {/* Booking Confirmation Dialog */}
        {showBookingDialog && (
          <div className="fixed inset-0 z-50 flex items-end">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60"
              onClick={() => !isBooking && !bookingSuccess && setShowBookingDialog(false)}
            />
            
            {/* Dialog Content - Full width bottom sheet */}
            <div className="relative bg-background rounded-t-[2rem] w-full max-h-[85dvh] overflow-auto animate-in slide-in-from-bottom duration-300">
              {/* Handle bar */}
              <div className="sticky top-0 bg-background pt-3 pb-2 z-10">
                <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto" />
              </div>
              
              <div className="px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
                {/* Close Button */}
                {!isBooking && !bookingSuccess && (
                  <button 
                    onClick={() => setShowBookingDialog(false)}
                    className="absolute top-3 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center active:scale-95"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                
                {bookingSuccess ? (
                  /* Success State */
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Muvaffaqiyatli!</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      Safar muvaffaqiyatli band qilindi
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Haydovchi tez orada siz bilan bog'lanadi
                    </p>
                  </div>
                ) : (
                  /* Booking Form */
                  <>
                    <h3 className="text-lg font-bold text-foreground mb-0.5">Band qilishni tasdiqlash</h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      {ride.from} - {ride.to}, {ride.date} {ride.time}
                    </p>
                    
                    {/* Seats Selection */}
                    <div className="mb-4">
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Nechta joy band qilasiz?
                      </label>
                      <div className="flex items-center justify-between bg-muted/50 rounded-xl p-3">
                        <button
                          onClick={() => setSelectedSeats(Math.max(1, selectedSeats - 1))}
                          disabled={selectedSeats <= 1 || isBooking}
                          className="w-11 h-11 rounded-xl bg-background shadow-sm flex items-center justify-center disabled:opacity-50 active:scale-95"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <div className="text-center">
                          <span className="text-2xl font-bold text-foreground">{selectedSeats}</span>
                          <p className="text-[10px] text-muted-foreground">joy</p>
                        </div>
                        <button
                          onClick={() => setSelectedSeats(Math.min(ride.seatsAvailable, selectedSeats + 1))}
                          disabled={selectedSeats >= ride.seatsAvailable || isBooking}
                          className="w-11 h-11 rounded-xl bg-background shadow-sm flex items-center justify-center disabled:opacity-50 active:scale-95"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
                        Mavjud: {ride.seatsAvailable} ta bo'sh joy
                      </p>
                    </div>
                    
                    {/* Payment Method */}
                    <div className="mb-4">
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        To'lov usuli
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setPaymentMethod("cash")}
                          disabled={isBooking}
                          className={`p-3 rounded-xl border-2 transition-all active:scale-[0.98] ${
                            paymentMethod === "cash" 
                              ? "border-emerald-500 bg-emerald-500/5" 
                              : "border-border bg-background"
                          }`}
                        >
                          <Banknote className={`w-5 h-5 mx-auto mb-1 ${paymentMethod === "cash" ? "text-emerald-500" : "text-muted-foreground"}`} />
                          <p className={`text-xs font-medium ${paymentMethod === "cash" ? "text-emerald-500" : "text-foreground"}`}>Naqd</p>
                        </button>
                        <button
                          onClick={() => setPaymentMethod("card")}
                          disabled={isBooking}
                          className={`p-3 rounded-xl border-2 transition-all active:scale-[0.98] ${
                            paymentMethod === "card" 
                              ? "border-emerald-500 bg-emerald-500/5" 
                              : "border-border bg-background"
                          }`}
                        >
                          <Wallet className={`w-5 h-5 mx-auto mb-1 ${paymentMethod === "card" ? "text-emerald-500" : "text-muted-foreground"}`} />
                          <p className={`text-xs font-medium ${paymentMethod === "card" ? "text-emerald-500" : "text-foreground"}`}>Karta</p>
                        </button>
                      </div>
                    </div>
                    
                    {/* Price Summary */}
                    <div className="bg-muted/50 rounded-xl p-3 mb-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-muted-foreground">Narx ({selectedSeats} joy)</span>
                        <span className="text-sm font-medium">{(ride.price * selectedSeats).toLocaleString()} so'm</span>
                      </div>
                      <div className="flex items-center justify-between pt-1.5 border-t border-border">
                        <span className="text-sm font-semibold">Jami</span>
                        <span className="text-lg font-bold text-emerald-500">{totalPrice.toLocaleString()} so'm</span>
                      </div>
                    </div>
                    
                    {/* Confirm Button */}
                    <Button 
                      onClick={handleBooking}
                      disabled={isBooking}
                      className="w-full h-12 rounded-xl bg-emerald-500 active:bg-emerald-600 text-sm font-semibold"
                    >
                      {isBooking ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Band qilinmoqda...
                        </span>
                      ) : (
                        `Tasdiqlash - ${totalPrice.toLocaleString()} so'm`
                      )}
                    </Button>
                    
                    {/* Cancel hint */}
                    <p className="text-[10px] text-muted-foreground text-center mt-2">
                      Bekor qilish 24 soat oldin bepul
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Cancel Booking Dialog */}
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
                <h3 className="text-base font-bold text-foreground mb-1">Bekor qilishni tasdiqlang</h3>
                <p className="text-xs text-muted-foreground mb-5">
                  Haqiqatan ham bu safarni bekor qilmoqchimisiz?
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCancelDialog(false)}
                    className="flex-1 h-11 rounded-xl active:scale-[0.98]"
                  >
                    Yo'q
                  </Button>
                  <Button 
                    onClick={handleCancelBooking}
                    className="flex-1 h-11 rounded-xl bg-red-500 active:bg-red-600"
                  >
                    Ha, bekor qilish
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  )
}

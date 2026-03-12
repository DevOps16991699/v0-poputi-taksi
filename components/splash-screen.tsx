"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Car, MapPin, Users, Home, Search, CheckCircle2, Navigation } from "lucide-react"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [step, setStep] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),    // Show driver at home
      setTimeout(() => setStep(2), 1800),   // Driver posts ride
      setTimeout(() => setStep(3), 3200),   // Passenger searches
      setTimeout(() => setStep(4), 4600),   // Passenger books
      setTimeout(() => setStep(5), 6000),   // Journey starts
      setTimeout(() => setStep(6), 7200),   // Arrival
      setTimeout(() => {
        setIsExiting(true)
        setTimeout(onComplete, 600)
      }, 8500),
    ]

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] bg-gradient-to-br from-primary via-primary to-emerald-600 flex flex-col items-center justify-center transition-all duration-500",
        isExiting && "opacity-0 scale-110"
      )}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-8 w-full max-w-sm">
        
        {/* Logo */}
        <div className={cn(
          "mb-8 transition-all duration-700 ease-out",
          step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4 mx-auto ring-2 ring-white/20">
            <Car className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white text-center">Poputi Taksi</h1>
          <p className="text-white/70 text-sm text-center mt-1">Hamkorlik sayohati</p>
        </div>

        {/* Animation Scene */}
        <div className="relative w-full h-48 mb-8">
          
          {/* Road */}
          <div className={cn(
            "absolute bottom-8 left-0 right-0 h-2 bg-white/20 rounded-full transition-all duration-500",
            step >= 5 ? "opacity-100" : "opacity-0"
          )}>
            <div 
              className={cn(
                "h-full bg-white/40 rounded-full transition-all duration-[2000ms] ease-out",
                step >= 6 ? "w-full" : "w-0"
              )} 
            />
          </div>

          {/* Step 1-2: Driver at home posting */}
          <div className={cn(
            "absolute left-4 bottom-12 transition-all duration-700",
            step >= 1 && step < 5 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          )}>
            {/* House */}
            <div className="relative">
              <div className="w-16 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white/80" />
              </div>
              {/* Driver with phone */}
              <div className={cn(
                "absolute -right-6 -bottom-1 transition-all duration-500",
                step >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-75"
              )}>
                <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center shadow-lg">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                {/* Phone with plus */}
                <div className={cn(
                  "absolute -top-3 -right-3 transition-all duration-500",
                  step >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-0"
                )}>
                  <div className="w-6 h-8 bg-white rounded-md shadow-lg flex items-center justify-center">
                    <span className="text-primary text-lg font-bold">+</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Posted notification */}
            <div className={cn(
              "absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-500",
              step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}>
              <div className="bg-white text-primary text-xs font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                E'lon joylandi!
              </div>
            </div>
          </div>

          {/* Step 3-4: Passenger searching and booking */}
          <div className={cn(
            "absolute right-4 bottom-12 transition-all duration-700",
            step >= 3 && step < 5 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          )}>
            {/* Passenger */}
            <div className="relative">
              <div className={cn(
                "w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
                step >= 4 && "ring-4 ring-emerald-400/30"
              )}>
                <Users className="w-4 h-4 text-white" />
              </div>
              
              {/* Search animation */}
              <div className={cn(
                "absolute -top-3 -left-3 transition-all duration-500",
                step >= 3 && step < 4 ? "opacity-100 scale-100" : "opacity-0 scale-0"
              )}>
                <div className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center animate-pulse">
                  <Search className="w-3 h-3 text-primary" />
                </div>
              </div>

              {/* Booked notification */}
              <div className={cn(
                "absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-500",
                step >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}>
                <div className="bg-emerald-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Joy band qilindi!
                </div>
              </div>
            </div>
          </div>

          {/* Step 5-6: Journey */}
          <div className={cn(
            "absolute bottom-10 transition-all duration-[2500ms] ease-out",
            step >= 5 ? "opacity-100" : "opacity-0",
            step >= 6 ? "left-[calc(100%-4rem)]" : "left-4"
          )}>
            {/* Car with passengers */}
            <div className="relative">
              <div className={cn(
                "w-14 h-10 bg-white rounded-xl shadow-xl flex items-center justify-center transition-transform",
                step >= 5 && step < 6 && "animate-[bounce-subtle_0.5s_ease-in-out_infinite]"
              )}>
                <Car className="w-6 h-6 text-primary" />
              </div>
              
              {/* Passengers inside */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex -space-x-1">
                <div className="w-4 h-4 bg-primary rounded-full border-2 border-white" />
                <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
              </div>

              {/* Navigation arrow */}
              <div className={cn(
                "absolute -right-2 top-1/2 -translate-y-1/2 transition-all duration-300",
                step >= 5 && step < 6 ? "opacity-100" : "opacity-0"
              )}>
                <Navigation className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
          </div>

          {/* Destination marker */}
          <div className={cn(
            "absolute right-4 bottom-12 transition-all duration-500",
            step >= 5 ? "opacity-100 scale-100" : "opacity-0 scale-0"
          )}>
            <div className={cn(
              "relative transition-all duration-300",
              step >= 6 && "scale-110"
            )}>
              <MapPin className={cn(
                "w-8 h-8 transition-colors duration-300",
                step >= 6 ? "text-emerald-400 fill-emerald-400" : "text-white/60"
              )} />
              {step >= 6 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Arrival celebration */}
          {step >= 6 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-emerald-400/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2 ring-4 ring-emerald-400/30">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                step >= s 
                  ? "w-6 bg-white" 
                  : "w-1.5 bg-white/30"
              )}
            />
          ))}
        </div>

        {/* Step description */}
        <p className={cn(
          "mt-6 text-white/90 text-sm text-center transition-all duration-300 min-h-[3rem]",
        )}>
          {step === 0 && ""}
          {step === 1 && "Haydovchi uyda..."}
          {step === 2 && "E'lon joylashtirildi!"}
          {step === 3 && "Yo'lovchi qidirmoqda..."}
          {step === 4 && "Joy band qilindi!"}
          {step === 5 && "Safar boshlandi..."}
          {step === 6 && "Manzilga yetib keldingiz!"}
        </p>

        {/* Skip button */}
        <button
          onClick={() => {
            setIsExiting(true)
            setTimeout(onComplete, 400)
          }}
          className="mt-4 text-white/50 text-xs hover:text-white/80 transition-colors"
        >
          O'tkazib yuborish
        </button>
      </div>
    </div>
  )
}

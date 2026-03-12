"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SplashScreenProps {
  onComplete: () => void
  showDisableOption?: boolean
  onDisableAd?: () => void
}

// Shaffof porlovchi odam silueti
function GlowingPerson({ 
  className, 
  variant = "standing",
  glow = "primary"
}: { 
  className?: string
  variant?: "standing" | "sitting" | "walking" | "waving"
  glow?: "primary" | "emerald" | "white"
}) {
  const glowColors = {
    primary: "from-primary/60 via-primary/40 to-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]",
    emerald: "from-emerald-400/60 via-emerald-400/40 to-transparent drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]",
    white: "from-white/60 via-white/40 to-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
  }

  return (
    <div className={cn("relative", className)}>
      {/* Glow effect */}
      <div className={cn(
        "absolute inset-0 blur-xl rounded-full bg-gradient-radial",
        glowColors[glow]
      )} />
      
      {/* Person silhouette */}
      <svg 
        viewBox="0 0 40 80" 
        className={cn(
          "relative w-full h-full",
          glow === "primary" && "fill-primary/70",
          glow === "emerald" && "fill-emerald-400/70",
          glow === "white" && "fill-white/70"
        )}
        style={{ filter: `drop-shadow(0 0 8px ${glow === "primary" ? "rgba(59,130,246,0.6)" : glow === "emerald" ? "rgba(52,211,153,0.6)" : "rgba(255,255,255,0.6)"})` }}
      >
        {variant === "standing" && (
          <>
            {/* Head */}
            <circle cx="20" cy="10" r="8" />
            {/* Body */}
            <path d="M12 20 L28 20 L26 45 L14 45 Z" />
            {/* Arms */}
            <path d="M12 22 L4 35 L6 37 L14 28" />
            <path d="M28 22 L36 35 L34 37 L26 28" />
            {/* Legs */}
            <path d="M14 45 L12 75 L16 75 L18 50 L22 50 L24 75 L28 75 L26 45" />
          </>
        )}
        {variant === "sitting" && (
          <>
            {/* Head */}
            <circle cx="20" cy="10" r="8" />
            {/* Body */}
            <path d="M12 20 L28 20 L26 40 L14 40 Z" />
            {/* Arms - holding phone */}
            <path d="M14 25 L10 35 L18 38 L20 30" />
            <path d="M26 25 L30 35 L22 38 L20 30" />
            {/* Legs bent */}
            <path d="M14 40 L8 55 L12 55 L16 45 L24 45 L28 55 L32 55 L26 40" />
          </>
        )}
        {variant === "walking" && (
          <>
            {/* Head */}
            <circle cx="20" cy="10" r="8" />
            {/* Body */}
            <path d="M12 20 L28 20 L26 45 L14 45 Z" />
            {/* Arms swinging */}
            <path d="M12 22 L6 40 L9 41 L14 28" />
            <path d="M28 22 L32 32 L29 33 L26 26" />
            {/* Legs walking */}
            <path d="M14 45 L8 75 L12 75 L17 50" />
            <path d="M26 45 L32 70 L28 70 L23 50" />
          </>
        )}
        {variant === "waving" && (
          <>
            {/* Head */}
            <circle cx="20" cy="10" r="8" />
            {/* Body */}
            <path d="M12 20 L28 20 L26 45 L14 45 Z" />
            {/* Left arm normal */}
            <path d="M12 22 L4 35 L6 37 L14 28" />
            {/* Right arm waving up */}
            <path d="M28 22 L36 12 L38 14 L30 26" />
            {/* Legs */}
            <path d="M14 45 L12 75 L16 75 L18 50 L22 50 L24 75 L28 75 L26 45" />
          </>
        )}
      </svg>
    </div>
  )
}

// Telefon komponenti - ichida ilova ko'rsatiladi
function PhoneWithApp({ 
  className, 
  screen,
  animate = false
}: { 
  className?: string
  screen: "home" | "posting" | "searching" | "booked" | "journey"
  animate?: boolean
}) {
  return (
    <div className={cn(
      "relative",
      animate && "animate-[float_3s_ease-in-out_infinite]",
      className
    )}>
      {/* Phone frame glow */}
      <div className="absolute inset-0 bg-white/20 blur-xl rounded-3xl" />
      
      {/* Phone body */}
      <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-[20px] p-1 shadow-2xl ring-1 ring-white/20">
        {/* Screen */}
        <div className="relative bg-gradient-to-br from-primary/90 to-emerald-600/90 rounded-[16px] overflow-hidden w-20 h-40">
          {/* Status bar */}
          <div className="flex items-center justify-between px-2 py-1 bg-black/20">
            <span className="text-[6px] text-white/80">9:41</span>
            <div className="flex items-center gap-0.5">
              <div className="w-2 h-1.5 bg-white/80 rounded-sm" />
            </div>
          </div>
          
          {/* App content based on screen */}
          <div className="p-2">
            {screen === "home" && (
              <div className="space-y-2">
                <div className="text-[5px] text-white font-bold">Poputi Taksi</div>
                <div className="flex gap-1">
                  <div className="flex-1 h-6 bg-white/20 rounded-md" />
                  <div className="flex-1 h-6 bg-white/20 rounded-md" />
                </div>
                <div className="h-4 bg-white/10 rounded-md" />
                <div className="h-4 bg-white/10 rounded-md" />
              </div>
            )}
            
            {screen === "posting" && (
              <div className="space-y-1.5">
                <div className="text-[5px] text-white font-bold">Yangi e'lon</div>
                <div className="h-3 bg-white/30 rounded-sm flex items-center px-1">
                  <span className="text-[4px] text-white/80">Toshkent</span>
                </div>
                <div className="h-3 bg-white/30 rounded-sm flex items-center px-1">
                  <span className="text-[4px] text-white/80">Samarqand</span>
                </div>
                <div className="h-3 bg-white/30 rounded-sm" />
                <div className="h-5 bg-white rounded-md flex items-center justify-center mt-2">
                  <span className="text-[5px] text-primary font-bold">Joylash</span>
                </div>
              </div>
            )}
            
            {screen === "searching" && (
              <div className="space-y-1.5">
                <div className="h-4 bg-white/30 rounded-md flex items-center px-1 gap-1">
                  <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
                  <span className="text-[4px] text-white/80">Qidirish...</span>
                </div>
                <div className="space-y-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-5 bg-white/15 rounded-md animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                  ))}
                </div>
              </div>
            )}
            
            {screen === "booked" && (
              <div className="flex flex-col items-center justify-center h-full -mt-2">
                <div className="w-6 h-6 rounded-full bg-emerald-400/30 flex items-center justify-center mb-1">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[5px] text-white font-bold">Tasdiqlandi!</span>
              </div>
            )}
            
            {screen === "journey" && (
              <div className="h-full relative">
                {/* Map-like background */}
                <div className="absolute inset-0 bg-emerald-900/30 rounded-md">
                  {/* Road */}
                  <div className="absolute top-1/2 left-2 right-2 h-1 bg-white/40 rounded-full" />
                  {/* Car icon moving */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-3 h-2 bg-white rounded-sm animate-pulse" />
                  {/* Destination marker */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-3 w-2 h-2 bg-emerald-400 rounded-full" />
                </div>
                <div className="absolute bottom-1 left-0 right-0 text-center">
                  <span className="text-[4px] text-white/80">15 daqiqa qoldi</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Home indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white/50 rounded-full" />
        </div>
      </div>
      
      {/* Reflection */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-2 bg-white/10 blur-md rounded-full" />
    </div>
  )
}

export function SplashScreen({ onComplete, showDisableOption = false, onDisableAd }: SplashScreenProps) {
  const [step, setStep] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),    // Haydovchi uyda
      setTimeout(() => setStep(2), 2200),   // E'lon joylashtirildi
      setTimeout(() => setStep(3), 4000),   // Yo'lovchi qidirmoqda
      setTimeout(() => setStep(4), 5800),   // Joy band qilindi
      setTimeout(() => setStep(5), 7400),   // Safar boshlandi
      setTimeout(() => setStep(6), 9000),   // Manzilga yetdi
      setTimeout(() => {
        setIsExiting(true)
        setTimeout(onComplete, 700)
      }, 10500),
    ]

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  const handleSkip = () => {
    setIsExiting(true)
    setTimeout(onComplete, 400)
  }

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] bg-gradient-to-br from-slate-900 via-primary/20 to-slate-900 flex flex-col items-center justify-center transition-all duration-700",
        isExiting && "opacity-0 scale-105"
      )}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-md">
        
        {/* Logo */}
        <div className={cn(
          "mb-6 transition-all duration-700 ease-out",
          step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full" />
            <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl ring-2 ring-white/20">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M8 17l4-4-4-4m5 8l4-4-4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl font-bold text-white text-center mt-3">Poputi Taksi</h1>
          <p className="text-white/50 text-xs text-center mt-0.5">Hamkorlik sayohati</p>
        </div>

        {/* Animation Scene */}
        <div className="relative w-full h-64 mb-6">
          
          {/* Scene 1-2: Haydovchi uyda e'lon joylashtiryapti */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-700",
            step >= 1 && step <= 2 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
          )}>
            <div className="relative flex items-end gap-4">
              {/* Haydovchi - shaffof, porlovchi */}
              <GlowingPerson 
                variant="sitting" 
                glow="primary" 
                className={cn(
                  "w-12 h-24 transition-all duration-500",
                  step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              />
              
              {/* Telefon */}
              <PhoneWithApp 
                screen={step >= 2 ? "posting" : "home"}
                animate={step >= 1}
                className={cn(
                  "transition-all duration-500",
                  step >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-75"
                )}
              />
              
              {/* E'lon joylandi notification */}
              <div className={cn(
                "absolute -top-4 right-0 transition-all duration-500",
                step >= 2 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90"
              )}>
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-[10px] font-semibold px-3 py-1.5 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  E'lon joylandi!
                </div>
              </div>
            </div>
          </div>

          {/* Scene 3-4: Yo'lovchi qidirmoqda va band qilmoqda */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-700",
            step >= 3 && step <= 4 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
          )}>
            <div className="relative flex items-end gap-4">
              {/* Yo'lovchi - shaffof, yashil porlovchi */}
              <GlowingPerson 
                variant="standing" 
                glow="emerald" 
                className={cn(
                  "w-12 h-24 transition-all duration-500",
                  step >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              />
              
              {/* Telefon */}
              <PhoneWithApp 
                screen={step >= 4 ? "booked" : "searching"}
                animate={step >= 3}
                className={cn(
                  "transition-all duration-500",
                  step >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-75"
                )}
              />
              
              {/* Band qilindi notification */}
              <div className={cn(
                "absolute -top-4 right-0 transition-all duration-500",
                step >= 4 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-90"
              )}>
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white text-[10px] font-semibold px-3 py-1.5 rounded-full shadow-lg shadow-primary/30 flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  Joy band qilindi!
                </div>
              </div>
            </div>
          </div>

          {/* Scene 5-6: Safar va manzilga yetish */}
          <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center transition-all duration-700",
            step >= 5 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
          )}>
            {/* Road */}
            <div className="relative w-full h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
              <div 
                className={cn(
                  "absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-emerald-400 to-emerald-500 rounded-full transition-all duration-[2500ms] ease-out",
                  step >= 6 ? "w-full" : "w-0"
                )}
              />
              {/* Dashed line */}
              <div className="absolute inset-0 flex items-center justify-around">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-3 h-0.5 bg-white/20 rounded-full" />
                ))}
              </div>
            </div>

            {/* Mashina va odamlar */}
            <div className="relative w-full">
              <div className={cn(
                "flex items-center gap-2 transition-all duration-[2500ms] ease-out",
                step >= 6 ? "translate-x-[calc(100%-6rem)]" : "translate-x-0"
              )}>
                {/* Car with glowing passengers inside */}
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 blur-xl rounded-2xl" />
                  <div className="relative bg-gradient-to-br from-white to-slate-100 rounded-xl px-3 py-2 shadow-xl flex items-center gap-1">
                    {/* Driver */}
                    <div className="w-4 h-4 rounded-full bg-primary/60 ring-1 ring-primary/30" style={{ boxShadow: "0 0 8px rgba(59,130,246,0.4)" }} />
                    {/* Passenger */}
                    <div className="w-4 h-4 rounded-full bg-emerald-400/60 ring-1 ring-emerald-400/30" style={{ boxShadow: "0 0 8px rgba(52,211,153,0.4)" }} />
                    {/* Car icon */}
                    <svg className="w-6 h-6 text-slate-600 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M8 17h8M8 17a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 104 0 2 2 0 00-4 0zM3 11l2-6h14l2 6M3 11h18M3 11v6h2m16-6v6h-2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Destination marker */}
              <div className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-500",
                step >= 5 ? "opacity-100 scale-100" : "opacity-0 scale-75"
              )}>
                <div className={cn(
                  "relative transition-all duration-300",
                  step >= 6 && "scale-125"
                )}>
                  <div className="absolute inset-0 bg-emerald-400/30 blur-lg rounded-full animate-pulse" />
                  <svg 
                    className={cn(
                      "relative w-8 h-8 transition-colors duration-500",
                      step >= 6 ? "text-emerald-400 fill-emerald-400" : "text-white/40"
                    )} 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Arrival celebration */}
            {step >= 6 && (
              <div className="mt-8 animate-in fade-in zoom-in duration-500">
                <div className="flex items-center gap-3">
                  <GlowingPerson variant="waving" glow="primary" className="w-8 h-16" />
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-400/30 blur-xl rounded-full" />
                    <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl ring-4 ring-emerald-400/20">
                      <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <GlowingPerson variant="waving" glow="emerald" className="w-8 h-16" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={cn(
                "rounded-full transition-all duration-400",
                step >= s 
                  ? "w-6 h-1.5 bg-gradient-to-r from-primary to-emerald-400" 
                  : "w-1.5 h-1.5 bg-white/20"
              )}
            />
          ))}
        </div>

        {/* Step description */}
        <div className="h-12 flex items-center justify-center">
          <p className={cn(
            "text-white/80 text-sm text-center transition-all duration-500 font-medium",
          )}>
            {step === 0 && ""}
            {step === 1 && "Haydovchi uyda..."}
            {step === 2 && "E'lon joylashtirildi!"}
            {step === 3 && "Yo'lovchi qidirmoqda..."}
            {step === 4 && "Joy band qilindi!"}
            {step === 5 && "Safar boshlandi..."}
            {step === 6 && "Manzilga xush kelibsiz!"}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <button
            onClick={handleSkip}
            className="text-white/50 text-xs hover:text-white/80 transition-colors px-4 py-2"
          >
            O'tkazib yuborish
          </button>
          
          {showDisableOption && onDisableAd && (
            <button
              onClick={() => {
                onDisableAd()
                handleSkip()
              }}
              className="text-white/30 text-[10px] hover:text-white/50 transition-colors px-4 py-1"
            >
              Reklamani o'chirish
            </button>
          )}
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}

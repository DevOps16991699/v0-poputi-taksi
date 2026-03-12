"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SplashScreenProps {
  onComplete: () => void
  showDisableOption?: boolean
  onDisableAd?: () => void
}

// Shaffof porlovchi odam silueti - inline styles bilan
function GlowingPerson({ 
  className, 
  variant = "standing",
  color = "blue"
}: { 
  className?: string
  variant?: "standing" | "sitting" | "walking" | "waving"
  color?: "blue" | "green" | "white"
}) {
  const colors = {
    blue: { fill: "rgba(59, 130, 246, 0.8)", glow: "rgba(59, 130, 246, 0.5)" },
    green: { fill: "rgba(52, 211, 153, 0.8)", glow: "rgba(52, 211, 153, 0.5)" },
    white: { fill: "rgba(255, 255, 255, 0.8)", glow: "rgba(255, 255, 255, 0.5)" }
  }

  const { fill, glow } = colors[color]

  return (
    <div className={cn("relative", className)}>
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-60"
        style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }}
      />
      
      {/* Person silhouette */}
      <svg 
        viewBox="0 0 40 80" 
        className="relative w-full h-full"
        style={{ 
          fill: fill,
          filter: `drop-shadow(0 0 12px ${glow})`
        }}
      >
        {variant === "standing" && (
          <>
            <circle cx="20" cy="10" r="8" />
            <path d="M12 20 L28 20 L26 45 L14 45 Z" />
            <path d="M12 22 L4 35 L6 37 L14 28" />
            <path d="M28 22 L36 35 L34 37 L26 28" />
            <path d="M14 45 L12 75 L16 75 L18 50 L22 50 L24 75 L28 75 L26 45" />
          </>
        )}
        {variant === "sitting" && (
          <>
            <circle cx="20" cy="10" r="8" />
            <path d="M12 20 L28 20 L26 40 L14 40 Z" />
            <path d="M14 25 L10 35 L18 38 L20 30" />
            <path d="M26 25 L30 35 L22 38 L20 30" />
            <path d="M14 40 L8 55 L12 55 L16 45 L24 45 L28 55 L32 55 L26 40" />
          </>
        )}
        {variant === "walking" && (
          <>
            <circle cx="20" cy="10" r="8" />
            <path d="M12 20 L28 20 L26 45 L14 45 Z" />
            <path d="M12 22 L6 40 L9 41 L14 28" />
            <path d="M28 22 L32 32 L29 33 L26 26" />
            <path d="M14 45 L8 75 L12 75 L17 50" />
            <path d="M26 45 L32 70 L28 70 L23 50" />
          </>
        )}
        {variant === "waving" && (
          <>
            <circle cx="20" cy="10" r="8" />
            <path d="M12 20 L28 20 L26 45 L14 45 Z" />
            <path d="M12 22 L4 35 L6 37 L14 28" />
            <path d="M28 22 L36 8 L38 10 L30 26" />
            <path d="M14 45 L12 75 L16 75 L18 50 L22 50 L24 75 L28 75 L26 45" />
          </>
        )}
      </svg>
    </div>
  )
}

// Uy komponenti
function House({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div 
        className="absolute inset-0 rounded-xl blur-lg opacity-40"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)" }}
      />
      <svg viewBox="0 0 60 50" className="w-full h-full" style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))" }}>
        {/* Roof */}
        <path d="M5 25 L30 5 L55 25 Z" fill="rgba(255,255,255,0.6)" />
        {/* House body */}
        <rect x="10" y="25" width="40" height="25" fill="rgba(255,255,255,0.5)" rx="2" />
        {/* Door */}
        <rect x="25" y="35" width="10" height="15" fill="rgba(59,130,246,0.6)" rx="1" />
        {/* Window */}
        <rect x="15" y="30" width="8" height="8" fill="rgba(250,204,21,0.7)" rx="1" />
        <rect x="37" y="30" width="8" height="8" fill="rgba(250,204,21,0.7)" rx="1" />
      </svg>
    </div>
  )
}

// Telefon komponenti
function PhoneWithApp({ 
  className, 
  screen
}: { 
  className?: string
  screen: "home" | "posting" | "searching" | "booked" | "journey"
}) {
  return (
    <div className={cn("relative", className)}>
      {/* Phone glow */}
      <div 
        className="absolute inset-0 blur-xl opacity-50"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)" }}
      />
      
      {/* Phone body */}
      <div 
        className="relative rounded-2xl p-1 shadow-2xl"
        style={{ 
          background: "linear-gradient(to bottom, #1e293b, #0f172a)",
          boxShadow: "0 0 20px rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.1)"
        }}
      >
        {/* Screen */}
        <div 
          className="relative rounded-xl overflow-hidden w-20 h-40"
          style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.9), rgba(16,185,129,0.9))" }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-2 py-1" style={{ background: "rgba(0,0,0,0.2)" }}>
            <span className="text-white/80" style={{ fontSize: "6px" }}>9:41</span>
            <div className="w-2 h-1.5 bg-white/80 rounded-sm" />
          </div>
          
          {/* App content */}
          <div className="p-2">
            {screen === "home" && (
              <div className="space-y-2">
                <div className="text-white font-bold" style={{ fontSize: "6px" }}>Poputi Taksi</div>
                <div className="flex gap-1">
                  <div className="flex-1 h-6 bg-white/20 rounded-md" />
                  <div className="flex-1 h-6 bg-white/20 rounded-md" />
                </div>
                <div className="h-4 bg-white/10 rounded-md" />
              </div>
            )}
            
            {screen === "posting" && (
              <div className="space-y-1.5">
                <div className="text-white font-bold" style={{ fontSize: "6px" }}>Yangi e'lon</div>
                <div className="h-3 bg-white/30 rounded-sm flex items-center px-1">
                  <span className="text-white/80" style={{ fontSize: "5px" }}>Toshkent</span>
                </div>
                <div className="h-3 bg-white/30 rounded-sm flex items-center px-1">
                  <span className="text-white/80" style={{ fontSize: "5px" }}>Samarqand</span>
                </div>
                <div className="h-5 bg-white rounded-md flex items-center justify-center mt-2">
                  <span className="font-bold" style={{ fontSize: "6px", color: "rgb(59, 130, 246)" }}>Joylash</span>
                </div>
              </div>
            )}
            
            {screen === "searching" && (
              <div className="space-y-1.5">
                <div className="h-4 bg-white/30 rounded-md flex items-center px-1 gap-1">
                  <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
                  <span className="text-white/80" style={{ fontSize: "5px" }}>Qidirish...</span>
                </div>
                <div className="space-y-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-5 bg-white/15 rounded-md animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                  ))}
                </div>
              </div>
            )}
            
            {screen === "booked" && (
              <div className="flex flex-col items-center justify-center h-28">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2" style={{ background: "rgba(52,211,153,0.3)" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="rgb(52,211,153)" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white font-bold" style={{ fontSize: "7px" }}>Tasdiqlandi!</span>
              </div>
            )}
            
            {screen === "journey" && (
              <div className="h-28 relative">
                <div className="absolute inset-0 bg-emerald-900/30 rounded-md">
                  <div className="absolute top-1/2 left-2 right-2 h-1 bg-white/40 rounded-full" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-4 h-2.5 bg-white rounded-sm animate-pulse" />
                  <div className="absolute top-1/2 -translate-y-1/2 right-3 w-2 h-2 rounded-full" style={{ background: "rgb(52,211,153)" }} />
                </div>
                <div className="absolute bottom-1 left-0 right-0 text-center">
                  <span className="text-white/80" style={{ fontSize: "5px" }}>15 daqiqa qoldi</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Home indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white/50 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// Mashina komponenti
function Car({ className, moving = false }: { className?: string; moving?: boolean }) {
  return (
    <div className={cn("relative", className, moving && "animate-pulse")}>
      <div 
        className="absolute inset-0 blur-lg opacity-50"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)" }}
      />
      <svg viewBox="0 0 60 30" className="w-full h-full" style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }}>
        {/* Car body */}
        <path d="M10 20 L15 10 L45 10 L50 20 L50 25 L10 25 Z" fill="rgba(255,255,255,0.8)" />
        {/* Windows */}
        <path d="M17 12 L20 17 L40 17 L43 12 Z" fill="rgba(59,130,246,0.6)" />
        {/* Wheels */}
        <circle cx="18" cy="25" r="5" fill="rgba(30,41,59,0.9)" />
        <circle cx="42" cy="25" r="5" fill="rgba(30,41,59,0.9)" />
        <circle cx="18" cy="25" r="2" fill="rgba(255,255,255,0.5)" />
        <circle cx="42" cy="25" r="2" fill="rgba(255,255,255,0.5)" />
      </svg>
    </div>
  )
}

// Manzil markeri
function LocationMarker({ className, active = false }: { className?: string; active?: boolean }) {
  return (
    <div className={cn("relative", className)}>
      {active && (
        <div 
          className="absolute inset-0 blur-lg animate-pulse"
          style={{ background: "radial-gradient(circle, rgba(52,211,153,0.6) 0%, transparent 70%)" }}
        />
      )}
      <svg 
        viewBox="0 0 24 24" 
        className="w-full h-full"
        style={{ 
          fill: active ? "rgb(52,211,153)" : "rgba(255,255,255,0.4)",
          filter: active ? "drop-shadow(0 0 10px rgba(52,211,153,0.6))" : "none"
        }}
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </div>
  )
}

export function SplashScreen({ onComplete, showDisableOption = false, onDisableAd }: SplashScreenProps) {
  const [step, setStep] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 3800),
      setTimeout(() => setStep(4), 5500),
      setTimeout(() => setStep(5), 7200),
      setTimeout(() => setStep(6), 8800),
      setTimeout(() => {
        setIsExiting(true)
        setTimeout(onComplete, 600)
      }, 10200),
    ]

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  const handleSkip = () => {
    setIsExiting(true)
    setTimeout(onComplete, 400)
  }

  const stepTitles = [
    "",
    "Haydovchi uyda...",
    "E'lon joylashtirdi!",
    "Yo'lovchi qidirmoqda...",
    "Joy band qilindi!",
    "Safar boshlandi!",
    "Manzilga yetdi!"
  ]

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-700",
        isExiting && "opacity-0 scale-105"
      )}
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)" }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `rgba(255,255,255,${0.1 + Math.random() * 0.2})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <div 
          className="absolute w-64 h-64 rounded-full blur-3xl animate-pulse"
          style={{ 
            top: "20%", 
            left: "-10%",
            background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)"
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full blur-3xl animate-pulse"
          style={{ 
            bottom: "20%", 
            right: "-10%",
            background: "radial-gradient(circle, rgba(52,211,153,0.2) 0%, transparent 70%)",
            animationDelay: "1s"
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-sm">
        
        {/* Logo */}
        <div className={cn(
          "mb-4 transition-all duration-700 ease-out",
          step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <div className="relative">
            <div 
              className="absolute inset-0 blur-2xl rounded-full"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)" }}
            />
            <div 
              className="relative w-14 h-14 rounded-xl flex items-center justify-center shadow-xl"
              style={{ 
                background: "linear-gradient(135deg, rgb(59,130,246), rgb(16,185,129))",
                boxShadow: "0 0 30px rgba(59,130,246,0.4)"
              }}
            >
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M8 17l4-4-4-4m5 8l4-4-4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <h1 className="text-lg font-bold text-white text-center mt-2">Poputi Taksi</h1>
        </div>

        {/* Step title */}
        <div className={cn(
          "mb-4 h-6 transition-all duration-500",
          step >= 1 ? "opacity-100" : "opacity-0"
        )}>
          <p className="text-white/70 text-sm text-center">{stepTitles[step]}</p>
        </div>

        {/* Animation Scene */}
        <div className="relative w-full h-56 mb-4 rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
          
          {/* Scene 1-2: Haydovchi uyda e'lon joylashtiryapti */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center gap-4 p-4 transition-all duration-700",
            step >= 1 && step <= 2 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
          )}>
            {/* Uy */}
            <House className={cn(
              "w-16 h-14 transition-all duration-500",
              step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )} />
            
            {/* Haydovchi */}
            <GlowingPerson 
              variant="sitting" 
              color="blue"
              className={cn(
                "w-10 h-20 transition-all duration-500 delay-200",
                step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            />
            
            {/* Telefon */}
            <PhoneWithApp 
              screen={step >= 2 ? "posting" : "home"}
              className={cn(
                "transition-all duration-500 delay-300",
                step >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-75"
              )}
            />
            
            {/* E'lon joylandi badge */}
            {step >= 2 && (
              <div 
                className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-1.5 animate-pulse"
                style={{ 
                  background: "linear-gradient(135deg, rgb(52,211,153), rgb(16,185,129))",
                  boxShadow: "0 4px 15px rgba(52,211,153,0.4)"
                }}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                E'lon joylandi!
              </div>
            )}
          </div>

          {/* Scene 3-4: Yo'lovchi qidirmoqda va band qilmoqda */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center gap-4 p-4 transition-all duration-700",
            step >= 3 && step <= 4 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
          )}>
            {/* Yo'lovchi */}
            <GlowingPerson 
              variant="standing" 
              color="green"
              className={cn(
                "w-10 h-20 transition-all duration-500",
                step >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            />
            
            {/* Telefon */}
            <PhoneWithApp 
              screen={step >= 4 ? "booked" : "searching"}
              className={cn(
                "transition-all duration-500 delay-200",
                step >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-75"
              )}
            />
            
            {/* Band qilindi badge */}
            {step >= 4 && (
              <div 
                className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-1.5 animate-pulse"
                style={{ 
                  background: "linear-gradient(135deg, rgb(59,130,246), rgb(37,99,235))",
                  boxShadow: "0 4px 15px rgba(59,130,246,0.4)"
                }}
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Joy band qilindi!
              </div>
            )}
          </div>

          {/* Scene 5-6: Safar va manzilga yetish */}
          <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-700",
            step >= 5 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
          )}>
            {/* Road */}
            <div className="relative w-full h-3 bg-white/10 rounded-full mb-6 overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 rounded-full transition-all ease-out"
                style={{ 
                  width: step >= 6 ? "100%" : "0%",
                  background: "linear-gradient(90deg, rgb(59,130,246), rgb(52,211,153))",
                  transitionDuration: "2s"
                }}
              />
              {/* Dashed line */}
              <div className="absolute inset-0 flex items-center justify-around">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-4 h-0.5 bg-white/20 rounded-full" />
                ))}
              </div>
            </div>

            {/* Mashina va manzil */}
            <div className="relative w-full flex items-center justify-between">
              {/* Mashina */}
              <div 
                className="transition-all ease-out flex items-center gap-2"
                style={{ 
                  transform: step >= 6 ? "translateX(calc(100% - 4rem))" : "translateX(0)",
                  transitionDuration: "2s"
                }}
              >
                <Car className="w-14 h-8" moving={step >= 5 && step < 6} />
                
                {/* Yo'lovchilar */}
                <div className="flex -ml-8 gap-0.5">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      background: "rgba(59,130,246,0.8)",
                      boxShadow: "0 0 8px rgba(59,130,246,0.5)"
                    }}
                  />
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      background: "rgba(52,211,153,0.8)",
                      boxShadow: "0 0 8px rgba(52,211,153,0.5)"
                    }}
                  />
                </div>
              </div>

              {/* Manzil */}
              <LocationMarker className="w-8 h-8 absolute right-0" active={step >= 6} />
            </div>

            {/* Yetdi celebration */}
            {step >= 6 && (
              <div className="mt-6 flex items-center gap-3">
                <GlowingPerson variant="waving" color="blue" className="w-6 h-12" />
                
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ 
                    background: "linear-gradient(135deg, rgb(52,211,153), rgb(16,185,129))",
                    boxShadow: "0 0 20px rgba(52,211,153,0.5)"
                  }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <GlowingPerson variant="waving" color="green" className="w-6 h-12" />
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
                "w-2 h-2 rounded-full transition-all duration-300",
                step >= s ? "scale-100" : "scale-75 opacity-50"
              )}
              style={{ 
                background: step >= s 
                  ? s <= 2 ? "rgb(59,130,246)" : s <= 4 ? "rgb(52,211,153)" : "rgb(250,204,21)"
                  : "rgba(255,255,255,0.2)"
              }}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-2">
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
              className="text-white/30 hover:text-white/50 transition-colors px-4 py-1"
              style={{ fontSize: "10px" }}
            >
              Reklamani o'chirish
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

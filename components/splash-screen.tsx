"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SplashScreenProps {
  onComplete: () => void
  showDisableOption?: boolean
  onDisableAd?: () => void
}

export function SplashScreen({ onComplete, showDisableOption = false, onDisableAd }: SplashScreenProps) {
  const [step, setStep] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 4000),
      setTimeout(() => setStep(4), 6000),
      setTimeout(() => setStep(5), 8000),
      setTimeout(() => setStep(6), 10000),
      setTimeout(() => {
        setIsExiting(true)
        setTimeout(onComplete, 500)
      }, 12000),
    ]

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  const handleSkip = () => {
    setIsExiting(true)
    setTimeout(onComplete, 300)
  }

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-500",
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      )}
      style={{ background: "linear-gradient(135deg, #0c1929 0%, #1a365d 50%, #0c1929 100%)" }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div 
        className="absolute w-40 h-40 rounded-full opacity-30"
        style={{
          top: "10%",
          left: "10%",
          background: "radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)",
          animation: "pulse 3s ease-in-out infinite"
        }}
      />
      <div 
        className="absolute w-60 h-60 rounded-full opacity-20"
        style={{
          bottom: "10%",
          right: "5%",
          background: "radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)",
          animation: "pulse 4s ease-in-out infinite",
          animationDelay: "1s"
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-xs px-6">
        
        {/* Logo - driver at home image */}
        <div className={cn(
          "transition-all duration-700 flex flex-col items-center",
          step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div 
            className="w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden"
            style={{ 
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 40px rgba(59,130,246,0.4), 0 0 80px rgba(16,185,129,0.2)"
            }}
          >
            <img 
              src="/images/driver-at-home.png" 
              alt="Poputi Taksi" 
              className="w-full h-full object-cover"
              style={{ 
                filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
                opacity: 0.95
              }}
            />
          </div>
          <p className="text-white/80 text-xs font-medium mt-2">Poputi Taksi</p>
        </div>

        {/* Animation Scene */}
        <div 
          className="w-full h-52 mt-6 rounded-2xl overflow-hidden relative"
          style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)" }}
        >
          
          {/* Step 1: Haydovchi uyda - logo rasm */}
          <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center transition-all duration-700",
            step === 1 ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            {/* Poputi Logo */}
            <div 
              className="relative w-28 h-28 overflow-hidden rounded-2xl mb-4"
              style={{ 
                boxShadow: "0 0 40px rgba(59,130,246,0.4), 0 0 60px rgba(16,185,129,0.3)",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)"
              }}
            >
              <img 
                src="/images/poputi-logo.jpg" 
                alt="Poputi Taksi Logo" 
                className="w-full h-full object-contain p-2"
                style={{ 
                  filter: "brightness(1.2) contrast(1.1)",
                  mixBlendMode: "screen",
                  opacity: 0.95
                }}
              />
            </div>
            
            {/* Text */}
            <p className="text-white/90 text-sm font-medium">Haydovchi uyda turib e'lon joylashtiryapti</p>
            <p className="text-white/50 text-xs mt-1">Oson va qulay</p>
          </div>

          {/* Step 2: E'lon joylashtirildi */}
          <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-700",
            step === 2 ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            {/* Telefon katta */}
            <div 
              className="w-20 h-36 rounded-2xl p-1"
              style={{ 
                background: "linear-gradient(180deg, #374151, #1f2937)",
                boxShadow: "0 0 30px rgba(59,130,246,0.4)"
              }}
            >
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex flex-col p-2">
                <div className="text-white font-bold text-center" style={{ fontSize: "7px" }}>Yangi e'lon</div>
                <div className="flex-1 flex flex-col gap-1 mt-2">
                  <div className="h-4 bg-white/30 rounded-md flex items-center px-1">
                    <span className="text-white" style={{ fontSize: "5px" }}>Toshkent</span>
                  </div>
                  <div className="h-4 bg-white/30 rounded-md flex items-center px-1">
                    <span className="text-white" style={{ fontSize: "5px" }}>Samarqand</span>
                  </div>
                  <div className="h-5 bg-white rounded-md flex items-center justify-center mt-1">
                    <span className="text-blue-600 font-bold" style={{ fontSize: "6px" }}>Joylash</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Success badge */}
            <div 
              className="mt-3 px-3 py-1.5 rounded-full flex items-center gap-1.5"
              style={{ 
                background: "linear-gradient(135deg, #10b981, #059669)",
                boxShadow: "0 0 20px rgba(16,185,129,0.5)",
                animation: "pulse 2s ease-in-out infinite"
              }}
            >
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              <span className="text-white text-xs font-semibold">E'lon joylandi!</span>
            </div>
          </div>

          {/* Step 3: Yo'lovchi qidirmoqda */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center gap-6 p-4 transition-all duration-700",
            step === 3 ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            {/* Yo'lovchi */}
            <svg viewBox="0 0 50 100" className="w-12 h-24" style={{ filter: "drop-shadow(0 0 20px rgba(16,185,129,0.5))" }}>
              <defs>
                <linearGradient id="personGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(16,185,129,0.9)"/>
                  <stop offset="100%" stopColor="rgba(16,185,129,0.5)"/>
                </linearGradient>
              </defs>
              <circle cx="25" cy="15" r="12" fill="url(#personGrad2)"/>
              <path d="M15 30 L35 30 L32 60 L18 60 Z" fill="url(#personGrad2)"/>
              <path d="M18 60 L15 95 L22 95 L24 65 L26 65 L28 95 L35 95 L32 60" fill="url(#personGrad2)"/>
              <path d="M15 35 L5 50 L8 52 L18 40" fill="url(#personGrad2)"/>
              <path d="M35 35 L45 50 L42 52 L32 40" fill="url(#personGrad2)"/>
            </svg>
            
            {/* Telefon qidirish */}
            <div 
              className="w-20 h-36 rounded-2xl p-1"
              style={{ 
                background: "linear-gradient(180deg, #374151, #1f2937)",
                boxShadow: "0 0 30px rgba(16,185,129,0.4)"
              }}
            >
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-400 flex flex-col p-2">
                <div className="h-5 bg-white/30 rounded-md flex items-center gap-1 px-1">
                  <div className="w-2 h-2 bg-white/70 rounded-full" style={{ animation: "pulse 1s ease-in-out infinite" }}/>
                  <span className="text-white" style={{ fontSize: "6px" }}>Qidirish...</span>
                </div>
                <div className="flex-1 flex flex-col gap-1 mt-2">
                  {[1,2,3].map(i => (
                    <div 
                      key={i} 
                      className="h-4 bg-white/20 rounded-md"
                      style={{ animation: "pulse 1.5s ease-in-out infinite", animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <p className="absolute bottom-3 text-white/70 text-xs">Yo'lovchi qidirmoqda...</p>
          </div>

          {/* Step 4: Joy band qilindi */}
          <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-700",
            step === 4 ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            {/* Telefon tasdiqlash */}
            <div 
              className="w-20 h-36 rounded-2xl p-1"
              style={{ 
                background: "linear-gradient(180deg, #374151, #1f2937)",
                boxShadow: "0 0 30px rgba(59,130,246,0.4)"
              }}
            >
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex flex-col items-center justify-center">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ background: "rgba(16,185,129,0.3)" }}
                >
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span className="text-white font-bold" style={{ fontSize: "8px" }}>Tasdiqlandi!</span>
              </div>
            </div>
            
            {/* Badge */}
            <div 
              className="mt-3 px-3 py-1.5 rounded-full flex items-center gap-1.5"
              style={{ 
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                boxShadow: "0 0 20px rgba(59,130,246,0.5)",
                animation: "pulse 2s ease-in-out infinite"
              }}
            >
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              <span className="text-white text-xs font-semibold">Joy band qilindi!</span>
            </div>
          </div>

          {/* Step 5: Safar - mashina harakatda */}
          <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-700",
            step === 5 ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            {/* Yo'l */}
            <div className="w-full relative mb-4">
              {/* Yo'l chizig'i */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                  style={{ 
                    width: "60%", 
                    animation: "none",
                    transition: "width 2s ease-out"
                  }}
                />
              </div>
              
              {/* Mashina */}
              <div 
                className="absolute top-1/2 -translate-y-1/2"
                style={{ 
                  left: "50%",
                  animation: "pulse 1s ease-in-out infinite"
                }}
              >
                <svg viewBox="0 0 60 30" className="w-10 h-5" style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))" }}>
                  <path d="M8 18 L12 8 L48 8 L52 18 L52 24 L8 24 Z" fill="rgba(255,255,255,0.9)"/>
                  <path d="M15 10 L18 16 L42 16 L45 10 Z" fill="rgba(59,130,246,0.6)"/>
                  <circle cx="16" cy="24" r="4" fill="#1e293b"/>
                  <circle cx="44" cy="24" r="4" fill="#1e293b"/>
                </svg>
              </div>
              
              {/* Manzil markeri */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#10b981" style={{ filter: "drop-shadow(0 0 8px rgba(16,185,129,0.6))" }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
            </div>
            
            {/* Haydovchi va yo'lovchi */}
            <div className="flex items-center gap-4 mt-4">
              <svg viewBox="0 0 50 100" className="w-8 h-16" style={{ filter: "drop-shadow(0 0 12px rgba(59,130,246,0.5))" }}>
                <circle cx="25" cy="15" r="10" fill="rgba(59,130,246,0.8)"/>
                <path d="M17 28 L33 28 L31 55 L19 55 Z" fill="rgba(59,130,246,0.8)"/>
                <path d="M19 55 L17 85 L23 85 L25 60 L27 85 L33 85 L31 55" fill="rgba(59,130,246,0.8)"/>
              </svg>
              <svg viewBox="0 0 50 100" className="w-8 h-16" style={{ filter: "drop-shadow(0 0 12px rgba(16,185,129,0.5))" }}>
                <circle cx="25" cy="15" r="10" fill="rgba(16,185,129,0.8)"/>
                <path d="M17 28 L33 28 L31 55 L19 55 Z" fill="rgba(16,185,129,0.8)"/>
                <path d="M19 55 L17 85 L23 85 L25 60 L27 85 L33 85 L31 55" fill="rgba(16,185,129,0.8)"/>
              </svg>
            </div>
            
            <p className="text-white/70 text-xs mt-2">Safar davom etmoqda...</p>
          </div>

          {/* Step 6: Manzilga yetib keldingiz */}
          <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-700",
            step === 6 ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            {/* Manzil belgisi */}
            <div 
              className="relative mb-4"
              style={{ animation: "pulse 1.5s ease-in-out infinite" }}
            >
              <svg viewBox="0 0 60 80" className="w-16 h-20" style={{ filter: "drop-shadow(0 0 20px rgba(16,185,129,0.6))" }}>
                <path d="M30 5 C16 5 5 16 5 30 C5 50 30 75 30 75 C30 75 55 50 55 30 C55 16 44 5 30 5 Z" 
                  fill="url(#arrivalGrad)" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
                <defs>
                  <linearGradient id="arrivalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981"/>
                    <stop offset="100%" stopColor="#059669"/>
                  </linearGradient>
                </defs>
                <circle cx="30" cy="28" r="10" fill="rgba(255,255,255,0.9)"/>
                <path d="M26 28 L29 31 L35 25" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* Ikki odam quchoqlashib */}
            <div className="flex items-end gap-2 mb-3">
              {/* Haydovchi */}
              <svg viewBox="0 0 50 100" className="w-10 h-20" style={{ filter: "drop-shadow(0 0 15px rgba(59,130,246,0.6))" }}>
                <circle cx="25" cy="15" r="11" fill="rgba(59,130,246,0.9)"/>
                <path d="M16 30 L34 30 L32 58 L18 58 Z" fill="rgba(59,130,246,0.9)"/>
                <path d="M18 58 L16 90 L23 90 L25 63 L27 90 L34 90 L32 58" fill="rgba(59,130,246,0.9)"/>
                <path d="M34 35 L48 45 L45 48 L32 40" fill="rgba(59,130,246,0.9)"/>
              </svg>
              
              {/* Yo'lovchi */}
              <svg viewBox="0 0 50 100" className="w-10 h-20" style={{ filter: "drop-shadow(0 0 15px rgba(16,185,129,0.6))" }}>
                <circle cx="25" cy="15" r="11" fill="rgba(16,185,129,0.9)"/>
                <path d="M16 30 L34 30 L32 58 L18 58 Z" fill="rgba(16,185,129,0.9)"/>
                <path d="M18 58 L16 90 L23 90 L25 63 L27 90 L34 90 L32 58" fill="rgba(16,185,129,0.9)"/>
                <path d="M16 35 L2 45 L5 48 L18 40" fill="rgba(16,185,129,0.9)"/>
              </svg>
            </div>
            
            {/* Tabriklov yozuvi */}
            <div 
              className="px-5 py-2.5 rounded-full flex items-center gap-2"
              style={{ 
                background: "linear-gradient(135deg, #10b981, #059669)",
                boxShadow: "0 0 30px rgba(16,185,129,0.6), 0 4px 15px rgba(0,0,0,0.3)"
              }}
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              <span className="text-white text-sm font-bold">Manzilga yetib keldingiz!</span>
            </div>
            
            {/* Yulduzchalar */}
            <div className="flex gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className="w-4 h-4" 
                  fill="#fbbf24" 
                  viewBox="0 0 20 20"
                  style={{ 
                    animation: "pulse 1s ease-in-out infinite",
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mt-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                step >= i 
                  ? "bg-white scale-100" 
                  : "bg-white/30 scale-75"
              )}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-2 mt-4">
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
    </div>
  )
}

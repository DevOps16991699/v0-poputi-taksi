"use client"

import { useState, useEffect, createContext, useContext, useCallback } from "react"
import { usePathname } from "next/navigation"
import { SplashScreen } from "./splash-screen"

interface SplashContextType {
  showSplash: boolean
  setShowSplash: (show: boolean) => void
  adEnabled: boolean
  setAdEnabled: (enabled: boolean) => void
  showAdNow: () => void
}

const SplashContext = createContext<SplashContextType | null>(null)

export function useSplash() {
  const context = useContext(SplashContext)
  if (!context) {
    throw new Error("useSplash must be used within SplashProvider")
  }
  return context
}

interface SplashProviderProps {
  children: React.ReactNode
}

// Asosiy sahifalar - bu sahifalarda faolsizlik reklamasi ko'rsatilmaydi
const MAIN_PAGES = ["/", "/login", "/signup"]

// Faolsizlik vaqti (30 soniya)
const IDLE_TIMEOUT = 30 * 1000

export function SplashProvider({ children }: SplashProviderProps) {
  const pathname = usePathname()
  const [showSplash, setShowSplash] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showInitialSplash, setShowInitialSplash] = useState(false)
  const [adEnabled, setAdEnabledState] = useState(true)
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null)

  // Ad sozlamasini localStorage dan yuklash
  useEffect(() => {
    setMounted(true)
    
    const savedAdEnabled = localStorage.getItem("poputi_ad_enabled")
    if (savedAdEnabled !== null) {
      setAdEnabledState(savedAdEnabled === "true")
    }
    
    // Birinchi marta ilova ochilganda splash ko'rsatish
    const lastSeen = localStorage.getItem("poputi_splash_seen")
    const oneHour = 60 * 60 * 1000
    
    if (!lastSeen || Date.now() - parseInt(lastSeen) >= oneHour) {
      setShowInitialSplash(true)
      setShowSplash(true)
    }
  }, [])

  // Ad sozlamasini saqlash
  const setAdEnabled = useCallback((enabled: boolean) => {
    setAdEnabledState(enabled)
    localStorage.setItem("poputi_ad_enabled", enabled.toString())
  }, [])

  // Reklamani hozir ko'rsatish
  const showAdNow = useCallback(() => {
    if (adEnabled) {
      setShowSplash(true)
    }
  }, [adEnabled])

  // Faolsizlik detekti
  const resetIdleTimer = useCallback(() => {
    if (idleTimer) {
      clearTimeout(idleTimer)
    }
    
    // Agar ad o'chirilgan yoki asosiy sahifada bo'lsa, timer qo'ymaymiz
    if (!adEnabled || MAIN_PAGES.includes(pathname)) {
      return
    }
    
    const timer = setTimeout(() => {
      // Foydalanuvchi 30 soniya faolsiz bo'lsa, reklama ko'rsatamiz
      setShowSplash(true)
    }, IDLE_TIMEOUT)
    
    setIdleTimer(timer)
  }, [adEnabled, pathname, idleTimer])

  // Faolsizlik hodisalarini kuzatish
  useEffect(() => {
    if (!mounted || !adEnabled || MAIN_PAGES.includes(pathname)) {
      return
    }

    const events = ["mousedown", "mousemove", "keydown", "scroll", "touchstart", "click"]
    
    const handleActivity = () => {
      resetIdleTimer()
    }
    
    // Event listener qo'shish
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true })
    })
    
    // Dastlabki timer
    resetIdleTimer()
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity)
      })
      if (idleTimer) {
        clearTimeout(idleTimer)
      }
    }
  }, [mounted, adEnabled, pathname, resetIdleTimer])

  // Sahifa o'zgarganda timer ni reset qilish
  useEffect(() => {
    if (idleTimer) {
      clearTimeout(idleTimer)
      setIdleTimer(null)
    }
  }, [pathname])

  const handleSplashComplete = () => {
    setShowSplash(false)
    setShowInitialSplash(false)
    localStorage.setItem("poputi_splash_seen", Date.now().toString())
    // Reklama tugagandan so'ng yangi idle timer boshlash
    resetIdleTimer()
  }

  return (
    <SplashContext.Provider value={{ 
      showSplash, 
      setShowSplash, 
      adEnabled, 
      setAdEnabled,
      showAdNow 
    }}>
      {mounted && showSplash && (
        <SplashScreen 
          onComplete={handleSplashComplete} 
          showDisableOption={!showInitialSplash}
          onDisableAd={() => setAdEnabled(false)}
        />
      )}
      <div className={mounted && showSplash ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-300"}>
        {children}
      </div>
    </SplashContext.Provider>
  )
}

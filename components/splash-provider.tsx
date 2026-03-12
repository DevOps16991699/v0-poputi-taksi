"use client"

import { useState, useEffect, createContext, useContext, useCallback, useRef } from "react"
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

// Faolsizlik vaqti (60 soniya)
const IDLE_TIMEOUT = 60 * 1000

export function SplashProvider({ children }: SplashProviderProps) {
  const pathname = usePathname()
  const [showSplash, setShowSplash] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showInitialSplash, setShowInitialSplash] = useState(false)
  const [adEnabled, setAdEnabledState] = useState(true)
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null)

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
    setShowSplash(true)
  }, [])

  // Sahifa o'zgarganda idle timer ni tozalash
  useEffect(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
      idleTimerRef.current = null
    }
  }, [pathname])

  // Faolsizlik detekti - alohida effect
  useEffect(() => {
    if (!mounted || !adEnabled || MAIN_PAGES.includes(pathname) || showSplash) {
      return
    }

    const startIdleTimer = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
      
      idleTimerRef.current = setTimeout(() => {
        setShowSplash(true)
      }, IDLE_TIMEOUT)
    }

    const handleActivity = () => {
      startIdleTimer()
    }
    
    const events = ["mousedown", "keydown", "scroll", "touchstart"]
    
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true })
    })
    
    // Dastlabki timer
    startIdleTimer()
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity)
      })
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
    }
  }, [mounted, adEnabled, pathname, showSplash])

  const handleSplashComplete = () => {
    setShowSplash(false)
    setShowInitialSplash(false)
    localStorage.setItem("poputi_splash_seen", Date.now().toString())
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

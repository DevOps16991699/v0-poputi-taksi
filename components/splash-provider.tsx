"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { SplashScreen } from "./splash-screen"

interface SplashContextType {
  showSplash: boolean
  setShowSplash: (show: boolean) => void
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

export function SplashProvider({ children }: SplashProviderProps) {
  const [showSplash, setShowSplash] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [shouldShowSplash, setShouldShowSplash] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check if user has seen splash recently (within last hour)
    const lastSeen = localStorage.getItem("poputi_splash_seen")
    const oneHour = 60 * 60 * 1000
    
    if (!lastSeen || Date.now() - parseInt(lastSeen) >= oneHour) {
      setShouldShowSplash(true)
      setShowSplash(true)
    }
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
    setShouldShowSplash(false)
    localStorage.setItem("poputi_splash_seen", Date.now().toString())
  }

  return (
    <SplashContext.Provider value={{ showSplash, setShowSplash }}>
      {mounted && shouldShowSplash && showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      <div className={mounted && shouldShowSplash && showSplash ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-300"}>
        {children}
      </div>
    </SplashContext.Provider>
  )
}

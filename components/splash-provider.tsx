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
  const [showSplash, setShowSplash] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check if user has seen splash recently (within last hour)
    const lastSeen = localStorage.getItem("poputi_splash_seen")
    const oneHour = 60 * 60 * 1000
    
    if (lastSeen && Date.now() - parseInt(lastSeen) < oneHour) {
      setShowSplash(false)
    }
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
    localStorage.setItem("poputi_splash_seen", Date.now().toString())
  }

  if (!mounted) {
    return null
  }

  return (
    <SplashContext.Provider value={{ showSplash, setShowSplash }}>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div className={showSplash ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
        {children}
      </div>
    </SplashContext.Provider>
  )
}

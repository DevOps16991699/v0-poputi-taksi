"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

interface SmartBackButtonProps {
  fallbackUrl?: string
  className?: string
}

export function SmartBackButton({ fallbackUrl = "/", className = "" }: SmartBackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    // Check if there's history to go back to
    if (typeof window !== "undefined" && window.history.length > 2) {
      router.back()
    } else {
      // Fallback to provided URL if no history
      router.push(fallbackUrl)
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center active:scale-95 transition-all hover:bg-muted/80 ${className}`}
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { useCallback, useTransition } from "react"
import { ArrowLeft } from "lucide-react"

interface SmartBackButtonProps {
  fallbackUrl?: string
  className?: string
}

export function SmartBackButton({ fallbackUrl = "/", className = "" }: SmartBackButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleBack = useCallback(() => {
    startTransition(() => {
      // Check if there's history to go back to
      if (typeof window !== "undefined" && window.history.length > 2) {
        router.back()
      } else {
        // Fallback to provided URL if no history
        router.push(fallbackUrl)
      }
    })
  }, [router, fallbackUrl])

  return (
    <button
      onClick={handleBack}
      disabled={isPending}
      className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center active:scale-95 transition-transform disabled:opacity-50 ${className}`}
    >
      <ArrowLeft className={`w-5 h-5 ${isPending ? "animate-pulse" : ""}`} />
    </button>
  )
}

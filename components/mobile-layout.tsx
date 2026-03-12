"use client"

import { useState } from "react"
import { Home, Search, User, Plus, MapPin, Car, MessageCircle, Ticket } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useRole } from "@/contexts/role-context"
import { AppSidebar } from "@/components/app-sidebar"

interface MobileLayoutProps {
  children: React.ReactNode
  showNavigation?: boolean
  showSidebarToggle?: boolean
}

export function MobileLayout({ children, showNavigation = true, showSidebarToggle = true }: MobileLayoutProps) {
  const pathname = usePathname()
  const { role } = useRole()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Haydovchi uchun navigatsiya
  const driverLeftNavItems = [
    { href: "/", icon: Home, label: "Asosiy" },
    { href: "/driver/trips", icon: Ticket, label: "Safarlar" },
  ]
  
  const driverRightNavItems = [
    { href: "/chat", icon: MessageCircle, label: "Chat" },
    { href: "/profile", icon: User, label: "Profil" },
  ]

  // Yo'lovchi uchun navigatsiya
  const passengerLeftNavItems = [
    { href: "/", icon: Home, label: "Asosiy" },
    { href: "/passenger/trips", icon: Ticket, label: "Safarlar" },
  ]
  
  const passengerRightNavItems = [
    { href: "/chat", icon: MessageCircle, label: "Chat" },
    { href: "/profile", icon: User, label: "Profil" },
  ]

  const leftNavItems = role === "driver" ? driverLeftNavItems : passengerLeftNavItems
  const rightNavItems = role === "driver" ? driverRightNavItems : passengerRightNavItems
  const centerHref = role === "driver" ? "/driver" : "/search"
  const CenterIcon = role === "driver" ? Plus : Search

  return (
    <div className="min-h-[100dvh] max-h-[100dvh] bg-background flex flex-col overflow-hidden">
      {/* Status Bar Area - safe area for notch */}
      <div className="h-[env(safe-area-inset-top,0px)] bg-background shrink-0" />

      {/* Sidebar Toggle Button */}
      {showSidebarToggle && (
        <button
          onClick={() => setSidebarOpen(true)}
          className={cn(
            "fixed left-0 top-[calc(env(safe-area-inset-top,0px)+16px)] z-30 flex items-center justify-center w-7 h-14 bg-blue-500 active:bg-blue-600 rounded-r-xl shadow-lg shadow-blue-500/30 transition-all",
            sidebarOpen && "opacity-0 pointer-events-none"
          )}
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-4 h-4 drop-shadow-[0_0_4px_rgba(255,255,255,0.9)]"
            fill="white"
            stroke="white"
          >
            <circle cx="12" cy="4" r="2.5" className="animate-pulse" />
            <path d="M12 8 L12 14" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M12 10 L8 13 M12 10 L16 8" strokeWidth="2" strokeLinecap="round" fill="none" className="origin-center animate-[wave_0.8s_ease-in-out_infinite]" />
            <path d="M12 14 L9 20 M12 14 L15 20" strokeWidth="2" strokeLinecap="round" fill="none" className="origin-top animate-[walk_0.6s_ease-in-out_infinite_alternate]" />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Content Area */}
      <div className={cn(
        "flex-1 scrollbar-none overflow-auto overscroll-contain",
        showNavigation && "pb-[calc(5rem+env(safe-area-inset-bottom,0px))]",
        sidebarOpen && "overflow-hidden"
      )}>
        {children}
      </div>

      {/* Bottom Navigation */}
      {showNavigation && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border pb-[env(safe-area-inset-bottom,0px)]">
          <div className="flex items-center justify-around h-16 px-4">
            {/* Left Nav Items */}
            {leftNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all active:scale-95",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className={cn("h-6 w-6", isActive && "fill-primary/20")} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              )
            })}

            {/* Center Action Button */}
            <Link
              href={centerHref}
              className={cn(
                "flex items-center justify-center w-14 h-14 -mt-8 rounded-full shadow-lg active:scale-95 transition-transform",
                role === "driver" 
                  ? "bg-primary shadow-primary/40" 
                  : "bg-emerald-500 shadow-emerald-500/40 ring-4 ring-emerald-500/20"
              )}
            >
              <CenterIcon className="h-7 w-7 text-white" />
            </Link>

            {/* Right Nav Items */}
            {rightNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all active:scale-95",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className={cn("h-6 w-6", isActive && "fill-primary/20")} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

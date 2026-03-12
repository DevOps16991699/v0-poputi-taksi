"use client"

import { useState } from "react"
import { Home, Search, User, Plus, MapPin, Car, MessageCircle, ChevronRight } from "lucide-react"
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
    { href: "/chat", icon: MessageCircle, label: "Chat" },
  ]
  
  const driverRightNavItems = [
    { href: "/tickets", icon: MapPin, label: "Safarlar" },
    { href: "/profile", icon: User, label: "Profil" },
  ]

  // Yo'lovchi uchun navigatsiya
  const passengerLeftNavItems = [
    { href: "/", icon: Home, label: "Asosiy" },
    { href: "/search", icon: Search, label: "Qidirish" },
  ]
  
  const passengerRightNavItems = [
    { href: "/chat", icon: MessageCircle, label: "Chat" },
    { href: "/profile", icon: User, label: "Profil" },
  ]

  const leftNavItems = role === "driver" ? driverLeftNavItems : passengerLeftNavItems
  const rightNavItems = role === "driver" ? driverRightNavItems : passengerRightNavItems
  const centerHref = role === "driver" ? "/driver" : "/search"

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="relative w-full max-w-[380px] h-[780px] bg-background rounded-[3rem] shadow-2xl overflow-hidden border-8 border-foreground/10">
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-background z-10 flex items-center justify-center">
          <div className="w-24 h-6 bg-foreground/10 rounded-full" />
        </div>

        {/* Sidebar Toggle Button - Always visible on left top */}
        {showSidebarToggle && (
          <button
            onClick={() => setSidebarOpen(true)}
            className={cn(
              "absolute left-0 top-16 z-30 flex items-center justify-center w-6 h-12 bg-primary/90 hover:bg-primary rounded-r-xl shadow-md shadow-primary/20 transition-all",
              sidebarOpen && "opacity-0 pointer-events-none"
            )}
          >
            {/* Animated walking person */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-4 h-4 text-primary-foreground"
              fill="currentColor"
            >
              {/* Head */}
              <circle cx="12" cy="4" r="2.5" className="animate-pulse" />
              {/* Body */}
              <path 
                d="M12 8 L12 14" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                fill="none"
              />
              {/* Arms - waving animation */}
              <path 
                d="M12 10 L8 13 M12 10 L16 8" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
                fill="none"
                className="origin-center animate-[wave_0.8s_ease-in-out_infinite]"
              />
              {/* Legs - walking animation */}
              <path 
                d="M12 14 L9 20 M12 14 L15 20" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
                fill="none"
                className="origin-top animate-[walk_0.6s_ease-in-out_infinite_alternate]"
              />
            </svg>
          </button>
        )}

        {/* Sidebar */}
        <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Content Area */}
        <div className={cn(
          "h-full pt-12 scrollbar-none overflow-auto",
          showNavigation && "pb-20",
          sidebarOpen && "overflow-hidden"
        )}>
          {children}
        </div>

        {/* Bottom Navigation */}
        {showNavigation && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-background border-t border-border">
            <div className="flex items-center justify-around h-full px-4">
              {/* Left Nav Items */}
              {leftNavItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive && "fill-primary/20")} />
                    <span className="text-[10px] font-medium">{item.label}</span>
                  </Link>
                )
              })}

              {/* Center Add Button */}
              <Link
                href={centerHref}
                className={cn(
                  "flex items-center justify-center w-14 h-14 -mt-6 rounded-full shadow-lg hover:scale-105 transition-transform",
                  role === "driver" 
                    ? "bg-primary shadow-primary/40" 
                    : "bg-emerald-500 shadow-emerald-500/40"
                )}
              >
                <Plus className="h-7 w-7 text-white" />
              </Link>

              {/* Right Nav Items */}
              {rightNavItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive && "fill-primary/20")} />
                    <span className="text-[10px] font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-foreground/20 rounded-full" />
          </div>
        )}
      </div>
    </div>
  )
}

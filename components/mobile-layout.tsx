"use client"

import { Home, Search, User, Plus, MapPin, Car, MessageCircle, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useRole } from "@/contexts/role-context"

interface MobileLayoutProps {
  children: React.ReactNode
  showNavigation?: boolean
  lockScroll?: boolean
  sidebar?: React.ReactNode
  onSidebarToggle?: () => void
  sidebarOpen?: boolean
}

export function MobileLayout({ children, showNavigation = true, lockScroll = false, sidebar, onSidebarToggle, sidebarOpen = false }: MobileLayoutProps) {
  const pathname = usePathname()
  const { role } = useRole()

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

        {/* Sidebar Toggle Button - Always visible on left */}
        {onSidebarToggle && (
          <button
            onClick={onSidebarToggle}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-6 h-14 bg-primary/90 hover:bg-primary rounded-r-xl shadow-lg shadow-primary/30 transition-all",
              sidebarOpen && "opacity-0 pointer-events-none"
            )}
          >
            <ChevronRight className="w-4 h-4 text-primary-foreground" />
          </button>
        )}

        {/* Sidebar (rendered outside scrollable area) */}
        {sidebar}

        {/* Content Area */}
        <div className={cn(
          "h-full pt-12 scrollbar-none",
          showNavigation && "pb-20",
          lockScroll ? "overflow-hidden" : "overflow-auto"
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

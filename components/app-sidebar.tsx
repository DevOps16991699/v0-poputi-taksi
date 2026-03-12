"use client"

import { cn } from "@/lib/utils"
import { User, Car, Settings, X, ChevronRight, MapPin, History, Search, Plus, Ticket, Users } from "lucide-react"
import { PoputiLogo } from "@/components/poputi-logo"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRole } from "@/contexts/role-context"

interface AppSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const pathname = usePathname()
  const { role } = useRole()

  // Haydovchi uchun menyu
  const driverMenuItems = [
    { href: "/profile", icon: User, label: "Profil" },
    { href: "/driver", icon: Plus, label: "E'lon joylash" },
    { href: "/tickets", icon: Ticket, label: "Mening e'lonlarim" },
    { href: "/settings", icon: Settings, label: "Sozlamalar" },
  ]

  // Yo'lovchi uchun menyu
  const passengerMenuItems = [
    { href: "/profile", icon: User, label: "Profil" },
    { href: "/search", icon: Search, label: "Safar qidirish" },
    { href: "/rides", icon: MapPin, label: "Safarlar" },
    { href: "/my-rides", icon: History, label: "Band qilganlarim" },
    { href: "/settings", icon: Settings, label: "Sozlamalar" },
  ]

  const menuItems = role === "driver" ? driverMenuItems : passengerMenuItems

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-foreground/40 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "absolute top-0 left-0 bottom-0 w-[280px] bg-background z-50 transition-transform duration-300 ease-out shadow-2xl flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="pt-4 px-6 pb-5 bg-linear-to-br from-primary to-primary/80 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* User Info */}
          <div className="flex items-center gap-4 mt-6">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center ring-4 ring-primary-foreground/30">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-foreground">Jamshid Karimov</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium",
                  role === "driver" 
                    ? "bg-primary-foreground/20 text-primary-foreground" 
                    : "bg-emerald-500/80 text-white"
                )}>
                  {role === "driver" ? <Car className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                  {role === "driver" ? "Haydovchi" : "Yo'lovchi"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-none">          {/* Profile Tab - Separate Style */}
          <div className="px-4 pt-4">
            <Link
              href="/profile"
              onClick={onClose}
              className={cn(
                "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group border-2",
                pathname === "/profile"
                  ? "bg-primary/10 border-primary text-foreground"
                  : "border-transparent bg-muted hover:bg-muted/80"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center",
                pathname === "/profile"
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10"
              )}>
                <User className={cn(
                  "w-6 h-6",
                  pathname === "/profile" ? "text-primary-foreground" : "text-primary"
                )} />
              </div>
              <div className="flex-1">
                <span className="font-semibold block">Profil</span>
                <span className="text-xs text-muted-foreground">Shaxsiy ma'lumotlar</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-4">
              Asosiy menyu
            </p>
            <div className="space-y-1">
              {menuItems.slice(1).map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-xl transition-all group",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <div
                      className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center transition-colors",
                        isActive
                          ? "bg-primary-foreground/20"
                          : "bg-muted group-hover:bg-primary/10"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "w-5 h-5",
                          isActive ? "text-primary-foreground" : "text-primary"
                        )}
                      />
                    </div>
                    <span className="font-medium flex-1">{item.label}</span>
                    <ChevronRight
                      className={cn(
                        "w-5 h-5 transition-colors",
                        isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}
                    />
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>

        {/* Footer - Sticky at bottom */}
        <div className="flex-shrink-0 p-4">
          <div className="p-4 rounded-2xl bg-linear-to-br from-primary/10 to-accent/50 border border-primary/20">
            <div className="flex items-center justify-center">
              <PoputiLogo size="sm" />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">v1.0 - Hamkorlik taksi</p>
          </div>
        </div>
      </div>
    </>
  )
}

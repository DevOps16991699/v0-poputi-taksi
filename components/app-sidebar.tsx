"use client"

import { cn } from "@/lib/utils"
import { 
  User, 
  Car, 
  ChevronRight, 
  Users, 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  HelpCircle, 
  LogOut, 
  X,
  MapPin,
  Star,
  Ticket,
  Settings,
  MessageCircle
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useRole } from "@/contexts/role-context"

interface AppSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const mainMenuItems = [
  { icon: User, label: "Profil", description: "Shaxsiy ma'lumotlar", href: "/profile" },
  { icon: Car, label: "Mashinalarim", description: "Avtomobillar ro'yxati", href: "/profile/my-cars" },
  { icon: MapPin, label: "Manzillarim", description: "Saqlangan manzillar", href: "/profile/addresses" },
  { icon: Star, label: "Baholar", description: "Mening baholarim", href: "/profile/reviews" },
  { icon: Ticket, label: "Safarlarim", description: "Safar tarixi", href: "/my-rides" },
  { icon: MessageCircle, label: "Xabarlar", description: "Chat va xabarlar", href: "/chat" },
]

const settingsMenuItems = [
  {
    title: "Sozlamalar",
    items: [
      { icon: Bell, label: "Bildirishnomalar", description: "Push xabarnomalari", href: "/settings/notifications" },
      { icon: Moon, label: "Ko'rinish", description: "Yorug' / Qorong'i rejim", href: "/settings/appearance" },
      { icon: Globe, label: "Til", description: "O'zbek", href: "/settings/language" },
      { icon: Shield, label: "Maxfiylik", description: "Ma'lumotlar xavfsizligi", href: "/settings/privacy" },
    ],
  },
  {
    title: "Qo'llab-quvvatlash",
    items: [
      { icon: HelpCircle, label: "Yordam markazi", description: "Savol va javoblar", href: "/settings" },
    ],
  },
]

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const { role, setRole } = useRole()
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  const handleLogout = () => {
    // Clear any stored data
    localStorage.removeItem("poputi_splash_seen")
    localStorage.removeItem("poputi_user_token")
    localStorage.removeItem("poputi_user_data")
    
    onClose()
    router.push("/login")
  }

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
          "absolute top-0 left-0 bottom-0 w-[200px] bg-background z-50 transition-transform duration-300 ease-out shadow-2xl flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="pt-4 px-3 pb-4 bg-gradient-to-br from-primary via-primary to-primary/90 flex-shrink-0">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* User Info */}
          <Link href="/profile" onClick={onClose} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center ring-2 ring-primary-foreground/30 group-hover:ring-primary-foreground/50 transition-all">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-primary-foreground truncate">Jamshid K.</p>
              <p className="text-[10px] text-primary-foreground/70">+998 90 123 45 67</p>
            </div>
          </Link>

          {/* Role Selection */}
          <div className="mt-3 bg-primary-foreground/10 rounded-xl p-1 flex gap-1">
            <button
              onClick={() => setRole("driver")}
              className={cn(
                "flex-1 flex items-center justify-center gap-1 py-2 px-2 rounded-lg text-xs font-medium transition-all duration-200",
                role === "driver"
                  ? "bg-primary-foreground text-primary shadow-lg shadow-primary/20"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 active:bg-primary-foreground/20"
              )}
            >
              <Car className="w-3.5 h-3.5" />
              Haydovchi
            </button>
            <button
              onClick={() => setRole("passenger")}
              className={cn(
                "flex-1 flex items-center justify-center gap-1 py-2 px-2 rounded-lg text-xs font-medium transition-all duration-200",
                role === "passenger"
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 active:bg-primary-foreground/20"
              )}
            >
              <Users className="w-3.5 h-3.5" />
              Yo'lovchi
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
          {/* Main Menu */}
          <div className="p-2">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
              Asosiy
            </p>
            <div className="space-y-0.5">
              {mainMenuItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 group",
                      active 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted active:bg-muted/80 text-foreground"
                    )}
                  >
                    <div className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200",
                      active 
                        ? "bg-primary text-primary-foreground shadow-sm" 
                        : "bg-muted group-hover:bg-muted-foreground/10"
                    )}>
                      <item.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className={cn(
                      "font-medium text-xs flex-1",
                      active && "text-primary"
                    )}>{item.label}</span>
                    <ChevronRight className={cn(
                      "w-3 h-3 text-muted-foreground flex-shrink-0 transition-all duration-200",
                      active && "text-primary",
                      "group-hover:translate-x-0.5"
                    )} />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="mx-2 h-px bg-border" />

          {/* Settings Menu Groups */}
          <div className="p-2 space-y-3">
            {settingsMenuItems.map((group) => (
              <div key={group.title}>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                  {group.title}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = isActive(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-200 group",
                          active 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-muted active:bg-muted/80 text-foreground"
                        )}
                      >
                        <div className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200",
                          active 
                            ? "bg-primary text-primary-foreground shadow-sm" 
                            : "bg-muted group-hover:bg-muted-foreground/10"
                        )}>
                          <item.icon className="w-3.5 h-3.5" />
                        </div>
                        <span className={cn(
                          "font-medium text-xs flex-1",
                          active && "text-primary"
                        )}>{item.label}</span>
                        <ChevronRight className={cn(
                          "w-3 h-3 text-muted-foreground flex-shrink-0 transition-all duration-200",
                          active && "text-primary",
                          "group-hover:translate-x-0.5"
                        )} />
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <div className="px-2 pb-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-2 py-2 rounded-lg bg-destructive/5 hover:bg-destructive/10 active:bg-destructive/15 transition-all duration-200 text-destructive group"
            >
              <div className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                <LogOut className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-xs">Chiqish</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-2 py-2 border-t border-border bg-muted/30">
          <p className="text-[10px] text-muted-foreground text-center">Poputi Taksi v1.0</p>
        </div>
      </div>
    </>
  )
}

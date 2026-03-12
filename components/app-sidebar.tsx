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
import { usePathname } from "next/navigation"
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

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
          "absolute top-0 left-0 bottom-0 w-[300px] bg-background z-50 transition-transform duration-300 ease-out shadow-2xl flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="pt-6 px-5 pb-5 bg-gradient-to-br from-primary via-primary to-primary/90 flex-shrink-0">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          {/* User Info */}
          <Link href="/profile" onClick={onClose} className="flex items-center gap-3 group">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center ring-2 ring-primary-foreground/30 group-hover:ring-primary-foreground/50 transition-all">
              <User className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-primary-foreground">Jamshid Karimov</p>
              <p className="text-xs text-primary-foreground/70">+998 90 123 45 67</p>
            </div>
            <ChevronRight className="w-5 h-5 text-primary-foreground/50 group-hover:text-primary-foreground/80 group-hover:translate-x-0.5 transition-all" />
          </Link>

          {/* Role Selection */}
          <div className="mt-5 bg-primary-foreground/10 rounded-2xl p-1.5 flex gap-1.5">
            <button
              onClick={() => setRole("driver")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200",
                role === "driver"
                  ? "bg-primary-foreground text-primary shadow-lg shadow-primary/20"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 active:bg-primary-foreground/20"
              )}
            >
              <Car className="w-4 h-4" />
              Haydovchi
            </button>
            <button
              onClick={() => setRole("passenger")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200",
                role === "passenger"
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 active:bg-primary-foreground/20"
              )}
            >
              <Users className="w-4 h-4" />
              Yo'lovchi
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
          {/* Main Menu */}
          <div className="p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
              Asosiy
            </p>
            <div className="space-y-1">
              {mainMenuItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                      active 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted active:bg-muted/80 text-foreground"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                      active 
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" 
                        : "bg-muted group-hover:bg-muted-foreground/10"
                    )}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "font-medium text-sm",
                        active && "text-primary"
                      )}>{item.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                    </div>
                    <ChevronRight className={cn(
                      "w-4 h-4 text-muted-foreground flex-shrink-0 transition-all duration-200",
                      active && "text-primary",
                      "group-hover:translate-x-0.5"
                    )} />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="mx-4 h-px bg-border" />

          {/* Settings Menu Groups */}
          <div className="p-4 space-y-4">
            {settingsMenuItems.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                  {group.title}
                </p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = isActive(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                          active 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-muted active:bg-muted/80 text-foreground"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                          active 
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" 
                            : "bg-muted group-hover:bg-muted-foreground/10"
                        )}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "font-medium text-sm",
                            active && "text-primary"
                          )}>{item.label}</p>
                          <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                        </div>
                        <ChevronRight className={cn(
                          "w-4 h-4 text-muted-foreground flex-shrink-0 transition-all duration-200",
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
          <div className="px-4 pb-4">
            <Link
              href="/login"
              onClick={onClose}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-destructive/5 hover:bg-destructive/10 active:bg-destructive/15 transition-all duration-200 text-destructive group"
            >
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm">Chiqish</span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-4 py-3 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground text-center">Poputi Taksi v1.0</p>
        </div>
      </div>
    </>
  )
}

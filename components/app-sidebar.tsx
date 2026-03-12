"use client"

import { cn } from "@/lib/utils"
import { User, Car, X, ChevronRight, Users, Bell, Moon, Globe, Shield, Smartphone, HelpCircle, LogOut } from "lucide-react"
import { PoputiLogo } from "@/components/poputi-logo"
import Link from "next/link"
import { useRole } from "@/contexts/role-context"

interface AppSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const settingsMenuItems = [
  {
    title: "Ilova",
    items: [
      { icon: Bell, label: "Bildirishnomalar", description: "Push xabarnomalari", href: "#" },
      { icon: Moon, label: "Ko'rinish", description: "Yorug' / Qorong'i rejim", href: "#" },
      { icon: Globe, label: "Til", description: "O'zbek", href: "#" },
    ],
  },
  {
    title: "Hisob",
    items: [
      { icon: Shield, label: "Maxfiylik", description: "Ma'lumotlar xavfsizligi", href: "#" },
      { icon: Smartphone, label: "Qurilmalar", description: "Ulangan qurilmalar", href: "#" },
    ],
  },
  {
    title: "Qo'llab-quvvatlash",
    items: [
      { icon: HelpCircle, label: "Yordam", description: "Ko'p so'raladigan savollar", href: "#" },
    ],
  },
]

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const { role } = useRole()

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
          {/* Top row: Close button, Role badge, Logo */}
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Role Badge - Center */}
            <span className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
              role === "driver" 
                ? "bg-primary-foreground/20 text-primary-foreground" 
                : "bg-emerald-500/80 text-white"
            )}>
              {role === "driver" ? <Car className="w-3.5 h-3.5" /> : <Users className="w-3.5 h-3.5" />}
              {role === "driver" ? "Haydovchi sifatida" : "Yo'lovchi sifatida"}
            </span>
            
            {/* Logo placeholder for alignment */}
            <div className="w-8 h-8" />
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4 mt-5">
            <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center ring-4 ring-primary-foreground/30">
              <User className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-foreground">Jamshid Karimov</h3>
              <p className="text-sm text-primary-foreground/70">+998 90 123 45 67</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
          {/* Settings Menu Groups */}
          <div className="p-4 space-y-5">
            {settingsMenuItems.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                  {group.title}
                </p>
                <div className="bg-muted/50 rounded-2xl overflow-hidden">
                  {group.items.map((item, index) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors",
                        index !== group.items.length - 1 && "border-b border-border/50"
                      )}
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <div className="px-4 pb-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-destructive/10 hover:bg-destructive/20 transition-colors text-destructive">
              <div className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center">
                <LogOut className="w-4.5 h-4.5" />
              </div>
              <span className="font-medium text-sm">Chiqish</span>
            </button>
          </div>
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

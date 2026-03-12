"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Car, Eye, EyeOff, Phone, Lock, User } from "lucide-react"
import { PoputiLogo } from "@/components/poputi-logo"
import Link from "next/link"
import { useRole } from "@/contexts/role-context"

export default function SignupPage() {
  const router = useRouter()
  const { setRole } = useRole()
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"passenger" | "driver">("passenger")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Tanlangan rolni saqlash va kirib ketish
    setRole(userType)
    localStorage.setItem("poputi_user_token", "demo_token")
    localStorage.setItem("poputi_user_data", JSON.stringify({ name, phone, userType }))
    router.push("/")
  }

  return (
    <MobileLayout showNavigation={false}>
      <div className="flex flex-col min-h-full bg-linear-to-br from-primary/5 to-background px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          {/* Logo */}
          <PoputiLogo size="md" />
          <p className="text-muted-foreground text-sm text-center mt-2">
            Ro'yxatdan o'ting va safarni boshlang
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setUserType("passenger")}
            className={`p-4 rounded-2xl border-2 transition-all ${
              userType === "passenger"
                ? "border-primary bg-primary/10"
                : "border-border bg-background hover:border-primary/50"
            }`}
          >
            <User className={`w-6 h-6 mx-auto mb-2 ${userType === "passenger" ? "text-primary" : "text-muted-foreground"}`} />
            <p className={`text-sm font-medium ${userType === "passenger" ? "text-primary" : "text-foreground"}`}>
              Yo'lovchi
            </p>
          </button>
          <button
            type="button"
            onClick={() => setUserType("driver")}
            className={`p-4 rounded-2xl border-2 transition-all ${
              userType === "driver"
                ? "border-primary bg-primary/10"
                : "border-border bg-background hover:border-primary/50"
            }`}
          >
            <Car className={`w-6 h-6 mx-auto mb-2 ${userType === "driver" ? "text-primary" : "text-muted-foreground"}`} />
            <p className={`text-sm font-medium ${userType === "driver" ? "text-primary" : "text-foreground"}`}>
              Haydovchi
            </p>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <User className="w-5 h-5" />
            </div>
            <Input
              type="text"
              placeholder="Ism Familiya"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-14 pl-12 pr-4 rounded-2xl bg-background border-border shadow-sm focus:shadow-md transition-shadow text-base"
              required
            />
          </div>

          {/* Phone Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Phone className="w-5 h-5" />
            </div>
            <Input
              type="tel"
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-14 pl-12 pr-4 rounded-2xl bg-background border-border shadow-sm focus:shadow-md transition-shadow text-base"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Lock className="w-5 h-5" />
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-14 pl-12 pr-12 rounded-2xl bg-background border-border shadow-sm focus:shadow-md transition-shadow text-base"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Terms */}
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Ro'yxatdan o'tish orqali siz{" "}
            <Link href="#" className="text-primary hover:underline">Foydalanish shartlari</Link>
            {" "}va{" "}
            <Link href="#" className="text-primary hover:underline">Maxfiylik siyosati</Link>
            ga rozilik bildirasiz
          </p>

          {/* Sign Up Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-2xl h-14 text-base font-semibold shadow-lg shadow-primary/30 bg-primary hover:bg-primary/90 mt-2"
          >
            Ro'yxatdan o'tish
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-auto pt-6 text-center">
          <p className="text-muted-foreground text-sm">
            Hisobingiz bormi?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </MobileLayout>
  )
}

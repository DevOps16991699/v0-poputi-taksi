"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Phone, Lock } from "lucide-react"
import { PoputiLogo } from "@/components/poputi-logo"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Hozircha to'g'ridan-to'g'ri kirib ketadi
    localStorage.setItem("poputi_user_token", "demo_token")
    localStorage.setItem("poputi_user_data", JSON.stringify({ phone, name: "Foydalanuvchi" }))
    router.push("/")
  }

  return (
    <MobileLayout showNavigation={false}>
      <div className="flex flex-col min-h-full bg-linear-to-br from-primary/5 to-background px-8 py-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          {/* Logo */}
          <PoputiLogo size="lg" />
          <p className="text-muted-foreground text-sm text-center mt-4">
            Hisobingizga kiring va safarni boshlang
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

          {/* Forgot Password */}
          <div className="text-right">
            <Link href="#" className="text-sm text-primary hover:underline">
              Parolni unutdingizmi?
            </Link>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-2xl h-14 text-base font-semibold shadow-lg shadow-primary/30 bg-primary hover:bg-primary/90 mt-2"
          >
            Kirish
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-auto pt-10 text-center">
          <p className="text-muted-foreground text-sm">
            Hisobingiz yo'qmi?{" "}
            <Link href="/signup" className="text-primary font-semibold hover:underline">
              Ro'yxatdan o'tish
            </Link>
          </p>
        </div>
      </div>
    </MobileLayout>
  )
}

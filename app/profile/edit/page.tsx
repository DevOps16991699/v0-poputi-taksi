"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Camera,
  Check,
  Loader2
} from "lucide-react"
import Link from "next/link"

export default function EditProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "Jamshid Karimov",
    phone: "+998 90 123 45 67",
    email: "jamshid@example.com",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const handleImageUpload = () => {
    // Trigger file input click
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        // Handle image upload
        console.log('Selected file:', file.name)
      }
    }
    input.click()
  }

  return (
    <MobileLayout showSidebarToggle={false}>
      <div className="flex flex-col min-h-full bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-bold text-foreground">Profilni tahrirlash</h1>
          </div>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center py-8 bg-gradient-to-br from-primary/5 to-background">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-xl">
              <User className="w-14 h-14 text-primary-foreground" />
            </div>
            <button
              onClick={handleImageUpload}
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg border-4 border-background hover:bg-primary/90 transition-colors"
            >
              <Camera className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">Rasmni o'zgartirish uchun bosing</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 px-6 py-6 space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              To'liq ism
            </Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-12 h-14 rounded-2xl border-border bg-muted/50 focus:bg-background transition-colors"
                placeholder="Ismingiz"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-foreground">
              Telefon raqam
            </Label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-12 h-14 rounded-2xl border-border bg-muted/50 focus:bg-background transition-colors"
                placeholder="+998 90 123 45 67"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-12 h-14 rounded-2xl border-border bg-muted/50 focus:bg-background transition-colors"
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-base font-semibold shadow-lg shadow-primary/30"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saqlanmoqda...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Saqlash
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </MobileLayout>
  )
}

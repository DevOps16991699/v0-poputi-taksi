"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  MapPin,
  Navigation,
  Calendar,
  Clock,
  Users,
  Car,
  Banknote,
  Plus
} from "lucide-react"

export default function DriverPage() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [seats, setSeats] = useState("")
  const [price, setPrice] = useState("")
  const [carModel, setCarModel] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New ride:", { from, to, date, time, seats, price, carModel })
    // Reset form
    setFrom("")
    setTo("")
    setDate("")
    setTime("")
    setSeats("")
    setPrice("")
    setCarModel("")
  }

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-full bg-linear-to-br from-primary/5 to-background">
        {/* Header */}
        <header className="px-6 py-4">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            E'lon joylash
          </h1>
          <p className="text-sm text-muted-foreground">
            Safar ma'lumotlarini kiriting
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 px-6 pb-6">
          <div className="bg-background rounded-2xl p-5 shadow-lg border border-border/50 space-y-4">
            {/* From */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Qayerdan
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                <Input
                  placeholder="Masalan: Toshkent"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-border"
                  required
                />
              </div>
            </div>

            {/* To */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Qayerga
              </label>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input
                  placeholder="Masalan: Samarqand"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-border"
                  required
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Sana
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-border"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Vaqt
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-border"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Seats & Price */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Bo'sh joy
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="number"
                    min="1"
                    max="7"
                    placeholder="1-7"
                    value={seats}
                    onChange={(e) => setSeats(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-border"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Narx (so'm)
                </label>
                <div className="relative">
                  <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="80000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="pl-10 h-12 rounded-xl border-border"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Car Model */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Avtomobil
              </label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Masalan: Cobalt"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-border"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-2xl h-14 text-base font-semibold shadow-lg shadow-primary/30 bg-primary hover:bg-primary/90 mt-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            E'lon joylash
          </Button>

          {/* Info */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            E'lon 24 soat davomida faol bo'ladi. Keyin avtomatik o'chiriladi.
          </p>
        </form>
      </div>
    </MobileLayout>
  )
}

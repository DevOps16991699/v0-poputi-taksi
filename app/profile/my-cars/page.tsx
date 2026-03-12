"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { SmartBackButton } from "@/components/smart-back-button"
import { Button } from "@/components/ui/button"
import {
  Car,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Palette
} from "lucide-react"

interface CarItem {
  id: string
  brand: string
  model: string
  color: string
  plateNumber: string
  year: number
  isDefault: boolean
}

const initialCars: CarItem[] = [
  {
    id: "1",
    brand: "Chevrolet",
    model: "Malibu",
    color: "Oq",
    plateNumber: "01 A 123 AA",
    year: 2020,
    isDefault: true
  },
  {
    id: "2",
    brand: "Chevrolet",
    model: "Lacetti",
    color: "Qora",
    plateNumber: "01 B 456 BB",
    year: 2018,
    isDefault: false
  }
]

export default function MyCarsPage() {
  const [cars, setCars] = useState<CarItem[]>(initialCars)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    color: "",
    plateNumber: "",
    year: new Date().getFullYear()
  })

  const handleSetDefault = (id: string) => {
    setCars(cars.map(car => ({
      ...car,
      isDefault: car.id === id
    })))
  }

  const handleDelete = (id: string) => {
    setCars(cars.filter(car => car.id !== id))
  }

  const handleAddCar = () => {
    if (newCar.brand && newCar.model && newCar.plateNumber) {
      const car: CarItem = {
        id: Date.now().toString(),
        ...newCar,
        isDefault: cars.length === 0
      }
      setCars([...cars, car])
      setNewCar({ brand: "", model: "", color: "", plateNumber: "", year: new Date().getFullYear() })
      setShowAddForm(false)
    }
  }

  return (
    <MobileLayout showSidebarToggle={false}>
      <div className="flex flex-col min-h-full bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
<div className="flex items-center gap-3">
            <SmartBackButton fallbackUrl="/profile" />
              <h1 className="text-lg font-bold text-foreground">Mening avtomobillarim</h1>
            </div>
            <Button
              size="sm"
              onClick={() => setShowAddForm(true)}
              className="rounded-xl bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-1" />
              Qo'shish
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-4 space-y-4">
          {/* Add Form */}
          {showAddForm && (
            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Yangi avtomobil</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddForm(false)}
                  className="rounded-xl h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Marka"
                  value={newCar.brand}
                  onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                  className="h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="text"
                  placeholder="Model"
                  value={newCar.model}
                  onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                  className="h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="text"
                  placeholder="Rang"
                  value={newCar.color}
                  onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
                  className="h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="number"
                  placeholder="Yil"
                  value={newCar.year}
                  onChange={(e) => setNewCar({ ...newCar, year: parseInt(e.target.value) })}
                  className="h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <input
                type="text"
                placeholder="Davlat raqami (01 A 123 AA)"
                value={newCar.plateNumber}
                onChange={(e) => setNewCar({ ...newCar, plateNumber: e.target.value })}
                className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              
              <Button
                onClick={handleAddCar}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90"
              >
                <Check className="w-4 h-4 mr-2" />
                Saqlash
              </Button>
            </div>
          )}

          {/* Cars List */}
          {cars.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <Car className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Avtomobil yo'q</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Hali avtomobil qo'shilmagan
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="rounded-xl bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Avtomobil qo'shish
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className={`bg-background rounded-2xl p-4 shadow-lg border ${
                    car.isDefault ? "border-primary" : "border-border/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      car.isDefault ? "bg-primary/10" : "bg-muted"
                    }`}>
                      <Car className={`w-7 h-7 ${car.isDefault ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {car.brand} {car.model}
                        </h3>
                        {car.isDefault && (
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                            Asosiy
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {car.plateNumber}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Palette className="w-3.5 h-3.5" />
                          {car.color}
                        </span>
                        <span>{car.year} yil</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                    {!car.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(car.id)}
                        className="flex-1 rounded-xl text-xs"
                      >
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Asosiy qilish
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl text-xs"
                    >
                      <Edit2 className="w-3.5 h-3.5 mr-1" />
                      Tahrirlash
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(car.id)}
                      className="rounded-xl text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  )
}

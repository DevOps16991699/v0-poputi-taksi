"use client"

import { useState } from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Home,
  Briefcase,
  Star
} from "lucide-react"
import Link from "next/link"

interface AddressItem {
  id: string
  name: string
  address: string
  type: "home" | "work" | "other"
  isDefault: boolean
}

const initialAddresses: AddressItem[] = [
  {
    id: "1",
    name: "Uy",
    address: "Toshkent sh., Chilonzor t., 19-kvartal, 5-uy",
    type: "home",
    isDefault: true
  },
  {
    id: "2",
    name: "Ish joyi",
    address: "Toshkent sh., Mirzo Ulug'bek t., IT Park",
    type: "work",
    isDefault: false
  }
]

const addressTypes = [
  { id: "home" as const, icon: Home, label: "Uy" },
  { id: "work" as const, icon: Briefcase, label: "Ish" },
  { id: "other" as const, icon: MapPin, label: "Boshqa" }
]

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<AddressItem[]>(initialAddresses)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    type: "other" as "home" | "work" | "other"
  })

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })))
  }

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
  }

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.address) {
      const address: AddressItem = {
        id: Date.now().toString(),
        ...newAddress,
        isDefault: addresses.length === 0
      }
      setAddresses([...addresses, address])
      setNewAddress({ name: "", address: "", type: "other" })
      setShowAddForm(false)
    }
  }

  const getTypeIcon = (type: "home" | "work" | "other") => {
    const typeInfo = addressTypes.find(t => t.id === type)
    return typeInfo ? typeInfo.icon : MapPin
  }

  return (
    <MobileLayout showSidebarToggle={false}>
      <div className="flex flex-col min-h-full bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-lg font-bold text-foreground">Saqlangan manzillar</h1>
            </div>
            <Button
              size="sm"
              onClick={() => setShowAddForm(true)}
              className="rounded-xl bg-emerald-500 hover:bg-emerald-500/90"
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
            <div className="bg-emerald-500/5 rounded-2xl p-4 border border-emerald-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Yangi manzil</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddForm(false)}
                  className="rounded-xl h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Type Selection */}
              <div className="flex gap-2">
                {addressTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setNewAddress({ ...newAddress, type: type.id })}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                      newAddress.type === type.id
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-600"
                        : "border-border bg-background text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <type.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{type.label}</span>
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Manzil nomi (masalan: Uy, Ish)"
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                className="w-full h-12 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              
              <textarea
                placeholder="To'liq manzil"
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
              />
              
              <Button
                onClick={handleAddAddress}
                className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-500/90"
              >
                <Check className="w-4 h-4 mr-2" />
                Saqlash
              </Button>
            </div>
          )}

          {/* Addresses List */}
          {addresses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <MapPin className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Manzil yo'q</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Hali manzil saqlanmagan
              </p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="rounded-xl bg-emerald-500 hover:bg-emerald-500/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Manzil qo'shish
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => {
                const TypeIcon = getTypeIcon(addr.type)
                return (
                  <div
                    key={addr.id}
                    className={`bg-background rounded-2xl p-4 shadow-lg border ${
                      addr.isDefault ? "border-emerald-500" : "border-border/50"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        addr.isDefault ? "bg-emerald-500/10" : "bg-muted"
                      }`}>
                        <TypeIcon className={`w-6 h-6 ${addr.isDefault ? "text-emerald-500" : "text-muted-foreground"}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{addr.name}</h3>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 text-xs font-medium rounded-full flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Asosiy
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {addr.address}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                      {!addr.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetDefault(addr.id)}
                          className="flex-1 rounded-xl text-xs"
                        >
                          <Star className="w-3.5 h-3.5 mr-1" />
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
                        onClick={() => handleDelete(addr.id)}
                        className="rounded-xl text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  )
}

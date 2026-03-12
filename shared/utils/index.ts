// ============================================
// Shared Utilities - Platform Agnostic
// These utilities can be used in both Next.js and React Native
// ============================================

import type { Ride, SearchFilters } from '../types'
import { VALIDATION } from '../constants'

// ============================================
// Formatting Utilities
// ============================================

/**
 * Format price with thousands separator
 */
export function formatPrice(price: number): string {
  return price.toLocaleString('uz-UZ') + " so'm"
}

/**
 * Format price short (e.g., 100k)
 */
export function formatPriceShort(price: number): string {
  if (price >= 1000000) {
    return (price / 1000000).toFixed(1) + 'M'
  }
  if (price >= 1000) {
    return (price / 1000).toFixed(0) + 'k'
  }
  return price.toString()
}

/**
 * Format phone number
 */
export function formatPhone(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '')
  
  // Format as +998 XX XXX XX XX
  if (digits.length === 12 && digits.startsWith('998')) {
    return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`
  }
  
  return phone
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  if (isSameDay(d, today)) {
    return 'Bugun'
  }
  if (isSameDay(d, tomorrow)) {
    return 'Ertaga'
  }
  
  return d.toLocaleDateString('uz-UZ', {
    day: 'numeric',
    month: 'long'
  })
}

/**
 * Format time to HH:MM
 */
export function formatTime(time: string | Date): string {
  if (typeof time === 'string') {
    return time
  }
  return time.toLocaleTimeString('uz-UZ', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Format relative time (e.g., "5 daqiqa oldin")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  
  if (diffMins < 1) return "Hozir"
  if (diffMins < 60) return `${diffMins} daqiqa oldin`
  if (diffHours < 24) return `${diffHours} soat oldin`
  if (diffDays < 7) return `${diffDays} kun oldin`
  
  return formatDate(d)
}

// ============================================
// Validation Utilities
// ============================================

/**
 * Validate phone number
 */
export function isValidPhone(phone: string): boolean {
  return VALIDATION.PHONE_REGEX.test(phone)
}

/**
 * Validate password
 */
export function isValidPassword(password: string): boolean {
  return password.length >= VALIDATION.PASSWORD_MIN_LENGTH
}

/**
 * Validate name
 */
export function isValidName(name: string): boolean {
  return name.length >= VALIDATION.NAME_MIN_LENGTH && 
         name.length <= VALIDATION.NAME_MAX_LENGTH
}

// ============================================
// Search & Filter Utilities
// ============================================

/**
 * Filter rides based on search criteria
 */
export function filterRides(rides: Ride[], filters: SearchFilters): Ride[] {
  return rides.filter((ride) => {
    // From/To match
    const fromMatch = !filters.from || 
      ride.from.toLowerCase().includes(filters.from.toLowerCase())
    const toMatch = !filters.to || 
      ride.to.toLowerCase().includes(filters.to.toLowerCase())
    
    // Date filter
    const dateMatch = filters.dateFilter === "all" || 
      (filters.dateFilter === "today" && ride.date === "Bugun") ||
      (filters.dateFilter === "tomorrow" && ride.date === "Ertaga")
    
    // Time filter
    const hour = parseInt(ride.time.split(":")[0])
    const timeMatch = filters.timeFilter === "all" ||
      (filters.timeFilter === "morning" && hour >= 6 && hour < 12) ||
      (filters.timeFilter === "afternoon" && hour >= 12 && hour < 18) ||
      (filters.timeFilter === "evening" && (hour >= 18 || hour < 6))
    
    // Price filter
    const priceMatch = ride.price >= filters.priceRange[0] && 
                       ride.price <= filters.priceRange[1]
    
    return fromMatch && toMatch && dateMatch && timeMatch && priceMatch
  })
}

/**
 * Sort rides by various criteria
 */
export function sortRides(
  rides: Ride[], 
  sortBy: 'price' | 'time' | 'seats' = 'time',
  order: 'asc' | 'desc' = 'asc'
): Ride[] {
  return [...rides].sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'price':
        comparison = a.price - b.price
        break
      case 'time':
        comparison = a.time.localeCompare(b.time)
        break
      case 'seats':
        comparison = a.seats - b.seats
        break
    }
    
    return order === 'asc' ? comparison : -comparison
  })
}

// ============================================
// Date Utilities
// ============================================

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate()
}

/**
 * Get time period of day
 */
export function getTimePeriod(hour: number): 'morning' | 'afternoon' | 'evening' | 'night' {
  if (hour >= 6 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 18) return 'afternoon'
  if (hour >= 18 && hour < 22) return 'evening'
  return 'night'
}

// ============================================
// String Utilities
// ============================================

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 3) + '...'
}

/**
 * Generate initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// ============================================
// Number Utilities
// ============================================

/**
 * Clamp number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// ============================================
// Storage Utilities (Platform Agnostic Interface)
// ============================================

export interface StorageAdapter {
  getItem(key: string): Promise<string | null>
  setItem(key: string, value: string): Promise<void>
  removeItem(key: string): Promise<void>
}

// Default localStorage adapter for web
export const webStorageAdapter: StorageAdapter = {
  async getItem(key: string) {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
  },
  async setItem(key: string, value: string) {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, value)
  },
  async removeItem(key: string) {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  }
}

// ============================================
// Shared Types - Platform Agnostic
// These types can be used in both Next.js and React Native
// ============================================

// User & Auth Types
export type UserRole = "driver" | "passenger" | null

export interface User {
  id: string
  name: string
  phone: string
  role: UserRole
  avatar?: string
  rating: number
  ridesCount: number
  isActive: boolean
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Ride Types
export interface Ride {
  id: string | number
  driver: string
  driverId?: string
  from: string
  to: string
  date: string
  time: string
  seats: number
  price: number
  car: string
  phone: string
  status?: RideStatus
  passengers?: Passenger[]
  createdAt?: Date
}

export type RideStatus = "active" | "completed" | "cancelled" | "full"

export interface Passenger {
  id: string
  name: string
  phone: string
  seats: number
  status: "pending" | "confirmed" | "cancelled"
}

// Search & Filter Types
export interface SearchFilters {
  from: string
  to: string
  dateFilter: "all" | "today" | "tomorrow"
  timeFilter: "all" | "morning" | "afternoon" | "evening"
  priceRange: [number, number]
}

export interface SavedSearch {
  id: string
  from: string
  to: string
  timestamp: number
}

export interface PopularRoute {
  from: string
  to: string
}

// Chat Types
export interface Chat {
  id: string
  recipientId: string
  recipientName: string
  recipientAvatar?: string
  lastMessage: string
  timestamp: Date
  unreadCount: number
}

export interface Message {
  id: string
  chatId: string
  senderId: string
  text: string
  timestamp: Date
  isRead: boolean
}

// Car Types
export interface Car {
  id: string
  model: string
  color: string
  plateNumber: string
  year: number
  isDefault: boolean
}

// Review Types
export interface Review {
  id: string
  reviewerId: string
  reviewerName: string
  rating: number
  comment: string
  rideId: string
  createdAt: Date
}

// Address Types
export interface SavedAddress {
  id: string
  name: string
  address: string
  type: "home" | "work" | "other"
}

// Stats Types
export interface UserStats {
  label: string
  value: string | number
  iconName: string
}

// Navigation Types
export interface MenuItem {
  iconName: string
  label: string
  href: string
}

// Form Types
export interface RideFormData {
  from: string
  to: string
  date: string
  time: string
  seats: string
  price: string
  carModel: string
}

export interface LoginFormData {
  phone: string
  password: string
}

export interface SignupFormData {
  name: string
  phone: string
  password: string
  confirmPassword: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// Notification Types
export interface Notification {
  id: string
  type: "ride_request" | "ride_accepted" | "ride_cancelled" | "message" | "system"
  title: string
  body: string
  data?: Record<string, unknown>
  isRead: boolean
  createdAt: Date
}

// Settings Types
export interface AppSettings {
  language: "uz" | "ru" | "en"
  theme: "light" | "dark" | "system"
  notifications: NotificationSettings
  privacy: PrivacySettings
}

export interface NotificationSettings {
  pushEnabled: boolean
  rideUpdates: boolean
  messages: boolean
  promotions: boolean
}

export interface PrivacySettings {
  showPhone: boolean
  showRating: boolean
  allowMessages: boolean
}

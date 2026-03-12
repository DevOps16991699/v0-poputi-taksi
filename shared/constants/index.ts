// ============================================
// Shared Constants - Platform Agnostic
// These constants can be used in both Next.js and React Native
// ============================================

import type { PopularRoute, UserStats, MenuItem } from '../types'

// App Info
export const APP_NAME = "Poputi Taksi"
export const APP_VERSION = "1.0.0"

// Routes
export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  DRIVER: "/driver",
  PROFILE: "/profile",
  PROFILE_EDIT: "/profile/edit",
  PROFILE_CARS: "/profile/my-cars",
  PROFILE_REVIEWS: "/profile/reviews",
  PROFILE_ADDRESSES: "/profile/addresses",
  SETTINGS: "/settings",
  SETTINGS_APPEARANCE: "/settings/appearance",
  SETTINGS_LANGUAGE: "/settings/language",
  SETTINGS_NOTIFICATIONS: "/settings/notifications",
  SETTINGS_PRIVACY: "/settings/privacy",
  LOGIN: "/login",
  SIGNUP: "/signup",
  CHAT: "/chat",
  MY_RIDES: "/my-rides",
  TICKETS: "/tickets",
} as const

// Popular Routes
export const POPULAR_ROUTES: PopularRoute[] = [
  { from: "Toshkent", to: "Samarqand" },
  { from: "Toshkent", to: "Buxoro" },
  { from: "Toshkent", to: "Farg'ona" },
  { from: "Samarqand", to: "Toshkent" },
]

// Cities List
export const CITIES = [
  "Toshkent",
  "Samarqand",
  "Buxoro",
  "Farg'ona",
  "Namangan",
  "Andijon",
  "Nukus",
  "Qarshi",
  "Termiz",
  "Navoiy",
  "Jizzax",
  "Urganch",
  "Xiva",
  "Guliston",
  "Chirchiq",
  "Olmaliq",
  "Angren",
  "Margilan",
  "Qo'qon",
  "Shahrisabz"
] as const

// Price Ranges
export const PRICE_RANGES = {
  MIN: 0,
  MAX: 500000,
  DEFAULT_MAX: 200000,
  STEP: 10000,
} as const

// Seats
export const SEATS = {
  MIN: 1,
  MAX: 7,
} as const

// User Stats - Driver
export const DRIVER_STATS: UserStats[] = [
  { label: "Safarlar", value: 48, iconName: "MapPin" },
  { label: "Reyting", value: "4.8", iconName: "Star" },
  { label: "E'lonlar", value: 12, iconName: "Car" },
]

// User Stats - Passenger
export const PASSENGER_STATS: UserStats[] = [
  { label: "Safarlar", value: 24, iconName: "MapPin" },
  { label: "Reyting", value: "4.9", iconName: "Star" },
  { label: "Bandlar", value: 18, iconName: "Users" },
]

// Menu Items - Driver
export const DRIVER_MENU_ITEMS: MenuItem[] = [
  { iconName: "Edit2", label: "Profilni tahrirlash", href: ROUTES.PROFILE_EDIT },
  { iconName: "Car", label: "Mening avtomobillarim", href: ROUTES.PROFILE_CARS },
  { iconName: "Star", label: "Reyting va sharhlar", href: ROUTES.PROFILE_REVIEWS },
  { iconName: "Settings", label: "Sozlamalar", href: ROUTES.SETTINGS },
]

// Menu Items - Passenger
export const PASSENGER_MENU_ITEMS: MenuItem[] = [
  { iconName: "Edit2", label: "Profilni tahrirlash", href: ROUTES.PROFILE_EDIT },
  { iconName: "MapPin", label: "Saqlangan manzillar", href: ROUTES.PROFILE_ADDRESSES },
  { iconName: "Star", label: "Reyting va sharhlar", href: ROUTES.PROFILE_REVIEWS },
  { iconName: "Settings", label: "Sozlamalar", href: ROUTES.SETTINGS },
]

// Settings Menu Items
export const SETTINGS_MENU_ITEMS: MenuItem[] = [
  { iconName: "Globe", label: "Til", href: ROUTES.SETTINGS_LANGUAGE },
  { iconName: "Palette", label: "Ko'rinish", href: ROUTES.SETTINGS_APPEARANCE },
  { iconName: "Bell", label: "Bildirishnomalar", href: ROUTES.SETTINGS_NOTIFICATIONS },
  { iconName: "Shield", label: "Maxfiylik", href: ROUTES.SETTINGS_PRIVACY },
]

// Date Filters
export const DATE_FILTERS = [
  { value: "all", label: "Barchasi" },
  { value: "today", label: "Bugun" },
  { value: "tomorrow", label: "Ertaga" },
] as const

// Time Filters
export const TIME_FILTERS = [
  { value: "all", label: "Barchasi" },
  { value: "morning", label: "Ertalab (6-12)" },
  { value: "afternoon", label: "Kunduzi (12-18)" },
  { value: "evening", label: "Kechqurun (18+)" },
] as const

// Languages
export const LANGUAGES = [
  { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "en", name: "English", flag: "🇬🇧" },
] as const

// Themes
export const THEMES = [
  { value: "light", label: "Yorug'", iconName: "Sun" },
  { value: "dark", label: "Qorong'u", iconName: "Moon" },
  { value: "system", label: "Tizim", iconName: "Smartphone" },
] as const

// Validation Rules
export const VALIDATION = {
  PHONE_REGEX: /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/,
  PHONE_LENGTH: 13,
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const

// Storage Keys
export const STORAGE_KEYS = {
  USER_ROLE: "userRole",
  AUTH_TOKEN: "authToken",
  USER_DATA: "userData",
  SAVED_SEARCHES: "savedSearches",
  THEME: "theme",
  LANGUAGE: "language",
  NOTIFICATION_SETTINGS: "notificationSettings",
} as const

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    SIGNUP: "/api/auth/signup",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
  },
  RIDES: {
    LIST: "/api/rides",
    CREATE: "/api/rides",
    GET: (id: string) => `/api/rides/${id}`,
    UPDATE: (id: string) => `/api/rides/${id}`,
    DELETE: (id: string) => `/api/rides/${id}`,
    SEARCH: "/api/rides/search",
  },
  USER: {
    PROFILE: "/api/user/profile",
    UPDATE: "/api/user/profile",
    CARS: "/api/user/cars",
    REVIEWS: "/api/user/reviews",
    ADDRESSES: "/api/user/addresses",
  },
  CHAT: {
    LIST: "/api/chat",
    MESSAGES: (chatId: string) => `/api/chat/${chatId}/messages`,
    SEND: (chatId: string) => `/api/chat/${chatId}/messages`,
  },
} as const

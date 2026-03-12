// ============================================
// Shared Validation Schemas - Platform Agnostic
// Using Zod for type-safe validation
// ============================================

import { z } from 'zod'

// ============================================
// Auth Schemas
// ============================================

export const phoneSchema = z
  .string()
  .min(1, "Telefon raqam kiritilishi shart")
  .regex(
    /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/,
    "Telefon raqam formati noto'g'ri (+998 XX XXX XX XX)"
  )

export const passwordSchema = z
  .string()
  .min(6, "Parol kamida 6 ta belgidan iborat bo'lishi kerak")

export const nameSchema = z
  .string()
  .min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak")
  .max(50, "Ism 50 ta belgidan oshmasligi kerak")

export const loginSchema = z.object({
  phone: phoneSchema,
  password: passwordSchema,
})

export const signupSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Parollar mos kelmayapti",
  path: ["confirmPassword"],
})

// ============================================
// Ride Schemas
// ============================================

export const rideFormSchema = z.object({
  from: z.string().min(1, "Qayerdan kiritilishi shart"),
  to: z.string().min(1, "Qayerga kiritilishi shart"),
  date: z.string().min(1, "Sana kiritilishi shart"),
  time: z.string().min(1, "Vaqt kiritilishi shart"),
  seats: z
    .string()
    .min(1, "Bo'sh joy soni kiritilishi shart")
    .refine((val) => {
      const num = parseInt(val)
      return num >= 1 && num <= 7
    }, "Bo'sh joy 1 dan 7 gacha bo'lishi kerak"),
  price: z
    .string()
    .min(1, "Narx kiritilishi shart")
    .refine((val) => {
      const num = parseInt(val)
      return num > 0
    }, "Narx 0 dan katta bo'lishi kerak"),
  carModel: z.string().min(1, "Avtomobil kiritilishi shart"),
})

export const searchSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  dateFilter: z.enum(["all", "today", "tomorrow"]).default("all"),
  timeFilter: z.enum(["all", "morning", "afternoon", "evening"]).default("all"),
  priceRange: z.tuple([z.number(), z.number()]).default([0, 200000]),
})

// ============================================
// Profile Schemas
// ============================================

export const profileEditSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  email: z.string().email("Email formati noto'g'ri").optional().or(z.literal("")),
})

export const carSchema = z.object({
  model: z.string().min(1, "Avtomobil modeli kiritilishi shart"),
  color: z.string().min(1, "Rang kiritilishi shart"),
  plateNumber: z
    .string()
    .min(1, "Davlat raqami kiritilishi shart")
    .regex(/^\d{2}\s?[A-Z]\s?\d{3}\s?[A-Z]{2}$/, "Davlat raqami formati noto'g'ri"),
  year: z
    .number()
    .min(1990, "Yil 1990 dan katta bo'lishi kerak")
    .max(new Date().getFullYear(), "Yil hozirgi yildan katta bo'lmasligi kerak"),
})

export const addressSchema = z.object({
  name: z.string().min(1, "Manzil nomi kiritilishi shart"),
  address: z.string().min(1, "Manzil kiritilishi shart"),
  type: z.enum(["home", "work", "other"]),
})

// ============================================
// Settings Schemas
// ============================================

export const notificationSettingsSchema = z.object({
  pushEnabled: z.boolean(),
  rideUpdates: z.boolean(),
  messages: z.boolean(),
  promotions: z.boolean(),
})

export const privacySettingsSchema = z.object({
  showPhone: z.boolean(),
  showRating: z.boolean(),
  allowMessages: z.boolean(),
})

export const appSettingsSchema = z.object({
  language: z.enum(["uz", "ru", "en"]),
  theme: z.enum(["light", "dark", "system"]),
  notifications: notificationSettingsSchema,
  privacy: privacySettingsSchema,
})

// ============================================
// Chat Schemas
// ============================================

export const messageSchema = z.object({
  text: z.string().min(1, "Xabar bo'sh bo'lmasligi kerak").max(1000, "Xabar juda uzun"),
})

// ============================================
// Export Types from Schemas
// ============================================

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>
export type RideFormData = z.infer<typeof rideFormSchema>
export type SearchFormData = z.infer<typeof searchSchema>
export type ProfileEditFormData = z.infer<typeof profileEditSchema>
export type CarFormData = z.infer<typeof carSchema>
export type AddressFormData = z.infer<typeof addressSchema>
export type NotificationSettingsData = z.infer<typeof notificationSettingsSchema>
export type PrivacySettingsData = z.infer<typeof privacySettingsSchema>
export type AppSettingsData = z.infer<typeof appSettingsSchema>
export type MessageFormData = z.infer<typeof messageSchema>

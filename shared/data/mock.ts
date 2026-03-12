// ============================================
// Mock Data - Platform Agnostic
// Used for development and testing
// ============================================

import type { Ride, User, Chat, Review, Car, SavedAddress } from '../types'

// ============================================
// Mock Rides
// ============================================

export const mockRides: Ride[] = [
  {
    id: 1,
    driver: "Akbar Rahimov",
    from: "Toshkent",
    to: "Samarqand",
    date: "Bugun",
    time: "14:00",
    seats: 3,
    price: 80000,
    car: "Cobalt",
    phone: "+998 90 123 45 67",
  },
  {
    id: 2,
    driver: "Dilshod Karimov",
    from: "Toshkent",
    to: "Buxoro",
    date: "Bugun",
    time: "16:30",
    seats: 2,
    price: 120000,
    car: "Gentra",
    phone: "+998 91 234 56 78",
  },
  {
    id: 3,
    driver: "Sardor Aliyev",
    from: "Toshkent",
    to: "Farg'ona",
    date: "Ertaga",
    time: "08:00",
    seats: 4,
    price: 100000,
    car: "Lacetti",
    phone: "+998 93 345 67 89",
  },
  {
    id: 4,
    driver: "Bobur Toshmatov",
    from: "Toshkent",
    to: "Namangan",
    date: "Ertaga",
    time: "10:00",
    seats: 1,
    price: 110000,
    car: "Nexia",
    phone: "+998 94 456 78 90",
  },
  {
    id: 5,
    driver: "Jasur Sodiqov",
    from: "Samarqand",
    to: "Toshkent",
    date: "Bugun",
    time: "18:00",
    seats: 2,
    price: 85000,
    car: "Spark",
    phone: "+998 95 567 89 01",
  },
  {
    id: 6,
    driver: "Nodir Xolmatov",
    from: "Buxoro",
    to: "Toshkent",
    date: "Ertaga",
    time: "06:00",
    seats: 3,
    price: 125000,
    car: "Malibu",
    phone: "+998 97 678 90 12",
  },
  {
    id: 7,
    driver: "Anvar Qodirov",
    from: "Toshkent",
    to: "Samarqand",
    date: "Bugun",
    time: "09:00",
    seats: 2,
    price: 75000,
    car: "Damas",
    phone: "+998 90 111 22 33",
  },
  {
    id: 8,
    driver: "Sherzod Yusupov",
    from: "Toshkent",
    to: "Buxoro",
    date: "Ertaga",
    time: "07:00",
    seats: 3,
    price: 130000,
    car: "Captiva",
    phone: "+998 91 444 55 66",
  },
]

// ============================================
// Mock Users
// ============================================

export const mockCurrentUser: User = {
  id: "user-1",
  name: "Jamshid Karimov",
  phone: "+998 90 123 45 67",
  role: "passenger",
  rating: 4.8,
  ridesCount: 24,
  isActive: true,
  createdAt: new Date("2024-01-15"),
}

export const mockUsers: User[] = [
  mockCurrentUser,
  {
    id: "user-2",
    name: "Akbar Rahimov",
    phone: "+998 90 123 45 67",
    role: "driver",
    rating: 4.9,
    ridesCount: 156,
    isActive: true,
    createdAt: new Date("2023-06-10"),
  },
  {
    id: "user-3",
    name: "Dilshod Karimov",
    phone: "+998 91 234 56 78",
    role: "driver",
    rating: 4.7,
    ridesCount: 89,
    isActive: true,
    createdAt: new Date("2023-09-22"),
  },
]

// ============================================
// Mock Chats
// ============================================

export const mockChats: Chat[] = [
  {
    id: "chat-1",
    recipientId: "user-2",
    recipientName: "Akbar Rahimov",
    lastMessage: "Salom, safar hali bormi?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    unreadCount: 2,
  },
  {
    id: "chat-2",
    recipientId: "user-3",
    recipientName: "Dilshod Karimov",
    lastMessage: "Rahmat, yaxshi yetib oldim",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unreadCount: 0,
  },
  {
    id: "chat-3",
    recipientId: "user-4",
    recipientName: "Sardor Aliyev",
    lastMessage: "Ertaga 8 da ketamiz",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unreadCount: 0,
  },
]

// ============================================
// Mock Reviews
// ============================================

export const mockReviews: Review[] = [
  {
    id: "review-1",
    reviewerId: "user-2",
    reviewerName: "Akbar Rahimov",
    rating: 5,
    comment: "Juda yaxshi yo'lovchi, o'z vaqtida keldi",
    rideId: "ride-1",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: "review-2",
    reviewerId: "user-3",
    reviewerName: "Dilshod Karimov",
    rating: 4,
    comment: "Yaxshi, lekin biroz kech qoldi",
    rideId: "ride-2",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: "review-3",
    reviewerId: "user-4",
    reviewerName: "Sardor Aliyev",
    rating: 5,
    comment: "A'lo! Yana safar qilamiz",
    rideId: "ride-3",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
  },
]

// ============================================
// Mock Cars
// ============================================

export const mockCars: Car[] = [
  {
    id: "car-1",
    model: "Chevrolet Cobalt",
    color: "Oq",
    plateNumber: "01 A 123 AA",
    year: 2020,
    isDefault: true,
  },
  {
    id: "car-2",
    model: "Chevrolet Gentra",
    color: "Qora",
    plateNumber: "01 B 456 BB",
    year: 2019,
    isDefault: false,
  },
]

// ============================================
// Mock Addresses
// ============================================

export const mockAddresses: SavedAddress[] = [
  {
    id: "addr-1",
    name: "Uy",
    address: "Toshkent, Chilonzor tumani, 9-mavze",
    type: "home",
  },
  {
    id: "addr-2",
    name: "Ish",
    address: "Toshkent, Mirzo Ulug'bek tumani, IT Park",
    type: "work",
  },
  {
    id: "addr-3",
    name: "Ota-onam",
    address: "Samarqand, Registon ko'chasi",
    type: "other",
  },
]

// ============================================
// Mock My Rides (History)
// ============================================

export const mockMyRides = {
  active: [
    {
      id: "my-ride-1",
      from: "Toshkent",
      to: "Samarqand",
      date: "Bugun",
      time: "14:00",
      seats: 2,
      price: 80000,
      driver: "Akbar Rahimov",
      car: "Cobalt",
      phone: "+998 90 123 45 67",
      status: "confirmed" as const,
    },
  ],
  completed: [
    {
      id: "my-ride-2",
      from: "Toshkent",
      to: "Buxoro",
      date: "12-Mart",
      time: "08:00",
      seats: 1,
      price: 120000,
      driver: "Dilshod Karimov",
      car: "Gentra",
      phone: "+998 91 234 56 78",
      status: "completed" as const,
    },
    {
      id: "my-ride-3",
      from: "Samarqand",
      to: "Toshkent",
      date: "10-Mart",
      time: "16:00",
      seats: 1,
      price: 85000,
      driver: "Jasur Sodiqov",
      car: "Spark",
      phone: "+998 95 567 89 01",
      status: "completed" as const,
    },
  ],
}

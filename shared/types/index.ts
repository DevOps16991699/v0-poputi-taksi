// User types
export type UserRole = 'passenger' | 'driver';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  role: UserRole;
  rating: number;
  ridesCount: number;
  memberSince: string;
  isVerified: boolean;
  cars?: Car[];
}

// Car types
export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  plateNumber: string;
  seats: number;
  photos?: string[];
  isDefault?: boolean;
}

// Ride types
export type RideStatus = 
  | 'active' 
  | 'completed' 
  | 'cancelled' 
  | 'pending' 
  | 'confirmed'
  | 'in_progress';

export interface Ride {
  id: string;
  driver: User;
  from: Location;
  to: Location;
  date: string;
  time: string;
  price: number;
  seats: number;
  availableSeats: number;
  status: RideStatus;
  car?: Car;
  passengers?: Passenger[];
  description?: string;
  stops?: Location[];
  allowPets?: boolean;
  allowSmoking?: boolean;
  allowMusic?: boolean;
  maxLuggage?: 'small' | 'medium' | 'large';
  createdAt: string;
}

export interface Location {
  city: string;
  address?: string;
  lat?: number;
  lng?: number;
}

export interface Passenger {
  user: User;
  seats: number;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
  bookedAt: string;
}

// Search types
export interface SearchFilters {
  from: string;
  to: string;
  date: string;
  passengers: number;
  minPrice?: number;
  maxPrice?: number;
  departureTime?: 'morning' | 'afternoon' | 'evening' | 'night';
  sortBy?: 'price' | 'time' | 'rating';
  allowPets?: boolean;
  allowSmoking?: boolean;
}

export interface SavedSearch {
  id: string;
  from: string;
  to: string;
  createdAt: string;
}

// Chat types
export interface Chat {
  id: string;
  participants: User[];
  ride?: Ride;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
  isRead: boolean;
}

// Review types
export interface Review {
  id: string;
  from: User;
  to: User;
  ride: Ride;
  rating: number;
  comment: string;
  createdAt: string;
}

// Notification types
export interface Notification {
  id: string;
  type: 'ride_request' | 'ride_confirmed' | 'ride_cancelled' | 'message' | 'review';
  title: string;
  body: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
}

// Address types
export interface SavedAddress {
  id: string;
  name: string;
  address: string;
  city: string;
  type: 'home' | 'work' | 'other';
  lat?: number;
  lng?: number;
}

// Ticket types
export interface Ticket {
  id: string;
  ride: Ride;
  passenger: User;
  seats: number;
  totalPrice: number;
  status: 'active' | 'used' | 'cancelled' | 'expired';
  qrCode: string;
  bookedAt: string;
}

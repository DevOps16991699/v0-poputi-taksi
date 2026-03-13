import type { User, Car, Ride, Chat, Message, Review, SavedAddress, Ticket, Notification } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Aziz Karimov',
    phone: '+998 90 123 45 67',
    email: 'aziz@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: 'driver',
    rating: 4.8,
    ridesCount: 156,
    memberSince: '2022-03-15',
    isVerified: true,
    cars: [
      {
        id: 'car1',
        brand: 'Chevrolet',
        model: 'Malibu',
        year: 2020,
        color: 'Oq',
        plateNumber: '01 A 123 BC',
        seats: 4,
        isDefault: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Malika Rahimova',
    phone: '+998 91 234 56 78',
    email: 'malika@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    role: 'passenger',
    rating: 4.9,
    ridesCount: 45,
    memberSince: '2023-01-20',
    isVerified: true,
  },
  {
    id: '3',
    name: 'Bobur Aliyev',
    phone: '+998 93 345 67 89',
    email: 'bobur@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    role: 'driver',
    rating: 4.6,
    ridesCount: 89,
    memberSince: '2022-08-10',
    isVerified: true,
    cars: [
      {
        id: 'car2',
        brand: 'Kia',
        model: 'K5',
        year: 2022,
        color: 'Qora',
        plateNumber: '01 B 456 DE',
        seats: 4,
        isDefault: true,
      },
    ],
  },
];

export const currentUser: User = mockUsers[0];

// Mock Rides
export const mockRides: Ride[] = [
  {
    id: '1',
    driver: mockUsers[0],
    from: { city: 'Toshkent', address: 'Chorsu metro' },
    to: { city: 'Samarqand', address: 'Registon' },
    date: '2024-12-20',
    time: '08:00',
    price: 120000,
    seats: 4,
    availableSeats: 2,
    status: 'active',
    car: mockUsers[0].cars?.[0],
    description: 'Ertalab ketamiz, konditsioner bor',
    allowPets: false,
    allowSmoking: false,
    allowMusic: true,
    maxLuggage: 'medium',
    createdAt: '2024-12-15T10:00:00Z',
  },
  {
    id: '2',
    driver: mockUsers[2],
    from: { city: 'Toshkent', address: 'Olmazor' },
    to: { city: 'Buxoro', address: 'Ark qal\'asi' },
    date: '2024-12-21',
    time: '07:00',
    price: 150000,
    seats: 4,
    availableSeats: 3,
    status: 'active',
    car: mockUsers[2].cars?.[0],
    description: 'Tez va xavfsiz yetkazib beraman',
    allowPets: true,
    allowSmoking: false,
    allowMusic: true,
    maxLuggage: 'large',
    createdAt: '2024-12-15T12:00:00Z',
  },
  {
    id: '3',
    driver: mockUsers[0],
    from: { city: 'Samarqand', address: 'Vokzal' },
    to: { city: 'Toshkent', address: 'Yunusobod' },
    date: '2024-12-22',
    time: '16:00',
    price: 100000,
    seats: 4,
    availableSeats: 1,
    status: 'active',
    car: mockUsers[0].cars?.[0],
    allowPets: false,
    allowSmoking: false,
    allowMusic: true,
    maxLuggage: 'small',
    createdAt: '2024-12-16T08:00:00Z',
  },
];

// Mock Chats
export const mockChats: Chat[] = [
  {
    id: 'chat1',
    participants: [mockUsers[0], mockUsers[1]],
    ride: mockRides[0],
    lastMessage: {
      id: 'msg1',
      chatId: 'chat1',
      senderId: '2',
      text: 'Salom, joy bormi?',
      createdAt: '2024-12-15T14:30:00Z',
      isRead: false,
    },
    unreadCount: 1,
    updatedAt: '2024-12-15T14:30:00Z',
  },
  {
    id: 'chat2',
    participants: [mockUsers[0], mockUsers[2]],
    lastMessage: {
      id: 'msg2',
      chatId: 'chat2',
      senderId: '3',
      text: 'Rahmat, yaxshi safar bo\'ldi!',
      createdAt: '2024-12-14T18:00:00Z',
      isRead: true,
    },
    unreadCount: 0,
    updatedAt: '2024-12-14T18:00:00Z',
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'msg1',
    chatId: 'chat1',
    senderId: '2',
    text: 'Salom, joy bormi?',
    createdAt: '2024-12-15T14:30:00Z',
    isRead: false,
  },
  {
    id: 'msg0',
    chatId: 'chat1',
    senderId: '1',
    text: 'Salom! Ha, 2 ta joy bor.',
    createdAt: '2024-12-15T14:32:00Z',
    isRead: true,
  },
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: 'review1',
    from: mockUsers[1],
    to: mockUsers[0],
    ride: mockRides[0],
    rating: 5,
    comment: 'Juda yaxshi haydovchi, xavfsiz va tez yetkazdi!',
    createdAt: '2024-12-10T10:00:00Z',
  },
  {
    id: 'review2',
    from: mockUsers[2],
    to: mockUsers[0],
    ride: mockRides[2],
    rating: 4,
    comment: 'Yaxshi safar bo\'ldi, lekin biroz kech qoldi.',
    createdAt: '2024-12-08T15:00:00Z',
  },
];

// Mock Saved Addresses
export const mockSavedAddresses: SavedAddress[] = [
  {
    id: 'addr1',
    name: 'Uy',
    address: 'Chilonzor 9-kvartal, 15-uy',
    city: 'Toshkent',
    type: 'home',
  },
  {
    id: 'addr2',
    name: 'Ish',
    address: 'Amir Temur ko\'chasi, 108',
    city: 'Toshkent',
    type: 'work',
  },
];

// Mock Tickets
export const mockTickets: Ticket[] = [
  {
    id: 'ticket1',
    ride: mockRides[0],
    passenger: mockUsers[1],
    seats: 1,
    totalPrice: 120000,
    status: 'active',
    qrCode: 'POPUTI-2024-001',
    bookedAt: '2024-12-15T11:00:00Z',
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'ride_request',
    title: 'Yangi buyurtma',
    body: 'Malika Rahimova sizning safaringizga qo\'shilmoqchi',
    data: { rideId: '1', userId: '2' },
    isRead: false,
    createdAt: '2024-12-15T14:30:00Z',
  },
  {
    id: 'notif2',
    type: 'message',
    title: 'Yangi xabar',
    body: 'Bobur Aliyev: Rahmat, yaxshi safar bo\'ldi!',
    data: { chatId: 'chat2' },
    isRead: true,
    createdAt: '2024-12-14T18:00:00Z',
  },
];

// Popular cities
export const popularCities = [
  'Toshkent',
  'Samarqand',
  'Buxoro',
  'Xiva',
  'Fargona',
  'Andijon',
  'Namangan',
  'Qarshi',
  'Nukus',
  'Navoiy',
  'Jizzax',
  'Termiz',
  'Guliston',
  'Urganch',
  'Kokand',
];

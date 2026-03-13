export const APP_NAME = 'Poputi Taksi';
export const APP_VERSION = '1.0.0';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  USER_ROLE: 'user_role',
  THEME: 'theme',
  LANGUAGE: 'language',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  SAVED_SEARCHES: 'saved_searches',
  RECENT_LOCATIONS: 'recent_locations',
};

export const API_ENDPOINTS = {
  BASE_URL: 'https://api.poputi.uz/v1',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY_OTP: '/auth/verify-otp',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
    UPLOAD_AVATAR: '/users/avatar',
  },
  RIDES: {
    LIST: '/rides',
    CREATE: '/rides/create',
    DETAILS: '/rides/:id',
    SEARCH: '/rides/search',
    MY_RIDES: '/rides/my-rides',
    BOOK: '/rides/:id/book',
    CANCEL: '/rides/:id/cancel',
  },
  CHATS: {
    LIST: '/chats',
    MESSAGES: '/chats/:id/messages',
    SEND: '/chats/:id/send',
  },
  REVIEWS: {
    LIST: '/reviews',
    CREATE: '/reviews/create',
  },
};

export const RIDE_STATUS_LABELS: Record<string, string> = {
  active: 'Faol',
  pending: 'Kutilmoqda',
  confirmed: 'Tasdiqlangan',
  in_progress: 'Yo\'lda',
  completed: 'Tugallangan',
  cancelled: 'Bekor qilingan',
};

export const RIDE_STATUS_COLORS: Record<string, string> = {
  active: '#10B981',
  pending: '#F59E0B',
  confirmed: '#3B82F6',
  in_progress: '#8B5CF6',
  completed: '#6B7280',
  cancelled: '#EF4444',
};

export const MAX_PASSENGERS = 7;
export const MIN_PRICE = 10000;
export const MAX_PRICE = 1000000;

export const DEPARTURE_TIMES = [
  { value: 'morning', label: 'Ertalab (06:00 - 12:00)' },
  { value: 'afternoon', label: 'Kunduzi (12:00 - 18:00)' },
  { value: 'evening', label: 'Kechqurun (18:00 - 22:00)' },
  { value: 'night', label: 'Tungi (22:00 - 06:00)' },
];

export const SORT_OPTIONS = [
  { value: 'price', label: 'Narx bo\'yicha' },
  { value: 'time', label: 'Vaqt bo\'yicha' },
  { value: 'rating', label: 'Reyting bo\'yicha' },
];

export const LUGGAGE_OPTIONS = [
  { value: 'small', label: 'Kichik sumka' },
  { value: 'medium', label: 'O\'rtacha yuk' },
  { value: 'large', label: 'Katta yuk' },
];

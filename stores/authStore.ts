import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/constants/app';
import type { User, UserRole } from '@/shared/types';
import { currentUser } from '@/shared/data/mock';

interface AuthState {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (phone: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setRole: (role: UserRole) => void;
  updateUser: (user: Partial<User>) => void;
  loadStoredAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  role: 'passenger',
  isAuthenticated: false,
  isLoading: true,

  login: async (phone: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, use mock user
      const user = { ...currentUser, phone };
      
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'demo_token');
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
      
      set({ user, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
      ]);
      set({ user: null, isAuthenticated: false, role: 'passenger' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  setRole: (role: UserRole) => {
    set({ role });
    AsyncStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
  },

  updateUser: (updates: Partial<User>) => {
    const { user } = get();
    if (user) {
      const updatedUser = { ...user, ...updates };
      set({ user: updatedUser });
      AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser));
    }
  },

  loadStoredAuth: async () => {
    try {
      const [token, userData, role] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
        AsyncStorage.getItem(STORAGE_KEYS.USER_DATA),
        AsyncStorage.getItem(STORAGE_KEYS.USER_ROLE),
      ]);

      if (token && userData) {
        const user = JSON.parse(userData) as User;
        set({
          user,
          isAuthenticated: true,
          role: (role as UserRole) || 'passenger',
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Load auth error:', error);
      set({ isLoading: false });
    }
  },
}));

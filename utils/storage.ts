import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@poputi/auth_token',
  USER_DATA: '@poputi/user_data',
  ROLE: '@poputi/role',
  THEME: '@poputi/theme',
  LANGUAGE: '@poputi/language',
  RECENT_SEARCHES: '@poputi/recent_searches',
  ONBOARDING_COMPLETED: '@poputi/onboarding_completed',
} as const;

export const storage = {
  // Auth
  async setAuthToken(token: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  async removeAuthToken(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  // User data
  async setUserData<T>(data: T): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
  },

  async getUserData<T>(): Promise<T | null> {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  },

  async removeUserData(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  // Role
  async setRole(role: 'passenger' | 'driver'): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.ROLE, role);
  },

  async getRole(): Promise<'passenger' | 'driver' | null> {
    const role = await AsyncStorage.getItem(STORAGE_KEYS.ROLE);
    return role as 'passenger' | 'driver' | null;
  },

  // Theme
  async setTheme(theme: 'light' | 'dark' | 'system'): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  async getTheme(): Promise<'light' | 'dark' | 'system' | null> {
    const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
    return theme as 'light' | 'dark' | 'system' | null;
  },

  // Language
  async setLanguage(lang: 'uz' | 'ru' | 'en'): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  },

  async getLanguage(): Promise<'uz' | 'ru' | 'en' | null> {
    const lang = await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return lang as 'uz' | 'ru' | 'en' | null;
  },

  // Recent searches
  async addRecentSearch(search: string): Promise<void> {
    const searches = await this.getRecentSearches();
    const filtered = searches.filter(s => s !== search);
    const updated = [search, ...filtered].slice(0, 10);
    await AsyncStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(updated));
  },

  async getRecentSearches(): Promise<string[]> {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
    return data ? JSON.parse(data) : [];
  },

  async clearRecentSearches(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);
  },

  // Onboarding
  async setOnboardingCompleted(): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
  },

  async isOnboardingCompleted(): Promise<boolean> {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
    return value === 'true';
  },

  // Clear all
  async clearAll(): Promise<void> {
    const keys = Object.values(STORAGE_KEYS);
    await AsyncStorage.multiRemove(keys);
  },
};

export default storage;

import { create } from 'zustand';
import type { Ride, SearchFilters } from '@/shared/types';
import { mockRides } from '@/shared/data/mock';

interface RidesState {
  rides: Ride[];
  searchResults: Ride[];
  myRides: Ride[];
  currentFilters: SearchFilters | null;
  isLoading: boolean;
  
  // Actions
  fetchRides: () => Promise<void>;
  searchRides: (filters: SearchFilters) => Promise<void>;
  fetchMyRides: () => Promise<void>;
  createRide: (ride: Partial<Ride>) => Promise<Ride | null>;
  cancelRide: (rideId: string) => Promise<boolean>;
  bookRide: (rideId: string, seats: number) => Promise<boolean>;
}

export const useRidesStore = create<RidesState>((set, get) => ({
  rides: [],
  searchResults: [],
  myRides: [],
  currentFilters: null,
  isLoading: false,

  fetchRides: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ rides: mockRides, isLoading: false });
    } catch (error) {
      console.error('Fetch rides error:', error);
      set({ isLoading: false });
    }
  },

  searchRides: async (filters: SearchFilters) => {
    set({ isLoading: true, currentFilters: filters });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let results = [...mockRides];
      
      // Filter by from city
      if (filters.from) {
        results = results.filter(ride =>
          ride.from.city.toLowerCase().includes(filters.from.toLowerCase())
        );
      }
      
      // Filter by to city
      if (filters.to) {
        results = results.filter(ride =>
          ride.to.city.toLowerCase().includes(filters.to.toLowerCase())
        );
      }
      
      // Filter by date
      if (filters.date) {
        results = results.filter(ride => ride.date === filters.date);
      }
      
      // Filter by available seats
      if (filters.passengers) {
        results = results.filter(ride => ride.availableSeats >= filters.passengers);
      }
      
      // Filter by price range
      if (filters.minPrice) {
        results = results.filter(ride => ride.price >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        results = results.filter(ride => ride.price <= filters.maxPrice!);
      }
      
      // Sort results
      if (filters.sortBy) {
        results.sort((a, b) => {
          switch (filters.sortBy) {
            case 'price':
              return a.price - b.price;
            case 'time':
              return a.time.localeCompare(b.time);
            case 'rating':
              return b.driver.rating - a.driver.rating;
            default:
              return 0;
          }
        });
      }
      
      set({ searchResults: results, isLoading: false });
    } catch (error) {
      console.error('Search rides error:', error);
      set({ isLoading: false });
    }
  },

  fetchMyRides: async () => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Filter rides where current user is driver
      const myRides = mockRides.filter(ride => ride.driver.id === '1');
      set({ myRides, isLoading: false });
    } catch (error) {
      console.error('Fetch my rides error:', error);
      set({ isLoading: false });
    }
  },

  createRide: async (rideData: Partial<Ride>) => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newRide: Ride = {
        id: `ride_${Date.now()}`,
        driver: mockRides[0].driver,
        from: rideData.from || { city: '' },
        to: rideData.to || { city: '' },
        date: rideData.date || '',
        time: rideData.time || '',
        price: rideData.price || 0,
        seats: rideData.seats || 4,
        availableSeats: rideData.seats || 4,
        status: 'active',
        createdAt: new Date().toISOString(),
        ...rideData,
      } as Ride;
      
      set(state => ({
        rides: [newRide, ...state.rides],
        myRides: [newRide, ...state.myRides],
        isLoading: false,
      }));
      
      return newRide;
    } catch (error) {
      console.error('Create ride error:', error);
      set({ isLoading: false });
      return null;
    }
  },

  cancelRide: async (rideId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        rides: state.rides.map(ride =>
          ride.id === rideId ? { ...ride, status: 'cancelled' as const } : ride
        ),
        myRides: state.myRides.map(ride =>
          ride.id === rideId ? { ...ride, status: 'cancelled' as const } : ride
        ),
      }));
      
      return true;
    } catch (error) {
      console.error('Cancel ride error:', error);
      return false;
    }
  },

  bookRide: async (rideId: string, seats: number) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        rides: state.rides.map(ride =>
          ride.id === rideId
            ? { ...ride, availableSeats: ride.availableSeats - seats }
            : ride
        ),
        searchResults: state.searchResults.map(ride =>
          ride.id === rideId
            ? { ...ride, availableSeats: ride.availableSeats - seats }
            : ride
        ),
      }));
      
      return true;
    } catch (error) {
      console.error('Book ride error:', error);
      return false;
    }
  },
}));

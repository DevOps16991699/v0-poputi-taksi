import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  MapPin,
  Calendar,
  Users,
  Search as SearchIcon,
  SlidersHorizontal,
  ArrowUpDown,
  X,
} from 'lucide-react-native';
import { Button, Input, Card, Badge, BottomSheet } from '@/components/ui';
import { RideCard } from '@/components/RideCard';
import { EmptyState } from '@/components/EmptyState';
import { useRidesStore } from '@/stores/ridesStore';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';
import { popularCities, mockRides } from '@/shared/data/mock';
import type { SearchFilters } from '@/shared/types';

export default function SearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ from?: string; to?: string }>();
  const insets = useSafeAreaInsets();
  const { searchResults, searchRides, isLoading } = useRidesStore();

  const [from, setFrom] = useState(params.from || '');
  const [to, setTo] = useState(params.to || '');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState<'from' | 'to' | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Filter states
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'time' | 'rating'>('price');

  const handleSearch = () => {
    const filters: SearchFilters = {
      from,
      to,
      date,
      passengers,
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
      sortBy,
    };
    searchRides(filters);
    setHasSearched(true);
  };

  const handleSwapCities = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleCitySelect = (city: string) => {
    if (showCityPicker === 'from') {
      setFrom(city);
    } else {
      setTo(city);
    }
    setShowCityPicker(null);
  };

  const clearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setSortBy('price');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Search Form */}
      <View style={styles.searchForm}>
        <Text style={styles.title}>Safar qidirish</Text>
        
        {/* From/To inputs */}
        <View style={styles.locationContainer}>
          <TouchableOpacity
            style={styles.locationInput}
            onPress={() => setShowCityPicker('from')}
          >
            <View style={[styles.locationDot, { backgroundColor: COLORS.primary }]} />
            <Text style={from ? styles.locationText : styles.locationPlaceholder}>
              {from || 'Qayerdan'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.swapButton} onPress={handleSwapCities}>
            <ArrowUpDown size={20} color={COLORS.gray500} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.locationInput}
            onPress={() => setShowCityPicker('to')}
          >
            <View style={[styles.locationDot, { backgroundColor: COLORS.secondary }]} />
            <Text style={to ? styles.locationText : styles.locationPlaceholder}>
              {to || 'Qayerga'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Date and Passengers */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.dateInput}>
            <Calendar size={20} color={COLORS.gray500} />
            <Text style={date ? styles.inputText : styles.inputPlaceholder}>
              {date || 'Sana'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.passengersInput}>
            <Users size={20} color={COLORS.gray500} />
            <TouchableOpacity
              style={styles.passengerButton}
              onPress={() => setPassengers(Math.max(1, passengers - 1))}
            >
              <Text style={styles.passengerButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.passengerCount}>{passengers}</Text>
            <TouchableOpacity
              style={styles.passengerButton}
              onPress={() => setPassengers(Math.min(7, passengers + 1))}
            >
              <Text style={styles.passengerButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Button */}
        <View style={styles.searchActions}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(true)}
          >
            <SlidersHorizontal size={20} color={COLORS.gray600} />
          </TouchableOpacity>
          <Button
            onPress={handleSearch}
            loading={isLoading}
            style={styles.searchButton}
            leftIcon={<SearchIcon size={20} color={COLORS.white} />}
          >
            Qidirish
          </Button>
        </View>
      </View>

      {/* Results */}
      {hasSearched ? (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <RideCard ride={item} />}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              icon={<SearchIcon size={48} color={COLORS.gray300} />}
              title="Natija topilmadi"
              description="Boshqa sana yoki yo'nalishni sinab ko'ring"
            />
          }
          ListHeaderComponent={
            searchResults.length > 0 ? (
              <Text style={styles.resultsCount}>
                {searchResults.length} ta safar topildi
              </Text>
            ) : null
          }
        />
      ) : (
        <ScrollView
          style={styles.suggestionsContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>So'nggi qidiruvlar</Text>
          <View style={styles.recentSearches}>
            {[
              { from: 'Toshkent', to: 'Samarqand' },
              { from: 'Toshkent', to: 'Buxoro' },
            ].map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentSearchItem}
                onPress={() => {
                  setFrom(search.from);
                  setTo(search.to);
                }}
              >
                <SearchIcon size={16} color={COLORS.gray400} />
                <Text style={styles.recentSearchText}>
                  {search.from} - {search.to}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Mavjud safarlar</Text>
          {mockRides.slice(0, 5).map(ride => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </ScrollView>
      )}

      {/* City Picker Bottom Sheet */}
      <BottomSheet
        visible={showCityPicker !== null}
        onClose={() => setShowCityPicker(null)}
        title={showCityPicker === 'from' ? 'Qayerdan' : 'Qayerga'}
        scrollable
      >
        <View style={styles.cityList}>
          {popularCities.map((city, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cityItem}
              onPress={() => handleCitySelect(city)}
            >
              <MapPin size={20} color={COLORS.gray500} />
              <Text style={styles.cityName}>{city}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>

      {/* Filters Bottom Sheet */}
      <BottomSheet
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        title="Filtrlar"
      >
        <View style={styles.filtersContent}>
          <Text style={styles.filterLabel}>Narx diapazoni</Text>
          <View style={styles.priceRange}>
            <Input
              placeholder="Min"
              value={minPrice}
              onChangeText={setMinPrice}
              keyboardType="numeric"
              style={styles.priceInput}
            />
            <Text style={styles.priceSeparator}>-</Text>
            <Input
              placeholder="Max"
              value={maxPrice}
              onChangeText={setMaxPrice}
              keyboardType="numeric"
              style={styles.priceInput}
            />
          </View>

          <Text style={styles.filterLabel}>Saralash</Text>
          <View style={styles.sortOptions}>
            {[
              { value: 'price', label: 'Narx' },
              { value: 'time', label: 'Vaqt' },
              { value: 'rating', label: 'Reyting' },
            ].map(option => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.sortOption,
                  sortBy === option.value && styles.sortOptionActive,
                ]}
                onPress={() => setSortBy(option.value as typeof sortBy)}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    sortBy === option.value && styles.sortOptionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.filterActions}>
            <Button variant="outline" onPress={clearFilters} style={{ flex: 1 }}>
              Tozalash
            </Button>
            <Button
              onPress={() => {
                setShowFilters(false);
                handleSearch();
              }}
              style={{ flex: 1 }}
            >
              Qo'llash
            </Button>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  searchForm: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderBottomLeftRadius: BORDER_RADIUS['2xl'],
    borderBottomRightRadius: BORDER_RADIUS['2xl'],
  },
  title: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  locationContainer: {
    marginBottom: SPACING.md,
  },
  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.md,
  },
  locationText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    flex: 1,
  },
  locationPlaceholder: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray400,
    flex: 1,
  },
  swapButton: {
    position: 'absolute',
    right: SPACING.md,
    top: '50%',
    transform: [{ translateY: -16 }],
    backgroundColor: COLORS.white,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.sm,
  },
  inputText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
  inputPlaceholder: {
    fontSize: FONT_SIZE.md,
    color: COLORS.gray400,
  },
  passengersInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.sm,
  },
  passengerButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  passengerButtonText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.text,
    fontWeight: '600',
  },
  passengerCount: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text,
    minWidth: 24,
    textAlign: 'center',
  },
  searchActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    flex: 1,
  },
  resultsList: {
    padding: SPACING.lg,
  },
  resultsCount: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  suggestionsContainer: {
    flex: 1,
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
    marginTop: SPACING.md,
  },
  recentSearches: {
    marginBottom: SPACING.lg,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  recentSearchText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
  cityList: {},
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  cityName: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
  filtersContent: {},
  filterLabel: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  priceRange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  priceInput: {
    flex: 1,
    marginBottom: 0,
  },
  priceSeparator: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray400,
  },
  sortOptions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  sortOption: {
    flex: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
  },
  sortOptionActive: {
    backgroundColor: COLORS.primary,
  },
  sortOptionText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    color: COLORS.gray600,
  },
  sortOptionTextActive: {
    color: COLORS.white,
  },
  filterActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
});

import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import {
  Home,
  Search,
  PlusCircle,
  MessageCircle,
  User,
} from 'lucide-react-native';
import { useAuthStore } from '@/stores/authStore';
import { COLORS, SPACING } from '@/constants/theme';

export default function TabsLayout() {
  const role = useAuthStore(state => state.role);
  const isDriver = role === 'driver';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray400,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Asosiy',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Qidirish',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
          href: isDriver ? null : '/search',
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "E'lon",
          tabBarIcon: ({ color, size }) => (
            <View style={styles.createButton}>
              <PlusCircle size={28} color={COLORS.white} />
            </View>
          ),
          tabBarLabel: () => null,
          href: isDriver ? '/create' : null,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Xabarlar',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingTop: SPACING.sm,
    paddingBottom: Platform.OS === 'ios' ? SPACING.xl : SPACING.sm,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  createButton: {
    backgroundColor: COLORS.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Bell,
  Globe,
  Moon,
  Shield,
  HelpCircle,
  Info,
  ChevronRight,
} from 'lucide-react-native';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
}

function SettingItem({
  icon,
  label,
  value,
  onPress,
  toggle,
  toggleValue,
  onToggle,
}: SettingItemProps) {
  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={toggle}
      activeOpacity={0.7}
    >
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingLabel}>{label}</Text>
        {value && <Text style={styles.settingValue}>{value}</Text>}
      </View>
      {toggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: COLORS.gray200, true: COLORS.primaryLight }}
          thumbColor={toggleValue ? COLORS.primary : COLORS.gray400}
        />
      ) : (
        <ChevronRight size={20} color={COLORS.gray400} />
      )}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Sozlamalar" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Umumiy</Text>
        <Card style={styles.settingsCard} padding="sm">
          <SettingItem
            icon={<Bell size={20} color={COLORS.gray600} />}
            label="Bildirishnomalar"
            onPress={() => router.push('/settings/notifications')}
          />
          <SettingItem
            icon={<Globe size={20} color={COLORS.gray600} />}
            label="Til"
            value="O'zbekcha"
            onPress={() => router.push('/settings/language')}
          />
          <SettingItem
            icon={<Moon size={20} color={COLORS.gray600} />}
            label="Qorong'u rejim"
            toggle
            toggleValue={darkMode}
            onToggle={setDarkMode}
          />
        </Card>

        <Text style={styles.sectionTitle}>Xavfsizlik</Text>
        <Card style={styles.settingsCard} padding="sm">
          <SettingItem
            icon={<Shield size={20} color={COLORS.gray600} />}
            label="Maxfiylik"
            onPress={() => router.push('/settings/privacy')}
          />
        </Card>

        <Text style={styles.sectionTitle}>Ma'lumot</Text>
        <Card style={styles.settingsCard} padding="sm">
          <SettingItem
            icon={<HelpCircle size={20} color={COLORS.gray600} />}
            label="Yordam"
            onPress={() => {}}
          />
          <SettingItem
            icon={<Info size={20} color={COLORS.gray600} />}
            label="Ilova haqida"
            value="v1.0.0"
            onPress={() => {}}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    marginLeft: SPACING.xs,
    marginTop: SPACING.lg,
  },
  settingsCard: {},
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
  },
  settingValue: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});

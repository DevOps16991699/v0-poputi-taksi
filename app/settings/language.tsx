import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes } from '@/constants/theme';
import { Card } from '@/components/ui';

type Language = 'uz' | 'ru' | 'en';

interface LanguageOption {
  value: Language;
  label: string;
  nativeLabel: string;
}

export default function LanguageSettingsScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('uz');

  const languages: LanguageOption[] = [
    { value: 'uz', label: "O'zbek tili", nativeLabel: "O'zbekcha" },
    { value: 'ru', label: 'Rus tili', nativeLabel: 'Русский' },
    { value: 'en', label: 'Ingliz tili', nativeLabel: 'English' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Til</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Ilova tili</Text>
        <Card style={styles.card}>
          {languages.map((lang, index) => (
            <TouchableOpacity
              key={lang.value}
              style={[
                styles.option,
                index < languages.length - 1 && styles.optionBorder,
              ]}
              onPress={() => setSelectedLanguage(lang.value)}
            >
              <View style={styles.optionLeft}>
                <Text style={styles.optionLabel}>{lang.label}</Text>
                <Text style={styles.nativeLabel}>{lang.nativeLabel}</Text>
              </View>
              {selectedLanguage === lang.value && (
                <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </Card>

        <Text style={styles.hint}>
          Tilni o'zgartirganda ilova qayta yuklanadi.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  optionLeft: {
    gap: 2,
  },
  optionLabel: {
    fontSize: FontSizes.md,
    color: Colors.text,
  },
  nativeLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  hint: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginTop: Spacing.md,
    lineHeight: 20,
  },
});

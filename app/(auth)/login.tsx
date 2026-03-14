import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Phone, Lock, Car } from 'lucide-react-native';
import { Button, Input, Divider } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const login = useAuthStore(state => state.login);
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!phone.trim()) {
      newErrors.phone = 'Telefon raqamini kiriting';
    } else if (phone.length < 9) {
      newErrors.phone = "Telefon raqami noto'g'ri";
    }
    
    if (!password.trim()) {
      newErrors.password = 'Parolni kiriting';
    } else if (password.length < 4) {
      newErrors.password = 'Parol kamida 4 ta belgi bo\'lishi kerak';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const success = await login(phone, password);
      if (success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Xatolik', "Telefon raqami yoki parol noto'g'ri");
      }
    } catch (error) {
      Alert.alert('Xatolik', 'Nimadir xato ketdi. Qayta urinib ko\'ring.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + SPACING['3xl'] },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Car size={40} color={COLORS.white} />
          </View>
          <Text style={styles.logoText}>Poputi</Text>
          <Text style={styles.tagline}>Birga sayohat qiling</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.title}>Kirish</Text>
          <Text style={styles.subtitle}>
            Hisobingizga kirish uchun ma'lumotlarni kiriting
          </Text>

          <Input
            label="Telefon raqami"
            placeholder="+998 90 123 45 67"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            leftIcon={<Phone size={20} color={COLORS.gray400} />}
            error={errors.phone}
          />

          <Input
            label="Parol"
            placeholder="Parolingizni kiriting"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon={<Lock size={20} color={COLORS.gray400} />}
            error={errors.password}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Parolni unutdingizmi?</Text>
          </TouchableOpacity>

          <Button
            onPress={handleLogin}
            loading={isLoading}
            fullWidth
            size="lg"
          >
            Kirish
          </Button>

          <Divider label="yoki" />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Hisobingiz yo'qmi? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text style={styles.signupLink}>Ro'yxatdan o'ting</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Demo info */}
        <View style={styles.demoInfo}>
          <Text style={styles.demoText}>
            Demo uchun istalgan telefon raqami va parol kiriting
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SPACING.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING['4xl'],
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  logoText: {
    fontSize: FONT_SIZE['4xl'],
    fontWeight: '700',
    color: COLORS.text,
  },
  tagline: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  form: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE['2xl'],
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING['2xl'],
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.xl,
    marginTop: -SPACING.sm,
  },
  forgotPasswordText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
  signupLink: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
  demoInfo: {
    backgroundColor: COLORS.infoLight,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginTop: SPACING['2xl'],
  },
  demoText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.secondary,
    textAlign: 'center',
  },
});

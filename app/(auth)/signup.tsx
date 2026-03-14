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
import { User, Phone, Lock, ChevronLeft } from 'lucide-react-native';
import { Button, Input } from '@/components/ui';
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@/constants/theme';

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Ismingizni kiriting';
    } else if (name.length < 2) {
      newErrors.name = 'Ism kamida 2 ta harf bo\'lishi kerak';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Telefon raqamini kiriting';
    } else if (phone.length < 9) {
      newErrors.phone = "Telefon raqami noto'g'ri";
    }
    
    if (!password.trim()) {
      newErrors.password = 'Parolni kiriting';
    } else if (password.length < 6) {
      newErrors.password = 'Parol kamida 6 ta belgi bo\'lishi kerak';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Parollar mos kelmadi';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Muvaffaqiyatli',
        "Ro'yxatdan o'tdingiz! Endi tizimga kirishingiz mumkin.",
        [
          {
            text: 'Kirish',
            onPress: () => router.replace('/(auth)/login'),
          },
        ]
      );
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
          { paddingTop: insets.top + SPACING.md },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ChevronLeft size={28} color={COLORS.text} />
        </TouchableOpacity>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.title}>Ro'yxatdan o'tish</Text>
          <Text style={styles.subtitle}>
            Hisobingizni yaratish uchun ma'lumotlarni to'ldiring
          </Text>

          <Input
            label="Ism"
            placeholder="Ismingizni kiriting"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            leftIcon={<User size={20} color={COLORS.gray400} />}
            error={errors.name}
          />

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
            placeholder="Parol yarating"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon={<Lock size={20} color={COLORS.gray400} />}
            error={errors.password}
          />

          <Input
            label="Parolni tasdiqlang"
            placeholder="Parolni qayta kiriting"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            leftIcon={<Lock size={20} color={COLORS.gray400} />}
            error={errors.confirmPassword}
          />

          <Button
            onPress={handleSignup}
            loading={isLoading}
            fullWidth
            size="lg"
            style={styles.submitButton}
          >
            Ro'yxatdan o'tish
          </Button>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              Ro'yxatdan o'tish orqali siz{' '}
            </Text>
            <TouchableOpacity>
              <Text style={styles.termsLink}>Foydalanish shartlari</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}> va </Text>
            <TouchableOpacity>
              <Text style={styles.termsLink}>Maxfiylik siyosati</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}>ga rozilik bildirasiz</Text>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Hisobingiz bormi? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.loginLink}>Kirish</Text>
            </TouchableOpacity>
          </View>
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
  backButton: {
    marginBottom: SPACING.xl,
    padding: SPACING.xs,
    marginLeft: -SPACING.xs,
    alignSelf: 'flex-start',
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
  submitButton: {
    marginTop: SPACING.md,
  },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: SPACING.xl,
  },
  termsText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
  },
  termsLink: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING['2xl'],
  },
  loginText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
  },
  loginLink: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

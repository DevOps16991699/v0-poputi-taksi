# Poputi Taksi - Expo SDK 54 O'rnatish Qo'llanmasi

## Umumiy Ma'lumot

Bu loyiha **Expo SDK 54** va React Native 0.85.0 versiyalari uchun to'liq moslashtirilgan va optimallashtirilgan.

## O'rnatish Bosqichlari

### 1. Loyihani Klonlashtirish
```bash
git clone https://github.com/DevOps16991699/v0-poputi-taksi.git
cd v0-poputi-taksi
```

### 2. Dependency'larni O'rnatish
```bash
npm install
# yoki Yarn bilan
yarn install
```

### 3. Loyihani Ishga Tushirish

#### Expo Go orqali (eng tez usuli)
```bash
npm start
```
Terminal'da chiqadigan QR-kodini Expo Go ilova orqali skanerlang.

#### iOS Simulatorda
```bash
npm run ios
```

#### Android Emulatorda
```bash
npm run android
```

#### Web brauzerda
```bash
npm run web
```

## Loyiha Konfiguratsiyasi

### Asosiy Dependencies
- **Expo SDK**: 54.0.0
- **React Native**: 0.85.0
- **React**: 18.3.1

### Expo Modullar
- `expo-router` - Fayl-asosida marshrutlash
- `expo-font` - Maxsus shriftlar
- `expo-image` - Rasm ishlov berish
- `expo-linear-gradient` - Gradient qo'llab-quvvatlash
- `expo-secure-store` - Xavfsiz saqlash
- `expo-location` - Joylashuvni aniqlash
- `expo-notifications` - Bildirishnomalar
- `expo-haptics` - Vibration va haptic uxshashlik

### Navigatsiya Kutubxonalari
- React Navigation 7.0.0
- React Native Screens 4.2.0
- React Native Gesture Handler 2.21.0
- React Native Reanimated 3.17.0

## Asosiy Xususiyatlar

### Yangi Arxitektura (Hermes)
Loyihada Hermes engine yoqilgan, bu yaxshiroq ishlash va tezlik beradi.

### Tipli Marshrutlar
Expo Router bilan to'liq type-safety qo'llab-quvvatlang.

## Loyihaning Tuzilishi

```
poputi-taksi/
├── app/
│   ├── (auth)/           # Autentifikatsiya ekranlari
│   ├── (tabs)/           # Asosiy tab navigation
│   ├── chat/             # Chat funksionalligi
│   ├── driver/           # Haydovchi xususiyatlari
│   ├── ride/             # Sayohat ma'lumotlari
│   ├── profile/          # Foydalanuvchi profili
│   ├── settings/         # Sozlamalar
│   └── _layout.tsx       # Root layout
├── components/           # Qayta foydalaniladigan komponentlar
├── hooks/                # Custom React hooks
├── stores/               # Zustand state management
├── constants/            # App constants va theme
├── utils/                # Utility funksiyalari
├── shared/               # Shared types va mock data
├── assets/               # Icon, splash screen va faviconlar
├── app.json              # Expo konfiguratsiyasi
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript konfiguratsiyasi
```

## Produksiyaga Yubborish

### EAS Build bilan

EAS CLI'ni o'rnatish:
```bash
npm install -g eas-cli
eas login
```

iOS uchun build qilish:
```bash
npm run build:ios
```

Android uchun build qilish:
```bash
npm run build:android
```

### Local Prebuild
```bash
npm run prebuild
```

## Tipik Muammolar va Yechimlar

### Dependencies o'rnatilmasa
```bash
# Cache'ni tozalash va qaytadan o'rnatish
rm -rf node_modules
npm install
```

### Build xatosi
```bash
# Expo cache'ni tozalash
expo start --clear
```

### Ushbu loyiha qaysi OS'lar bilan ishlamaydi?

- **iOS**: iOS 13+ talab qilinadi
- **Android**: Android 5.1+ (API level 21+) talab qilinadi

## Foydalanuvchi Rolli

Loyihada ikki foydalanuvchi roli mavjud:

1. **Yo'lovchi** (Passenger)
   - Sayohatlarni qidirish va bronlash
   - Drayverlar bilan chatlashtirish
   - Reyting va sharhlar qo'yish

2. **Drayver** (Driver)
   - Sayohat e'lonlari yaratish
   - Yo'lovchilar bilan chatlashtirish
   - Sayohat statistikasi ko'rish

## Tillar

Loyiha O'zbek tilida FULLY qo'llab-quvvatlang va foydalanuvchi interfeysi ham O'zbek tilida.

## Qo'shimcha Maslahatlar

1. **Dev Client** - Tez development uchun `expo-dev-client` o'rnatilgan
2. **TypeScript** - To'liq type safety bilan yozilgan
3. **Zustand** - Oddiy lekin kuchli state management
4. **Async Storage** - Mahalliy ma'lumotlar saqlash

## Foydali Buyruqlar

```bash
# Linting
npm run lint

# Loyiha boshlash (clear cache)
npm start --clear

# Native code generator
npm run prebuild

# Android APK build qilish
eas build --platform android --local
```

## Qo'shimcha Dokumentatsiya

- [Expo SDK 54 Haqida](https://docs.expo.dev/guides/sdk-54/)
- [Expo Router](https://docs.expo.dev/routing/introduction/)
- [React Native 0.85](https://reactnative.dev/blog/2024/08/16/0.85-release)
- [Hermes Engine](https://hermesengine.dev/)

---

**Savollar bo'lsa, GitHub Issues orqali murojaat qiling.**

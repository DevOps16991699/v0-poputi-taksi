# Poputi Taksi - React Native (Expo)

Shaharlararo taksi ilovasi - yo'lovchilar va haydovchilar uchun.

## O'rnatish

```bash
# Paketlarni o'rnatish
npm install

# iOS podlarni o'rnatish (faqat macOS)
npx pod-install

# Ilovani ishga tushirish
npx expo start
```

## Ishga tushirish

```bash
# Development server
npx expo start

# iOS simulatorda
npx expo start --ios

# Android emulatorda
npx expo start --android

# Expo Go ilovasida
npx expo start --go
```

## Loyiha strukturasi

```
react-native/
├── app/                    # Expo Router sahifalari
│   ├── (auth)/            # Auth sahifalari (login, signup)
│   ├── (tabs)/            # Tab navigator sahifalari
│   ├── chat/              # Chat sahifalari
│   ├── profile/           # Profil sub-sahifalari
│   ├── ride/              # Safar tafsilotlari
│   ├── settings/          # Sozlamalar sahifalari
│   └── _layout.tsx        # Root layout
├── components/            # React komponentlar
│   └── ui/               # UI Kit komponentlari
├── constants/            # Konstantalar (theme, app config)
├── hooks/                # Custom React hooks
├── shared/               # Umumiy kod
│   ├── data/            # Mock data
│   └── types/           # TypeScript types
├── stores/               # Zustand stores
└── utils/                # Utility funksiyalar
```

## Texnologiyalar

- **Framework:** React Native + Expo SDK 52
- **Navigation:** Expo Router (file-based)
- **State Management:** Zustand
- **Icons:** @expo/vector-icons (Ionicons)
- **Storage:** AsyncStorage
- **Animations:** react-native-reanimated

## Qo'shimcha ma'lumot

Build qilish uchun EAS CLI dan foydalaning:

```bash
# Development build
npx eas build --platform android --profile development
npx eas build --platform ios --profile development

# Production build
npx eas build --platform all --profile production
```

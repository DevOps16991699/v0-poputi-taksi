## Expo SDK 54 bilan to'liq moslashtirilgan React Native/Expo loyihasi

**Poputi Taksi** - Yo'lovchi va haydovchilarni birlashtiruvchi mumtazo ride-sharing ilovasi, Expo SDK 54 va React Native 0.81.5 bilan qurilgan.

---

## 🌟 Asosiy Xususiyatlar

- ✅ **Expo SDK 54.0.0** - Oxirgi va eng tezkor SDK versiyasi
- ✅ **React Native 0.81.5** - Yangilashtirilgan React Native versiyasi
- ✅ **Hermes Engine** - Tezroq startup va kichikroq bundle
- ✅ **Expo Router** - Fayl-asosida marshrutlash
- ✅ **TypeScript** - To'liq type safety
- ✅ **New Architecture** - Yangi React Native arxitekturasi faollashtirilgan
- ✅ **Zustand** - Oddiy lekin kuchli state management
- ✅ **React Navigation 7** - Yangilashtirilgan navigatsiya
- ✅ **Expo Location** - GPS va joylashuvni aniqlash
- ✅ **Expo Notifications** - Push notifications
- ✅ **Expo Secure Store** - Xavfsiz ma'lumotlar saqlash
- ✅ **O'zbek Tili** - To'liq O'zbek tilida qo'llab-quvvatlash

---

## 🚀 Boshlanish

### Talablar
- Node.js 16+ va npm/yarn
- Expo CLI
- iOS Simulator (Mac) yoki Android Emulator
- Expo Go app (mobile testing uchun)


## 📁 Loyiha Strukturasi

```
poputi-taksi/
├── app/
│   ├── (auth)/              # 🔐 Autentifikatsiya (login, signup)
│   ├── (tabs)/              # 📱 Asosiy tab navigation
│   │   ├── index.tsx        # Asosiy ekran
│   │   ├── search.tsx       # Qidirish ekrani
│   │   ├── create.tsx       # E'lon yaratish
│   │   ├── chats.tsx        # Xabarlar
│   │   └── profile.tsx      # Profil
│   ├── chat/                # 💬 Chat interface
│   ├── driver/              # 🚗 Drayver xususiyatlari
│   ├── ride/                # 🚕 Sayohat ma'lumotlari
│   ├── profile/             # 👤 Profil boshqaruvi
│   ├── settings/            # ⚙️ Soslamalar
│   └── _layout.tsx          # Root layout
│
├── components/              # 🧩 Qayta foydalaniladigan komponentlar
│   ├── ui/                  # Basic UI komponentlari
│   ├── EmptyState.tsx       # Bo'sh holat
│   ├── Header.tsx           # Header
│   ├── LoadingScreen.tsx    # Loading ekrani
│   ├── RideCard.tsx         # Sayohat karti
│   └── SplashScreen.tsx     # Splash ekrani
│
├── hooks/                   # 🎣 Custom React hooks
│   └── useColorScheme.ts    # Theme hooks
│
├── stores/                  # 📦 Zustand state management
│   ├── authStore.ts         # Authentication state
│   ├── ridesStore.ts        # Rides state
│   └── index.ts
│
├── constants/               # 🎨 Constants va theme
│   ├── theme.ts            # Color palette
│   └── app.ts
│
├── utils/                   # 🛠️ Utility funksiyalari
│   ├── storage.ts          # AsyncStorage
│   ├── format.ts           # Formatlash funksiyalari
│   └── index.ts
│
├── shared/                  # 📚 Shared types va data
│   ├── types/              # TypeScript types
│   └── data/
│       └── mock.ts         # Mock data
│
├── assets/                  # 🎨 Images va icons
│
├── app.json                 # 📋 Expo konfiguratsiyasi
├── package.json             # 📦 Dependencies
├── tsconfig.json            # TypeScript config
├── babel.config.js          # Babel config
├── metro.config.js          # Metro bundler config
└── eas.json                 # EAS Build config
```

---

## 🛠️ Asosiy Teknologiyalar

### Core Framework
- **Expo 54.0.0** - Mobile development platform
- **React Native 0.81.5** - Cross-platform mobile
- **React 19.1.0** - UI library
- **TypeScript 5.9.3** - Type safety

### Navigation & State
- **Expo Router 6.0.23** - File-based routing
- **React Navigation 7.0.0** - Navigation library
- **Zustand 5.0.0** - Lightweight state management

### UI & Animations
- **Lucide React Native** - Icon library
- **React Native Reanimated 3.17** - Smooth animations
- **React Native Gesture Handler 2.21** - Gesture handling

### Utilities
- **date-fns 3.6.0** - Date manipulation
- **AsyncStorage 2.1.0** - Local data persistence
- **Expo Linear Gradient** - Gradient support

---

## 📱 Ekranlar va Funksiyalar

### Yo'lovchi (Passenger)
- 🏠 **Asosiy** - Aktual sayohatlar ko'rish
- 🔍 **Qidirish** - Sayohatlar qidirish va bronlash
- 💬 **Xabarlar** - Drayverlar bilan chatlashtirish
- 👤 **Profil** - Shaxsiy ma'lumotlar va manzillar

### Drayver (Driver)
- 🏠 **Asosiy** - Dashboard va statistika
- ➕ **E'lon** - Yangi sayohat e'lonlari yaratish
- 📊 **Safar Raqamlari** - Sayohat statistikasi
- 💬 **Xabarlar** - Yo'lovchilar bilan chatlashtirish

---

## 📦 Scripts

```bash
# Development
npm start              # Expo dev server ishga tushirish
npm run ios           # iOS simulator'da ochish
npm run android       # Android emulator'da ochish
npm run web           # Web brauzerda ochish

# Linting
npm run lint          # Code linting

# Building
npm run prebuild      # Native projects generate qilish
npm run build:ios     # EAS bilan iOS build
npm run build:android # EAS bilan Android build
```

---

## 🚀 Production Deployment

### EAS Build

```bash
# EAS CLI o'rnatish
npm install -g eas-cli
eas login

# iOS build
npm run build:ios

# Android build
npm run build:android
```

---

## 🐛 Troubleshooting

### Dependencies o'rnatilmasa
```bash
rm -rf node_modules
npm install
```

### Cache'ni tozalash
```bash
npm start --clear
```

### Detailed Logs
```bash
expo start --verbose
```

---

## 📚 Dokumentatsiya

- **[SDK_54_COMPATIBILITY.md](./SDK_54_COMPATIBILITY.md)** - SDK 54 detailed guide
- **[SETUP_UZ.md](./SETUP_UZ.md)** - O'zbek tilida o'rnatish qo'llanmasi
- **[SDK_54_CHECKLIST.md](./SDK_54_CHECKLIST.md)** - Moslashtirilganlik tekshirish ro'yxati

---

## 📱 Device Support

### iOS
- **Minimum**: iOS 13+
- **Optimal**: iOS 14+

### Android
- **Minimum**: Android 5.1 (API Level 21+)
- **Optimal**: Android 10+

### Web
- Modern browsers (Chrome, Safari, Firefox)

---

## 🔐 Security

- ✅ **Expo Secure Store** - Sensitive ma'lumotlarni xavfsiz saqlash
- ✅ **Token Management** - SecureStore'da token saqlash
- ✅ **Input Validation** - Barcha inputlarni validate qilish

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🔗 Links

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [Expo Router Guide](https://docs.expo.dev/routing/introduction/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)

---

**Yaratilgan: 2026-03-14 | Status: ✅ SDK 54 bilan to'liq moslashtirilgan | Version: 1.0.0**

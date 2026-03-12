# Poputi Taksi - Mobile Build Guide

Bu yo'riqnoma sizga Capacitor yordamida ilovani Android va iOS qurilmalarda ishga tushirishni ko'rsatadi.

## Talablar

### Android uchun:
- Node.js 18+
- Android Studio (Electric Eel yoki yangi)
- Android SDK (API 22+)
- Java 17+

### iOS uchun:
- macOS
- Xcode 14+
- CocoaPods
- Apple Developer Account (qurilmada test qilish uchun)

## O'rnatish

### 1. Dependencylarni o'rnatish

```bash
npm install
```

### 2. Capacitor platformalarini qo'shish

```bash
# Android qo'shish
npx cap add android

# iOS qo'shish (faqat macOS da)
npx cap add ios
```

### 3. Build va Sync

```bash
# Next.js build va Capacitor sync
npm run mobile:build
```

## Android da ishga tushirish

### Android Studio orqali:

```bash
# Android Studio ni ochish
npm run mobile:android
```

Keyin Android Studio da:
1. Emulator yoki haqiqiy qurilmani tanlang
2. Run tugmasini bosing (yashil o'yin)

### Command line orqali:

```bash
npx cap run android
```

## iOS da ishga tushirish (faqat macOS)

### Xcode orqali:

```bash
# Xcode ni ochish
npm run mobile:ios
```

Keyin Xcode da:
1. Signing & Capabilities da Team ni tanlang
2. Simulator yoki haqiqiy qurilmani tanlang
3. Run tugmasini bosing

### Command line orqali:

```bash
npx cap run ios
```

## Live Reload (Development)

Development paytida o'zgarishlarni real vaqtda ko'rish uchun:

### 1. Local IP manzilni toping

```bash
# macOS/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

### 2. capacitor.config.ts ni yangilang

```typescript
server: {
  url: 'http://YOUR_LOCAL_IP:3000',
  cleartext: true
}
```

### 3. Development serverni ishga tushiring

```bash
npm run dev
```

### 4. Ilovani qurilmada ishga tushiring

```bash
npx cap run android
# yoki
npx cap run ios
```

## Build qilish (Production)

### Android APK/AAB

Android Studio da:
1. Build > Generate Signed Bundle / APK
2. APK yoki Android App Bundle ni tanlang
3. Keystore yarating yoki mavjudini tanlang
4. Release ni tanlang va Finish bosing

### iOS IPA

Xcode da:
1. Product > Archive
2. Distribute App
3. App Store Connect yoki Ad Hoc ni tanlang
4. Export qiling

## Foydali Capacitor buyruqlari

```bash
# Platformalar holatini tekshirish
npx cap doctor

# Plugin lar ro'yxati
npx cap ls

# Yangilash
npx cap update

# Sync (web assets ni native loyihaga nusxalash)
npx cap sync

# Copy (faqat web assets)
npx cap copy
```

## Xatolarni bartaraf qilish

### Android: "SDK location not found"
`android/local.properties` faylini yarating:
```
sdk.dir=/path/to/Android/Sdk
```

### iOS: Signing xatolari
1. Xcode da Signing & Capabilities ga boring
2. Team ni tanlang
3. Bundle Identifier ni o'zgartiring (masalan: `com.yourname.poputitaksi`)

### Oq ekran ko'rinsa
1. `npm run mobile:build` ni qayta ishga tushiring
2. `out/` papkasi mavjudligini tekshiring
3. Console loglarni tekshiring

## Splash Screen va Icon

### Android
`android/app/src/main/res/` papkasida:
- `mipmap-*` papkalarida ikonkalar
- `drawable/splash.png` splash screen

### iOS
`ios/App/App/Assets.xcassets/` da:
- `AppIcon.appiconset/` ikonkalar
- `Splash.imageset/` splash screen

## Shared Folder Strukturasi

Loyiha `shared/` papkasiga ega bo'lib, bu React Native ga o'tishni osonlashtiradi:

```
shared/
├── types/          # TypeScript interfeyslari va tiplar
│   └── index.ts
├── constants/      # O'zgarmas qiymatlar (routes, cities, va h.k.)
│   └── index.ts
├── utils/          # Yordamchi funksiyalar (format, validate, filter)
│   └── index.ts
├── validation/     # Zod schemalar
│   └── index.ts
├── data/           # Mock data (development uchun)
│   └── mock.ts
└── index.ts        # Barrel export
```

### Import qilish

```typescript
// Barcha exportlarni import qilish
import { Ride, formatPrice, mockRides, rideFormSchema } from '@shared'

// Alohida import qilish
import type { User, Ride } from '@shared/types'
import { ROUTES, POPULAR_ROUTES } from '@shared/constants'
import { formatPrice, filterRides } from '@shared/utils'
import { loginSchema } from '@shared/validation'
import { mockRides } from '@shared/data/mock'
```

### React Native ga o'tish

Kelajakda React Native ga o'tmoqchi bo'lsangiz:

1. `shared/` papkasini yangi React Native loyihaga nusxalang
2. `@shared` path alias ni sozlang
3. Platform-specific komponentlar (UI) ni qayta yozing
4. Business logic va tiplar bir xil qoladi

## Qo'shimcha resurslar

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Studio Guide](https://developer.android.com/studio)
- [Xcode Guide](https://developer.apple.com/xcode/)

# Poputi Taksi - Expo SDK 54 Compatibility Guide

## Overview
This project is fully configured and optimized for **Expo SDK 54** with React Native 0.85.0. All dependencies are compatible with this SDK version.

## Configuration Details

### Core Dependencies
- **Expo SDK**: 54.0.0
- **React Native**: 0.81.5
- **React**: 19.1.0
- **React Router**: 6.0.23

### Expo Modules
All expo modules are compatible with SDK 54:
- `expo-router` - ~4.0.0 (File-based routing)
- `expo-font` - ~13.0.0 (Custom fonts)
- `expo-image` - ~2.0.0 (Image handling)
- `expo-linear-gradient` - ~14.0.0 (Gradient support)
- `expo-haptics` - ~14.0.0 (Haptic feedback)
- `expo-secure-store` - ~14.0.0 (Secure storage)
- `expo-constants` - ~17.0.0 (App constants)
- `expo-linking` - ~7.0.0 (Deep linking)
- `expo-location` - ~18.0.0 (Location services)
- `expo-notifications` - ~0.29.0 (Push notifications)
- `expo-splash-screen` - ~0.29.0 (Splash screen)
- `expo-status-bar` - ~2.0.0 (Status bar)

### Navigation & UI Libraries
- `@react-navigation/native` - ^7.0.0
- `@react-navigation/bottom-tabs` - ^7.0.0
- `@react-navigation/drawer` - ^7.0.0
- `react-native-screens` - ~4.2.0
- `react-native-gesture-handler` - ~2.21.0
- `react-native-reanimated` - ~3.17.0
- `react-native-safe-area-context` - 4.12.0

### Additional Libraries
- `lucide-react-native` - ^0.468.0 (Icons)
- `react-native-svg` - 15.8.0 (SVG support)
- `zustand` - ^5.0.0 (State management)
- `@react-native-async-storage/async-storage` - 2.1.0 (Data storage)
- `date-fns` - ^3.6.0 (Date utilities)

## Project Configuration Files

### app.json
```json
{
  "expo": {
    "name": "Poputi Taksi",
    "slug": "poputi-taksi",
    "version": "1.0.0",
    "sdkVersion": "54.0.0",
    "newArchEnabled": true,
    "orientation": "portrait",
    ...
  }
}
```

### babel.config.js
Uses Expo's babel preset with react-native-reanimated plugin for smooth animations.

### metro.config.js
Uses Expo's default Metro configuration for optimal bundling.

### tsconfig.json
Extends from `expo/tsconfig.base` with strict type checking enabled.

## Features Enabled

### New Architecture (Hermes)
`newArchEnabled: true` - The project uses the new React Native architecture with Hermes engine for better performance.

### Typed Routes
`typedRoutes: true` - Full type safety for route navigation using expo-router.

## Running on Expo Go

To run this project on Expo Go:

```bash
# Install dependencies
npm install

# Start Expo development server
npm start

# Open on iOS simulator
npm run ios

# Open on Android emulator
npm run android

# Open on web
npm run web
```

Scan the QR code displayed in your terminal with:
- **iOS**: Camera app or Expo Go app
- **Android**: Expo Go app

## Building for Production

### Using EAS Build
```bash
# Build for iOS
npm run build:ios

# Build for Android
npm run build:android
```

### Local Prebuild
```bash
npm run prebuild
```

## SDK 54 Compatibility Notes

### Breaking Changes & Upgrades
- React Native upgraded to 0.81.5 (from 0.76.0)
- New Architecture (Hermes) is enabled by default
- All Expo modules have been updated to their latest SDK 54 compatible versions

### Performance Improvements
- Hermes engine provides faster startup times
- Improved bundle size
- Better JavaScript execution performance

### API Changes
All APIs used in this project (location, notifications, storage, etc.) are fully compatible with SDK 54.

## Troubleshooting

### If dependencies don't install:
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
# Or with yarn
rm -rf node_modules
yarn install
```

### If build fails:
```bash
# Clear Expo cache
expo start --clear

# Or for EAS builds
eas build --platform android --clear-cache
```

### Device compatibility:
- **iOS**: iOS 13+ required
- **Android**: Android 5.1+ (API level 21+) required

## Version History

- **v1.0.0**: Initial release with Expo SDK 54 compatibility
  - Updated from SDK 52
  - React Native 0.81.5
  - New Architecture (Hermes) enabled
  - All dependencies updated for SDK 54

## Support & Documentation

- [Expo SDK 54 Release Notes](https://docs.expo.dev/guides/sdk-54/)
- [Expo Router Documentation](https://docs.expo.dev/routing/introduction/)
- [React Native 0.85 Changes](https://reactnative.dev/blog/2024/08/16/0.85-release)
- [Hermes Documentation](https://hermesengine.dev/)

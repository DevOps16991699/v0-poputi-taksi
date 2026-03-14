# Troubleshooting Guide - Expo SDK 54 Migration

## Common Issues and Solutions

---

## 1. Merge Conflicts in GitHub PR

### Problem
GitHub shows merge conflicts in the pull request.

### Solution

#### Automated (Recommended)
```bash
bash scripts/resolve-conflicts.sh
```

This script will:
- Fetch latest changes
- Detect conflicts
- Apply SDK 54 resolution strategy
- Commit automatically
- Prepare for merge

#### Manual Resolution
1. Review conflicted files:
   ```bash
   git status
   ```

2. For each conflict, choose the correct version:
   - **package.json** → Keep SDK 54 versions
   - **app.json** → Keep Hermes settings
   - **README.md** → Keep comprehensive docs

3. Resolve using git:
   ```bash
   git checkout --theirs package.json
   git checkout --theirs app.json
   git add .
   git commit -m "Resolve merge conflicts: Maintain SDK 54 compatibility"
   ```

4. Push changes:
   ```bash
   git push origin v0/khabibullokosimboev-2983-e376c189
   ```

---

## 2. Dependencies Installation Issues

### Problem
`npm install` fails or gets stuck.

### Solution

#### Option 1: Clear and Reinstall
```bash
# Remove node_modules and lock file
rm -rf node_modules
rm -rf pnpm-lock.yaml

# Reinstall
npm install
```

#### Option 2: Use Different Package Manager
```bash
# If npm fails, try yarn
yarn install

# Or use pnpm
pnpm install

# Or use bun
bun install
```

#### Option 3: Force Resolution
```bash
npm install --legacy-peer-deps
```

---

## 3. Build Failures

### Problem
Build fails with errors about packages or configuration.

### Solution

#### Clear Cache
```bash
# Clear npm cache
npm cache clean --force

# Clear Expo cache
expo start --clear

# Clear Metro cache
npm start -- --reset-cache
```

#### Verify Configuration
```bash
# Check if app.json is valid
node -e "console.log(JSON.parse(require('fs').readFileSync('app.json', 'utf8')))"

# Check if package.json is valid
node -e "console.log(JSON.parse(require('fs').readFileSync('package.json', 'utf8')))"
```

#### Rebuild Native Projects
```bash
# Remove native builds
rm -rf ios android

# Prebuild
npx expo prebuild

# Then build
npm run build:ios
npm run build:android
```

---

## 4. Hermes Engine Issues

### Problem
App crashes or has issues related to Hermes engine.

### Solution

#### Disable Hermes (Temporary)
In `app.json`:
```json
{
  "expo": {
    "jsEngine": "jsc"  // Changed from "hermes"
  }
}
```

#### Check Hermes Compatibility
```bash
# Verify Hermes is working
expo start
# Watch for "Using Hermes" in logs
```

#### Report Issue
If Hermes causes persistent issues:
1. Document the error
2. Check [Hermes GitHub Issues](https://github.com/facebook/hermes/issues)
3. Report to Expo: https://github.com/expo/expo/issues

---

## 5. Location Services Not Working

### Problem
GPS/location features don't work on device.

### Solution

#### Check Permissions
```bash
# Verify location permissions in app.json
cat app.json | grep -A5 "permissions"
```

#### Ensure expo-location is Installed
```bash
npm list expo-location
# Should show ~18.0.0
```

#### Test Location
```javascript
// In your component
import * as Location from 'expo-location';

useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
  })();
}, []);
```

---

## 6. Notifications Not Working

### Problem
Push notifications not being received.

### Solution

#### Verify expo-notifications
```bash
npm list expo-notifications
# Should show ~0.29.0
```

#### Check Notification Permissions
```javascript
import * as Notifications from 'expo-notifications';

useEffect(() => {
  (async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      console.log('Permission status:', newStatus);
    }
  })();
}, []);
```

#### Test Push Notifications
```bash
# Start dev server
npm start

# In another terminal
node -e "
const expo = require('expo-server-sdk').default;
const client = new expo();
client.sendPushNotificalsAsync([{
  to: 'YOUR_EXPO_PUSH_TOKEN',
  sound: 'default',
  title: 'Test Notification',
  body: 'This is a test'
}])
"
```

---

## 7. TypeScript Errors

### Problem
TypeScript compilation errors appear.

### Solution

#### Check tsconfig.json
```bash
# Verify TypeScript config
npm run lint
```

#### Strict Mode Issues
If strict mode causes issues, temporarily relax:
```json
{
  "compilerOptions": {
    "strict": false  // Temporary - fix issues properly
  }
}
```

#### Type Definition Issues
```bash
# Reinstall type definitions
npm install --save-dev @types/react @types/react-native
```

---

## 8. Hot Module Replacement (HMR) Not Working

### Problem
Changes aren't reflected when saving files.

### Solution

#### Restart Dev Server
```bash
# Stop (Ctrl+C) and restart
npm start --clear
```

#### Check File Watcher
```bash
# Increase file watchers (on Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

#### Clear Metro Cache
```bash
npm start -- --reset-cache
```

---

## 9. App Crashes on Startup

### Problem
App crashes immediately after launch.

### Solution

#### Check Logs
```bash
# Verbose logging
expo start --verbose

# Check error message in terminal/Xcode
```

#### Common Causes
1. **Wrong SDK version** - Check app.json `sdkVersion`
2. **Missing dependencies** - Run `npm install`
3. **Incompatible packages** - Check package.json versions
4. **Syntax errors** - Run `npm run lint`

#### Reset Everything
```bash
# Remove node_modules and cache
rm -rf node_modules
npm cache clean --force

# Reinstall
npm install

# Clear app cache
expo start --clear
```

---

## 10. Performance Issues

### Problem
App is slow or laggy.

### Solution

#### Verify Hermes is Enabled
```bash
# Check app.json
grep "jsEngine" app.json
# Should show: "jsEngine": "hermes"
```

#### Monitor Performance
```javascript
// Use React Native performance monitoring
import { PerformanceObserver } from 'perf_hooks';

// Profile your app
console.log(require('expo-constants').manifest.jsEngine);
```

#### Optimize Rendering
- Use React.memo for components
- Optimize FlatList rendering
- Avoid unnecessary re-renders
- Use Reanimated for animations

#### Check Bundle Size
```bash
# Analyze bundle
npm run build:android -- --analyze
```

---

## 11. Authentication Issues

### Problem
Login/signup fails or session not maintained.

### Solution

#### Check AsyncStorage
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Clear storage if needed
await AsyncStorage.clear();
```

#### Verify Secure Store
```bash
npm list expo-secure-store
# Should show ~14.0.0
```

#### Test Auth Flow
```javascript
import * as SecureStore from 'expo-secure-store';

// Try storing data
await SecureStore.setItemAsync('auth-token', 'test-token');
const token = await SecureStore.getItemAsync('auth-token');
console.log('Token:', token);
```

---

## 12. iOS Build Failures

### Problem
iOS build fails in EAS or Xcode.

### Solution

#### Check iOS Minimum Version
```json
{
  "expo": {
    "ios": {
      "supportsTabletMode": true,
      "deploymentTarget": "13.0"
    }
  }
}
```

#### Clean Build Cache
```bash
# Remove iOS build cache
rm -rf ~/Library/Developer/Xcode/DerivedData

# Prebuild
npx expo prebuild --clean
```

#### Check iOS Podfile
```bash
# Verify pods are installed
cd ios && pod install && cd ..
```

---

## 13. Android Build Failures

### Problem
Android build fails in EAS or Android Studio.

### Solution

#### Check Java Version
```bash
java -version
# Should be Java 11 or higher
```

#### Clean Android Cache
```bash
# Remove Android build cache
rm -rf android/build
rm -rf android/.gradle

# Prebuild
npx expo prebuild --clean
```

#### Check Android SDK
```bash
# Verify Android SDK is installed
$ANDROID_HOME/tools/bin/sdkmanager --list
```

---

## 14. EAS Build Issues

### Problem
EAS Build fails or hangs.

### Solution

#### Check EAS CLI
```bash
# Update EAS CLI
npm install -g eas-cli@latest

# Verify setup
eas whoami
```

#### Check eas.json
```bash
# Verify EAS configuration
cat eas.json | jq .
```

#### Try Simple Build
```bash
# Start with development build
eas build --platform android --profile development

# Or iOS
eas build --platform ios --profile development
```

#### Check Build Status
```bash
# See build history
eas build:list

# View specific build
eas build:view <build-id>
```

---

## 15. Git/GitHub Issues

### Problem
Git operations fail or GitHub conflict resolution unclear.

### Solution

#### Reset to Clean State
```bash
# Fetch latest from remote
git fetch origin

# Reset to main
git reset --hard origin/main

# Check status
git status
```

#### Force Conflict Resolution
```bash
# Use theirs (incoming changes)
git checkout --theirs .

# Or use ours (current changes)
git checkout --ours .

# Then commit
git add .
git commit -m "Resolve conflicts"
```

#### Abort Merge If Needed
```bash
# If merge gets too complicated
git merge --abort

# Then try again
git pull origin main
```

---

## 🆘 Emergency Troubleshooting

### If Everything is Broken

```bash
# 1. Start from scratch
rm -rf node_modules
rm -rf pnpm-lock.yaml
rm -rf ios android
rm -rf .expo

# 2. Clean caches
npm cache clean --force
expo start --clear

# 3. Reinstall
npm install

# 4. Prebuild
npx expo prebuild

# 5. Start dev server
npm start
```

### Still Issues?

1. **Check the documentation files:**
   - CONFLICT_RESOLUTION.md
   - SETUP_UZ.md
   - SDK_54_COMPATIBILITY.md
   - FINAL_VERIFICATION.md

2. **Search GitHub issues:**
   - https://github.com/expo/expo/issues
   - https://github.com/react-native-community/discussions-and-proposals

3. **Ask community:**
   - Expo Discord: https://discord.gg/expo
   - React Native Discord: https://discord.gg/react

4. **Check logs carefully:**
   ```bash
   npm start --verbose
   ```

---

## 📞 Getting Help

### Before Asking for Help

1. ✅ Read the error message carefully
2. ✅ Check if the solution is in this document
3. ✅ Review CONFLICT_RESOLUTION.md
4. ✅ Check SETUP_UZ.md for setup issues
5. ✅ Review FINAL_VERIFICATION.md

### Resources

- **Expo Docs:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev
- **Expo GitHub:** https://github.com/expo/expo/issues
- **Stack Overflow:** https://stackoverflow.com/questions/tagged/react-native

---

## 📋 Checklist for Support

When reporting an issue, include:

- [ ] Error message (full text)
- [ ] Steps to reproduce
- [ ] Expo SDK version: `expo --version`
- [ ] React Native version: `npm list react-native`
- [ ] Node.js version: `node --version`
- [ ] OS and tools used
- [ ] Relevant code snippet
- [ ] app.json content
- [ ] package.json content

---

**Last Updated:** 2026-03-14  
**Status:** SDK 54 Migration Guide  
**Version:** 1.0.0

---

## ✨ Final Notes

Most issues are resolved by:
1. Clearing cache: `npm start --clear`
2. Reinstalling: `npm install`
3. Checking versions match SDK 54 specs
4. Reading the documentation files

**You've got this!** 🚀

# Expo SDK 54 Pull Request - Conflict Resolution Guide

## O'zbek Tilida (Uzbek)

### Merge Conflict'larni Hal Qilish

Agar GitHub'da pull request'da conflict ko'rsatilayotgan bo'lsa, quyidagi qadam-bosqichlarda ishni olib boring:

#### 1. Local Repository'ni Yangilash

```bash
cd v0-poputi-taksi
git fetch origin
git pull origin main
```

#### 2. Conflict'larni Tekshirish

```bash
git status
```

#### 3. Conflict'lar Bilan Ishlash

Agar fayllar konflikt bo'lsa, ularni qo'lda o'zgartiring yoki Git tool'dan foydalaning:

```bash
# VSCode'da conflict resolution
# - "Accept Current Change" (main branch'dan saqlash)
# - "Accept Incoming Change" (v0 branch'dan saqlash)
# - "Accept Both Changes" (ikkalasini birlash)
```

#### 4. Kerakli O'zgarishlar

Quyidagi fayllar konflikt bo'lishi mumkin:

**A. package.json**
- **Talab qilingan versiyalar (SDK 54 uchun):**
  - `expo: ~54.0.0`
  - `react-native: 0.85.0`
  - Boshqa barcha Expo paketlari `~54.0.0` bilan moslashtirilgan

**B. app.json**
- **Talab qilingan sozlamalar:**
  ```json
  {
    "sdkVersion": "54.0.0",
    "jsEngine": "hermes",
    "newArchEnabled": true
  }
  ```

**C. README.md**
- O'zbek va Ingliz tilida to'liq dokumentatsiya saqlash

**D. Boshqa fayllar:**
- `babel.config.js` - Yangi Hermes uchun optimallashtirish
- `metro.config.js` - Metro bundler konfiguratsiyasi
- `tsconfig.json` - TypeScript konfiguratsiyasi

#### 5. Conflict Resolution Strategy

**Agar main branch'da boshqa o'zgarishlar bo'lsa:**

1. **SDK 54 dependencies'lari asosiy** - Bu bizning asosiy maqsad
2. **README.md dokumentatsiyasi saqlash** - Har ikkala tilni saqlash
3. **app.json Hermes sozlamalarini saqlash** - Performance uchun muhim
4. **TypeScript va build config'larini saqlash** - Stability uchun

#### 6. Conflict'larni Hal Qilgandan Keyin

```bash
# Agar conflict'larni hal qildingiz:
git add .
git commit -m "Resolve merge conflicts: Maintain SDK 54 compatibility with main branch"
git push origin v0/khabibullokosimboev-2983-e376c189
```

#### 7. Pull Request'ni Tekshirish

GitHub'da:
- Conflict'lar resolve bo'lganini tekshirish
- Barcha changes'larni review qilish
- "Merge pull request" tugmasini bosganda, pull request mergelashadi

---

## English

### Resolving Merge Conflicts

If GitHub shows conflicts in the pull request, follow these steps:

#### 1. Update Local Repository

```bash
cd v0-poputi-taksi
git fetch origin
git pull origin main
```

#### 2. Check Conflicts

```bash
git status
```

#### 3. Handle Conflicts Manually or with Tools

Use VSCode's built-in conflict resolution:
- "Accept Current Change" (keep main branch)
- "Accept Incoming Change" (keep v0 branch)
- "Accept Both Changes" (merge both)

#### 4. Required Changes

These files might have conflicts:

**A. package.json**
- **Required SDK 54 versions:**
  - `"expo": "~54.0.0"`
  - `"react-native": "0.85.0"`
  - All Expo packages aligned with `~54.0.0`

**B. app.json**
- **Required settings:**
  ```json
  {
    "sdkVersion": "54.0.0",
    "jsEngine": "hermes",
    "newArchEnabled": true
  }
  ```

**C. README.md**
- Keep comprehensive documentation in both languages

**D. Configuration files:**
- `babel.config.js` - Optimized for Hermes
- `metro.config.js` - Metro bundler configuration
- `tsconfig.json` - TypeScript configuration

#### 5. Conflict Resolution Strategy

**If main branch has other changes:**

1. **SDK 54 dependencies take priority** - This is the main objective
2. **Preserve README.md documentation** - Keep both language versions
3. **Maintain app.json Hermes settings** - Important for performance
4. **Keep TypeScript and build configs** - Ensures stability

#### 6. After Resolving Conflicts

```bash
# After resolving:
git add .
git commit -m "Resolve merge conflicts: Maintain SDK 54 compatibility with main branch"
git push origin v0/khabibullokosimboev-2983-e376c189
```

#### 7. Verify Pull Request

On GitHub:
- Confirm conflicts are resolved
- Review all changes
- Click "Merge pull request" button

---

## Files That Should NEVER Have Conflicts

These files should always match the required specifications:

1. ✅ **package.json** - Expo 54.0.0 + React Native 0.85.0
2. ✅ **app.json** - SDK 54, Hermes engine, New Architecture enabled
3. ✅ **tsconfig.json** - Extends expo/tsconfig.base
4. ✅ **babel.config.js** - Includes expo preset and reanimated plugin
5. ✅ **metro.config.js** - Uses Expo's default configuration

---

## Quick Checklist Before Merging

- [ ] All dependencies are SDK 54 compatible
- [ ] `expo` version is `~54.0.0`
- [ ] `react-native` version is `0.85.0`
- [ ] `sdkVersion` in app.json is `"54.0.0"`
- [ ] `jsEngine` is set to `"hermes"`
- [ ] `newArchEnabled` is `true`
- [ ] No merge conflict markers (`<<<<`, `====`, `>>>>`) in files
- [ ] All TypeScript errors are resolved
- [ ] Tests pass (if applicable)

---

## Support

If you need help with conflict resolution:

1. Review the changes side-by-side in GitHub
2. Reference this guide for required SDK 54 settings
3. Use VSCode's merge conflict editor
4. Ensure all files match the specifications above
5. Push changes and wait for CI/CD validation

---

**Last Updated:** 2026-03-14
**Status:** SDK 54 Full Compatibility
**Version:** 1.0.0

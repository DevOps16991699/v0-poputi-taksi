# Poputi Taksi - Frontend Development Plan

## Hozirgi Holat Tahlili

### Mavjud Sahifalar
1. **Home (/)** - Asosiy sahifa (rol bo'yicha ajratilgan)
2. **Driver (/driver)** - E'lon joylash formasi
3. **Search (/search)** - Safar qidirish
4. **Profile (/profile)** - Foydalanuvchi profili
5. **Chat (/chat)** - Xabarlar ro'yxati
6. **Tickets (/tickets)** - Haydovchi e'lonlari
7. **My-Rides (/my-rides)** - Yo'lovchi band qilgan safarlari
8. **Settings (/settings)** - Sozlamalar
9. **Login (/login)** - Kirish
10. **Signup (/signup)** - Ro'yxatdan o'tish

---

## KAMCHILIKLAR VA YECHIMLAR

### 1. UMUMIY KAMCHILIKLAR

#### 1.1 Navigatsiya va UX
- [ ] Home page dagi "Safarlarni ko'rish" tugmasi `/rides` ga yo'naltiradi (sahifa o'chirilgan)
- [ ] Sidebar toggle tugmasi faqat Home da ishlaydi, boshqa sahifalarda yo'q
- [ ] Back (orqaga) tugmasi ko'p sahifalarda yo'q

#### 1.2 Autentifikatsiya
- [ ] Login/Signup sahifalari frontendda, lekin hech qanday auth state yo'q
- [ ] Himoyalangan sahifalar auth tekshiruvisiz ochiq
- [ ] "Chiqish" tugmasi hech narsa qilmaydi

#### 1.3 Forma Validatsiya
- [ ] Driver sahifasida forma validatsiyasi yo'q (masalan: telefon formati)
- [ ] Signup sahifasida parol kuchliligini tekshirish yo'q
- [ ] Xato xabarlari ko'rsatilmaydi

---

### 2. HAYDOVCHI ROLI UCHUN KAMCHILIKLAR

#### 2.1 E'lon Joylash (/driver)
- [ ] Shaharlar ro'yxati yo'q (autocomplete kerak)
- [ ] Sana tanlash uchun calendar picker yo'q
- [ ] Rasm yuklash imkoniyati yo'q (mashina rasmi)
- [ ] E'lon joylangandan keyin success sahifasi yo'q
- [ ] Oraliq to'xtash joylarini qo'shish imkoniyati yo'q

#### 2.2 Mening E'lonlarim (/tickets)
- [ ] E'lonni tahrirlash funksiyasi ishlamaydi
- [ ] E'lonni o'chirish confirmation dialog yo'q
- [ ] Yo'lovchilar ro'yxatini ko'rish imkoniyati yo'q
- [ ] Yo'lovchi so'rovlarini qabul/rad qilish yo'q
- [ ] E'lon detallari sahifasi yo'q

#### 2.3 Yo'lovchilar Bilan Aloqa
- [ ] Chat sahifasidan xabar yozish imkoniyati yo'q (faqat ro'yxat)
- [ ] Yo'lovchi profilini ko'rish imkoniyati yo'q
- [ ] Yo'lovchiga reyting qo'yish imkoniyati yo'q

---

### 3. YO'LOVCHI ROLI UCHUN KAMCHILIKLAR

#### 3.1 Safar Qidirish (/search)
- [ ] Sana bo'yicha filter ishlamaydi
- [ ] Narx bo'yicha filter yo'q
- [ ] Vaqt bo'yicha filter yo'q
- [ ] Saqlangan qidiruvlar yo'q
- [ ] Xarita ko'rinishi yo'q

#### 3.2 Safar Tafsilotlari
- [ ] Safar detallari sahifasi yo'q (/ride/[id])
- [ ] Haydovchi profili va reytingini ko'rish yo'q
- [ ] Mashina haqida to'liq ma'lumot yo'q
- [ ] Yo'l xaritasi ko'rsatilmaydi

#### 3.3 Band Qilish
- [ ] Band qilish confirmation dialog yo'q
- [ ] Nechta joy band qilishni tanlash imkoniyati yo'q
- [ ] Band qilishni bekor qilish imkoniyati yo'q
- [ ] To'lov integratsiyasi yo'q

#### 3.4 Band Qilganlarim (/my-rides)
- [ ] Safar detallari sahifasiga o'tish yo'q
- [ ] Haydovchiga reyting qo'yish yo'q
- [ ] Band qilishni bekor qilish funksiyasi yo'q

---

### 4. UMUMIY SAHIFALAR KAMCHILIKLARI

#### 4.1 Profil (/profile)
- [ ] Profilni tahrirlash sahifasi yo'q
- [ ] Rasm yuklash imkoniyati yo'q
- [ ] Mening avtomobillarim sahifasi yo'q (haydovchi uchun)
- [ ] Saqlangan manzillar sahifasi yo'q (yo'lovchi uchun)
- [ ] Reyting va sharhlarni ko'rish yo'q

#### 4.2 Chat (/chat)
- [ ] Chat conversation sahifasi yo'q (/chat/[id])
- [ ] Xabar yozish va yuborish imkoniyati yo'q
- [ ] Xabarni o'chirish imkoniyati yo'q
- [ ] Rasm/fayl yuborish yo'q
- [ ] Typing indicator yo'q
- [ ] Online status yo'q

#### 4.3 Sozlamalar (/settings)
- [ ] Bildirishnomalar sozlamalari sahifasi yo'q
- [ ] Ko'rinish (tema) o'zgartirish ishlamaydi
- [ ] Til o'zgartirish ishlamaydi
- [ ] Maxfiylik sozlamalari sahifasi yo'q

---

## FRONTEND DEVELOPMENT ROADMAP

### FAZA 1: Asosiy Funksionallik (Prioritet: Yuqori)

#### 1.1 Chat Tizimi
```
/chat/[id]/page.tsx - Chat conversation sahifasi
- Xabarlar ro'yxati
- Xabar yozish inputi
- Yuborish tugmasi
- Xabar vaqti
```

#### 1.2 Safar Detallari
```
/ride/[id]/page.tsx - Safar tafsilotlari
- To'liq marshrut ma'lumoti
- Haydovchi profili
- Mashina ma'lumotlari
- Band qilish tugmasi
- Narx va bo'sh joylar
```

#### 1.3 E'lon Detallari (Haydovchi uchun)
```
/tickets/[id]/page.tsx - E'lon tafsilotlari
- E'lon ma'lumotlari
- Yo'lovchilar ro'yxati
- So'rovlarni qabul/rad qilish
- Tahrirlash/O'chirish
```

### FAZA 2: Profil va Sozlamalar (Prioritet: O'rta)

#### 2.1 Profil Tahrirlash
```
/profile/edit/page.tsx - Profilni tahrirlash
- Ism, familya
- Telefon raqam
- Rasm yuklash
```

#### 2.2 Avtomobillarim (Haydovchi)
```
/profile/cars/page.tsx - Avtomobillar ro'yxati
/profile/cars/add/page.tsx - Avtomobil qo'shish
- Marka, model
- Raqam
- Rang
- Rasm
```

#### 2.3 Saqlangan Manzillar (Yo'lovchi)
```
/profile/addresses/page.tsx - Saqlangan manzillar
- Manzil qo'shish
- Manzilni o'chirish
```

### FAZA 3: Qo'shimcha Funksiyalar (Prioritet: Past)

#### 3.1 Reyting Tizimi
```
/rate/[rideId]/page.tsx - Reyting sahifasi
- Yulduz berish (1-5)
- Izoh yozish
```

#### 3.2 Bildirishnomalar
```
/notifications/page.tsx - Bildirishnomalar sahifasi
- Barcha bildirishnomalar ro'yxati
- O'qilgan/o'qilmagan
```

#### 3.3 Yordam
```
/help/page.tsx - Yordam markazi
- FAQ
- Bog'lanish
```

---

## TEXNIK YAXSHILASHLAR

### UI/UX
- [ ] Loading skeletons qo'shish
- [ ] Pull-to-refresh qo'shish
- [ ] Toast notifications qo'shish
- [ ] Empty states yaxshilash
- [ ] Error states qo'shish
- [ ] Offline mode indicator

### Accessibility
- [ ] ARIA labels qo'shish
- [ ] Keyboard navigation
- [ ] Focus management
- [ ] Screen reader support

### Performance
- [ ] Image lazy loading
- [ ] Infinite scroll (ro'yxatlar uchun)
- [ ] Debounce search input

---

## ROL BO'YICHA SAHIFALAR XARITASI

### HAYDOVCHI SAHIFALARI
| Sahifa | Status | Prioritet |
|--------|--------|-----------|
| Home | Tayyor | - |
| E'lon joylash | Tayyor (yaxshilash kerak) | O'rta |
| Mening e'lonlarim | Tayyor (yaxshilash kerak) | Yuqori |
| E'lon detallari | YO'Q | Yuqori |
| Chat ro'yxat | Tayyor | - |
| Chat conversation | YO'Q | Yuqori |
| Profil | Tayyor | - |
| Profil tahrirlash | YO'Q | O'rta |
| Avtomobillarim | YO'Q | O'rta |
| Sozlamalar | Tayyor | Past |

### YO'LOVCHI SAHIFALARI
| Sahifa | Status | Prioritet |
|--------|--------|-----------|
| Home | Tayyor | - |
| Safar qidirish | Tayyor (filter kerak) | O'rta |
| Safar detallari | YO'Q | Yuqori |
| Band qilganlarim | Tayyor (yaxshilash kerak) | O'rta |
| Chat ro'yxat | Tayyor | - |
| Chat conversation | YO'Q | Yuqori |
| Profil | Tayyor | - |
| Profil tahrirlash | YO'Q | O'rta |
| Saqlangan manzillar | YO'Q | Past |
| Sozlamalar | Tayyor | Past |

---

## KEYINGI QADAMLAR

1. **Chat conversation sahifasini yaratish** - eng muhim, chunki foydalanuvchilar bir-biri bilan bog'lana olmaydi
2. **Safar/E'lon detallari sahifalarini yaratish** - to'liq ma'lumot ko'rish uchun
3. **Profil tahrirlash sahifasini yaratish**
4. **Filter va qidiruvni yaxshilash**
5. **Reyting tizimini qo'shish**

---

*Oxirgi yangilangan: 2026-03-12*

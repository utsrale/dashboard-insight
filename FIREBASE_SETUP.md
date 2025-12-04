# Setup Real Firebase Project - Step by Step

**PENTING**: File `.env.local` saat ini berisi dummy credentials yang TIDAK AKAN WORK untuk authentication.  
Untuk functionality penuh, ikuti panduan ini untuk setup real Firebase project.

---

## 🚀 Quick Setup (10 menit)

### Step 1: Buat Firebase Project

1. Buka https://console.firebase.google.com/
2. Klik **"Add project"** atau **"Create a project"**
3. **Project name**: `umkm-dashboard` (atau nama lain)
4. Klik **Continue**
5. **Google Analytics**: Disable (tidak perlu untuk sekarang)
6. Klik **Create project**
7. Tunggu ~30 detik sampai project siap
8. Klik **Continue**

### Step 2: Enable Firestore Database

1. Di sidebar kiri, klik **"Build"** → **"Firestore Database"**
2. Klik **"Create database"**
3. **Location**: Pilih `asia-southeast2 (Jakarta)` untuk performa terbaik
4. Klik **Next**
5. **Security rules**: Pilih **"Start in test mode"** (untuk development)
   - Test mode akan allow read/write tanpa authentication untuk 30 hari
   - Kita akan update rules setelah testing
6. Klik **Enable**
7. Tunggu database dibuat (~1 menit)

### Step 3: Enable Authentication

1. Di sidebar, klik **"Build"** → **"Authentication"**
2. Klik **"Get started"**
3. Klik tab **"Sign-in method"**
4. Klik **"Email/Password"**
5. Toggle **"Enable"** ke ON
6. Klik **"Save"**

### Step 4: Get Firebase Configuration

1. Di sidebar, klik **icon gear ⚙️** → **"Project settings"**
2. Scroll ke bawah ke section **"Your apps"**
3. Klik icon **web `</>`** (Web app icon)
4. **App nickname**: `Dashboard Web` (atau nama lain)
5. **JANGAN** centang "Also set up Firebase Hosting"
6. Klik **"Register app"**
7. Klik **"Continue to console"**

### Step 5: Copy Firebase Config

1. Masih di **Project settings** → scroll ke **"Your apps"**
2. Klik pada app **"Dashboard Web"** yang baru dibuat
3. Scroll ke **"SDK setup and configuration"**
4. Pilih **"Config"** (bukan npm)
5. Copy **semua nilai** dari `firebaseConfig`:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",              // ← COPY INI
  authDomain: "xxx.firebaseapp.com",
  projectId: "umkm-dashboard",
  storageBucket: "xxx.appspot.com",
  messagingSenderId: "123...",
  appId: "1:123...:web:abc..."
};
```

### Step 6: Update .env.local

1. Buka file `.env.local` di project `dashboard-insight`
2. **Replace semua nilai dummy** dengan nilai real dari Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy... (paste dari apiKey)
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=umkm-dashboard.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=umkm-dashboard
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=umkm-dashboard.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123...
```

3. **SAVE** file `.env.local`

### Step 7: Restart Development Server

1. **STOP** server yang sedang running (Ctrl+C di terminal)
2. **START** ulang server:
   ```bash
   npm run dev
   ```
3. Server akan restart dengan credentials baru

### Step 8: Create Test User

1. Kembali ke **Firebase Console**
2. Go to **Authentication** → **Users** tab
3. Klik **"Add user"**
4. Masukkan:
   - **Email**: `test@example.com` (atau email Anda)
   - **Password**: `Test123!` (minimal 6 karakter)
5. Klik **"Add user"**

### Step 9: Test Login

1. Buka browser ke `http://localhost:3000`
2. Masukkan credentials:
   - Email: `test@example.com`
   - Password: `Test123!`
3. Klik **"Masuk"**
4. Jika berhasil, akan redirect ke dashboard! 🎉

---

## 📊 (Optional) Add Sample Data

Untuk test dashboard widgets dengan data, tambahkan sample data ke Firestore:

### A. Add Product

1. Di Firebase Console, go to **Firestore Database**
2. Klik **"Start collection"**
3. **Collection ID**: `products`
4. Klik **Next**
5. **Document ID**: Auto-ID
6. Add fields:
   ```
   userId: "YOUR_USER_ID_FROM_AUTH" (string)
   name: "Kopi Arabica" (string)
   sellingPrice: 25000 (number)
   costPrice: 15000 (number)
   currentStock: 50 (number)
   minStock: 10 (number)
   category: "Minuman" (string)
   createdAt: (timestamp - klik icon clock)
   updatedAt: (timestamp - klik icon clock)
   ```
7. Klik **Save**

**NOTE**: Untuk dapat `userId`, check di **Authentication** → **Users**, copy UID user yang dibuat.

### B. Add Transaction

1. Klik **"Start collection"**
2. **Collection ID**: `transactions`
3. **Document ID**: Auto-ID
4. Add fields:
   ```
   userId: "YOUR_USER_ID" (string)
   date: (timestamp - hari ini)
   time: "10:30" (string)
   product: "Kopi Arabica" (string)
   productId: "PRODUCT_DOC_ID" (string - dari product yang dibuat)
   quantity: 2 (number)
   pricePerItem: 25000 (number)
   totalAmount: 50000 (number)
   costPerItem: 15000 (number)
   source: "manual" (string)
   createdAt: (timestamp)
   updatedAt: (timestamp)
   ```
5. Klik **Save**

### C. Verify Dashboard

1. Login ke dashboard
2. Lihat semua widgets terisi dengan data sample
3. Test period filtering (Hari Ini / Minggu Ini / Bulan Ini)

---

## 🔒 Update Firestore Security Rules (Production)

Setelah testing selesai, update security rules untuk production:

1. Di Firebase Console, go to **Firestore Database**
2. Klik tab **"Rules"**
3. **Replace** dengan rules dari file `firestore.rules` di project
4. Atau copy rules ini:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    match /transactions/{transactionId} {
      allow read, write: if isOwner(resource.data.userId);
      allow create: if isOwner(request.resource.data.userId);
    }
    
    match /products/{productId} {
      allow read, write: if isOwner(resource.data.userId);
      allow create: if isOwner(request.resource.data.userId);
    }
  }
}
```

5. Klik **"Publish"**

---

## ✅ Checklist

Setup sudah benar jika:
- [ ] Firebase project created
- [ ] Firestore Database enabled
- [ ] Authentication enabled (Email/Password)
- [ ] Web app registered
- [ ] `.env.local` updated dengan real credentials
- [ ] Dev server restarted
- [ ] Test user created
- [ ] Login berhasil
- [ ] Dashboard terlihat (meski tanpa data)

---

## 🆘 Troubleshooting

### Error: "auth/invalid-api-key"
- Check `.env.local` - pastikan `NEXT_PUBLIC_FIREBASE_API_KEY` correct
- Restart dev server setelah edit `.env.local`

### Error: "Firebase: Error (auth/configuration-not-found)"
- Pastikan Authentication sudah di-enable di Firebase Console
- Pastikan Email/Password provider sudah aktif

### Login button tidak respond
- Check browser console untuk errors
- Pastikan `.env.local` sudah di-save
- Restart dev server

### Dashboard kosong (no data)
- Ini normal jika belum ada transactions/products
- Add sample data sesuai panduan di atas

---

**Estimasi Waktu**: 10-15 menit untuk full setup  
**Hasil**: Dashboard fully functional dengan authentication & real-time data!

🎉 **Selamat! Dashboard siap digunakan!**

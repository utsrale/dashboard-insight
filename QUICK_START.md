# 🚀 Quick Start Guide - Dashboard Insight AI

Panduan singkat untuk menjalankan dashboard pertama kali.

## Step 1: Install Dependencies

```bash
cd dashboard-insight
npm install
```

**Catatan**: Jika ada masalah dengan PowerShell execution policy, jalankan:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
```

## Step 2: Setup Firebase

### 2.1 Buat Firebase Project
1. Buka https://console.firebase.google.com/
2. Klik "Add project" atau "Create a project"
3. Masukkan nama project (contoh: `umkm-dashboard`)
4. Disable Google Analytics (opsional)
5. Klik "Create project"

### 2.2 Enable Firestore
1. Di sidebar, pilih **Build** → **Firestore Database**
2. Klik "Create database"
3. Pilih mode: **Start in test mode** (untuk development)
4. Pilih location: `asia-southeast2 (Jakarta)`
5. Klik "Enable"

### 2.3 Enable Authentication
1. Di sidebar, pilih **Build** → **Authentication**
2. Klik "Get started"
3. Pilih **Email/Password**
4. Enable toggle untuk "Email/Password"
5. Klik "Save"

### 2.4 Get Firebase Config
1. Di sidebar, klik **Project Overview** (⚙️ icon)
2. Pilih **Project settings**
3. Scroll ke bawah ke "Your apps"
4. Klik icon web `</>`
5. Masukkan nickname: `dashboard-web`
6. Klik "Register app"
7. **COPY** semua config values

## Step 3: Configure Environment

### 3.1 Create .env.local
```bash
# Di folder dashboard-insight
copy ENV_TEMPLATE.md .env.local
```

### 3.2 Edit .env.local
Paste config values dari Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=umkm-dashboard.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=umkm-dashboard
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=umkm-dashboard.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

**PENTING**: Jangan commit file `.env.local` ke Git!

## Step 4: Deploy Firestore Rules

1. Di Firebase Console, pilih **Firestore Database**
2. Klik tab **Rules**
3. Copy isi file `firestore.rules` dari project
4. Paste ke editor
5. Klik **Publish**

## Step 5: Create Test User

### Option A: Via Firebase Console
1. Di Firebase Console, pilih **Authentication**
2. Klik tab **Users**
3. Klik "Add user"
4. Masukkan:
   - Email: `test@example.com`
   - Password: `Test123!` (minimal 6 karakter)
5. Klik "Add user"

### Option B: Via Code (Advanced)
Jalankan script Firebase Admin SDK (coming soon)

## Step 6: Add Sample Data (Optional)

### Products Collection
Di Firestore Console, tambahkan collection `products`:

```javascript
// Document 1
{
  userId: "user-id-dari-authentication",
  name: "Kopi Arabica",
  sellingPrice: 25000,
  costPrice: 15000,
  currentStock: 50,
  minStock: 10,
  category: "Minuman",
  createdAt: new Date(),
  updatedAt: new Date()
}

// Document 2
{
  userId: "user-id-dari-authentication",
  name: "Roti Bakar",
  sellingPrice: 15000,
  costPrice: 8000,
  currentStock: 30,
  minStock: 15,
  category: "Makanan",
  createdAt: new Date(),
  updatedAt: new Date()
}
```

### Transactions Collection
Tambahkan collection `transactions`:

```javascript
// Document 1
{
  userId: "user-id-dari-authentication",
  date: new Date(),
  time: "10:30",
  product: "Kopi Arabica",
  productId: "product-doc-id",
  quantity: 2,
  pricePerItem: 25000,
  totalAmount: 50000,
  costPerItem: 15000,
  source: "manual", // atau "voice" atau "ocr"
  createdAt: new Date(),
  updatedAt: new Date()
}
```

**Tips**: Replace `"user-id-dari-authentication"` dengan UID dari user yang dibuat di Step 5.

## Step 7: Run Development Server

```bash
npm run dev
```

Buka browser: **http://localhost:3000**

## Step 8: Login

1. Anda akan di-redirect ke halaman login
2. Masukkan email: `test@example.com`
3. Masukkan password: `Test123!`
4. Klik **Masuk**

## Step 9: Explore Dashboard

Setelah login, Anda akan melihat:
- ✅ Profit/Loss card (mungkin kosong jika belum ada data)
- ✅ Sales trend chart
- ✅ Best seller widget
- ✅ Transaction history
- ✅ Recommendations (price & purchase)
- ✅ Product stock overview

## 🎯 Next Steps

### Untuk Development
- [ ] Tambah lebih banyak sample data
- [ ] Test semua period filters (Hari Ini / Minggu Ini / Bulan Ini)
- [ ] Coba fitur refresh
- [ ] Test responsive design (resize browser)

### Untuk Production
- [ ] Create production Firebase project
- [ ] Deploy ke Vercel/Netlify
- [ ] Setup custom domain
- [ ] Configure monitoring

### Untuk Tim Integration
- [ ] Koordinasi dengan Mazka untuk Voice AI data format
- [ ] Koordinasi dengan Fattah untuk OCR data format
- [ ] Test end-to-end flow

## ⚠️ Troubleshooting

### Error: "Missing required environment variable"
- Cek `.env.local` sudah exist dan diisi dengan benar
- Restart development server setelah edit `.env.local`

### Error: "Permission denied" di Firestore
- Deploy Firestore rules dari `firestore.rules`
- Pastikan user sudah login

### Dashboard kosong / no data
- Tambah sample data di Firestore (Step 6)
- Pastikan `userId` match dengan user yang login

### Build error
```bash
rm -rf node_modules .next
npm install
npm run dev
```

## 📞 Support

Untuk pertanyaan, hubungi:
- **Pancar** (Dashboard developer)
- **Tim Development** via group chat

---

**Happy Coding! 🚀**

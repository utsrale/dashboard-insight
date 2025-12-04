# Dummy Login - Quick Testing Guide

**UNTUK UI TESTING TANPA FIREBASE**

## 🚀 Akses Dashboard Langsung

Dummy login system sudah diimplementasikan untuk memudahkan testing UI dashboard tanpa perlu setup Firebase terlebih dahulu.

### Credentials Demo

```
Email: demo@test.com
Password: demo123
```

### Cara Menggunakan

1. **Start development server**:
   ```bash
   npm run dev
   ```

2. **Buka browser**: http://localhost:3000

3. **Login with demo credentials**:
   - Email: `demo@test.com`
   - Password: `demo123`

4. **Akan langsung redirect ke dashboard** ✅

### Catatan Penting

⚠️ **Dummy Login Limitations**:
- Data dashboard akan **kosong/mock data** karena tidak ada Firestore
- Authentication **hanya untuk UI testing**
- Logout akan clear dummy session
- Real Firebase masih bisa digunakan dengan credentials yang benar

✅ **Use Cases**:
- Testing dashboard UI/UX
- Demo untuk client/stakeholder
- Development tanpa perlu Firebase setup
- Quick prototype verification

### Mock Data

Dashboard akan menampilkan:
- Empty state indicators (belum ada transaksi/produk)
- Mock structure untuk semua 8 widgets
- Semua UI components functional
- Period filters working
- Responsive design testable

### Switch ke Real Firebase

Untuk menggunakan real Firebase authentication:
1. Setup Firebase project (lihat `FIREBASE_SETUP.md`)
2. Update `.env.local` dengan real credentials
3. Login dengan email/password Firebase yang sudah dibuat
4. Dummy login tetap tersedia sebagai fallback

---

**Happy Testing!** 🎉

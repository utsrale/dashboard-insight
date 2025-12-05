'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, TrendingUp, User } from 'lucide-react';
import { initializeMockData } from '@/lib/utils/mockData';

export default function LoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Validate email and password are not empty
            if (!email || !password) {
                setError('Email dan password harus diisi');
                setLoading(false);
                return;
            }

            if (isLogin) {
                // Login - Check credentials from localStorage
                const storedUsers = JSON.parse(localStorage.getItem('dashboard_users') || '[]');
                const user = storedUsers.find((u: any) => u.email === email && u.password === password);

                if (user) {
                    // Store current user session
                    localStorage.setItem('current_user', JSON.stringify({
                        uid: user.uid,
                        email: user.email,
                        displayName: user.displayName
                    }));
                    router.push('/dashboard');
                } else {
                    setError('Email atau password salah');
                }
            } else {
                // Register - Create new user
                if (password !== confirmPassword) {
                    setError('Password tidak cocok');
                    setLoading(false);
                    return;
                }
                if (password.length < 6) {
                    setError('Password minimal 6 karakter');
                    setLoading(false);
                    return;
                }

                // Get existing users
                const storedUsers = JSON.parse(localStorage.getItem('dashboard_users') || '[]');

                // Check if email already exists
                if (storedUsers.some((u: any) => u.email === email)) {
                    setError('Email sudah terdaftar');
                    setLoading(false);
                    return;
                }

                // Create new user
                const newUser = {
                    uid: `user-${Date.now()}`,
                    email,
                    password, // In production, this should be hashed!
                    displayName,
                    createdAt: new Date().toISOString()
                };

                // Save to localStorage
                storedUsers.push(newUser);
                localStorage.setItem('dashboard_users', JSON.stringify(storedUsers));

                // Initialize mock data for new user
                const { products, transactions } = initializeMockData(newUser.uid);
                localStorage.setItem(`dashboard_products_${newUser.uid}`, JSON.stringify(products));
                localStorage.setItem(`dashboard_transactions_${newUser.uid}`, JSON.stringify(transactions));

                // Auto-login after registration
                localStorage.setItem('current_user', JSON.stringify({
                    uid: newUser.uid,
                    email: newUser.email,
                    displayName: newUser.displayName
                }));

                router.push('/dashboard');
            }
        } catch (err: any) {
            setError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = () => {
        // Create demo user
        const demoUser = {
            uid: 'demo-user',
            email: 'demo@test.com',
            displayName: 'Demo User'
        };

        // Initialize mock data for demo user if not exists
        const existingProducts = localStorage.getItem(`dashboard_products_${demoUser.uid}`);
        if (!existingProducts) {
            const { products, transactions } = initializeMockData(demoUser.uid);
            localStorage.setItem(`dashboard_products_${demoUser.uid}`, JSON.stringify(products));
            localStorage.setItem(`dashboard_transactions_${demoUser.uid}`, JSON.stringify(transactions));
        }

        // Set current user session
        localStorage.setItem('current_user', JSON.stringify(demoUser));

        // Redirect to dashboard
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-2xl shadow-lg shadow-purple-500/30 mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        Dashboard Insight
                    </h1>
                    <p className="text-slate-600">
                        Kelola bisnis UMKM Anda dengan mudah
                    </p>
                </div>

                {/* Demo Info Card */}
                <div className="card p-4 mb-6 border-l-4 border-purple-500 bg-white">
                    <p className="text-sm text-slate-700 font-medium mb-2">🎯 Demo Mode</p>
                    <div className="space-y-1 text-sm text-slate-600">
                        <p>Klik tombol di bawah untuk coba dengan data sample</p>
                    </div>
                    <button
                        onClick={handleDemoLogin}
                        type="button"
                        className="mt-3 w-full text-sm bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
                    >
                        Coba Demo (10 Produk & 50+ Transaksi)
                    </button>
                </div>

                {/* Login/Register Form */}
                <div className="card p-6">
                    {/* Toggle Tabs */}
                    <div className="flex gap-2 mb-6 bg-[#1E2840] p-1 rounded-lg">
                        <button
                            type="button"
                            onClick={() => {
                                setIsLogin(true);
                                setError('');
                            }}
                            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${isLogin
                                ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsLogin(false);
                                setError('');
                            }}
                            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${!isLogin
                                ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg'
                                : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Daftar
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Input (only for register) */}
                        {!isLogin && (
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                    Nama Lengkap
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        id="name"
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="John Doe"
                                        className="input pl-10"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nama@email.com"
                                    className="input pl-10"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="input pl-10"
                                    required
                                />
                            </div>
                        </div>

                        {/* Confirm Password (only for register) */}
                        {!isLogin && (
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                                    Konfirmasi Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="input pl-10"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full py-3"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {isLogin ? 'Memproses...' : 'Mendaftar...'}
                                </>
                            ) : (
                                isLogin ? 'Login' : 'Daftar Akun'
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500 mt-6">
                    © 2024 Dashboard Insight AI. All rights reserved.
                </p>
            </div>
        </div>
    );
}

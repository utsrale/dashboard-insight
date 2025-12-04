/**
 * ⚠️ DEPRECATED - NOT USED IN PRODUCTION
 * 
 * This app now uses localStorage instead of Firebase for data persistence.
 * All authentication, products, and transactions are stored locally in the browser.
 * 
 * This file is kept for reference only and may be removed in future updates.
 * 
 * Current system:
 * - Authentication: Mock user (useAuth returns static user)
 * - Data Storage: localStorage (see DashboardContext.tsx)
 * - No Firebase connection required
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase - safe initialization
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// Check if we're in browser and have credentials
const hasCredentials = firebaseConfig.apiKey && firebaseConfig.projectId;

if (typeof window !== 'undefined' && hasCredentials) {
    // Only initialize in browser with valid credentials
    try {
        if (!getApps().length) {
            app = initializeApp(firebaseConfig);
        } else {
            app = getApps()[0];
        }

        auth = getAuth(app);
        db = getFirestore(app);
    } catch (error) {
        console.error('Firebase initialization error:', error);
        // Re-throw to show user the error
        throw error;
    }
} else if (typeof window !== 'undefined' && !hasCredentials) {
    // In browser but no credentials - show helpful error
    const missingVars = [];
    if (!firebaseConfig.apiKey) missingVars.push('NEXT_PUBLIC_FIREBASE_API_KEY');
    if (!firebaseConfig.authDomain) missingVars.push('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
    if (!firebaseConfig.projectId) missingVars.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID');

    console.error(
        `Missing Firebase credentials: ${missingVars.join(', ')}\n` +
        `Please create .env.local file with your Firebase config.\n` +
        `See ENV_TEMPLATE.md for instructions.`
    );
}

export { app, auth, db };

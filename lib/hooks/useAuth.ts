/**
 * localStorage-based Authentication Hook
 * 
 * Manages user authentication with localStorage
 * No Firebase - all data stored locally
 */

import { useState, useEffect } from 'react';

interface User {
    uid: string;
    email: string;
    displayName?: string;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for current user session
        const currentUser = localStorage.getItem('current_user');

        if (currentUser) {
            try {
                setUser(JSON.parse(currentUser));
            } catch (error) {
                console.error('Error parsing user session:', error);
                setUser(null);
            }
        } else {
            setUser(null);
        }

        setLoading(false);
    }, []);

    return {
        user,
        loading,
        isAuthenticated: !!user,
    };
}

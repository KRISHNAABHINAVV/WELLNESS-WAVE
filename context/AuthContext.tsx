
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserRole } from '../types';

// The User type from types.ts is for the logged-in user.
// We'll manage a list of users with passwords internally here.
interface StoredUser extends User {
    password?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    signup: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // In a real app, this would be a backend database.
    // For this prototype, we store users in state to simulate a user database.
    const [storedUsers, setStoredUsers] = useState<StoredUser[]>([
        { id: 'user123', name: 'John Doe', email: 'user@example.com', password: 'password', role: UserRole.USER },
        { id: 'asha456', name: 'Priya Sharma', email: 'asha@example.com', password: 'password', role: UserRole.ASHA_WORKER },
        { id: 'official789', name: 'Admin Officer', email: 'official@example.com', password: 'password', role: UserRole.OFFICIAL },
    ]);

    const login = async (email: string, password: string): Promise<{ success: boolean, message: string }> => {
        const foundUser = storedUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
        if (foundUser) {
            const { password, ...userToSet } = foundUser;
            setUser(userToSet);
            return { success: true, message: 'Login successful' };
        }
        return { success: false, message: 'Invalid email or password.' };
    };
    
    const signup = async (name: string, email: string, password: string, role: UserRole): Promise<{ success: boolean, message: string }> => {
        if (storedUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, message: 'An account with this email already exists.' };
        }
        const newUser: StoredUser = {
            id: `user-${Date.now()}`,
            name,
            email,
            password,
            role
        };
        setStoredUsers([...storedUsers, newUser]);
        // Automatically log in after signup
        const { password: _, ...userToSet } = newUser;
        setUser(userToSet);
        return { success: true, message: 'Signup successful' };
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

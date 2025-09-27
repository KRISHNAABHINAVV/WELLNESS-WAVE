
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
    user: User | null;
    login: (role: UserRole) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (role: UserRole) => {
        // In a real app, this would involve a call to a backend API
        const mockUsers: Record<UserRole, User> = {
            [UserRole.USER]: { id: 'user123', name: 'John Doe', role: UserRole.USER },
            [UserRole.ASHA_WORKER]: { id: 'asha456', name: 'Priya Sharma', role: UserRole.ASHA_WORKER },
            [UserRole.OFFICIAL]: { id: 'official789', name: 'Admin Officer', role: UserRole.OFFICIAL },
        };
        setUser(mockUsers[role]);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
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

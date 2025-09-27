import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../auth/LoginModal';
import Button from '../ui/Button';
import { BellIcon, GlobeIcon, LoginIcon, LogoutIcon, TranslateIcon, WaterDropIcon } from '../ui/Icons';
import { MOCK_ALERTS } from '../../constants';
import { Alert, RiskLevel } from '../../types';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isAlertsOpen, setAlertsOpen] = useState(false);

    const riskColorMap: Record<RiskLevel, string> = {
        [RiskLevel.HIGH]: 'text-error',
        [RiskLevel.MEDIUM]: 'text-warning',
        [RiskLevel.LOW]: 'text-success',
    };

    return (
        <>
            <nav className="bg-base-100/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-base-300">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                           <WaterDropIcon className="h-8 w-8 text-primary"/>
                            <span className="text-2xl font-bold text-primary">Wellness Wave</span>
                        </div>
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <div className="relative">
                                <button
                                    onClick={() => setAlertsOpen(!isAlertsOpen)}
                                    className="p-2 rounded-full text-gray-600 hover:bg-base-300 hover:text-primary transition-colors"
                                >
                                    <BellIcon className="h-6 w-6" />
                                    {MOCK_ALERTS.length > 0 && <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-error ring-2 ring-base-100 animate-pulse"></span>}
                                </button>
                                {isAlertsOpen && (
                                    <div className="absolute right-0 mt-2 w-80 bg-base-100 rounded-lg shadow-xl p-4 z-50 border border-base-300">
                                        <h3 className="font-bold text-lg mb-2 text-base-content">Notifications</h3>
                                        <ul className="space-y-2 max-h-96 overflow-y-auto">
                                          {MOCK_ALERTS.map((alert: Alert) => (
                                            <li key={alert.id} className={`p-2 rounded-md bg-base-200 border-l-4 ${riskColorMap[alert.riskLevel].replace('text-', 'border-')}`}>
                                              <p className={`font-semibold ${riskColorMap[alert.riskLevel]}`}>{alert.title}</p>
                                              <p className="text-sm text-gray-500">{alert.location}</p>
                                            </li>
                                          ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                           
                            {/* Dummy Language Selector */}
                             <div className="relative">
                                <button className="p-2 rounded-full text-gray-600 hover:bg-base-300 hover:text-primary transition-colors">
                                    <TranslateIcon className="h-6 w-6" />
                                </button>
                            </div>

                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="hidden md:block text-gray-700">Welcome, {user.name}</span>
                                    <Button onClick={logout} variant="ghost" size="sm">
                                        <LogoutIcon className="h-5 w-5 mr-2"/>
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <Button onClick={() => setLoginModalOpen(true)} variant="primary" size="sm">
                                    <LoginIcon className="h-5 w-5 mr-2" />
                                    Login
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
        </>
    );
};

export default Navbar;
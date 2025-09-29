import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../auth/LoginModal';
import Button from '../ui/Button';
import { BellIcon, LoginIcon, LogoutIcon, TranslateIcon, WaterDropIcon } from '../ui/Icons';
import { Alert, RiskLevel } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';
import { LANGUAGES } from '../../i18n';
import { useAlerts } from '../../context/AlertsContext';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const { t } = useTranslation();
    const { language, setLanguage } = useLanguage();
    const { alerts } = useAlerts();
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
                                    {alerts.length > 0 && <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-error ring-2 ring-base-100 animate-pulse"></span>}
                                </button>
                                {isAlertsOpen && (
                                    <div className="absolute right-0 mt-2 w-80 md:w-96 bg-base-100 rounded-lg shadow-xl p-4 z-50 border border-base-300">
                                        <h3 className="font-bold text-lg mb-2 text-base-content">{t('notifications')}</h3>
                                        <ul className="space-y-2 max-h-96 overflow-y-auto">
                                          {alerts.map((alert: Alert) => (
                                            <li key={alert.id} className={`p-3 rounded-md bg-base-200 border-l-4 ${riskColorMap[alert.riskLevel].replace('text-', 'border-')}`}>
                                              <p className={`font-semibold ${riskColorMap[alert.riskLevel]}`}>{alert.title}</p>
                                              <p className="text-sm text-base-content/80 mt-1">{alert.description}</p>
                                              <p className="text-xs text-base-content/60 mt-2 font-medium">{alert.location}</p>
                                            </li>
                                          ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                           
                             <div className="relative">
                                <TranslateIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="pl-10 pr-4 py-2 appearance-none bg-base-200 border border-transparent rounded-full text-gray-600 hover:bg-base-300 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                                    aria-label="Select language"
                                >
                                    {Object.entries(LANGUAGES).map(([code, name]) => (
                                        <option key={code} value={code}>{name}</option>
                                    ))}
                                </select>
                            </div>

                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="hidden md:block text-gray-700">{t('welcome', { name: user.name })}</span>
                                    <Button onClick={logout} variant="ghost" size="sm">
                                        <LogoutIcon className="h-5 w-5 mr-2"/>
                                        {t('logout')}
                                    </Button>
                                </div>
                            ) : (
                                <Button onClick={() => setLoginModalOpen(true)} variant="primary" size="sm">
                                    <LoginIcon className="h-5 w-5 mr-2" />
                                    {t('login')}
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
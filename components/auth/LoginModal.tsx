
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useTranslation } from '../../hooks/useTranslation';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const { login, signup } = useAuth();
    const { t } = useTranslation();
    const [isLoginView, setIsLoginView] = useState(true);

    // Form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<UserRole>(UserRole.USER);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const roleTranslations: Record<UserRole, string> = {
        [UserRole.USER]: t('role_user'),
        [UserRole.ASHA_WORKER]: t('role_asha'),
        [UserRole.OFFICIAL]: t('role_official'),
    };
    
    const resetForm = () => {
        setEmail('');
        setPassword('');
        setName('');
        setRole(UserRole.USER);
        setError('');
        setIsLoading(false);
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const response = isLoginView
            ? await login(email, password)
            : await signup(name, email, password, role);

        setIsLoading(false);

        if (response.success) {
            resetForm();
            onClose();
        } else {
            setError(response.message);
        }
    };
    
    const toggleView = () => {
        setIsLoginView(!isLoginView);
        resetForm();
    };
    
    const handleClose = () => {
        resetForm();
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={isLoginView ? t('login') : t('signup')}>
            <form onSubmit={handleFormSubmit} className="space-y-6">
                {!isLoginView && (
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">{t('name')}</label>
                        <input
                            id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full bg-base-300 border-base-100 rounded-md p-2 text-base-content focus:ring-primary focus:border-primary"
                            required
                        />
                    </div>
                )}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">{t('email')}</label>
                    <input
                        id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-base-300 border-base-100 rounded-md p-2 text-base-content focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">{t('password')}</label>
                    <input
                        id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-base-300 border-base-100 rounded-md p-2 text-base-content focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                {!isLoginView && (
                    <div>
                        <label htmlFor="role-select" className="block text-sm font-medium text-gray-400 mb-1">{t('user_role_label')}</label>
                        <select
                            id="role-select" value={role} onChange={(e) => setRole(e.target.value as UserRole)}
                            className="w-full bg-base-300 border-base-100 rounded-md p-2 text-base-content focus:ring-primary focus:border-primary"
                        >
                            <option value={UserRole.USER}>{roleTranslations[UserRole.USER]}</option>
                            <option value={UserRole.ASHA_WORKER}>{roleTranslations[UserRole.ASHA_WORKER]}</option>
                            <option value={UserRole.OFFICIAL}>{roleTranslations[UserRole.OFFICIAL]}</option>
                        </select>
                    </div>
                )}
                
                {error && <p className="text-sm text-error text-center">{error}</p>}

                <div className="pt-4">
                    <Button type="submit" isLoading={isLoading} className="w-full">
                        {isLoginView ? t('login') : t('signup')}
                    </Button>
                </div>
                 <p className="text-sm text-center text-gray-500">
                    {isLoginView ? t('signup_prompt') : t('login_prompt')}{' '}
                    <button type="button" onClick={toggleView} className="font-semibold text-primary hover:underline">
                         {isLoginView ? t('signup') : t('login')}
                    </button>
                </p>
            </form>
        </Modal>
    );
};

export default LoginModal;

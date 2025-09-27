
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
    const { login } = useAuth();
    const { t } = useTranslation();
    const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.USER);

    const handleLogin = () => {
        login(selectedRole);
        onClose();
    };

    const roleTranslations: Record<UserRole, string> = {
        [UserRole.USER]: t('role_user'),
        [UserRole.ASHA_WORKER]: t('role_asha'),
        [UserRole.OFFICIAL]: t('role_official'),
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('login_modal_title')}>
            <div className="space-y-4">
                <p className="text-base-content">{t('login_modal_desc')}</p>
                <div>
                    <label htmlFor="role-select" className="block text-sm font-medium text-gray-500 mb-2">{t('user_role_label')}</label>
                    <select
                        id="role-select"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                        className="w-full bg-base-300 border border-gray-300 rounded-md p-2 text-base-content focus:ring-primary focus:border-primary"
                    >
                        <option value={UserRole.USER}>{roleTranslations[UserRole.USER]}</option>
                        <option value={UserRole.ASHA_WORKER}>{roleTranslations[UserRole.ASHA_WORKER]}</option>
                        <option value={UserRole.OFFICIAL}>{roleTranslations[UserRole.OFFICIAL]}</option>
                    </select>
                </div>
                <div className="flex justify-end pt-4">
                    <Button onClick={handleLogin}>
                        {t('login_as', { role: roleTranslations[selectedRole] })}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;

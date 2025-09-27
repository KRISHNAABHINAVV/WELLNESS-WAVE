import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const { login } = useAuth();
    const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.USER);

    const handleLogin = () => {
        login(selectedRole);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Simulate Login">
            <div className="space-y-4">
                <p className="text-base-content">Select a user role to view the corresponding dashboard.</p>
                <div>
                    <label htmlFor="role-select" className="block text-sm font-medium text-gray-500 mb-2">User Role</label>
                    <select
                        id="role-select"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                        className="w-full bg-base-300 border border-gray-300 rounded-md p-2 text-base-content focus:ring-primary focus:border-primary"
                    >
                        <option value={UserRole.USER}>Standard User</option>
                        <option value={UserRole.ASHA_WORKER}>ASHA Worker / Volunteer</option>
                        <option value={UserRole.OFFICIAL}>District Official</option>
                    </select>
                </div>
                <div className="flex justify-end pt-4">
                    <Button onClick={handleLogin}>
                        Login as {selectedRole.replace('_', ' ')}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;
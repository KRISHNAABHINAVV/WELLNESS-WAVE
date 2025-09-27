
import React from 'react';
import Card from '../ui/Card';
import ImageUpload from '../features/ImageUpload';
import { useTranslation } from '../../hooks/useTranslation';

const UserDashboard: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-base-content">{t('user_dashboard_title')}</h1>
            <Card title={t('analyze_water_image_title')}>
                <p className="text-base-content mb-4">
                    {t('analyze_water_image_desc')}
                    <strong> {t('analyze_water_image_disclaimer')}</strong>
                </p>
                <ImageUpload />
            </Card>
            {/* Future components for viewing reports can be added here */}
        </div>
    );
};

export default UserDashboard;

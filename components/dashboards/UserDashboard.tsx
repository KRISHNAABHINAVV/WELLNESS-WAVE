
import React from 'react';
import Card from '../ui/Card';
import ImageUpload from '../features/ImageUpload';
import { useTranslation } from '../../hooks/useTranslation';
import CommonDashboardElements from './CommonDashboardElements';

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
            
            <div className="border-t-2 border-dashed border-base-300 my-12"></div>

            <h2 className="text-3xl font-bold text-center text-base-content">{t('public_dashboard_title')}</h2>
            <CommonDashboardElements />
        </div>
    );
};

export default UserDashboard;

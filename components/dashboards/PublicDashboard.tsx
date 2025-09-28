
import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import CommonDashboardElements from './CommonDashboardElements';

const PublicDashboard: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-center text-base-content">{t('public_dashboard_title')}</h1>
            <CommonDashboardElements />
        </div>
    );
};

export default PublicDashboard;

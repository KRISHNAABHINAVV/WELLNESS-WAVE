
import React from 'react';
import Card from '../ui/Card';
import DataSubmissionForm from '../features/DataSubmissionForm';
import { useTranslation } from '../../hooks/useTranslation';

const AshaDashboard: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-base-content">{t('asha_dashboard_title')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card title={t('submit_water_report_title')}>
                    <DataSubmissionForm formType="water" />
                </Card>
                <Card title={t('submit_disease_report_title')}>
                    <DataSubmissionForm formType="disease" />
                </Card>
            </div>
        </div>
    );
};

export default AshaDashboard;

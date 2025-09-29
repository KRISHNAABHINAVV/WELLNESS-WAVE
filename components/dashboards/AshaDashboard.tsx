import React from 'react';
import Card from '../ui/Card';
import DataSubmissionForm from '../features/DataSubmissionForm';
import { useTranslation } from '../../hooks/useTranslation';
import CommonDashboardElements from './CommonDashboardElements';
import Gamification from '../features/Gamification';
import VoiceReporting from '../features/VoiceReporting';
import { MessageSquareIcon, MicIcon, TrophyIcon } from '../ui/Icons';
import SendAlert from '../features/SendAlert';
import ImageGallery from '../features/ImageGallery';

const AshaDashboard: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-base-content">{t('asha_dashboard_title')}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <Card title={t('submit_water_report_title')}>
                        <DataSubmissionForm formType="water" />
                    </Card>
                    <Card title={t('submit_disease_report_title')}>
                        <DataSubmissionForm formType="disease" />
                    </Card>
                </div>
                 <div className="space-y-8">
                    <Card title={t('gamification_title')} icon={<TrophyIcon className="w-6 h-6"/>}>
                        <Gamification />
                    </Card>
                    <Card title={t('voice_reporting_title')} icon={<MicIcon className="w-6 h-6"/>}>
                        <p className="text-base-content mb-4">{t('voice_reporting_desc')}</p>
                        <VoiceReporting />
                    </Card>
                    <Card title={t('send_alert_title')} icon={<MessageSquareIcon className="w-6 h-6"/>}>
                        <p className="text-base-content mb-4">{t('send_alert_desc')}</p>
                        <SendAlert />
                    </Card>
                </div>
            </div>

            <ImageGallery />
            
            <div className="border-t-2 border-dashed border-base-300 my-12"></div>

            <h2 className="text-3xl font-bold text-center text-base-content">{t('public_dashboard_title')}</h2>
            <CommonDashboardElements />
        </div>
    );
};

export default AshaDashboard;
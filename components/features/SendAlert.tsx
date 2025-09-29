import React, { useState } from 'react';
import Button from '../ui/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { useAlerts } from '../../context/AlertsContext';
import { RiskLevel } from '../../types';
import { MOCK_WATER_REPORTS } from '../../constants';
import { CheckCircleIcon } from '../ui/Icons';
import { sendSmsAlert } from '../../services/notificationService';

const SendAlert: React.FC = () => {
    const { t } = useTranslation();
    const { addAlert } = useAlerts();

    const [alertType, setAlertType] = useState('sms');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!location.trim() || !message.trim()) return;

        setIsSubmitting(true);
        setSubmissionMessage(null);

        try {
            if (alertType === 'official') {
                // Official alerts are handled internally
                addAlert({
                    title: `New Alert from ASHA Worker`,
                    description: message,
                    location: location,
                    riskLevel: RiskLevel.HIGH, // Assume high risk for manually sent official alerts
                });
                // Simulate a quick internal process
                await new Promise(resolve => setTimeout(resolve, 500));
                setSubmissionMessage({ type: 'success', text: t('alert_send_success') });
            } else { // 'sms'
                // Use the notification service to simulate a real backend API call
                const response = await sendSmsAlert(location, message);
                setSubmissionMessage({
                    type: 'success',
                    text: t('sms_send_success', { count: response.count, location: location })
                });
            }

            // Clear form on success
            setLocation('');
            setMessage('');
        } catch (error) {
            // The service throws an error on simulated failure, which we catch here
            setSubmissionMessage({ type: 'error', text: (error as Error).message || t('alert_send_error') });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const uniqueLocations = [...new Set(MOCK_WATER_REPORTS.map(r => r.location))];

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="alert-type" className="block text-sm font-medium text-gray-400">{t('label_alert_type')}</label>
                <select 
                    id="alert-type" 
                    className="mt-1 block w-full bg-base-300 border-base-100 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    value={alertType}
                    onChange={(e) => {
                        setAlertType(e.target.value);
                        setSubmissionMessage(null); // Clear message on type change
                    }}
                >
                    <option value="sms">{t('alert_type_sms')}</option>
                    <option value="official">{t('alert_type_official')}</option>
                </select>
            </div>
            <div>
                <label htmlFor="alert-location" className="block text-sm font-medium text-gray-400">{t('label_location')}</label>
                <input 
                    type="text" 
                    id="alert-location" 
                    name="location" 
                    className="mt-1 block w-full bg-base-300 border-base-100 rounded-md shadow-sm focus:ring-primary focus:border-primary" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    list="locations-datalist"
                    required 
                />
                <datalist id="locations-datalist">
                    {uniqueLocations.map(loc => <option key={loc} value={loc} />)}
                </datalist>
            </div>
            <div>
                <label htmlFor="alert-message" className="block text-sm font-medium text-gray-400">{t('label_message')}</label>
                <textarea 
                    id="alert-message" 
                    rows={4} 
                    className="mt-1 block w-full bg-base-300 border-base-100 rounded-md shadow-sm focus:ring-primary focus:border-primary" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required 
                />
            </div>
            <div className="pt-2">
                <Button type="submit" isLoading={isSubmitting} className="w-full">
                    {isSubmitting ? t('sending_alert_button') : t('send_alert_button')}
                </Button>
            </div>
            {submissionMessage && (
                <div className={`flex items-center justify-center text-sm mt-2 ${submissionMessage.type === 'success' ? 'text-success' : 'text-error'}`}>
                    {submissionMessage.type === 'success' && <CheckCircleIcon className="w-4 h-4 mr-2 flex-shrink-0" />}
                    <span>{submissionMessage.text}</span>
                </div>
            )}
        </form>
    );
};

export default SendAlert;

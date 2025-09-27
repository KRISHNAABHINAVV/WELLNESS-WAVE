
import React, { useState } from 'react';
import Button from '../ui/Button';
import { useTranslation } from '../../hooks/useTranslation';

interface DataSubmissionFormProps {
    formType: 'water' | 'disease';
}

const DataSubmissionForm: React.FC<DataSubmissionFormProps> = ({ formType }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
    const { t } = useTranslation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus(null);
        // Simulate API call
        setTimeout(() => {
            // In a real app, you would collect form data and send it to a backend.
            setIsSubmitting(false);
            // Simulate random success/error for demo
            setSubmissionStatus(Math.random() > 0.2 ? 'success' : 'error');
        }, 1500);
    };

    const commonFields = (
        <div>
            <label htmlFor={`location-${formType}`} className="block text-sm font-medium text-gray-400">{t('label_location')}</label>
            <input type="text" id={`location-${formType}`} name="location" className="mt-1 block w-full bg-base-300 border-base-100 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
        </div>
    );

    const waterFormFields = (
        <>
            {commonFields}
            <div>
                <label htmlFor="ph" className="block text-sm font-medium text-gray-400">{t('label_ph')}</label>
                <input type="number" step="0.1" id="ph" name="ph" className="mt-1 block w-full bg-base-300 border-base-100 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
            </div>
            <div>
                <label htmlFor="turbidity" className="block text-sm font-medium text-gray-400">{t('label_turbidity')}</label>
                <input type="number" id="turbidity" name="turbidity" className="mt-1 block w-full bg-base-300 border-base-100 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
            </div>
            <div>
                <label htmlFor="bacteria" className="block text-sm font-medium text-gray-400">{t('label_bacteria')}</label>
                <input type="number" id="bacteria" name="bacteria" className="mt-1 block w-full bg-base-300 border-base-100 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
            </div>
        </>
    );

    const diseaseFormFields = (
        <>
            {commonFields}
            <div>
                <label htmlFor="disease" className="block text-sm font-medium text-gray-400">{t('label_disease')}</label>
                <input type="text" id="disease" name="disease" placeholder={t('disease_placeholder')} className="mt-1 block w-full bg-base-300 border-base-100 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
            </div>
            <div>
                <label htmlFor="caseCount" className="block text-sm font-medium text-gray-400">{t('label_case_count')}</label>
                <input type="number" id="caseCount" name="caseCount" className="mt-1 block w-full bg-base-300 border-base-100 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
            </div>
        </>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {formType === 'water' ? waterFormFields : diseaseFormFields}
            <div className="pt-2">
                <Button type="submit" isLoading={isSubmitting} className="w-full">
                    {isSubmitting ? t('submitting_button') : t('submit_report_button')}
                </Button>
            </div>
            {submissionStatus === 'success' && (
                <p className="text-center text-success mt-2">{t('submit_success')}</p>
            )}
            {submissionStatus === 'error' && (
                <p className="text-center text-error mt-2">{t('submit_error')}</p>
            )}
        </form>
    );
};

export default DataSubmissionForm;

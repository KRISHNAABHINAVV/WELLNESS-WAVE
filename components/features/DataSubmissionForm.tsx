
import React, { useState } from 'react';
import Button from '../ui/Button';
import { useTranslation } from '../../hooks/useTranslation';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

interface DataSubmissionFormProps {
    formType: 'water' | 'disease';
}

const DataSubmissionForm: React.FC<DataSubmissionFormProps> = ({ formType }) => {
    const { addWaterReport, addDiseaseReport } = useData();
    const { user } = useAuth();
    const { t } = useTranslation();

    // Form state
    const [location, setLocation] = useState('');
    const [ph, setPh] = useState('');
    const [turbidity, setTurbidity] = useState('');
    const [bacteria, setBacteria] = useState('');
    const [disease, setDisease] = useState('');
    const [caseCount, setCaseCount] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus(null);
        // Simulate API call
        setTimeout(() => {
            try {
                if (formType === 'water') {
                    addWaterReport({
                        location,
                        lat: 26.1445 + (Math.random() - 0.5) * 0.2, // Random coords around Guwahati
                        lng: 91.7362 + (Math.random() - 0.5) * 0.2,
                        ph: parseFloat(ph),
                        turbidity: parseInt(turbidity, 10),
                        bacteria: parseInt(bacteria, 10),
                        reportedBy: user?.name || 'ASHA Worker',
                    });
                } else {
                    addDiseaseReport({
                        location,
                        disease,
                        caseCount: parseInt(caseCount, 10),
                        reportedBy: user?.name || 'ASHA Worker',
                    });
                }

                setIsSubmitting(false);
                setSubmissionStatus('success');
                // Reset form
                setLocation('');
                setPh('');
                setTurbidity('');
                setBacteria('');
                setDisease('');
                setCaseCount('');
            } catch (error) {
                console.error("Submission failed:", error);
                setIsSubmitting(false);
                setSubmissionStatus('error');
            }
        }, 1500);
    };

    const commonFields = (
        <div>
            <label htmlFor={`location-${formType}`} className="block text-sm font-medium text-gray-400">{t('label_location')}</label>
            <input type="text" id={`location-${formType}`} name="location" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 block w-full bg-base-300 border-base-100 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
        </div>
    );

    const waterFormFields = (
        <>
            {commonFields}
            <div>
                <label htmlFor="ph" className="block text-sm font-medium text-gray-400">{t('label_ph')}</label>
                <input type="number" step="0.1" id="ph" name="ph" value={ph} onChange={(e) => setPh(e.target.value)} className="mt-1 block w-full bg-base-300 border-base-100 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
            </div>
            <div>
                <label htmlFor="turbidity" className="block text-sm font-medium text-gray-400">{t('label_turbidity')}</label>
                <input type="number" id="turbidity" name="turbidity" value={turbidity} onChange={(e) => setTurbidity(e.target.value)} className="mt-1 block w-full bg-base-300 border-base-100 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
            </div>
            <div>
                <label htmlFor="bacteria" className="block text-sm font-medium text-gray-400">{t('label_bacteria')}</label>
                <input type="number" id="bacteria" name="bacteria" value={bacteria} onChange={(e) => setBacteria(e.target.value)} className="mt-1 block w-full bg-base-300 border-base-100 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
            </div>
        </>
    );

    const diseaseFormFields = (
        <>
            {commonFields}
            <div>
                <label htmlFor="disease" className="block text-sm font-medium text-gray-400">{t('label_disease')}</label>
                <input type="text" id="disease" name="disease" placeholder={t('disease_placeholder')} value={disease} onChange={(e) => setDisease(e.target.value)} className="mt-1 block w-full bg-base-300 border-base-100 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
            </div>
            <div>
                <label htmlFor="caseCount" className="block text-sm font-medium text-gray-400">{t('label_case_count')}</label>
                <input type="number" id="caseCount" name="caseCount" value={caseCount} onChange={(e) => setCaseCount(e.target.value)} className="mt-1 block w-full bg-base-300 border-base-100 rounded-md shadow-sm focus:ring-primary focus:border-primary" required />
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

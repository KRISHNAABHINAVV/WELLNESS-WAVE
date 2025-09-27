import React, { useState, useEffect, useCallback } from 'react';
import Card from '../ui/Card';
import { MOCK_WATER_REPORTS, MOCK_DISEASE_REPORTS } from '../../constants';
import { generateRiskAnalysis } from '../../services/geminiService';
import Button from '../ui/Button';
import { AlertTriangleIcon, CheckCircleIcon, GlobeIcon, LoaderIcon } from '../ui/Icons';
import TrendChart from '../visualizations/TrendChart';
import RiskGlobe from '../visualizations/RiskGlobe';

const PublicDashboard: React.FC = () => {
    const [aiAnalysis, setAiAnalysis] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getAnalysis = useCallback(async () => {
        setIsLoading(true);
        const analysis = await generateRiskAnalysis(MOCK_WATER_REPORTS, MOCK_DISEASE_REPORTS);
        setAiAnalysis(analysis);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getAnalysis();
    }, [getAnalysis]);

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-center text-base-content">Water Health Dashboard: Northeast India Focus</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card title="Regional Risk Hotspots" icon={<GlobeIcon className="h-6 w-6"/>} className="h-full shadow-lg">
                         <p className="mb-4 text-gray-600">Interactive map showing areas with reported water quality issues. Red indicates high risk, orange medium, and green low. While the globe shows global data, our current focus is on Northeast India.</p>
                         <div className="h-[400px] bg-base-200 rounded-lg overflow-hidden flex items-center justify-center border border-base-300">
                            <RiskGlobe />
                         </div>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                     <Card title="AI Outbreak Prediction: Northeast India" icon={<AlertTriangleIcon className="h-6 w-6"/>} className="h-full shadow-lg">
                        <div className="flex flex-col h-full">
                            <p className="text-gray-600 mb-4">Gemini AI analysis of regional data to detect anomalies and predict potential outbreaks of diseases like Cholera, Typhoid, and Hepatitis.</p>
                            {isLoading ? (
                                <div className="flex-grow flex items-center justify-center">
                                    <div className="text-center">
                                        <LoaderIcon className="h-12 w-12 mx-auto text-primary"/>
                                        <p className="mt-2">Analyzing latest regional data...</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-grow bg-base-200 p-4 rounded-lg text-gray-700 whitespace-pre-wrap font-mono text-sm border border-base-300">
                                    {aiAnalysis}
                                </div>
                            )}
                            <div className="mt-4">
                                <Button onClick={getAnalysis} disabled={isLoading} className="w-full">
                                    {isLoading ? 'Re-analyzing...' : 'Refresh Analysis'}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <Card title="Data Trends in Northeast India" className="shadow-lg">
                <TrendChart waterData={MOCK_WATER_REPORTS} diseaseData={MOCK_DISEASE_REPORTS} />
            </Card>

            <Card title="Precautions & Regional Guidelines" icon={<CheckCircleIcon className="h-6 w-6" />} className="shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-700">
                    <div>
                        <h4 className="font-bold text-lg text-primary mb-2">For Individuals</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Drink only boiled, filtered, or purified water.</li>
                            <li>Wash hands frequently with soap, especially before eating.</li>
                            <li>Ensure food is cooked thoroughly and eaten hot.</li>
                            <li>Get vaccinated for Typhoid and Hepatitis A if possible.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-secondary mb-2">For Communities</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Protect and maintain community water sources (wells, springs).</li>
                            <li>Report any water pipeline leakages to authorities.</li>
                            <li>Promote proper sanitation and waste disposal.</li>
                            <li>Consult ASHA workers for health information.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-accent mb-2">When to Seek Help</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Severe watery diarrhea (symptom of Cholera).</li>
                            <li>Prolonged high fever (symptom of Typhoid).</li>
                            <li>Jaundice - yellowing of eyes/skin (symptom of Hepatitis).</li>
                            <li>Immediately contact local health centers.</li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-bold text-lg text-warning mb-2">Regional Response</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Integrated surveillance systems are crucial for tracking outbreaks.</li>
                            <li>Initiatives like <span className="font-semibold">ICMR-FoodNet</span> help generate real-time data.</li>
                            <li>Improved sanitation is key to preventing disease spread.</li>
                            <li>Addressing malnutrition can reduce disease severity.</li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default PublicDashboard;
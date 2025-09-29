
import React, { useState, useEffect, useCallback } from 'react';
import Card from '../ui/Card';
import { generateRiskAnalysis, getDailyAIUpdate } from '../../services/geminiService';
import Button from '../ui/Button';
import { AlertTriangleIcon, CheckCircleIcon, CubeIcon, GlobeIcon, LoaderIcon } from '../ui/Icons';
import TrendChart from '../visualizations/TrendChart';
import RiskGlobe from '../visualizations/RiskGlobe';
import { useTranslation } from '../../hooks/useTranslation';
import { AIRiskAnalysis } from '../../types';
import SystemFlowchart from '../features/SystemFlowchart';
import { useData } from '../../context/DataContext';
import LatestReports from '../features/LatestReports';

const CommonDashboardElements: React.FC = () => {
    const [aiRiskOutput, setAiRiskOutput] = useState<AIRiskAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAiUpdating, setIsAiUpdating] = useState<boolean>(false);
    const { t } = useTranslation();
    const { waterReports, diseaseReports, addWaterReport, addDiseaseReport } = useData();

    const getAnalysis = useCallback(async () => {
        setIsLoading(true);
        const analysis = await generateRiskAnalysis(waterReports, diseaseReports);
        setAiRiskOutput(analysis);
        setIsLoading(false);
    }, [waterReports, diseaseReports]);

    const handleAiUpdate = useCallback(async () => {
        setIsAiUpdating(true);
        const newData = await getDailyAIUpdate(waterReports, diseaseReports);
        if (newData && newData.waterReport && newData.diseaseReport) {
            addWaterReport({
                ...newData.waterReport,
                lat: 23.8315, // Coords for Agartala
                lng: 91.2868,
                reportedBy: 'AI News Analysis',
            });
            addDiseaseReport({
                ...newData.diseaseReport,
                reportedBy: 'AI News Analysis',
            });
        }
        setIsAiUpdating(false);
    }, [waterReports, diseaseReports, addWaterReport, addDiseaseReport]);

    useEffect(() => {
        getAnalysis();
    }, [getAnalysis]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card title={t('risk_hotspots_title')} icon={<GlobeIcon className="h-6 w-6"/>} className="h-full shadow-lg">
                         <p className="mb-4 text-gray-600">{t('risk_hotspots_desc')}</p>
                         <div className="h-[400px] bg-base-200 rounded-lg overflow-hidden flex items-center justify-center border border-base-300">
                            <RiskGlobe riskPoints={aiRiskOutput?.riskData} />
                         </div>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                     <Card title={t('ai_prediction_title')} icon={<AlertTriangleIcon className="h-6 w-6"/>} className="h-full shadow-lg">
                        <div className="flex flex-col h-full">
                            <p className="text-gray-600 mb-4">{t('ai_prediction_desc')}</p>
                            {isLoading ? (
                                <div className="flex-grow flex items-center justify-center">
                                    <div className="text-center">
                                        <LoaderIcon className="h-12 w-12 mx-auto text-primary"/>
                                        <p className="mt-2">{t('analyzing_data')}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-grow bg-base-200 p-4 rounded-lg text-gray-700 whitespace-pre-wrap font-mono text-sm border border-base-300">
                                    {aiRiskOutput?.analysisText}
                                </div>
                            )}
                            <div className="mt-4">
                                <Button onClick={getAnalysis} disabled={isLoading} className="w-full">
                                    {isLoading ? t('re_analyzing') : t('refresh_analysis')}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <Card title={t('data_trends_title')} className="shadow-lg">
                <div className="text-center mb-4 border-b border-base-300 pb-4">
                     <h4 className="font-semibold text-lg text-primary">{t('ai_chart_update_title')}</h4>
                     <p className="text-sm text-gray-500 mt-1">{t('ai_chart_update_desc')}</p>
                     <Button onClick={handleAiUpdate} isLoading={isAiUpdating} disabled={isAiUpdating} className="mt-3" size="sm" variant="secondary">
                        {isAiUpdating ? t('getting_ai_update_button') : t('get_ai_update_button')}
                     </Button>
                </div>
                <TrendChart waterData={waterReports} diseaseData={diseaseReports} />
            </Card>

            <LatestReports />

            <Card title={t('system_flow_title')} icon={<CubeIcon className="h-6 w-6"/>} className="shadow-lg">
                <SystemFlowchart />
            </Card>

            <Card title={t('precautions_title')} icon={<CheckCircleIcon className="h-6 w-6" />} className="shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-700">
                    <div>
                        <h4 className="font-bold text-lg text-primary mb-2">{t('precautions_individuals_title')}</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li>{t('precautions_individuals_1')}</li>
                            <li>{t('precautions_individuals_2')}</li>
                            <li>{t('precautions_individuals_3')}</li>
                            <li>{t('precautions_individuals_4')}</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-secondary mb-2">{t('precautions_communities_title')}</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li>{t('precautions_communities_1')}</li>
                            <li>{t('precautions_communities_2')}</li>
                            <li>{t('precautions_communities_3')}</li>
                            <li>{t('precautions_communities_4')}</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-accent mb-2">{t('precautions_help_title')}</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li>{t('precautions_help_1')}</li>
                            <li>{t('precautions_help_2')}</li>
                            <li>{t('precautions_help_3')}</li>
                            <li>{t('precautions_help_4')}</li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-bold text-lg text-warning mb-2">{t('precautions_response_title')}</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li>{t('precautions_response_1')}</li>
                            <li>{t('precautions_response_2')}</li>
                            <li><span className="font-semibold">ICMR-FoodNet</span> {t('precautions_response_3')}</li>
                            <li>{t('precautions_response_4')}</li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CommonDashboardElements;


import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { WaterQualityReport, DiseaseCaseReport } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';

interface TrendChartProps {
    waterData: WaterQualityReport[];
    diseaseData: DiseaseCaseReport[];
}

const TrendChart: React.FC<TrendChartProps> = ({ waterData, diseaseData }) => {
    const { t } = useTranslation();
    // Process data for charting
    const chartWaterData = waterData
        .map(d => ({
            name: new Date(d.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            pH: d.ph,
            Turbidity: d.turbidity,
            Bacteria: d.bacteria
        }))
        .sort((a,b) => new Date(a.name).getTime() - new Date(b.name).getTime());

    const chartDiseaseData = diseaseData
        .map(d => ({
            name: new Date(d.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            Cases: d.caseCount,
        }))
        .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
        

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[800px] lg:h-[400px] p-4">
            <div className="flex flex-col">
                <h4 className="text-center font-semibold mb-4 text-base-content">{t('chart_water_title')}</h4>
                <div className="flex-grow">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartWaterData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', color: '#1f2937' }} />
                            <Legend />
                            <Line type="monotone" dataKey="Turbidity" stroke="#f59e0b" yAxisId={0} activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="Bacteria" stroke="#ef4444" yAxisId={0} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="flex flex-col">
                 <h4 className="text-center font-semibold mb-4 text-base-content">{t('chart_disease_title')}</h4>
                <div className="flex-grow">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartDiseaseData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', color: '#1f2937' }} />
                            <Legend />
                            <Bar dataKey="Cases" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default TrendChart;

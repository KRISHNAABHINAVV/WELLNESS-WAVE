
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { WaterQualityReport, DiseaseCaseReport, RiskLevel } from '../types';
import { MOCK_WATER_REPORTS, MOCK_DISEASE_REPORTS } from '../constants';

interface DataContextType {
    waterReports: WaterQualityReport[];
    diseaseReports: DiseaseCaseReport[];
    addWaterReport: (report: Omit<WaterQualityReport, 'id' | 'timestamp' | 'riskLevel'>) => void;
    addDiseaseReport: (report: Omit<DiseaseCaseReport, 'id' | 'timestamp'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const calculateRiskLevel = (ph: number, turbidity: number, bacteria: number): RiskLevel => {
    if (bacteria > 500 || turbidity > 60 || ph < 6.5 || ph > 8.5) {
        return RiskLevel.HIGH;
    }
    if (bacteria > 100 || turbidity > 30) {
        return RiskLevel.MEDIUM;
    }
    return RiskLevel.LOW;
};


export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [waterReports, setWaterReports] = useState<WaterQualityReport[]>(MOCK_WATER_REPORTS);
    const [diseaseReports, setDiseaseReports] = useState<DiseaseCaseReport[]>(MOCK_DISEASE_REPORTS);

    const addWaterReport = (reportData: Omit<WaterQualityReport, 'id' | 'timestamp' | 'riskLevel'>) => {
        const newReport: WaterQualityReport = {
            id: `wq-${Date.now()}`,
            timestamp: new Date().toISOString(),
            riskLevel: calculateRiskLevel(reportData.ph, reportData.turbidity, reportData.bacteria),
            ...reportData,
        };
        setWaterReports(prevReports => [newReport, ...prevReports]);
    };
    
    const addDiseaseReport = (reportData: Omit<DiseaseCaseReport, 'id' | 'timestamp'>) => {
        const newReport: DiseaseCaseReport = {
            id: `dc-${Date.now()}`,
            timestamp: new Date().toISOString(),
            ...reportData,
        };
        setDiseaseReports(prevReports => [newReport, ...prevReports]);
    };

    return (
        <DataContext.Provider value={{ waterReports, diseaseReports, addWaterReport, addDiseaseReport }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

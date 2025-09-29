
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Alert, AlertStatus, RiskLevel } from '../types';
import { MOCK_ALERTS } from '../constants';

interface AlertsContextType {
    alerts: Alert[];
    addAlert: (newAlertData: { title: string; description: string; location: string; riskLevel: RiskLevel }) => void;
    updateAlertStatus: (id: string, newStatus: AlertStatus) => void;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const AlertsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);

    const addAlert = (newAlertData: { title: string; description: string; location: string; riskLevel: RiskLevel }) => {
        const newAlert: Alert = {
            id: `a${Date.now()}`,
            timestamp: new Date().toISOString(),
            status: AlertStatus.NEW,
            ...newAlertData,
        };
        setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
    };
    
    const updateAlertStatus = (id: string, newStatus: AlertStatus) => {
        setAlerts(prevAlerts => 
            prevAlerts.map(alert => 
                alert.id === id ? { ...alert, status: newStatus } : alert
            )
        );
    };

    return (
        <AlertsContext.Provider value={{ alerts, addAlert, updateAlertStatus }}>
            {children}
        </AlertsContext.Provider>
    );
};

export const useAlerts = () => {
    const context = useContext(AlertsContext);
    if (context === undefined) {
        throw new Error('useAlerts must be used within an AlertsProvider');
    }
    return context;
};


import React from 'react';
import Card from '../ui/Card';
import { Alert, AlertStatus, RiskLevel } from '../../types';
import Button from '../ui/Button';
import { CheckCircleIcon, XCircleIcon, AlertTriangleIcon } from '../ui/Icons';
import { useTranslation } from '../../hooks/useTranslation';
import CommonDashboardElements from './CommonDashboardElements';
import { useAlerts } from '../../context/AlertsContext';

const OfficialDashboard: React.FC = () => {
    const { alerts, updateAlertStatus } = useAlerts();
    const { t } = useTranslation();

    const handleStatusChange = (id: string, newStatus: AlertStatus) => {
        updateAlertStatus(id, newStatus);
    };

    const statusStyles: Record<AlertStatus, string> = {
        [AlertStatus.NEW]: 'bg-blue-500 text-white',
        [AlertStatus.VERIFIED]: 'bg-yellow-500 text-black',
        [AlertStatus.RESOLVED]: 'bg-green-500 text-white',
        [AlertStatus.UNRESOLVED]: 'bg-red-500 text-white',
    };

    const riskIcons: Record<RiskLevel, React.ReactNode> = {
        [RiskLevel.HIGH]: <AlertTriangleIcon className="h-6 w-6 text-error" />,
        [RiskLevel.MEDIUM]: <AlertTriangleIcon className="h-6 w-6 text-warning" />,
        [RiskLevel.LOW]: <CheckCircleIcon className="h-6 w-6 text-success" />,
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-base-content">{t('official_dashboard_title')}</h1>
            <Card title={t('active_alerts_title')}>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-base-200">
                        <thead className="bg-base-300">
                            <tr>
                                <th className="py-3 px-4 text-left">{t('th_risk')}</th>
                                <th className="py-3 px-4 text-left">{t('th_alert')}</th>
                                <th className="py-3 px-4 text-left">{t('th_location')}</th>
                                <th className="py-3 px-4 text-left">{t('th_status')}</th>
                                <th className="py-3 px-4 text-left">{t('th_actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alerts.map(alert => (
                                <tr key={alert.id} className="border-b border-base-100">
                                    <td className="py-3 px-4">{riskIcons[alert.riskLevel]}</td>
                                    <td className="py-3 px-4">
                                        <p className="font-bold">{alert.title}</p>
                                        <p className="text-sm text-gray-400">{alert.description}</p>
                                    </td>
                                    <td className="py-3 px-4">{alert.location}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[alert.status]}`}>
                                            {alert.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 space-x-2">
                                        {alert.status === AlertStatus.NEW && (
                                            <Button size="sm" variant='secondary' onClick={() => handleStatusChange(alert.id, AlertStatus.VERIFIED)}>{t('action_verify')}</Button>
                                        )}
                                        {alert.status === AlertStatus.VERIFIED && (
                                            <>
                                                <Button size="sm" variant='primary' onClick={() => handleStatusChange(alert.id, AlertStatus.RESOLVED)}>
                                                    <CheckCircleIcon className="h-4 w-4 mr-1"/> {t('action_resolve')}
                                                </Button>
                                                <Button size="sm" variant='danger' onClick={() => handleStatusChange(alert.id, AlertStatus.UNRESOLVED)}>
                                                    <XCircleIcon className="h-4 w-4 mr-1"/> {t('action_unresolved')}
                                                </Button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="border-t-2 border-dashed border-base-300 my-12"></div>

            <h2 className="text-3xl font-bold text-center text-base-content">{t('public_dashboard_title')}</h2>
            <CommonDashboardElements />
        </div>
    );
};

export default OfficialDashboard;
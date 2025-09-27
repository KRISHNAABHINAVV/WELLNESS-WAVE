
import React, { useState } from 'react';
import Card from '../ui/Card';
import { MOCK_ALERTS } from '../../constants';
import { Alert, AlertStatus, RiskLevel } from '../../types';
import Button from '../ui/Button';
import { CheckCircleIcon, XCircleIcon, AlertTriangleIcon } from '../ui/Icons';

const OfficialDashboard: React.FC = () => {
    const [alerts, setAlerts] = useState<Alert[]>(MOCK_ALERTS);

    const handleStatusChange = (id: string, newStatus: AlertStatus) => {
        setAlerts(alerts.map(alert => alert.id === id ? { ...alert, status: newStatus } : alert));
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
            <h1 className="text-3xl font-bold text-white">Official Alert Management</h1>
            <Card title="Active Alerts">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-base-200">
                        <thead className="bg-base-300">
                            <tr>
                                <th className="py-3 px-4 text-left">Risk</th>
                                <th className="py-3 px-4 text-left">Alert</th>
                                <th className="py-3 px-4 text-left">Location</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-left">Actions</th>
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
                                            <Button size="sm" variant='secondary' onClick={() => handleStatusChange(alert.id, AlertStatus.VERIFIED)}>Verify</Button>
                                        )}
                                        {alert.status === AlertStatus.VERIFIED && (
                                            <>
                                                <Button size="sm" variant='primary' onClick={() => handleStatusChange(alert.id, AlertStatus.RESOLVED)}>
                                                    <CheckCircleIcon className="h-4 w-4 mr-1"/> Resolve
                                                </Button>
                                                <Button size="sm" variant='danger' onClick={() => handleStatusChange(alert.id, AlertStatus.UNRESOLVED)}>
                                                    <XCircleIcon className="h-4 w-4 mr-1"/> Unresolved
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
        </div>
    );
};

export default OfficialDashboard;

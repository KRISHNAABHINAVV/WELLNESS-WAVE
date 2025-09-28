
import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { AwardIcon, CheckCircleIcon, StarIcon } from '../ui/Icons';

const Gamification: React.FC = () => {
    const { t } = useTranslation();

    const stats = [
        { label: t('reports_submitted'), value: 25, icon: <CheckCircleIcon className="w-8 h-8 text-primary" /> },
        { label: t('points_earned'), value: 250, icon: <StarIcon className="w-8 h-8 text-yellow-400" /> },
    ];

    const badges = [
        { name: 'Data Pioneer', icon: <AwardIcon className="w-6 h-6 text-indigo-500" /> },
        { name: 'Community Star', icon: <AwardIcon className="w-6 h-6 text-pink-500" /> },
        { name: 'Weekly Champion', icon: <AwardIcon className="w-6 h-6 text-green-500" /> },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-base-200 p-4 rounded-lg">
                        {stat.icon}
                        <p className="text-2xl font-bold text-base-content mt-1">{stat.value}</p>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>
            <div>
                <h4 className="font-semibold text-base-content mb-3">{t('badges_earned')}</h4>
                <div className="space-y-2">
                    {badges.map((badge, index) => (
                        <div key={index} className="flex items-center bg-base-200 p-2 rounded-lg">
                            {badge.icon}
                            <span className="ml-3 font-medium text-gray-700">{badge.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gamification;

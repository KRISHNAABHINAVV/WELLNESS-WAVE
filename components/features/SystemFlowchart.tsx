
import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { SensorIcon, CameraIcon, MicIcon, CubeIcon, BrainCircuitIcon, LayoutDashboardIcon, TrophyIcon, CheckCircleIcon, ArrowRightIcon } from '../ui/Icons';

interface FlowchartNodeProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    items?: string[];
    className?: string;
    iconClassName?: string;
}

const FlowchartNode: React.FC<FlowchartNodeProps> = ({ icon, title, subtitle, items, className, iconClassName }) => (
    <div className={`bg-base-100 p-3 rounded-lg border border-base-300 shadow-md w-full text-center hover:shadow-xl transition-shadow duration-300 ${className}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${iconClassName}`}>
            {icon}
        </div>
        <h3 className="font-bold text-base-content text-sm">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        {items && (
             <ul className="mt-2 space-y-1">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center justify-center text-xs text-gray-600">
                        <CheckCircleIcon className="w-3 h-3 mr-1.5 text-success flex-shrink-0" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

const Arrow: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`flex-shrink-0 text-gray-400 ${className}`}>
        <ArrowRightIcon className="w-8 h-8" />
    </div>
);

const SystemFlowchart: React.FC = () => {
    const { t } = useTranslation();

    const inputNodes = [
        { icon: <SensorIcon className="w-5 h-5 text-white" />, title: t('flow_iot'), subtitle: t('flow_iot_desc'), iconBg: 'bg-blue-500' },
        { icon: <CameraIcon className="w-5 h-5 text-white" />, title: t('flow_cv'), subtitle: t('flow_cv_desc'), iconBg: 'bg-cyan-500' },
        { icon: <MicIcon className="w-5 h-5 text-white" />, title: t('flow_voice'), subtitle: t('flow_voice_desc'), iconBg: 'bg-teal-500' }
    ];

    const outputNodes = [
        { icon: <BrainCircuitIcon className="w-5 h-5 text-white" />, title: t('flow_ai'), subtitle: t('flow_ai_desc'), iconBg: 'bg-purple-500' },
        { icon: <LayoutDashboardIcon className="w-5 h-5 text-white" />, title: t('flow_dashboard'), subtitle: t('flow_dashboard_desc'), iconBg: 'bg-indigo-500' },
        { icon: <TrophyIcon className="w-5 h-5 text-white" />, title: t('flow_gamification'), subtitle: t('flow_gamification_desc'), iconBg: 'bg-pink-500' }
    ];

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 p-4 overflow-x-auto">
            <FlowchartNode 
                icon={<span className="font-bold text-lg">▶</span>}
                title={t('flow_start')}
                className="w-32"
                iconClassName="bg-gray-300"
            />
            <Arrow className="rotate-90 lg:rotate-0"/>
            
            <div className="flex flex-col gap-3 w-48">
                {inputNodes.map(node => (
                    <FlowchartNode key={node.title} icon={node.icon} title={node.title} subtitle={node.subtitle} iconClassName={node.iconBg} />
                ))}
            </div>

            <Arrow className="rotate-90 lg:rotate-0"/>
            
            <FlowchartNode
                icon={<CubeIcon className="w-6 h-6 text-white" />}
                title={t('flow_blockchain')}
                subtitle={t('flow_blockchain_desc')}
                className="w-48"
                iconClassName="bg-gray-700"
            />
            
            <Arrow className="rotate-90 lg:rotate-0"/>

            <div className="flex flex-col gap-3 w-48">
                {outputNodes.map(node => (
                     <FlowchartNode key={node.title} icon={node.icon} title={node.title} subtitle={node.subtitle} iconClassName={node.iconBg} />
                ))}
            </div>
            
            <Arrow className="rotate-90 lg:rotate-0"/>

             <FlowchartNode
                icon={<CheckCircleIcon className="w-6 h-6 text-white" />}
                title={t('flow_impact')}
                items={[t('flow_impact_1'), t('flow_impact_2'), t('flow_impact_3')]}
                className="w-48"
                iconClassName="bg-success"
            />
            
            <Arrow className="rotate-90 lg:rotate-0"/>

            <FlowchartNode 
                icon={<span className="font-bold text-lg">■</span>}
                title={t('flow_end')}
                className="w-32"
                iconClassName="bg-gray-300"
            />
        </div>
    );
};

export default SystemFlowchart;

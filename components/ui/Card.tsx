
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, icon }) => {
    return (
        <div className={`bg-base-300 rounded-lg shadow-lg overflow-hidden ${className}`}>
            {title && (
                <div className="p-4 border-b border-base-100 flex items-center space-x-3">
                    {icon && <div className="text-primary">{icon}</div>}
                    <h3 className="text-xl font-bold text-base-content">{title}</h3>
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
        </div>
    );
};

export default Card;

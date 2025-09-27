
import React from 'react';
import Card from '../ui/Card';
import DataSubmissionForm from '../features/DataSubmissionForm';

const AshaDashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">ASHA Worker & Volunteer Portal</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card title="Submit Water Quality Report">
                    <DataSubmissionForm formType="water" />
                </Card>
                <Card title="Submit Disease Case Report">
                    <DataSubmissionForm formType="disease" />
                </Card>
            </div>
        </div>
    );
};

export default AshaDashboard;

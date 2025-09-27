
import React from 'react';
import Card from '../ui/Card';
import ImageUpload from '../features/ImageUpload';

const UserDashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Your Dashboard</h1>
            <Card title="Analyze Water Sample Image">
                <p className="text-base-content mb-4">
                    Upload a photo of a water sample for a quick visual analysis by our AI.
                    This can help identify potential issues like turbidity or unusual coloring.
                    <strong> Disclaimer:</strong> This is not a substitute for professional lab testing.
                </p>
                <ImageUpload />
            </Card>
            {/* Future components for viewing reports can be added here */}
        </div>
    );
};

export default UserDashboard;

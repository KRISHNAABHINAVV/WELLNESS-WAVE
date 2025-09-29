
import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import PublicDashboard from './components/dashboards/PublicDashboard';
import UserDashboard from './components/dashboards/UserDashboard';
import AshaDashboard from './components/dashboards/AshaDashboard';
import OfficialDashboard from './components/dashboards/OfficialDashboard';
import { UserRole } from './types';
import Footer from './components/layout/Footer';
import { AlertsProvider } from './context/AlertsContext';
import { DataProvider } from './context/DataContext';

const AppContent: React.FC = () => {
    const { user } = useAuth();

    const renderDashboard = () => {
        if (!user) {
            return <PublicDashboard />;
        }
        switch (user.role) {
            case UserRole.USER:
                return <UserDashboard />;
            case UserRole.ASHA_WORKER:
                return <AshaDashboard />;
            case UserRole.OFFICIAL:
                return <OfficialDashboard />;
            default:
                return <PublicDashboard />;
        }
    };
    
    return (
        <div className="min-h-screen bg-base-200 text-base-content flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                {renderDashboard()}
            </main>
            <Footer />
        </div>
    );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AlertsProvider>
          <DataProvider>
            <AppContent />
          </DataProvider>
        </AlertsProvider>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;

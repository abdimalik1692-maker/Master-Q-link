import React from 'react';
import { QLINKProvider, useQLINK } from './context/QLINKContext';
import { QLINKLogo } from './components/common/QLINKLogo';
import { RoleSwitcher } from './components/common/RoleSwitcher';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { SplashScreen } from './components/common/SplashScreen';

// Customer Components
import { CustomerHome } from './components/customer/CustomerHome';
import { CustomerDiscover } from './components/customer/CustomerDiscover';
import { CustomerGovernment } from './components/customer/CustomerGovernment';
import { CustomerBanking } from './components/customer/CustomerBanking';
import { CustomerHealthcare } from './components/customer/CustomerHealthcare';
import { CustomerEmergency } from './components/customer/CustomerEmergency';
import { CustomerMyQLINK } from './components/customer/CustomerMyQLINK';
import { CustomerProfile } from './components/customer/CustomerProfile';

// Government Organization Dashboards
import { GovCEODashboard } from './components/government/GovCEODashboard';
import { GovAdminDashboard } from './components/government/GovAdminDashboard';

// Banking Dashboards
import { BankCEODashboard } from './components/banking/BankCEODashboard';
import { BankManagerDashboard } from './components/banking/BankManagerDashboard';

// Healthcare Department Dashboards & Workspaces
import { HealthCEODashboard } from './components/healthcare/HealthCEODashboard';
import { DoctorWorkspace } from './components/healthcare/DoctorWorkspace';
import { NurseCareWorkspace } from './components/healthcare/NurseCareWorkspace';
import { DiagnosticLabWorkspace } from './components/healthcare/DiagnosticLabWorkspace';
import { RadiologyWorkspace } from './components/healthcare/RadiologyWorkspace';
import { PharmacyWorkspace } from './components/healthcare/PharmacyWorkspace';
import { BillingCashierWorkspace } from './components/healthcare/BillingCashierWorkspace';
import { EmergencyCommandWorkspace } from './components/healthcare/EmergencyCommandWorkspace';
import { ReceptionWorkspace } from './components/healthcare/ReceptionWorkspace';

// Cross-Organization CEO Command Center
import { CrossOrgCEOCommand } from './components/ceo/CrossOrgCEOCommand';

import {
  Home,
  Compass,
  Building2,
  Landmark,
  HeartPulse,
  Ambulance,
  Bookmark,
  User,
  Sparkles,
} from 'lucide-react';

const QLINKAppContent: React.FC = () => {
  const {
    currentRole,
    customerTab,
    setCustomerTab,
    isSplashVisible,
  } = useQLINK();

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  // Customer Navigation Tabs config
  const navTabs: Array<{ id: typeof customerTab; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'discover', label: 'Discover', icon: <Compass className="w-4 h-4" /> },
    { id: 'government', label: 'Gov Services', icon: <Building2 className="w-4 h-4" /> },
    { id: 'banking', label: 'Banking', icon: <Landmark className="w-4 h-4" /> },
    { id: 'healthcare', label: 'Health EMR', icon: <HeartPulse className="w-4 h-4" /> },
    { id: 'emergency', label: '999 SOS', icon: <Ambulance className="w-4 h-4 text-[#EF4444]" /> },
    { id: 'my_qlink', label: 'My Hub', icon: <Bookmark className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
  ];

  // Dynamic View Renderer based on active User Role
  const renderCurrentView = () => {
    switch (currentRole) {
      // 1. Unified Citizen Mobile & Web Experience
      case 'customer':
        switch (customerTab) {
          case 'home':
            return <CustomerHome />;
          case 'discover':
            return <CustomerDiscover />;
          case 'government':
            return <CustomerGovernment />;
          case 'banking':
            return <CustomerBanking />;
          case 'healthcare':
            return <CustomerHealthcare />;
          case 'emergency':
            return <CustomerEmergency />;
          case 'my_qlink':
            return <CustomerMyQLINK />;
          case 'profile':
            return <CustomerProfile />;
          default:
            return <CustomerHome />;
        }

      // 2. Government Portals
      case 'gov_ceo':
        return <GovCEODashboard />;
      case 'gov_admin':
        return <GovAdminDashboard />;

      // 3. Banking Portals
      case 'bank_ceo':
        return <BankCEODashboard />;
      case 'bank_manager':
        return <BankManagerDashboard />;

      // 4. Healthcare Department Workspaces
      case 'health_ceo':
        return <HealthCEODashboard />;
      case 'doctor':
        return <DoctorWorkspace />;
      case 'nurse':
        return <NurseCareWorkspace />;
      case 'lab':
        return <DiagnosticLabWorkspace />;
      case 'radiologist':
        return <RadiologyWorkspace />;
      case 'pharmacist':
        return <PharmacyWorkspace />;
      case 'cashier':
        return <BillingCashierWorkspace />;
      case 'emergency_team':
        return <EmergencyCommandWorkspace />;
      case 'receptionist':
        return <ReceptionWorkspace />;

      // 5. Cross-Organization Executive Command
      case 'cross_org_ceo':
        return <CrossOrgCEOCommand />;

      default:
        return <CustomerHome />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F4F6] flex flex-col selection:bg-[#D4AF37] selection:text-black">
      {/* Top Global Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0E0E0E]/95 backdrop-blur-md border-b border-[#222222] px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <QLINKLogo size="md" />
          </div>

          <div className="flex items-center gap-2.5">
            <RoleSwitcher />
            <NotificationDrawer />
          </div>
        </div>
      </header>

      {/* Customer Quick Category Sub-Nav (when in citizen role) */}
      {currentRole === 'customer' && (
        <nav className="bg-[#121212] border-b border-[#222222] px-4 py-2 sticky top-[61px] z-30 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
            {navTabs.map((tab) => {
              const isActive = customerTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCustomerTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'text-[#888888] hover:text-white hover:bg-[#1A1A1A]'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1C1C1C] py-6 px-4 text-center text-xs text-[#666666] bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[#D4AF37] font-bold">QLINK</span>
            <span>• Unified National Digital Services & Cross-Organization Infrastructure</span>
          </div>
          <span className="text-[10px] text-[#555555]">
            Encrypted End-to-End • Level-1 Government & Financial Compliance
          </span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <QLINKProvider>
      <QLINKAppContent />
    </QLINKProvider>
  );
}

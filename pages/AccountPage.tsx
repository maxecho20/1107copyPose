import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CreationsIcon, BillingIcon, SettingsIcon, UserIcon, LogoutIcon, CreditsIcon } from '../components/icons';
import { MyCreations } from '../components/account/MyCreations';
import { Billing } from '../components/account/Billing';
import { AccountSettings } from '../components/account/AccountSettings';
import { Credits } from '../components/account/Credits';


export type AccountTab = 'creations' | 'credits' | 'billing' | 'settings';

interface AccountPageProps {
    initialTab: AccountTab;
    onExit: () => void;
}

const NavItem: React.FC<{
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-left transition-colors ${
            isActive
                ? 'bg-[#ffc6c7] text-[#33272a]'
                : 'text-[#594a4e] hover:bg-[#faeee7] hover:text-[#33272a]'
        }`}
    >
        <Icon className="h-5 w-5" />
        <span className="font-medium">{label}</span>
    </button>
);

export const AccountPage: React.FC<AccountPageProps> = ({ initialTab, onExit }) => {
    const [activeTab, setActiveTab] = useState<AccountTab>(initialTab);
    const { userProfile, logout } = useAuth();

    if (!userProfile) {
        onExit();
        return null;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'creations':
                return <MyCreations />;
            case 'credits':
                return <Credits />;
            case 'billing':
                return <Billing />;
            case 'settings':
                return <AccountSettings />;
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-[#faeee7] text-[#594a4e]">
            {/* Sidebar */}
            <aside className="w-64 bg-white p-4 flex flex-col m-4 rounded-2xl shadow-[0_8px_24px_rgba(89,74,78,0.08)]">
                <div className="flex items-center space-x-2 px-2 mb-8">
                     <div className="w-8 h-8 bg-[#ff8ba7] rounded-2xl flex items-center justify-center text-xl font-bold text-[#33272a] cursor-pointer" onClick={onExit}>P</div>
                     <span className="text-xl font-bold text-[#33272a] cursor-pointer" onClick={onExit}>PoseShift</span>
                </div>
                
                <nav className="flex-grow space-y-2">
                    <NavItem
                        icon={CreationsIcon}
                        label="My Creations"
                        isActive={activeTab === 'creations'}
                        onClick={() => setActiveTab('creations')}
                    />
                    <NavItem
                        icon={CreditsIcon}
                        label="Credits"
                        isActive={activeTab === 'credits'}
                        onClick={() => setActiveTab('credits')}
                    />
                    <NavItem
                        icon={BillingIcon}
                        label="Billing"
                        isActive={activeTab === 'billing'}
                        onClick={() => setActiveTab('billing')}
                    />
                    <NavItem
                        icon={SettingsIcon}
                        label="Account Settings"
                        isActive={activeTab === 'settings'}
                        onClick={() => setActiveTab('settings')}
                    />
                </nav>

                <div className="mt-auto">
                   <div className="border-t border-[#faeee7] pt-4 space-y-4">
                     <div className="flex items-center space-x-3 px-2">
                        {userProfile.photoURL ? (
                            <img src={userProfile.photoURL} alt="User avatar" className="h-8 w-8 rounded-full" />
                        ) : (
                            <UserIcon className="h-8 w-8 text-[#594a4e] p-1 bg-[#faeee7] rounded-full" />
                        )}
                        <div>
                            <p className="font-semibold text-sm text-[#33272a] truncate">{userProfile.displayName || 'Mossecho'}</p>
                            <p className="text-xs text-[#594a4e] truncate">{userProfile.email}</p>
                        </div>
                     </div>
                      <button
                        onClick={async () => {
                            await logout();
                            onExit();
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-left transition-colors text-[#594a4e] hover:bg-[#faeee7] hover:text-[#33272a]"
                     >
                         <LogoutIcon className="h-5 w-5" />
                         <span className="font-medium">Logout</span>
                      </button>
                   </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    );
};
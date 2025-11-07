import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
// FIX: Removed modular imports for 'updateProfile' and 'sendPasswordResetEmail'. These functions will be called via the compat auth object.
// FIX: Import the 'auth' object from firebase services.
import { auth } from '../../services/firebase';

const SettingCard: React.FC<{ title: string, description: string, children: React.ReactNode }> = ({ title, description, children }) => (
    <div className="bg-white border border-[#faeee7] rounded-2xl shadow-[0_8px_24px_rgba(89,74,78,0.08)]">
        <div className="p-6 border-b border-[#faeee7]">
            <h3 className="text-lg font-semibold text-[#33272a]">{title}</h3>
            <p className="text-[#594a4e] mt-1">{description}</p>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);


export const AccountSettings: React.FC = () => {
    const { currentUser } = useAuth();
    const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
    const [isSavingName, setIsSavingName] = useState(false);
    const [nameMessage, setNameMessage] = useState('');
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const [resetError, setResetError] = useState('');

    const handleNameSave = async () => {
        if (!currentUser) return;
        setIsSavingName(true);
        setNameMessage('');
        try {
            // FIX: Switched from modular 'updateProfile(currentUser, ...)' to compat 'currentUser.updateProfile(...)'.
            await currentUser.updateProfile({ displayName });
            setNameMessage('Your name has been updated successfully!');
            setTimeout(() => setNameMessage(''), 3000);
        } catch (error) {
            const err = error as Error;
            setNameMessage(`Error: ${err.message}`);
        } finally {
            setIsSavingName(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!currentUser || !currentUser.email) return;
        setResetError('');
        setResetEmailSent(false);
        try {
            // FIX: Switched from modular 'sendPasswordResetEmail(auth, ...)' to compat 'auth.sendPasswordResetEmail(...)'.
            await auth.sendPasswordResetEmail(currentUser.email);
            setResetEmailSent(true);
        } catch (error) {
            const err = error as Error;
            setResetError(`Error: ${err.message}`);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-[#33272a]">Account Settings</h1>
            <p className="text-[#594a4e] mb-8 max-w-2xl">
                Manage your personal account details and security settings.
            </p>

            <div className="space-y-8 max-w-3xl">
                <SettingCard title="Your Name" description="Please enter your full name or a display name you are comfortable with.">
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="flex-grow bg-white border border-[#ffc6c7] rounded-2xl px-4 py-3 text-[#33272a] focus:ring-2 focus:ring-[#ff8ba7] focus:border-[#ff8ba7] transition"
                            placeholder="Your Name"
                        />
                         <button onClick={handleNameSave} disabled={isSavingName} className="px-6 py-3 text-sm font-semibold bg-[#faeee7] text-[#594a4e] border border-[#ffc6c7] rounded-2xl hover:bg-[#ffc6c7] hover:text-[#33272a] transition-colors disabled:opacity-50">
                           {isSavingName ? 'Saving...' : 'Save'}
                         </button>
                    </div>
                     {nameMessage && <p className="text-sm mt-2 text-green-600">{nameMessage}</p>}
                </SettingCard>

                 <SettingCard title="Your Language" description="Change the app language for your account.">
                    <select
                        disabled
                        className="w-full max-w-xs bg-white border border-[#ffc6c7] rounded-2xl px-4 py-3 text-[#594a4e]/60 focus:ring-2 focus:ring-[#ff8ba7] focus:border-[#ff8ba7] transition cursor-not-allowed"
                    >
                        <option>English</option>
                    </select>
                </SettingCard>

                <SettingCard title="Your Email" description="This is the email address associated with your account.">
                     <input
                        type="email"
                        value={currentUser?.email || ''}
                        readOnly
                        disabled
                        className="w-full bg-white border border-[#faeee7] rounded-2xl px-4 py-3 text-[#594a4e]/60 cursor-not-allowed"
                    />
                </SettingCard>

                <SettingCard title="Password" description="To change your password, we will send a reset link to your email address.">
                    {resetEmailSent ? (
                        <p className="text-green-600">A password reset link has been sent to your email. Please check your inbox.</p>
                    ) : (
                         <button onClick={handlePasswordReset} className="px-6 py-3 text-sm font-semibold bg-[#faeee7] text-[#594a4e] border border-[#ffc6c7] rounded-2xl hover:bg-[#ffc6c7] hover:text-[#33272a] transition-colors">
                            Send Reset Link
                         </button>
                    )}
                    {resetError && <p className="text-sm mt-2 text-red-500">{resetError}</p>}
                </SettingCard>
            </div>
        </div>
    );
};
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const StatCard: React.FC<{ title: string; value: string; change?: string; changeType?: 'gain' | 'loss' }> = ({ title, value, change, changeType }) => {
    const changeColor = changeType === 'gain' ? 'text-green-500' : 'text-red-500';
    return (
        <div className="bg-white border border-[#faeee7] rounded-2xl p-6 shadow-[0_8px_24px_rgba(89,74,78,0.08)]">
            <p className="text-sm text-[#594a4e]">{title}</p>
            <div className="flex items-baseline space-x-2 mt-1">
                <p className="text-2xl font-bold text-[#33272a]">{value}</p>
                {change && <p className={`text-sm font-semibold ${changeColor}`}>{change}</p>}
            </div>
        </div>
    );
};

export const Credits: React.FC = () => {
    const { userProfile } = useAuth();

    // Mock transaction data for now, as full transaction history is a larger feature
    const transactions = [
        { type: 'BONUS CREDITS', description: 'Welcome bonus credits', amount: '+30', balance: 30, time: '1 day ago' },
    ];

    const currentCredits = userProfile?.credits ?? 0;
    const totalEarned = 30; // Static for now
    const totalSpent = totalEarned - currentCredits;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-[#33272a]">Credits</h1>
            <p className="text-[#594a4e] mb-8 max-w-2xl">
                Manage your credits, view transaction history, and complete tasks to earn more credits.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Current Balance" value={currentCredits.toString()} />
                <StatCard title="This Month Usage" value="0" />
                <StatCard title="Total Earned" value={totalEarned.toString()} change={`+${totalEarned}`} changeType="gain" />
                <StatCard title="Total Spent" value={totalSpent.toString()} change={`-${totalSpent}`} changeType="loss" />
            </div>

            <div className="bg-red-100 border border-red-200 text-red-700 text-center p-4 rounded-2xl mb-8">
                Credit packs are only available for subscribers.
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4 text-[#33272a]">Transaction History</h2>
                <div className="bg-white border border-[#faeee7] rounded-2xl shadow-[0_8px_24px_rgba(89,74,78,0.08)]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-[#faeee7]">
                                <tr>
                                    <th className="p-4 text-sm font-semibold text-[#594a4e]">Type</th>
                                    <th className="p-4 text-sm font-semibold text-[#594a4e]">Description</th>
                                    <th className="p-4 text-sm font-semibold text-[#594a4e]">Amount</th>
                                    <th className="p-4 text-sm font-semibold text-[#594a4e]">Balance</th>
                                    <th className="p-4 text-sm font-semibold text-[#594a4e]">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx, index) => (
                                    <tr key={index} className="border-b border-[#faeee7] last:border-b-0">
                                        <td className="p-4">
                                            <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-md">
                                                {tx.type}
                                            </span>
                                        </td>
                                        <td className="p-4 text-[#33272a]">{tx.description}</td>
                                        <td className="p-4 font-medium text-green-600">{tx.amount}</td>
                                        <td className="p-4 text-[#594a4e]">{tx.balance}</td>
                                        <td className="p-4 text-[#594a4e]">{tx.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
import React, { useState } from 'react';

const PlanCard: React.FC<{ title: string, price: string, features: string[], isYearly: boolean, isRecommended?: boolean }> = ({ title, price, features, isYearly, isRecommended }) => (
    <div className={`relative border rounded-xl p-6 ${isRecommended ? 'border-purple-500' : 'border-gray-700'}`}>
        {isRecommended && <div className="absolute top-0 right-6 -mt-3 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</div>}
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-4xl font-bold mt-4">${price}<span className="text-lg font-medium text-gray-400">/month</span></p>
        {isYearly && isRecommended && <p className="text-sm text-green-400">Billed yearly</p>}
        <ul className="space-y-3 mt-6 text-gray-300">
            {features.map(feature => (
                <li key={feature} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <button className={`w-full mt-8 py-3 font-semibold rounded-lg transition-colors ${isRecommended ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'}`}>
            {isRecommended ? 'Upgrade Now' : 'Choose Plan'}
        </button>
    </div>
);

const PayAsYouGoCard: React.FC<{ points: number, price: number, description: string, tag?: string }> = ({ points, price, description, tag }) => (
    <div className="border border-[#faeee7] rounded-2xl p-6 flex justify-between items-center">
        <div>
            <h4 className="font-bold text-xl text-[#33272a]">{points} Credits {tag && <span className="text-sm font-medium text-[#ff8ba7]">({tag})</span>}</h4>
            <p className="text-[#594a4e] mt-1">{description}</p>
        </div>
        <div>
            <button className="px-6 py-3 font-semibold bg-[#faeee7] text-[#594a4e] border border-[#ffc6c7] rounded-2xl hover:bg-[#ffc6c7] hover:text-[#33272a]">${price.toFixed(2)}</button>
        </div>
    </div>
);

export const Billing: React.FC = () => {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-[#33272a]">Billing</h1>
            <p className="text-[#594a4e] mb-8 max-w-2xl">
                Choose a plan that works for you. You can upgrade, downgrade, or cancel at any time.
            </p>

            {/* Subscription Plans */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-2 text-[#33272a]">1. Subscription Plans</h2>
                <p className="text-[#594a4e] mb-6">"Subscriptions are the most cost-effective way to get credits."</p>

                <div className="w-full max-w-xs mx-auto mb-8">
                    <div className="relative flex p-1 bg-[#faeee7] rounded-2xl border border-[#ffc6c7]">
                        <button
                            onClick={() => setIsYearly(false)}
                            className={`w-1/2 py-2 text-sm font-semibold rounded-2xl relative z-10 transition-colors ${!isYearly ? 'text-[#33272a]' : 'text-[#594a4e] hover:text-[#33272a]'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsYearly(true)}
                            className={`w-1/2 py-2 text-sm font-semibold rounded-2xl relative z-10 transition-colors ${isYearly ? 'text-[#33272a]' : 'text-[#594a4e] hover:text-[#33272a]'}`}
                        >
                            Yearly
                        </button>
                        <div
                            className={`absolute top-1 bottom-1 bg-[#ff8ba7] rounded-2xl w-1/2 transition-transform duration-300 ease-in-out ${isYearly ? 'translate-x-full' : 'translate-x-0'}`}
                        />
                    </div>
                     {isYearly && <p className="text-center text-sm text-[#ff8ba7] mt-2">Save 33% with yearly billing!</p>}
                </div>

                <div className="overflow-x-auto bg-white p-6 rounded-2xl shadow-[0_8px_24px_rgba(89,74,78,0.08)]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 font-semibold text-lg border-b border-[#faeee7] text-[#33272a]">Feature</th>
                                <th className="p-4 font-semibold text-lg border-b border-[#faeee7] text-center text-[#33272a]">Free</th>
                                <th className="p-4 font-semibold text-lg border-b border-[#faeee7] text-center text-[#33272a]">Basic</th>
                                <th className="p-4 font-semibold text-lg border-b border-[#faeee7] text-center text-[#33272a]">Pro</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#594a4e]">
                             <tr className="border-b border-[#faeee7]">
                                <td className="p-4">Monthly Price</td>
                                <td className="p-4 text-center">$0</td>
                                <td className="p-4 text-center">{isYearly ? '$7.99' : '$9.99'} / month</td>
                                <td className="p-4 text-center">{isYearly ? '$19.99' : '$29.99'} / month</td>
                            </tr>
                            <tr className="border-b border-[#faeee7]">
                                <td className="p-4">Monthly Credits</td>
                                <td className="p-4 text-center">30 (one-time)</td>
                                <td className="p-4 text-center">600 credits</td>
                                <td className="p-4 text-center">2000 credits</td>
                            </tr>
                            <tr className="border-b border-[#faeee7]">
                                <td className="p-4">Generated Images</td>
                                <td className="p-4 text-center">10 images</td>
                                <td className="p-4 text-center">200 images / month</td>
                                <td className="p-4 text-center">~667 images / month</td>
                            </tr>
                            <tr className="border-b border-[#faeee7]">
                                <td className="p-4">Watermark</td>
                                <td className="p-4 text-center text-red-500">✓ With Watermark</td>
                                <td className="p-4 text-center text-green-500">✓ No Watermark</td>
                                <td className="p-4 text-center text-green-500">✓ No Watermark</td>
                            </tr>
                             <tr className="border-b border-[#faeee7]">
                                <td className="p-4">HD Download</td>
                                <td className="p-4 text-center text-red-500">✗ Disabled</td>
                                <td className="p-4 text-center text-green-500">✓ Allowed (6 credits)</td>
                                <td className="p-4 text-center text-green-500">✓ Allowed (6 credits)</td>
                            </tr>
                            <tr>
                                <td className="p-4"></td>
                                <td className="p-4 text-center"><button className="px-6 py-3 font-semibold text-sm rounded-2xl bg-white text-[#594a4e] border border-[#faeee7]">Current Plan</button></td>
                                <td className="p-4 text-center"><button className="px-6 py-3 font-semibold text-sm rounded-2xl bg-[#ff8ba7] text-[#33272a] hover:brightness-105">Upgrade</button></td>
                                <td className="p-4 text-center"><button className="px-6 py-3 font-semibold text-sm rounded-2xl bg-[#ff8ba7] text-[#33272a] hover:brightness-105">Upgrade</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            {/* Pay-as-you-go */}
            <div className="bg-white p-6 rounded-2xl shadow-[0_8px_24px_rgba(89,74,78,0.08)]">
                <h2 className="text-2xl font-semibold mb-2 text-[#33272a]">2. One-time Credit Packs (Pay-as-you-go)</h2>
                <p className="text-[#594a4e] mb-6">"Don't want a subscription? Buy credits as you need them. Credits never expire."</p>

                <div className="space-y-4">
                    <PayAsYouGoCard points={90} price={4.99} description="Generate 30 standard images or 15 HD images" tag="Taster pack" />
                    <PayAsYouGoCard points={300} price={14.99} description="Generate 100 standard images or 50 HD images" tag="Standard pack" />
                    <PayAsYouGoCard points={900} price={39.99} description="Generate 300 standard images or 150 HD images" tag="Family pack" />
                </div>
            </div>
        </div>
    );
};
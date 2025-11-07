import React, { useState } from 'react';

const PayAsYouGoCard: React.FC<{ points: number, price: number, description: string, tag?: string }> = ({ points, price, description, tag }) => (
    <div className="border border-gray-700 rounded-xl p-6 flex justify-between items-center text-left">
        <div>
            <h4 className="font-bold text-xl">{points} Credits {tag && <span className="text-sm font-medium text-purple-400">({tag})</span>}</h4>
            <p className="text-gray-400 mt-1">{description}</p>
        </div>
        <div>
            <button className="px-6 py-2 font-semibold bg-gray-700 hover:bg-gray-600 rounded-lg">${price.toFixed(2)}</button>
        </div>
    </div>
);

export const PricingSection: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div id="pricing" className="py-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold mb-4">Pricing Plans</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                    Choose a plan that works for you. Start for free with 30 credits, no credit card required.
                </p>
            </div>
            
            {/* Subscription Plans */}
            <div className="mb-16">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">Subscription Plans</h2>
                    <p className="text-gray-400">Subscriptions are the most cost-effective way to get credits.</p>
                </div>

                <div className="w-full max-w-xs mx-auto mb-8">
                    <div className="relative flex p-1 bg-gray-800 rounded-full">
                        <button
                            onClick={() => setIsYearly(false)}
                            className={`w-1/2 py-2 text-sm font-semibold rounded-full relative z-10 transition-colors ${!isYearly ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsYearly(true)}
                            className={`w-1/2 py-2 text-sm font-semibold rounded-full relative z-10 transition-colors ${isYearly ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            Yearly
                        </button>
                        <div
                            className={`absolute top-1 bottom-1 bg-purple-600 rounded-full w-1/2 transition-transform duration-300 ease-in-out ${isYearly ? 'translate-x-full' : 'translate-x-0'}`}
                        />
                    </div>
                     {isYearly && <p className="text-center text-sm text-purple-400 mt-2">Save 33% with yearly billing!</p>}
                </div>
                
                <div className="overflow-x-auto bg-[#1C1C21] border border-gray-700/50 rounded-2xl p-4 md:p-8">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr>
                                <th className="p-4 font-semibold text-lg border-b border-gray-700">Feature</th>
                                <th className="p-4 font-semibold text-lg border-b border-gray-700 text-center">Free</th>
                                <th className="p-4 font-semibold text-lg border-b border-gray-700 text-center">Basic</th>
                                <th className="p-4 font-semibold text-lg border-b border-gray-700 text-center">Pro</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-300">
                             <tr className="border-b border-gray-800">
                                <td className="p-4">Monthly Price</td>
                                <td className="p-4 text-center">$0</td>
                                <td className="p-4 text-center">{isYearly ? '$7.99' : '$9.99'} / month</td>
                                <td className="p-4 text-center">{isYearly ? '$19.99' : '$29.99'} / month</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="p-4">Monthly Credits</td>
                                <td className="p-4 text-center">30 (one-time)</td>
                                <td className="p-4 text-center">600 credits</td>
                                <td className="p-4 text-center">2000 credits</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="p-4">Generated Images</td>
                                <td className="p-4 text-center">10 images</td>
                                <td className="p-4 text-center">200 images / month</td>
                                <td className="p-4 text-center">~667 images / month</td>
                            </tr>
                            <tr className="border-b border-gray-800">
                                <td className="p-4">Watermark</td>
                                <td className="p-4 text-center text-red-400">✓ With Watermark</td>
                                <td className="p-4 text-center text-green-400">✓ No Watermark</td>
                                <td className="p-4 text-center text-green-400">✓ No Watermark</td>
                            </tr>
                             <tr className="border-b border-gray-800">
                                <td className="p-4">HD Download</td>
                                <td className="p-4 text-center">✗ Disabled</td>
                                <td className="p-4 text-center text-green-400">✓ Allowed (6 credits)</td>
                                <td className="p-4 text-center text-green-400">✓ Allowed (6 credits)</td>
                            </tr>
                            <tr>
                                <td className="p-4"></td>
                                <td className="p-4 text-center"><button onClick={onGetStarted} className="px-6 py-2 font-semibold text-sm rounded-lg bg-gray-700 hover:bg-gray-600">Get Started</button></td>
                                <td className="p-4 text-center"><button onClick={onGetStarted} className="px-6 py-2 font-semibold text-sm rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90">Upgrade</button></td>
                                <td className="p-4 text-center"><button onClick={onGetStarted} className="px-6 py-2 font-semibold text-sm rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90">Upgrade</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pay-as-you-go */}
            <div className="bg-[#1C1C21] border border-gray-700/50 rounded-2xl p-4 md:p-8">
                <h2 className="text-2xl font-semibold mb-2 text-left">One-time Credit Packs (Pay-as-you-go)</h2>
                <p className="text-gray-400 mb-6 text-left">"Don't want a subscription? Buy credits as you need them. Credits never expire."</p>

                <div className="space-y-4">
                    <PayAsYouGoCard points={90} price={4.99} description="Generate 30 standard images or 15 HD images" tag="Taster pack" />
                    <PayAsYouGoCard points={300} price={14.99} description="Generate 100 standard images or 50 HD images" tag="Standard pack" />
                    <PayAsYouGoCard points={900} price={39.99} description="Generate 300 standard images or 150 HD images" tag="Family pack" />
                </div>
            </div>
        </div>
    );
};
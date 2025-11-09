import React, { useState } from 'react';

const PayAsYouGoCard: React.FC<{ points: number, price: number, description: string, tag?: string }> = ({ points, price, description, tag }) => (
    <div className="border border-[#faeee7] rounded-2xl p-6 flex justify-between items-center text-left">
        <div>
            <h4 className="font-bold text-xl text-[#33272a]">{points} Credits {tag && <span className="text-sm font-medium text-[#ff8ba7]">({tag})</span>}</h4>
            <p className="text-[#594a4e] mt-1">{description}</p>
        </div>
        <div>
            <button className="px-6 py-3 font-semibold bg-[#faeee7] text-[#594a4e] border border-[#ffc6c7] rounded-2xl hover:bg-[#ffc6c7] hover:text-[#33272a]">${price.toFixed(2)}</button>
        </div>
    </div>
);

export const PricingSection: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
    const [isYearly, setIsYearly] = useState(true);

    return (
        <div id="pricing-section" className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold mb-4 text-[#33272a]">Pricing Plans</h2>
                    <p className="text-lg text-[#594a4e] max-w-3xl mx-auto">
                        Choose a plan that works for you. Start for free with 30 credits, no credit card required.
                    </p>
                </div>
                
                <div className="mb-16">
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
                    
                    <div className="overflow-x-auto bg-white rounded-2xl p-6 md:p-8 shadow-[0_8px_24px_rgba(89,74,78,0.08)]">
                        <table className="w-full text-left border-collapse min-w-[700px]">
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
                                    <td className="p-4 text-center text-2xl font-bold text-[#33272a]">$0</td>
                                    <td className="p-4 text-center text-2xl font-bold text-[#33272a]">{isYearly ? '$7.99' : '$9.99'}</td>
                                    <td className="p-4 text-center text-2xl font-bold text-[#33272a]">{isYearly ? '$19.99' : '$29.99'}</td>
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
                                    <td className="p-4 text-center text-red-500">With Watermark</td>
                                    <td className="p-4 text-center text-green-500">No Watermark</td>
                                    <td className="p-4 text-center text-green-500">No Watermark</td>
                                </tr>
                                <tr>
                                    <td className="p-4"></td>
                                    <td className="p-4 text-center"><button onClick={onGetStarted} className="px-6 py-3 font-semibold text-sm rounded-2xl bg-[#faeee7] text-[#594a4e] border border-[#ffc6c7] hover:bg-[#ffc6c7] hover:text-[#33272a]">Get Started</button></td>
                                    <td className="p-4 text-center"><button onClick={onGetStarted} className="px-6 py-3 font-semibold text-sm rounded-2xl bg-[#ff8ba7] text-[#33272a] hover:brightness-105">Upgrade</button></td>
                                    <td className="p-4 text-center"><button onClick={onGetStarted} className="px-6 py-3 font-semibold text-sm rounded-2xl bg-[#ff8ba7] text-[#33272a] hover:brightness-105">Upgrade</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_8px_24px_rgba(89,74,78,0.08)]">
                    <h2 className="text-2xl font-semibold mb-2 text-left text-[#33272a]">One-time Credit Packs</h2>
                    <p className="text-[#594a4e] mb-6 text-left">Don't want a subscription? Buy credits as you need them. Credits never expire.</p>

                    <div className="space-y-4">
                        <PayAsYouGoCard points={90} price={4.99} description="Generate 30 standard images" tag="Taster pack" />
                        <PayAsYouGoCard points={300} price={14.99} description="Generate 100 standard images" tag="Standard pack" />
                        <PayAsYouGoCard points={900} price={39.99} description="Generate 300 standard images" tag="Family pack" />
                    </div>
                </div>
            </div>
        </div>
    );
};
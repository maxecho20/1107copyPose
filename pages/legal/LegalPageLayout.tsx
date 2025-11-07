import React from 'react';

interface LegalPageLayoutProps {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, effectiveDate, children }) => {
  return (
    <div className="bg-[#faeee7]">
        <div className="container mx-auto px-4 pt-28 pb-12 text-[#594a4e]">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-[0_8px_24px_rgba(89,74,78,0.08)]">
                <h1 className="text-3xl md:text-4xl font-bold text-[#33272a] mb-2 text-center">{title}</h1>
                <p className="text-center text-[#594a4e]/70 mb-8">Effective Date: {effectiveDate}</p>
                <div className="prose prose-p:text-[#594a4e] prose-headings:text-[#33272a] prose-strong:text-[#33272a] max-w-none prose-a:text-[#ff8ba7] hover:prose-a:underline">
                {children}
                </div>
            </div>
        </div>
    </div>
  );
};
import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';
import { legalContent } from './LegalContent';

export type LegalPageType = keyof typeof legalContent;

interface LegalPageProps {
  type: LegalPageType;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const { title, effectiveDate, content } = legalContent[type];

  return (
    <LegalPageLayout title={title} effectiveDate={effectiveDate}>
      {content}
    </LegalPageLayout>
  );
};

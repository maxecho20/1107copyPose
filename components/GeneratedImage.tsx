import React from 'react';
import { SparkleIcon, ExclamationIcon, DownloadIcon, RedoIcon, ShareIcon } from './icons';

interface GeneratedImageProps {
  image: string | null;
  isLoading: boolean;
  loadingStep: string;
  poseDescription: string | null;
  error: string | null;
  onDownload: () => void;
  onShare: () => void;
  onRegenerate: () => void;
}

const LoadingState: React.FC<{step: string}> = ({ step }) => (
    <div className="flex flex-col items-center justify-center text-center text-[#594a4e] space-y-3 w-full">
      <SparkleIcon className="h-12 w-12 text-[#ff8ba7] animate-spin" style={{ animationDuration: '3s' }}/>
      <p className="font-semibold text-[#33272a]">{step}</p>
      <p className="text-sm mt-2">This can take a moment. Please wait.</p>
    </div>
  );

const InitialState: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center text-[#594a4e] h-full p-8">
    <h3 className="text-xl font-bold text-[#33272a] max-w-xs leading-snug">
       Your creation will appear here
    </h3>
  </div>
);

const ErrorState: React.FC<{ error: string }> = ({ error }) => (
    <div className="flex flex-col items-center justify-center text-center text-red-500 space-y-3 p-4">
        <ExclamationIcon className="h-12 w-12" />
        <p className="font-semibold">An Error Occurred</p>
        <p className="text-sm max-w-sm">{error}</p>
    </div>
);

const ActionButtons: React.FC<{ onDownload: () => void; onShare: () => void; onRegenerate: () => void; }> = ({ onDownload, onShare, onRegenerate }) => {
    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center items-center">
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-lg p-3 rounded-2xl border border-white/20 shadow-lg">
                 <button 
                    onClick={onDownload} 
                    className="flex items-center gap-2 px-7 py-4 text-sm font-semibold bg-[#faeee7] text-[#594a4e] border border-[#ffc6c7] rounded-2xl hover:bg-[#ffc6c7] hover:text-[#33272a]" 
                    aria-label="Download image"
                >
                    <DownloadIcon className="h-5 w-5" />
                    <span>Download</span>
                </button>
                 <button 
                    onClick={onShare} 
                    className="p-4 text-sm font-semibold bg-[#faeee7] text-[#594a4e] border border-[#ffc6c7] rounded-2xl hover:bg-[#ffc6c7] hover:text-[#33272a]" 
                    aria-label="Share image"
                 >
                    <ShareIcon className="h-5 w-5" />
                </button>
                 <button 
                    onClick={onRegenerate} 
                    className="p-4 text-sm font-semibold bg-[#faeee7] text-[#594a4e] border border-[#ffc6c7] rounded-2xl hover:bg-[#ffc6c7] hover:text-[#33272a]" 
                    aria-label="Regenerate image"
                 >
                    <RedoIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};


export const GeneratedImage: React.FC<GeneratedImageProps> = ({ image, isLoading, loadingStep, error, onDownload, onShare, onRegenerate }) => {
  return (
    <div className="relative w-full h-full bg-white rounded-2xl flex items-center justify-center p-6 shadow-[0_8px_24px_rgba(89,74,78,0.08)] overflow-hidden">
      {isLoading ? <LoadingState step={loadingStep} /> :
       error ? <ErrorState error={error} /> :
       image ? (
        <>
            <img src={image} alt="Generated" className="w-full h-full object-contain rounded-2xl" />
            <ActionButtons onDownload={onDownload} onShare={onShare} onRegenerate={onRegenerate} />
        </>
       ) :
       <InitialState />
      }
    </div>
  );
};
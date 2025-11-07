import React from 'react';

interface HistoryPanelProps {
  history: string[];
  onSelect: (image: string) => void;
  currentImage: string | null;
}

const DEFAULT_HISTORY_IMAGES = [
  'https://storage.googleapis.com/pose-shift-app-assets/Homepage-Image/H0%20(1).png',
  'https://storage.googleapis.com/pose-shift-app-assets/Homepage-Image/H0%20(10).png',
  'https://storage.googleapis.com/pose-shift-app-assets/Homepage-Image/H0%20(13).png',
  'https://storage.googleapis.com/pose-shift-app-assets/Homepage-Image/H0%20(2).png',
  'https://storage.googleapis.com/pose-shift-app-assets/Homepage-Image/H0%20(3).png',
];

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, currentImage }) => {
  const imagesToDisplay = [
    ...history,
    ...DEFAULT_HISTORY_IMAGES.slice(history.length)
  ].slice(0, 5);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <span className="w-1 h-6 bg-purple-500 mr-3"></span>
        Generation History
      </h3>
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
        {imagesToDisplay.map((histImage, index) => (
          <div
            key={`${histImage}-${index}`}
            className={`flex-shrink-0 w-24 aspect-[9/14] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 ${
              currentImage === histImage ? 'ring-2 ring-offset-2 ring-offset-gray-900 ring-purple-500 shadow-lg' : 'ring-1 ring-gray-700'
            }`}
            onClick={() => onSelect(histImage)}
            aria-label={`Select generated image ${index + 1} from history`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(histImage) }}
          >
            <img src={histImage} alt={`History ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};
import React, { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { fileToBase64 } from '../utils/fileUtils';
import { PlusIcon } from './icons';
import { POSE_CATEGORIES, type PoseTemplate } from '../constants';

const PoseUploader: React.FC<{ onUpload: (base64: string) => void }> = ({ onUpload }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const base64 = await fileToBase64(file);
            onUpload(base64);
        }
    }, [onUpload]);
    
    const onAreaClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
          className="relative w-full aspect-[4/5] cursor-pointer rounded-lg overflow-hidden bg-gray-800/50 border-2 border-dashed border-gray-600 flex flex-col items-center justify-center text-gray-400 hover:border-purple-500 hover:text-purple-500 transition-colors"
          onClick={onAreaClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />
          <PlusIcon className="h-8 w-8 mb-1" />
          <span className="text-xs font-semibold text-center">Upload Pose</span>
        </div>
    );
};

const PosePreview: React.FC<{ poseData: { url: string; rect: DOMRect } }> = ({ poseData }) => {
    const { url, rect } = poseData;
    const scaleFactor = 1.25;
    const previewWidth = rect.width * scaleFactor;
    const previewHeight = rect.height * scaleFactor;
    const gap = 16; 

    const top = rect.top + (rect.height / 2) - (previewHeight / 2);
    let left = rect.right + gap;

    if (left + previewWidth > window.innerWidth) {
        left = rect.left - previewWidth - gap;
    }
    
    const clampedTop = Math.max(gap, Math.min(top, window.innerHeight - previewHeight - gap));

    const style: React.CSSProperties = {
        position: 'fixed',
        top: `${clampedTop}px`,
        left: `${left}px`,
        width: `${previewWidth}px`,
        height: `${previewHeight}px`,
        zIndex: 50,
        pointerEvents: 'none',
        transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
    };
    
    // For pexels images, request a higher resolution for the preview
    const previewUrl = url.includes('pexels.com') 
        ? url.replace('&w=200&h=320', `&w=400&h=640`) 
        : url;

    return (
        <div style={style} className="shadow-2xl rounded-lg overflow-hidden border-2 border-purple-500">
             <img src={previewUrl} alt="Pose preview" className="w-full h-full object-cover" />
        </div>
    );
};


interface PoseGalleryProps {
  poses: PoseTemplate[];
  selectedPose: string | null;
  onSelectPose: (url: string) => void;
  customPoses: string[];
  onPoseUpload: (base64: string) => void;
}

export const PoseGallery: React.FC<PoseGalleryProps> = ({ poses, selectedPose, onSelectPose, customPoses, onPoseUpload }) => {
  const [activeCategory, setActiveCategory] = useState('NEW');
  const [hoveredPose, setHoveredPose] = useState<{ url: string; rect: DOMRect } | null>(null);

  const displayedPoses = poses.filter(p => p.category === activeCategory);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, url: string) => {
    setHoveredPose({ url, rect: e.currentTarget.getBoundingClientRect() });
  };
  
  const handleMouseLeave = () => {
    setHoveredPose(null);
  };
  
  return (
    <div className="flex flex-col gap-4">
        {hoveredPose && createPortal(<PosePreview poseData={hoveredPose} />, document.body)}
        <div className="flex flex-wrap gap-2">
            {POSE_CATEGORIES.map(category => (
                <button 
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                        activeCategory === category 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
        <div className="h-[38rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <PoseUploader onUpload={onPoseUpload} />

                {customPoses.map((pose, index) => (
                    <div
                        key={`custom-${index}`}
                        className={`relative w-full aspect-[4/5] cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ease-in-out transform hover:scale-105 ${
                            selectedPose === pose ? 'ring-2 ring-offset-2 ring-offset-gray-900 ring-purple-500 shadow-lg' : 'ring-1 ring-gray-700'
                        }`}
                        onClick={() => onSelectPose(pose)}
                        onMouseEnter={(e) => handleMouseEnter(e, pose)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={pose} alt={`Custom Pose ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors"></div>
                        <div className="absolute top-1 right-1 bg-purple-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">CUSTOM</div>
                    </div>
                ))}

                {displayedPoses.map((pose) => (
                    <div
                    key={pose.url}
                    className={`relative w-full aspect-[4/5] cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ease-in-out transform hover:scale-105 ${
                        selectedPose === pose.url ? 'ring-2 ring-offset-2 ring-offset-gray-900 ring-purple-500 shadow-lg' : 'ring-1 ring-gray-700'
                    }`}
                    onClick={() => onSelectPose(pose.url)}
                    onMouseEnter={(e) => handleMouseEnter(e, pose.url)}
                    onMouseLeave={handleMouseLeave}
                    >
                    <img src={pose.url} alt={pose.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors"></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};
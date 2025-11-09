import React, { useCallback, useRef, useState } from 'react';
import { fileToBase64 } from '../utils/fileUtils';
import { PlusIcon } from '../components/icons';
import { POSE_CATEGORIES, POSE_TEMPLATES } from '../constants';
import { Footer } from '../components/Footer';
import { Page } from '../App';

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
          className="group relative w-full aspect-[9/14] cursor-pointer rounded-2xl overflow-hidden bg-white/50 border-2 border-dashed border-[#ffc6c7] flex flex-col items-center justify-center text-[#594a4e] hover:border-[#ff8ba7] hover:text-[#ff8ba7] transition-colors"
          style={{ breakInside: 'avoid', marginBottom: '1rem' }}
          onClick={onAreaClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />
          <PlusIcon className="h-10 w-10 mb-2 transition-transform group-hover:scale-110" />
          <div className="text-center leading-[1.4] text-sm font-semibold">
            <p>Upload Your Favorite Pose</p>
            <p>Reference Images</p>
          </div>
        </div>
    );
};

interface TemplatesPageProps {
  onSelectPose: (url: string) => void;
  onContactClick: () => void;
  navigate: (page: Page, anchorId?: string) => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ onSelectPose, onContactClick, navigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPoses = POSE_TEMPLATES.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="pt-24 md:pt-32 bg-[#faeee7]">
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold mb-4 text-[#33272a]">Pose Template Library</h1>
                <p className="text-lg text-[#594a4e] max-w-3xl mx-auto">
                    Explore our vast collection of poses. Find the perfect one for your creation or upload your own.
                </p>
            </div>

            <div className="sticky top-20 z-30 bg-[#faeee7]/80 backdrop-blur-lg py-4 mb-8 -mx-4 px-4 border-y border-[#ffc6c7]/50">
                <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center">
                    <div className="w-full md:w-auto flex-shrink-0">
                         <input
                            type="search"
                            placeholder="Search poses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-64 bg-white border border-[#ffc6c7] rounded-2xl px-4 py-2 text-[#33272a] placeholder-[#594a4e]/60 focus:ring-2 focus:ring-[#ff8ba7] focus:border-[#ff8ba7] focus:outline-none transition"
                        />
                    </div>
                    <div className="w-full overflow-x-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 pb-2">
                        <div className="flex gap-2 items-center">
                            {['All', ...POSE_CATEGORIES].map(category => (
                                <button 
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 text-sm font-medium rounded-2xl transition-colors flex-shrink-0 ${
                                        activeCategory === category 
                                        ? 'bg-[#ff8ba7] text-[#33272a]' 
                                        : 'bg-white text-[#594a4e] border border-[#faeee7] hover:bg-[#faeee7]'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4">
                <PoseUploader onUpload={onSelectPose} />
                {filteredPoses.map((pose) => (
                    <div
                        key={pose.url}
                        className="group relative w-full cursor-pointer rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:shadow-[#ff8ba7]/20 mb-4"
                        style={{ breakInside: 'avoid' }}
                        onClick={() => onSelectPose(pose.url)}
                    >
                        <img src={pose.url} alt={pose.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                            <span className="bg-white text-black text-sm font-bold px-6 py-2 rounded-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">Use this Pose</span>
                        </div>
                         <div className="absolute top-2 right-2 bg-black/40 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm font-semibold">{pose.category}</div>
                    </div>
                ))}
            </div>
        </div>
        <Footer onContactClick={onContactClick} navigate={navigate} />
    </div>
  );
};
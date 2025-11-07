import React, { useState } from 'react';
import { POSE_TEMPLATES } from '../constants';

interface FeaturedPosesProps {
    selectedPose: string | null;
    onSelectPose: (url: string) => void;
    onViewMore: () => void;
}

export const FeaturedPoses: React.FC<FeaturedPosesProps> = ({ selectedPose, onSelectPose, onViewMore }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    
    const homepageCategories = ['All', 'New', 'Hot', 'Fun'];
    
    const homepagePoses = activeCategory === 'All' 
        ? POSE_TEMPLATES.slice(0, 8) 
        : POSE_TEMPLATES.filter(p => p.category === activeCategory).slice(0, 8);

    return (
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 flex flex-col relative overflow-hidden shadow-[0_8px_24px_rgba(89,74,78,0.08)]">
            <h3 className="text-lg font-bold text-[#33272a] mb-4 px-2">Choose a Pose</h3>
            <div className="flex items-center gap-2 mb-4 flex-wrap px-1">
                {homepageCategories.map(cat => (
                    <button 
                        key={cat} 
                        onClick={() => setActiveCategory(cat)} 
                        className={`px-4 py-2 text-xs font-semibold rounded-2xl ${activeCategory === cat ? 'bg-[#ff8ba7] text-[#33272a]' : 'bg-white text-[#594a4e] border border-[#faeee7] hover:bg-[#faeee7]'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4 flex-grow">
                {homepagePoses.map(pose => (
                     <div 
                        key={pose.url} 
                        className="relative group aspect-[4/5] cursor-pointer" 
                        onClick={() => onSelectPose(pose.url)}
                     >
                        <img 
                            src={pose.url} 
                            alt={pose.name} 
                            className={`w-full h-full object-cover rounded-2xl transition-all duration-200 border-2 ${selectedPose === pose.url ? 'border-[#ff8ba7]' : 'border-transparent group-hover:border-[#ff8ba7]/50'}`} 
                        />
                         {selectedPose === pose.url && (
                            <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent flex items-end justify-center rounded-2xl p-2">
                                <span className="text-[#33272a] font-semibold text-sm">Selected</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="mt-auto pt-6 flex justify-center">
                 <button 
                    onClick={onViewMore} 
                    className="bg-[#faeee7] border border-[#ffc6c7] text-[#594a4e] px-10 py-4 rounded-2xl text-sm font-semibold hover:bg-[#ffc6c7] hover:text-[#33272a]"
                >
                    View More
                </button>
            </div>
        </div>
    );
};
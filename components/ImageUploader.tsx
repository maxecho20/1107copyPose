import React, { useCallback, useRef } from 'react';
import { fileToBase64 } from '../utils/fileUtils';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (base64: string) => void;
  image: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, image }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      onImageUpload(base64);
    }
  }, [onImageUpload]);

  const onAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="w-full flex-grow bg-[#2F2F37]/50 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center p-4 cursor-pointer hover:border-purple-500 transition-colors"
      onClick={onAreaClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />
      {image ? (
        <img src={image} alt="Uploaded" className="max-w-full max-h-full object-contain rounded-md" />
      ) : (
        <div className="text-center text-gray-400">
          <UploadIcon className="mx-auto h-10 w-10 text-gray-500 mb-4" />
          <p className="font-semibold text-gray-300">Drag or click to upload a real person try-on</p>
          <p className="text-xs mt-2 text-gray-500">Supports sets, max 10 photos, under 20M, jpg/jpeg/png/webp</p>
        </div>
      )}
    </div>
  );
};

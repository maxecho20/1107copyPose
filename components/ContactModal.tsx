import React from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from './icons';

interface ContactModalProps {
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-[0_12px_32px_rgba(89,74,78,0.15)]" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[#594a4e] hover:text-[#33272a] transition-colors" aria-label="Close modal">
          <CloseIcon className="h-6 w-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-center mb-2 text-[#33272a]">Contact Us</h2>
        <p className="text-[#594a4e] text-center mb-6">Have questions or feedback? We'd love to hear from you.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#594a4e] mb-1">Email</label>
            <a href="mailto:mossecho@aliyun.com" className="w-full bg-[#faeee7] border border-[#ffc6c7] rounded-2xl px-4 py-3 text-[#ff8ba7] hover:underline block">
                mossecho@aliyun.com
            </a>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#594a4e] mb-1">X (Twitter)</label>
             <p className="w-full bg-white border border-[#faeee7] rounded-2xl px-4 py-3 text-[#594a4e]/60">
                Coming Soon
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#594a4e] mb-1">Discord</label>
            <p className="w-full bg-white border border-[#faeee7] rounded-2xl px-4 py-3 text-[#594a4e]/60">
                Coming Soon
            </p>
          </div>
        </div>
      </div>
    </div>
  , document.body);
};
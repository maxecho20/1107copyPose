import React, { useState } from 'react';
import { ChevronDownIcon } from './icons';

interface FaqItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

// FIX: Corrected typo from FqItemProps to FaqItemProps.
const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-gray-100 last:border-b-0">
    <button
      className="flex justify-between items-center w-full text-left py-5 px-6"
      onClick={onClick}
      aria-expanded={isOpen}
    >
      <span className="text-lg font-medium text-[#33272a]">{question}</span>
      <ChevronDownIcon
        className={`w-6 h-6 text-[#594a4e] transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <div
      className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
    >
      <div className="overflow-hidden">
        <div className="text-[#594a4e] pb-5 px-6 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  </div>
);

export const Faq: React.FC<{ onContactClick: () => void }> = ({ onContactClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How does PoseShift \"rescue\" my photos?",
      answer: (
          <p>It's a simple, powerful process. You upload one of your photos—like that great travel shot with the awkward pose. Then, you select a new, natural pose from our library. Our AI intelligently adapts your original subject to the new pose, all while keeping your face, your clothes, and your background 100% untouched. It’s no longer a 'ruined' photo; it's a rescued memory.</p>
      )
    },
    {
      question: "Is this just another AI face-swap tool?",
      answer: (
          <p>Absolutely not. This is what makes us different. Face-swap tools put your face on someone else's body, creating a 'fake' image that isn't connected to you. PoseShift works with your real photo. We keep your face, your clothes, and your original background perfectly intact. We only change the pose, giving you a photo that is still 100% authentically yours.</p>
      )
    },
    {
      question: "Are the poses natural, or are they all high-fashion?",
      answer: (
        <p>Our library is built for real life. While you can find creative and dynamic poses, our primary focus is on the natural, casual, and candid styles you'd actually use. Think 'relaxing at a cafe,' 'walking on the beach,' or 'a natural, happy party stance'—not 'supermodel high-fashion.' We want to make your photos look believably better, not artificially different.</p>
      )
    },
    {
      question: "What kind of photos work best?",
      answer: (
        <p>PoseShift works best on those 'almost perfect' shots you want to rescue! Think travel photos, group shots, or 'outfit of the day' pictures where you looked stiff or awkward. For the best technical results, use a clear, high-quality photo where the subject (you) is fully visible. Full-body or half-body shots are ideal. Clear lighting also helps our AI work its magic.</p>
      )
    },
    {
      question: "Can I use the generated images commercially?",
      answer: (
        <p>As long as the photo you upload is of yourself, you own all rights to the images you generate. If you upload a photo of someone else, the copyright for the generated image belongs to that person.</p>
      )
    },
    {
      question: "How does PoseShift protect my privacy?",
      answer: "Your privacy is our top priority. Your original photos and generated images are your own. We process them securely using encryption. We will never use your personal photos to train our AI models without your explicit, opt-in permission, and we do not sell your data to third parties. You are in full control of your memories.",
    }
  ];

  return (
    <div id="faq" className="py-20">
      <div className="text-center mb-12">
        <span className="bg-white text-[#ff8ba7] text-sm font-medium px-4 py-1 rounded-full">FAQ</span>
        <h2 className="text-4xl font-extrabold mt-4 mb-4 text-[#33272a]">Your Questions, Answered</h2>
        <p className="text-lg text-[#594a4e] max-w-3xl mx-auto">
          Have another question? <a href="#" onClick={(e) => { e.preventDefault(); onContactClick(); }} className="text-[#ff8ba7] hover:underline">Contact us</a>.
        </p>
      </div>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-[0_8px_24px_rgba(89,74,78,0.08)]">
        {faqData.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';

const steps = [
  "Step 1: Select a pose image",
  "Step 2: Upload a portrait image",
  "Step 3: Generate your pose image",
];

const stepImages = [
  'https://storage.googleapis.com/pose-shift-app-assets/Homepage-Image/H0%20(2).jpg',
  'https://storage.googleapis.com/pose-shift-app-assets/Homepage-Image/H0%20(3).png',
  'https://storage.googleapis.com/pose-shift-app-assets/Homepage-Image/H0%20(13).png',
];

export const StepCarousel: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center space-x-2 md:space-x-4 mb-12">
      {steps.map((title, index) => (
        <React.Fragment key={title}>
          <div className="flex flex-col items-center gap-3">
            <div
              className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-700 ease-in-out whitespace-nowrap ${
                currentStep === index
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              {title}
            </div>
            <div className={`w-32 h-40 md:w-40 md:h-52 bg-gray-900 rounded-lg overflow-hidden transition-all duration-500 ring-2 ${currentStep === index ? 'ring-purple-500' : 'ring-gray-700/50'}`}>
                <img
                    src={stepImages[index]}
                    alt={title}
                    className="w-full h-full object-cover object-center"
                />
            </div>
          </div>
          {index === 0 && (
             <div className="text-4xl font-light text-gray-500 pt-8">+</div>
          )}
           {index === 1 && (
             <div className="text-4xl font-light text-purple-400 pt-8">&#10142;</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
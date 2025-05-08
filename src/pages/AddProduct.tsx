import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react'; 
import DescriptionForm from '../steps/descriptionForm';
import VariantsForm from '../steps/variantsForm';

const steps: string[] = ['Description', 'Variants', 'Combinations', 'Price Info'];

const AddProduct: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const navigate = useNavigate();
  const isLastStep = currentStep === steps.length - 1;
  const [variantErrors, setVariantErrors] = useState(false);


  return (
    <div className="p-6">
      
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-black font-worksans">Add Product</h1>
        <div className="flex gap-4">
          <button
            onClick={() =>
              currentStep === 0 ? navigate(-1) : setCurrentStep(currentStep - 1)
            }
            className="bg-light-gray text-brand-blue px-7 py-3 rounded-lg font-semibold font-worksans"
          >
            {currentStep === 0 ? 'Cancel' : 'Back'}
          </button>
          <button
            onClick={() => {
              if (isLastStep) {
                console.log('Submit form');
              } else {
                setCurrentStep(currentStep + 1);
              }
            }}
            className="bg-brand-blue text-white px-7 py-3 rounded-lg font-semibold font-worksans"
          >
            {isLastStep ? 'Confirm' : 'Next'}
          </button>
        </div>
      </div>

      
      <div className="flex items-center text-sm font-medium mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <span
              className={`${
                index <= currentStep ? 'text-brand-blue px-2 py-1 bg-soft-blue rounded-lg' : 'text-gray-400'
              }`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <ChevronRight className="mx-4 h-4 w-4 text-medium-gray" />
            )}
          </div>
        ))}
      </div>

     
      <div className="bg-white border rounded-xl p-6 w-1/3 shadow-lg ">
        <h2 className="text-base font-semibold text-black mb-4">
          {steps[currentStep]}
        </h2>
        {currentStep ===0 && <DescriptionForm/>}
        {currentStep ===1 && <VariantsForm/>}
      </div>
    </div>
  );
};

export default AddProduct;

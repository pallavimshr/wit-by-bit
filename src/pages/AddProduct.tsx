import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { resetForm } from "../store/slices/formSlice";
import DescriptionForm from "../steps/descriptionForm";
import VariantsForm from "../steps/variantsForm";
import CombinationForm from "../steps/combinationForm";
import PriceInfoForm from "../steps/priceInfoForm";
import { addProduct } from "../store/slices/productSlice";

const steps = ["Description", "Variants", "Combinations", "Price Info"];

const AddProduct: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const isLastStep = currentStep === steps.length - 1;

  const [variantErrors, setVariantErrors] = useState(false);
  const [comboErrors, setComboErrors] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.form.product);

  const handleNext = () => {
    if (currentStep === 0) {
      if (
        !product.name.trim() ||
        !product.category.trim() ||
        !product.brand.trim()
      ) {
        alert(
          "Please fill in all required fields: Product Name, Category, and Brand.",
        );
        return;
      }
    }

    if (currentStep === 1) {
      const hasInvalid = product.variants.some(
        (variant) => !variant.name.trim() || variant.values.length === 0,
      );
      if (hasInvalid) {
        setVariantErrors(true);
        return;
      } else {
        setVariantErrors(false);
      }
    }

    if (currentStep === 2) {
      const skus = Object.values(product.combinations).map((c) =>
        c.sku.trim().toLowerCase(),
      );
      const hasEmpty = skus.some((sku) => !sku);
      const hasDuplicates = skus.some(
        (sku, idx) => sku && skus.indexOf(sku) !== idx,
      );

      if (hasEmpty || hasDuplicates) {
        setComboErrors(true);
        return;
      } else {
        setComboErrors(false);
      }
    }

    if (currentStep === 3) {
      if (!product.priceInr) {
        setPriceError(true);
        return;
      } else {
        setPriceError(false);
      }

      dispatch(addProduct(product));
      dispatch(resetForm());
      navigate("/products");
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-black font-worksans">
          Add Product
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() =>
              currentStep === 0
                ? navigate(-1)
                : setCurrentStep((prev) => prev - 1)
            }
            className="bg-light-gray text-brand-blue px-7 py-3 rounded-lg font-semibold font-worksans"
          >
            {currentStep === 0 ? "Cancel" : "Back"}
          </button>
          <button
            onClick={handleNext}
            className="bg-brand-blue text-white px-7 py-3 rounded-lg font-semibold font-worksans"
          >
            {isLastStep ? "Confirm" : "Next"}
          </button>
        </div>
      </div>

      <div className="flex items-center text-sm font-medium mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <span
              className={`${
                index <= currentStep
                  ? "text-brand-blue px-2 py-1 bg-soft-blue rounded-lg"
                  : "text-gray-400"
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

      <div className="bg-white border rounded-xl p-6 w-1/2 shadow-lg">
        <h2 className="text-base font-semibold text-black mb-4">
          {steps[currentStep]}
        </h2>
        {currentStep === 0 && <DescriptionForm />}
        {currentStep === 1 && <VariantsForm showErrors={variantErrors} />}
        {currentStep === 2 && <CombinationForm showErrors={comboErrors} />}
        {currentStep === 3 && <PriceInfoForm showErrors={priceError} />}
      </div>
    </div>
  );
};

export default AddProduct;

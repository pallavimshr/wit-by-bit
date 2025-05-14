import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setProductForm } from "../store/slices/formSlice";

type Props = {
  showErrors: boolean;
};

const PriceInfoForm: React.FC<Props> = ({ showErrors }) => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.form.product);

  if (!product) return null;

  const { priceInr, discount } = product;

  const handleChange = (field: keyof typeof product, value: any) => {
    dispatch(setProductForm({ [field]: value }));
  };

  const handleDiscountChange = (field: "value" | "method", value: any) => {
    dispatch(
      setProductForm({
        discount: {
          ...discount,
          [field]: value,
        },
      }),
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-1 font-worksans">Price *</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            ₹
          </span>
          <input
            type="number"
            min="0"
            value={priceInr}
            onChange={(e) =>
              handleChange("priceInr", parseFloat(e.target.value))
            }
            className={`w-full pl-8 border rounded px-3 py-2 ${
              showErrors && !priceInr ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
        </div>
        {showErrors && !priceInr && (
          <p className="text-red-500 text-sm mt-1">Price is required</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1 font-worksans">Discount</label>
        <div className="flex gap-3 items-center">
          <input
            type="number"
            min="0"
            value={discount.value}
            onChange={(e) =>
              handleDiscountChange("value", parseFloat(e.target.value))
            }
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <div className="flex">
            <button
              type="button"
              onClick={() => handleDiscountChange("method", "pct")}
              className={`px-4 py-2 rounded border ${
                discount.method === "pct"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              %
            </button>
            <button
              type="button"
              onClick={() => handleDiscountChange("method", "flat")}
              className={`px-4 py-2 rounded border ${
                discount.method === "flat"
                  ? "bg-[#E6EEF2] text-black"
                  : "bg-white text-black"
              }`}
            >
              $
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceInfoForm;

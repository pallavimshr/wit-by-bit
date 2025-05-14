import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Trash2, X } from "lucide-react";
import {
  addVariant,
  removeVariant,
  updateVariant,
} from "../store/slices/formSlice";

type Props = {
  showErrors?: boolean;
};

const VariantsForm: React.FC<Props> = ({ showErrors = false }) => {
  const dispatch = useDispatch();
  const variants = useSelector(
    (state: RootState) => state.form.product?.variants || [],
  );
  const predefinedOptionsMap: { [key: string]: string[] } = {
    Size: ["S", "M", "L"],
    Color: ["Black", "Red", "Blue"],
  };
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<{ [key: number]: string }>({});

  const handleNameChange = (index: number, value: string) => {
    dispatch(
      updateVariant({
        variantIndex: index,
        variant: { ...variants[index], name: value },
      }),
    );
  };
  useEffect(() => {
    if (variants.length === 0) {
      dispatch(addVariant({ variant: { name: "", values: [] } }));
    }
  }, [variants.length, dispatch]);

  const predefinedOptions = Object.keys(predefinedOptionsMap);
  const availableOptions = predefinedOptions.filter(
    (opt) => !variants.some((v) => v.name.toLowerCase() === opt.toLowerCase()),
  );

  const handleValueAdd = (index: number) => {
    const val = inputValue[index]?.trim();
    if (!val) return;
    if (!variants[index].values.includes(val)) {
      const updated = {
        ...variants[index],
        values: [...variants[index].values, val],
      };
      dispatch(updateVariant({ variantIndex: index, variant: updated }));
      setInputValue((prev) => ({ ...prev, [index]: "" }));
    }
  };

  const handleRemoveValue = (variantIndex: number, valueIndex: number) => {
    const updated = {
      ...variants[variantIndex],
      values: variants[variantIndex].values.filter((_, i) => i !== valueIndex),
    };
    dispatch(updateVariant({ variantIndex: variantIndex, variant: updated }));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleValueAdd(index);
    }
  };

  const handleAddOption = () => {
    dispatch(addVariant({ variant: { name: "", values: [] } }));
  };

  return (
    <div className="space-y-6">
      {variants.map((variant, idx) => (
        <div key={idx} className="flex items-start gap-4">
          <div className="relative w-1/4">
            <input
              placeholder="Option (e.g. Size)"
              value={variant.name}
              onFocus={() => setActiveDropdown(idx)}
              onBlur={() => setTimeout(() => setActiveDropdown(null), 100)}
              onChange={(e) => handleNameChange(idx, e.target.value)}
              className={`border p-2 rounded w-full ${showErrors && !variant.name ? "border-red-500" : ""}`}
            />
            {activeDropdown === idx && (
              <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow text-sm">
                {availableOptions
                  .filter((opt) =>
                    opt.toLowerCase().includes(variant.name.toLowerCase()),
                  )
                  .map((option, optionIdx) => (
                    <li
                      key={optionIdx}
                      onMouseDown={() => {
                        dispatch(
                          updateVariant({
                            variantIndex: idx,
                            variant: {
                              ...variants[idx],
                              name: option,
                              values: [...(predefinedOptionsMap[option] || [])],
                            },
                          }),
                        );
                        setInputValue((prev) => ({ ...prev, [idx]: "" }));
                      }}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {option}
                    </li>
                  ))}
              </ul>
            )}

            {showErrors && !variant.name && (
              <p className="text-xs text-red-500 mt-1">Option can’t be empty</p>
            )}
          </div>

          <div className="relative w-1/2">
            <div
              className={`flex flex-wrap items-center border p-1 rounded min-h-[42px] cursor-text ${
                showErrors && !variant.values.length ? "border-red-500" : ""
              }`}
              onClick={() =>
                document.getElementById(`value-input-${idx}`)?.focus()
              }
            >
              {variant.values.map((val, vIdx) => (
                <span
                  key={vIdx}
                  className="flex items-center bg-gray-200 px-2 py-1 text-sm mr-2"
                >
                  {val}
                  <button
                    type="button"
                    className="ml-1 text-gray-600"
                    onClick={() => handleRemoveValue(idx, vIdx)}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
              <input
                id={`value-input-${idx}`}
                type="text"
                value={inputValue[idx] || ""}
                onChange={(e) =>
                  setInputValue((prev) => ({ ...prev, [idx]: e.target.value }))
                }
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="flex-1 min-w-[80px] border-none outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => dispatch(removeVariant({ variantIndex: idx }))}
            >
              <Trash2 className="text-red-500" />
            </button>
          </div>
        </div>
      ))}

      <button
        className="text-sm text-brand-blue font-semibold underline font-worksans"
        onClick={handleAddOption}
      >
        + Add Option
      </button>
    </div>
  );
};

export default VariantsForm;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setProductForm } from "../store/slices/formSlice";

type Combination = {
  name: string;
  sku: string;
  quantity: number | null;
  inStock: boolean;
};

type CombinationFormProps = {
  showErrors: boolean;
};

const CombinationForm: React.FC<CombinationFormProps> = ({ showErrors }) => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.form.product);
  const { variants, combinations } = product;
  const skus = Object.values(combinations).map((c) =>
    c.sku.trim().toLowerCase(),
  );

  useEffect(() => {
    if (Object.keys(combinations).length === 0) {
      const variantCombos = getAllCombinations(variants);
      const initialCombinations = variantCombos.reduce(
        (acc: { [key: string]: Combination }, combo) => {
          acc[combo] = { name: combo, sku: "", quantity: null, inStock: false };
          return acc;
        },
        {},
      );
      dispatch(setProductForm({ combinations: initialCombinations }));
    }
  }, [variants, combinations, dispatch]);

  const getSkuError = (sku: string, index: number) => {
    const trimmed = sku.trim().toLowerCase();
    if (!trimmed) return "SKU is required";
    if (skus.indexOf(trimmed) !== index) return "Duplicate SKU";
    return null;
  };

  const handleChange = (
    comboName: string,
    field: keyof Combination,
    value: any,
  ) => {
    const updatedCombinations = { ...combinations };
    updatedCombinations[comboName] = {
      ...updatedCombinations[comboName],
      [field]: value,
    };
    dispatch(setProductForm({ combinations: updatedCombinations }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm font-medium text-gray-600">
          <tr>
            <th className="p-3">Combination</th>
            <th className="p-3">SKU *</th>
            <th className="p-3">In Stock</th>
            <th className="p-3">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(combinations).map((row, index) => {
            const error = getSkuError(row.sku, index);
            return (
              <tr key={index} className="border-t">
                <td className="p-3">{row.name}</td>
                <td className="p-3">
                  <div className="flex flex-col">
                    <input
                      type="text"
                      className={`w-full border rounded px-3 py-1 ${
                        showErrors && error
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      value={row.sku}
                      onChange={(e) =>
                        handleChange(row.name, "sku", e.target.value)
                      }
                    />
                    {showErrors && error && (
                      <span className="text-red-500 text-sm mt-1">{error}</span>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={row.inStock}
                      onChange={(e) =>
                        handleChange(row.name, "inStock", e.target.checked)
                      }
                    />
                    <div
                      className={`relative w-11 h-6 ${
                        row.inStock ? "bg-black" : "bg-slate-200"
                      } peer-focus:outline-none rounded-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}
                    ></div>
                  </label>
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    min="0"
                    className={`w-full border rounded px-3 py-1 ${
                      !row.inStock ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    value={row.quantity ?? ""}
                    onChange={(e) =>
                      handleChange(
                        row.name,
                        "quantity",
                        parseInt(e.target.value, 10),
                      )
                    }
                    disabled={!row.inStock}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

function getAllCombinations(
  variants: { name: string; values: string[] }[],
): string[] {
  if (!variants.length) return [];

  const combine = (prefix: string[], index: number): string[][] => {
    if (index === variants.length) return [prefix];
    const result: string[][] = [];
    for (const value of variants[index].values) {
      result.push(...combine([...prefix, value], index + 1));
    }
    return result;
  };

  return combine([], 0).map((combo) => combo.join("/"));
}

export default CombinationForm;

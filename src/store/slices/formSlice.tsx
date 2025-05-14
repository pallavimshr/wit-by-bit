import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Variant = { name: string; values: string[] };
type Combination = {
  [key: string]: {
    name: string;
    sku: string;
    quantity: number | null;
    inStock: boolean;
  };
};
type Discount = { method: "pct" | "flat"; value: number };

type ProductFormData = {
  name: string;
  category: string;
  brand: string;
  image: string;
  variants: Variant[];
  combinations: Combination;
  priceInr: number;
  discount: Discount;
};

const initialState: { product: ProductFormData } = {
  product: {
    name: "",
    category: "",
    brand: "",
    image: "",
    variants: [],
    combinations: {},
    priceInr: 0,
    discount: { method: "pct", value: 0 },
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setProductForm: (
      state,
      action: PayloadAction<Partial<ProductFormData>>,
    ) => {
      state.product = { ...state.product, ...action.payload };
    },
    resetForm: (state) => {
      state.product = initialState.product;
    },

    addVariant: (state, action: PayloadAction<{ variant: Variant }>) => {
      state.product.variants.push(action.payload.variant);
    },
    removeVariant: (state, action: PayloadAction<{ variantIndex: number }>) => {
      state.product.variants.splice(action.payload.variantIndex, 1);
    },
    updateVariant: (
      state,
      action: PayloadAction<{ variantIndex: number; variant: Variant }>,
    ) => {
      const { variantIndex, variant } = action.payload;
      state.product.variants[variantIndex] = variant;
    },
  },
});

export const {
  setProductForm,
  resetForm,
  addVariant,
  removeVariant,
  updateVariant,
} = formSlice.actions;

export default formSlice.reducer;

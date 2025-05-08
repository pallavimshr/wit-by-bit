import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Variant = {
  name: string;
  values: string[];
};

type Combination = {
  [key: string]: {
    name: string;
    sku: string;
    quantity: number | null;
    inStock: boolean;
  };
};

type Discount = {
  method: 'pct' | 'flat';
  value: number;
};

type Product = {
  name: string;
  category: string;
  brand: string;
  image: string;
  variants: Variant[];
  combinations: Combination;
  priceInr: number;
  discount: Discount;
};

const initialState: Product = {
  name: '',
  category: '',
  brand: '',
  image: '',
  variants: [],
  combinations: {},
  priceInr: 0,
  discount: { method: 'pct', value: 0 },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProduct: (state, action: PayloadAction<Partial<Product>>) => {
      return { ...state, ...action.payload };
    },
    addVariant: (state, action: PayloadAction<Variant>) => {
      state.variants.push(action.payload);
    },
    removeVariant: (state, action: PayloadAction<number>) => {
      state.variants.splice(action.payload, 1);
    },
    updateVariant: (state, action: PayloadAction<{ index: number; variant: Variant }>) => {
      state.variants[action.payload.index] = action.payload.variant;
    },
    resetProduct: () => initialState,
  },
});

export const { updateProduct, addVariant, removeVariant, updateVariant, resetProduct } = productSlice.actions;
export default productSlice.reducer;

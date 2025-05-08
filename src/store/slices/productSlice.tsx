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
const initialProduct: Product = {
    name: '',
    category: '',
    brand: '',
    image: '',
    variants: [],
    combinations: {},
    priceInr: 0,
    discount: {
      method: 'pct',
      value: 0,
    },
  };
  
type ProductState = {
    ProductState : Product[];
}

const initialState: ProductState = {
    ProductState : []
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProduct: (state, action: PayloadAction<{ productIndex: number, updatedProduct: Partial<Product> }>) => {
      const { productIndex, updatedProduct } = action.payload;
      state.ProductState[productIndex] = { ...state.ProductState[productIndex], ...updatedProduct };
    },
    
    resetProduct: (state, action: PayloadAction<{ productIndex: number }>) => {
        const { productIndex } = action.payload;
        state.ProductState[productIndex] = { ...initialProduct };
      },
      addProduct: (state, action: PayloadAction<Product>) => {
        state.ProductState.push(action.payload);
      },
  },
});

export const { updateProduct, resetProduct,addProduct } = productSlice.actions;
export default productSlice.reducer;

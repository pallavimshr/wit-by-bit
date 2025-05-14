import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  id: string;
  name: string;
}

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
  },
});

export const { addCategory } = categorySlice.actions;

export default categorySlice.reducer;

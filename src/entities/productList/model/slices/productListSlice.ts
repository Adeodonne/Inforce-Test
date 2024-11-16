import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Commentary } from '../types/types';

interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  products: JSON.parse(localStorage.getItem('products') || '[]') as Product[],
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },

    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      localStorage.setItem('products', JSON.stringify(state.products));
    },

    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem('products', JSON.stringify(state.products));
    },

    addComment: (
      state,
      action: PayloadAction<{ productId: number; comment: Commentary }>
    ) => {
      const { productId, comment } = action.payload;
      const product = state.products.find(
        (product) => product.id === productId
      );
      if (product) {
        if (!product.comments) {
          product.comments = [];
        }
        product.comments.push(comment);
        localStorage.setItem('products', JSON.stringify(state.products));

        if (state.selectedProduct?.id === productId) {
          state.selectedProduct = { ...product };
        }
      }
    },

    deleteComment: (
      state,
      action: PayloadAction<{ productId: number; commentId: number }>
    ) => {
      const { productId, commentId } = action.payload;
      const product = state.products.find(
        (product) => product.id === productId
      );
      if (product) {
        product.comments = product.comments.filter(
          (comment: Commentary) => comment.id !== commentId
        );
        localStorage.setItem('products', JSON.stringify(state.products));

        if (state.selectedProduct?.id === productId) {
          state.selectedProduct = { ...product };
        }
      }
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  addComment,
  deleteComment,
  setSelectedProduct,
} = productsSlice.actions;
export default productsSlice.reducer;

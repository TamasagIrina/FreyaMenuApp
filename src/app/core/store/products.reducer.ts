import { createReducer, on } from "@ngrx/store";
import { Product } from "../interfaces/product.model";
import * as ProductsActions from './products.actions';

export const productFeatureKey = 'products';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: any;
}

export const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
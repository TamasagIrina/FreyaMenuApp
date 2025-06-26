import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart } from './cart.actions';
import { Product } from '../interfaces/product.model';

export const initialState: Product[] = [];

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => [...state, product]),
  on(removeFromCart, (state, { productId }) =>
    state.filter(item => item.id !== productId)
  )
);
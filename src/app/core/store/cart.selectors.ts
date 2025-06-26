import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Product } from '../interfaces/product.model';


export const selectCartState = createFeatureSelector<Product[]>('cart');


export const selectCartProducts = createSelector(
  selectCartState,
  (cart: Product[]) => cart
);

export const selectCartCount = createSelector(
  selectCartState,
  (cart: Product[]) => cart.length
);

export const selectCartTotalPrice = createSelector(
  selectCartState,
  (cart: Product[]) =>
    cart.reduce((total, product) => total + product.price * product.amount, 0)
);
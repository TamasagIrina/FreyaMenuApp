import { createAction, props } from '@ngrx/store';
import { Product } from '../interfaces/product.model';

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: any }>()
);

export const setProductImage = createAction(
  '[Products] Set Product Image',
  props<{ productId: string; imageUrl: string }>()
);
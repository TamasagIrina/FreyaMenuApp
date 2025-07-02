import { createAction, props } from '@ngrx/store';
import { Product } from '../interfaces/product.model';


export const addItem = createAction(
  '[cart Page] Add Item ',
  props<{productId : string, quantity : number}>()
);

export const removeItem = createAction(
  '[cart Page] remove Item ',
  props<{productId : string}>()
);

export const increaseQuanity = createAction(
  '[cart Page] increase Item ',
  props<{productId : string}>()
);

export const descreaseQuanity = createAction(
  '[cart Page] decrease Item ',
  props<{productId : string}>()
);

export const clearCart = createAction(
  '[cart Page] remove all Items'
);
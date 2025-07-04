import { createAction, props } from '@ngrx/store';
import { OrderSummary } from '../interfaces/order.model';

export const loadClientOrders = createAction(
  '[Order] Load Client Orders',
  props<{ userUID: string }>()
);

export const loadClientOrdersSuccess = createAction(
  '[Order] Load Client Orders Success',
  props<{ orders: OrderSummary[] }>()
);

export const loadClientOrdersFailure = createAction(
  '[Order] Load Client Orders Failure',
  props<{ error: any }>()
);

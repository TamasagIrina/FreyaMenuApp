import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from './order.reducer';

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const selectOrders = createSelector(
  selectOrderState,
  (state: OrderState) => state.orders
);

export const selectOrdersLoading = createSelector(
  selectOrderState,
  (state: OrderState) => state.loading
);

export const selectOrdersError = createSelector(
  selectOrderState,
  (state: OrderState) => state.error
);

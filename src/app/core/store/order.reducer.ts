import { createReducer, on } from '@ngrx/store';
import * as OrderActions from './order.actions';
import { OrderSummary } from '../interfaces/order.model';

export interface OrderState {
  orders: OrderSummary[];
  loading: boolean;
  error: any;
}

export const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.loadClientOrders, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrderActions.loadClientOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false,
    error: null,
  })),
  on(OrderActions.loadClientOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.actions';

export interface CategoryState {
  categories: any[];
  loading: boolean;
  error: any;
}

export const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategories, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    loading: false,
  })),
  on(CategoryActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

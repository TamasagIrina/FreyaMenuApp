import { createAction, props } from '@ngrx/store';

export const loadCategories = createAction('[Category] Load Categories');
export const loadCategoriesSuccess = createAction(
  '[Category] Load Categories Success',
  props<{ categories: any[] }>()
);
export const loadCategoriesFailure = createAction(
  '[Category] Load Categories Failure',
  props<{ error: any }>()
);

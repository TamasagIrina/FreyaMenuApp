import { createAction, props } from '@ngrx/store';
import { FavoriteItem } from '../interfaces/favorite.model';

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ item: FavoriteItem }>()
);

export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ productId: string }>()
);

export const clearFavorites = createAction(
  '[Favorites] Clear Favorites'
);

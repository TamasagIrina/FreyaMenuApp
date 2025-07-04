import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFavorites from './favorite.reducer';
import { FavoriteItem } from '../interfaces/favorite.model';

export const selectFavoriteState = createFeatureSelector<fromFavorites.FavoriteState>(
  fromFavorites.favoriteFeatureKey
);

export const selectFavoriteItems = createSelector(
  selectFavoriteState,
  (state): FavoriteItem[] => state.items
);

export const selectFavoriteTotal = createSelector(
  selectFavoriteItems,
  (items) => items.length
);

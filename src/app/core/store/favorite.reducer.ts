import { createReducer, on } from '@ngrx/store';
import * as FavoriteActions from './favorite.actions';
import { FavoriteItem } from '../interfaces/favorite.model';

export const favoriteFeatureKey = 'favorites';

export interface FavoriteState {
  items: FavoriteItem[];
}

export const initialState: FavoriteState = {
  items: [],
};

export const favoriteReducer = createReducer(
  initialState,

  on(FavoriteActions.addFavorite, (state, { item }) => {
    
    if (state.items.find(fav => fav.productId === item.productId)) {
      return state;
    }
    return { ...state, items: [...state.items, item] };
  }),

  on(FavoriteActions.removeFavorite, (state, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.productId !== productId),
  })),

  on(FavoriteActions.clearFavorites, state => ({
    ...state,
    items: [],
  }))
);

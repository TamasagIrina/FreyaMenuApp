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
    // evită dublurile: dacă există deja, nu-l adăugăm iar
    if (state.items.find(fav => fav.id === item.id)) {
      return state;
    }
    return { ...state, items: [...state.items, item] };
  }),

  on(FavoriteActions.removeFavorite, (state, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.id !== productId),
  })),

  on(FavoriteActions.clearFavorites, state => ({
    ...state,
    items: [],
  }))
);

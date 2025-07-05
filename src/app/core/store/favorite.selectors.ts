import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFavorites from './favorite.reducer';
import { FavoriteItem, FavoriteItemDetailed } from '../interfaces/favorite.model';
import * as fromProducts from './products.selectors'
export const selectFavoriteState = createFeatureSelector<fromFavorites.FavoriteState>(
  fromFavorites.favoriteFeatureKey
);

export const selectFavoriteItems = createSelector(
  selectFavoriteState,
  (state): FavoriteItem[] => state.items
);

export const selectFavoriteItemsWithDetails = createSelector(
  selectFavoriteItems,
  fromProducts.selectProducts,
  (items, products) : FavoriteItemDetailed[] => {
    if(!products || products.length == 0 ){
      return [];
    }
    return items.map(item => {
      const product = products.find(p => p.id === item.productId);
      const price = product?.price ?? 0;
     
      return {
        ...item,
        uid: product?.uid ?? '',
        name : product?.name ?? 'Product not found',
        price  : price,
        imageUrl : product?.imageUrl ?? 'Image not found',
        shortdescription: product?.shortDescription ?? '',
      };
    })
  }
);

export const selectFavoriteTotal = createSelector(
  selectFavoriteItems,
  (items) => items.length
);

import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ActionReducer, provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/services/authInterceptor';
import { provideEffects } from '@ngrx/effects';
import { productsReducer } from './core/store/products.reducer';
import { ProductsEffects } from './core/store/products.effects';
import { DataBase } from './core/services/dataBase.service';
import * as fromProducts from './core/store/products.reducer';
import * as fromCart from './core/store/cart.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { CategoryEffects } from './core/store/category.effects';
import { categoryReducer } from './core/store/category.reducer';
import { orderReducer } from './core/store/order.reducer';
import { OrderEffects } from './core/store/order.effects';
import * as fromFavorites from './core/store/favorite.reducer';



const keysToSync = [
  fromCart.cartFeatureKey,
  fromFavorites.favoriteFeatureKey
];

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: keysToSync,
    rehydrate: true,
    storage: window.localStorage,
    removeOnUndefined: true
  })(reducer)
}

const metaReducers = [localStorageSyncReducer]


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ products: productsReducer }, { metaReducers }),
    provideState('category', categoryReducer),
    provideState('order', orderReducer),
    provideState(fromProducts.productFeatureKey, fromProducts.productsReducer),
    provideState(fromCart.cartFeatureKey, fromCart.cartReducer),
    provideState(fromFavorites.favoriteFeatureKey, fromFavorites.favoriteReducer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideEffects([ProductsEffects]),
    provideEffects([CategoryEffects]),
    provideEffects([OrderEffects]),

  ]
};

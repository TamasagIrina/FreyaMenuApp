import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as FavoriteActions from '../../core/store/favorite.actions';
import * as FavoriteSelectors from '../../core/store/favorite.selectors';
import { FavoriteItem } from '../../core/interfaces/favorite.model';
import { CommonModule } from '@angular/common';
import * as CartActions from '../../core/store/cart.actions';

@Component({
  selector: 'app-favorites',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  favorites$: Observable<FavoriteItem[]>
  totalFavorites$: Observable<number>
  constructor(private store: Store) {
    this.favorites$ = this.store.select(FavoriteSelectors.selectFavoriteItems);
    this.totalFavorites$ = this.store.select(FavoriteSelectors.selectFavoriteTotal);
  }

  removeFavorite(productId: string) {
    this.store.dispatch(FavoriteActions.removeFavorite({ productId }));
  }

  clearFavorites() {
    this.store.dispatch(FavoriteActions.clearFavorites());
  }

  addToCart(productId: string){
    this.store.dispatch(CartActions.addItem({ productId , quantity: 1 }));

    this.removeFavorite(productId);
  }

}

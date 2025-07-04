import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/interfaces/product.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as FavoriteSelectors from '../../core/store/favorite.selectors';
import * as CartSelectors from '../../core/store/cart.selectors';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CartSheetComponent } from '../cart-sheet/cart-sheet.component';
import { NotificationComponent } from "../notification/notification.component";
// import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-bottom-navbar',
  imports: [MatIconModule, MatBadgeModule, RouterModule, CommonModule],
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.scss'
})
export class BottomNavbarComponent {
  private store = inject(Store);
  totalPrice$: Observable<number> | undefined;
  totalFavorites$: Observable<number> | undefined;

  constructor(private bottomSheet: MatBottomSheet) {
    this.totalPrice$ = this.store.select(CartSelectors.selectCartTotalItems);
    this.totalFavorites$ = this.store.select(FavoriteSelectors.selectFavoriteTotal);
  }



  goToCart() {
    this.bottomSheet.open(CartSheetComponent, {
      panelClass: 'custom-cart-sheet'
    });

  }
}

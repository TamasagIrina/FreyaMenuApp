import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/interfaces/product.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCartCount, selectCartProducts, selectCartTotalPrice } from '../../core/store/cart.selectors';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CartSheetComponent } from '../cart-sheet/cart-sheet.component';
// import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-bottom-navbar',
  imports: [MatIconModule, MatBadgeModule, RouterModule, CommonModule],
  templateUrl: './bottom-navbar.component.html',
  styleUrl: './bottom-navbar.component.scss'
})
export class BottomNavbarComponent {
  cartCount$: Observable<number> | undefined;
  totalPrice$: Observable<number> | undefined;


  constructor(private store: Store, private bottomSheet: MatBottomSheet) {
    this.totalPrice$ = this.store.select(selectCartTotalPrice);

  }



  goToCart() {
    this.bottomSheet.open(CartSheetComponent, {
      panelClass: 'custom-cart-sheet'
    });
    console.log('Navighează spre coș');
  }
}

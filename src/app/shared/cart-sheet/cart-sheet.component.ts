import { Component, inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { PaymentSheetComponent } from '../payment-sheet/payment-sheet.component';
import * as CartSelectors from '../../core/store/cart.selectors';
import * as CartActions from '../../core/store/cart.actions';
import { Observable } from 'rxjs';
import { CartItemDetailed } from '../../core/interfaces/cart.model';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-sheet',
  imports: [MatIconModule, CommonModule],
  templateUrl: './cart-sheet.component.html',
  styleUrl: './cart-sheet.component.scss'
})
export class CartSheetComponent {
    private store = inject(Store);
  cartItem$: Observable<CartItemDetailed[]>;
  totalPrice$: Observable<number>;

  constructor(private bottomSheetRef: MatBottomSheetRef<CartSheetComponent>, private bottomSheet: MatBottomSheet) {
    this.cartItem$ = this.store.select(CartSelectors.selectCartItemsWithDetails);
    this.totalPrice$ = this.store.select(CartSelectors.selectCartTotalPrice);
  }

   increase(productId : string){
    this.store.dispatch(CartActions.increaseQuanity({productId}))
  }

   decrease(productId : string){
    this.store.dispatch(CartActions.descreaseQuanity({productId}))
  }

    remove(productId : string){
    this.store.dispatch(CartActions.removeItem({productId}))
  }


  clearCart(){
    if(confirm('Are you sure you want to clear the entire CART ??')){
      this.store.dispatch(CartActions.clearCart());
    }
  }

  close() {
    this.bottomSheetRef.dismiss();
  }
  goToPayment() {
    this.bottomSheetRef.dismiss();
    this.bottomSheet.open(PaymentSheetComponent, {
      panelClass: 'custom-payment-sheet'
    });
  }
}

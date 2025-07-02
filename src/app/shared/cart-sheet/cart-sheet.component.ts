import { Component } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { PaymentSheetComponent } from '../payment-sheet/payment-sheet.component';


@Component({
  selector: 'app-cart-sheet',
  imports: [MatIconModule],
  templateUrl: './cart-sheet.component.html',
  styleUrl: './cart-sheet.component.scss'
})
export class CartSheetComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<CartSheetComponent>,private bottomSheet: MatBottomSheet) {}

    close() {
    this.bottomSheetRef.dismiss();
  }
  goToPayment(){
    this.bottomSheetRef.dismiss();
     this.bottomSheet.open(PaymentSheetComponent, {
      panelClass: 'custom-payment-sheet'
    });
  }
}

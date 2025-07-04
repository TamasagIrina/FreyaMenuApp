import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { CartItemDetailed } from '../../core/interfaces/cart.model';
import { firstValueFrom, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CartSelectors from '../../core/store/cart.selectors';
import { DataBase } from '../../core/services/dataBase.service';
import * as OrderActions from '../../core/store/order.actions';
@Component({
  selector: 'app-payment-sheet',
  imports: [MatIconModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, CommonModule, MatInputModule],
  templateUrl: './payment-sheet.component.html',
  styleUrl: './payment-sheet.component.scss'
})
export class PaymentSheetComponent {
  private store = inject(Store);

  paymentForm: FormGroup;
  canPurchase = false;
  showCardFields = false;
  cartItem$: Observable<CartItemDetailed[]>;

  cardPayment = {
    "paymentUid": "168e41c33b2d4e16ba86789955031db7",
    "paymentName": "Card",
    "isPaid": true,
    "paymentDocumentDate": null,
    "paymentDocumentSerial": null,
    "paymentDocumentNumber": null,
    "paymentManagementUid": null
  }

  cashPayment = {
    "paymentUid": "057e9c4508884cbd8fc8fa9514e315d2",
    "paymentName": "Cash",
    "isPaid": false
  }


  constructor(private bottomSheetRef: MatBottomSheetRef<PaymentSheetComponent>, private fb: FormBuilder, private databasa: DataBase) {
    this.paymentForm = this.fb.group({
      method: [''],
      cardName: [''],
      cardNumber: [''],
      expiry: [''],
      cvv: ['']
    });


    this.paymentForm.valueChanges.subscribe(() => {
      const method = this.paymentForm.get('method')?.value;

      if (method === 'card') {
        const valid =
          this.paymentForm.get('cardName')?.valid &&
          this.paymentForm.get('cardNumber')?.valid &&
          this.paymentForm.get('expiry')?.valid &&
          this.paymentForm.get('cvv')?.valid;

        this.canPurchase = !!valid;
      } else if (method === 'cash') {
        this.canPurchase = true;
      } else {
        this.canPurchase = false;
      }
    });

    this.cartItem$ = this.store.select(CartSelectors.selectCartItemsWithDetails);
  }

  onMethodChange() {
    const method = this.paymentForm.get('method')?.value;
    this.showCardFields = method === 'card';

    if (method === 'card') {
      this.paymentForm.get('cardName')?.setValidators([Validators.required]);
      this.paymentForm.get('cardNumber')?.setValidators([Validators.required, Validators.minLength(16)]);
      this.paymentForm.get('expiry')?.setValidators([Validators.required]);
      this.paymentForm.get('cvv')?.setValidators([Validators.required, Validators.minLength(3)]);
    } else {
      this.paymentForm.get('cardName')?.clearValidators();
      this.paymentForm.get('cardNumber')?.clearValidators();
      this.paymentForm.get('expiry')?.clearValidators();
      this.paymentForm.get('cvv')?.clearValidators();
    }

    this.paymentForm.get('cardName')?.updateValueAndValidity();
    this.paymentForm.get('cardNumber')?.updateValueAndValidity();
    this.paymentForm.get('expiry')?.updateValueAndValidity();
    this.paymentForm.get('cvv')?.updateValueAndValidity();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }



  async placeOrder() {
    try {
      const cart = await firstValueFrom(this.cartItem$);

      const preparedItems = this.prepareCartItems(cart);

      const method = this.paymentForm.get('method')?.value;

      const userUId=localStorage.getItem("userUID") ?? "";

      if(method==="card"){
        this.databasa.placeOrder(preparedItems, userUId, this.cardPayment);
        this.close();
      }else{
        this.databasa.placeOrder(preparedItems, userUId, this.cashPayment);
        this.close();
      }

              this.store.dispatch(OrderActions.loadClientOrders({ userUID: localStorage.getItem("userUID") as string }));
      
        

    } catch (error) {
      console.error('Eroare la pregătirea produselor din coș:', error);
    }
  }

  prepareCartItems(cart: any[]): any[] {
    return cart.map(item => ({
      "uid": null,
      "description": null,
      "parentProductUid": null,
      "productName": item.name,
      "productUid": item.uid,
      "vatRate": 0,
      "units": 1,
      "quantity": item.quantity,
      "finalQuantity": item.quantity,
      "unitPriceWithVat": item.price,
      "discountValue": 0,
      "discountPercent": 0,
      "discountType": 0,
      "addedAt": new Date().toISOString(),
      "toppings": [],
      "collectibleUnits": 0,
      "isRetuRo": false
    }));
  }
}

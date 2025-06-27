import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-payment-sheet',
  imports: [MatIconModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule,CommonModule,MatInputModule],
  templateUrl: './payment-sheet.component.html',
  styleUrl: './payment-sheet.component.scss'
})
export class PaymentSheetComponent {
  paymentForm: FormGroup;
  canPurchase = false;
  showCardFields = false;
  constructor(private bottomSheetRef: MatBottomSheetRef<PaymentSheetComponent>, private fb: FormBuilder) {
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
}

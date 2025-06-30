import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/interfaces/product.model';
import { Store } from '@ngrx/store';
import { addToCart } from '../../core/store/cart.actions';


@Component({
  selector: 'app-pop-up-product-details',
  imports: [MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './pop-up-product-details.component.html',
  styleUrl: './pop-up-product-details.component.scss'
})
export class PopUpProductDetailsComponent {
  quantity: number = 1;
  note: string = '';
  adedToFavorite: boolean = false;
  productInterface: Product = {
    id: 0,
    name: '',
    price: 0,
    imageUid:'',
    longDescription:'' ,
    shortDescription:'',
    amount: 0
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public product: any,
    private dialogRef: MatDialogRef<PopUpProductDetailsComponent>,
    private dialog: MatDialog,
    private store: Store
  ) { }

  addToFavorite() {

    if (this.adedToFavorite) {
      this.adedToFavorite = false;
    } else {
      this.adedToFavorite = true;
    }

  }


  addToCart(): void {
    console.log('Added to cart:', {
      ...this.product,
      quantity: this.quantity,
      note: this.note
    });

    this.dialogRef.close();
    this.productInterface.price = this.product.price;
    this.productInterface.name = this.product.name;
    this.productInterface.amount = this.quantity;

    this.store.dispatch(addToCart({ product: this.productInterface }));


  }
  close() {
    this.dialogRef.close();
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}

import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/interfaces/product.model';
import { Store } from '@ngrx/store';
import * as FavoriteActions from '../../core/store/favorite.actions';
import * as CartActions from '../../core/store/cart.actions';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationService } from '../../core/services/notification.service';
import { FavoriteItem } from '../../core/interfaces/favorite.model';



@Component({
  selector: 'app-pop-up-product-details',
  imports: [MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule],
  templateUrl: './pop-up-product-details.component.html',
  styleUrl: './pop-up-product-details.component.scss'
})
export class PopUpProductDetailsComponent {


  quantity: number = 1;
  note: string = '';
  adedToFavorite: boolean = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private dialogRef: MatDialogRef<PopUpProductDetailsComponent>,
    private dialog: MatDialog,
    private store: Store,
    private notificationService: NotificationService
  ) { }

  addToFavorite() {

    if (this.adedToFavorite) {
      this.adedToFavorite = false;
      this.store.dispatch(FavoriteActions.removeFavorite({ productId:this.product.id }));
    } else {
      this.adedToFavorite = true;
      const favoriteItem: FavoriteItem = {
        id: this.product.id,
        name: this.product.name,
        shortDescription: this.product.shortDescription,
        price: this.product.price,
        imageUrl: this.product.imageUrl ?? '',
      };
      this.store.dispatch(FavoriteActions.addFavorite({ item: favoriteItem }));
    }

  }


  async addToCart() {
    this.store.dispatch(CartActions.addItem({ productId: this.product.id, quantity: this.quantity }));

    this.dialogRef.close();

    await this.delay(300);

    this.notificationService.show(`Ați adăugat în coș ${this.quantity} porții ${this.product.name}`);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
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

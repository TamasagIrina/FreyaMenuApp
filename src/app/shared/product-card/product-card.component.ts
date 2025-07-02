import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PopUpProductDetailsComponent } from '../pop-up-product-details/pop-up-product-details.component';
import { Product } from '../../core/interfaces/product.model';
import { DataBase } from '../../core/services/dataBase.service';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
 @Input() product!: Product;

 image: any | undefined;
  constructor(private dialog: MatDialog, protected dataBase: DataBase) { 
    
  }


  openDetails() {
    this.dialog.open(PopUpProductDetailsComponent, {
      width: '30rem',
      height: '40rem',
      data: this.product
      
    });
  }
}

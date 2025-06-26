import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PopUpProductDetailsComponent } from '../pop-up-product-details/pop-up-product-details.component';

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

  constructor(private dialog: MatDialog) { }



  openDetails() {
    this.dialog.open(PopUpProductDetailsComponent, {
      width: '30rem',
      height: '40rem',
      data: {
        name: 'Cheeseburger',
        subtitle: 'Wendy’s Burger',
        description: 'A juicy beef burger with cheese and pickles.',
        image: 'assets/images/burger.jpg',
        price: 14.99

      }
    });
  }
}

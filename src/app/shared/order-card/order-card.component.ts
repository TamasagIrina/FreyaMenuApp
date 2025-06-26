import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-card',
  imports: [
     MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
  order = {
  id: '12345',
  prepTime: 25,
  status: 'In_pregătire',
  items: [
    { name: 'Cheeseburger', qty: 2, total: 19.8 },
    { name: 'Cola', qty: 1, total: 5.0 }
  ]
};

}

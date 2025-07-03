import { Component } from '@angular/core';
import { OrderCardComponent } from "../../shared/order-card/order-card.component";

@Component({
  selector: 'app-profile',
  imports: [OrderCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  selectedTab: 'in_progress' | 'delivered' = 'in_progress';

allOrders = [
  { id: 1, status: 'in_progress', details: 'Comandă 1 în curs' },
  { id: 2, status: 'delivered', details: 'Comandă 2 livrată' },
  { id: 3, status: 'in_progress', details: 'Comandă 3 în curs' },
  { id: 4, status: 'delivered', details: 'Comandă 4 livrată' },
];

get filteredOrders() {
  return this.allOrders.filter(order => order.status === this.selectedTab);
}

selectTab(tab: 'in_progress' | 'delivered') {
  this.selectedTab = tab;
}
}

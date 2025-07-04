import { Component } from '@angular/core';
import { OrderCardComponent } from "../../shared/order-card/order-card.component";
import { Store } from '@ngrx/store';
import * as OrderActions from '../../core/store/order.actions';
import * as OrderSelectors from '../../core/store/order.selectors';
import { map, Observable } from 'rxjs';
import { OrderSummary } from '../../core/interfaces/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [OrderCardComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  selectedTab: 'in_progress' | 'delivered' = 'in_progress';

  orders$!: Observable<OrderSummary[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;
  filteredOrders$!: Observable<OrderSummary[]>;

  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.orders$ = this.store.select(OrderSelectors.selectOrders);
    this.loading$ = this.store.select(OrderSelectors.selectOrdersLoading);
    this.error$ = this.store.select(OrderSelectors.selectOrdersError);
    this.selectTab('in_progress');
    const userUID = localStorage.getItem('userUID');
    if (userUID) {
      this.store.dispatch(OrderActions.loadClientOrders({ userUID }));

    } else {
      console.error('Nu există userUID în localStorage!');
    }
  }

  selectTab(tab: 'in_progress' | 'delivered') {
    this.selectedTab = tab;
    this.updateFilteredOrders();
  }

  private updateFilteredOrders() {
    this.filteredOrders$ = this.orders$.pipe(
      map(orders => orders.filter(order => {
        if (this.selectedTab === 'in_progress') {
          return order.status === 1; // în pregătire
        } else {
          return order.status === 2; // pregătit/livrat
        }
      }))
    );
  }
}

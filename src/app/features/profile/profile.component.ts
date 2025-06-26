import { Component } from '@angular/core';
import { OrderCardComponent } from "../../shared/order-card/order-card.component";

@Component({
  selector: 'app-profile',
  imports: [OrderCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}

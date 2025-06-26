import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from "../../shared/product-card/product-card.component";


@Component({
  selector: 'app-home',
  imports: [MatIconModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

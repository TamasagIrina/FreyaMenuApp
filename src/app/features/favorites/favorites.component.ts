import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FavoriteCardComponent } from "../../shared/favorite-card/favorite-card.component";


@Component({
  selector: 'app-favorites',
  imports: [
    MatButtonModule,
    MatIconModule,
    FavoriteCardComponent
],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {

}

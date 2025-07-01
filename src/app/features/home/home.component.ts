import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from "../../shared/product-card/product-card.component";
import { AuthService } from '../../core/services/authService.sevice';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DataBase } from '../../core/services/dataBase.service';
import { Store } from '@ngrx/store';
import { selectProducts, selectProductsError, selectProductsLoading } from '../../core/store/products.selectors';
import { loadProducts } from '../../core/store/products.actions';
import { Product } from '../../core/interfaces/product.model';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-home',
  imports: [MatIconModule, ProductCardComponent, CommonModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  username: string = "practica.freya@gmail.com";
  password: string = "practicafreya2025";

  products$: Observable<Product[]> | undefined;
;
  loading$: any;
  error$: any;




  constructor(private authService: AuthService,
    private dataBaseService: DataBase,
    private store: Store
  ) { }


  ngOnInit() {
    
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log('Login success:', response);
        const token = response.payload?.token;
        if (token) {
          this.authService.saveToken(token);
          console.log('Token salvat:', token);
  
          this.store.dispatch(loadProducts());

          this.products$ = this.store.select(selectProducts);
          this.loading$ = this.store.select(selectProductsLoading);
          this.error$ = this.store.select(selectProductsError);

          console.log(this.products$);

        } else {
          console.error('Token lipsă în răspuns!');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });




  }
}

import { Component } from '@angular/core';
import { DataBase } from '../../core/services/dataBase.service';
import { AuthService } from '../../core/services/authService.sevice';
import { Store } from '@ngrx/store';
import { Product } from '../../core/interfaces/product.model';
import { Observable } from 'rxjs';
import { loadProducts } from '../../core/store/products.actions';
import { selectProducts, selectProductsError, selectProductsLoading } from '../../core/store/products.selectors';
import { Router } from '@angular/router';
import * as CategoryActions from '../../core/store/category.actions';


@Component({
  selector: 'app-scan-qr',
  imports: [],
  templateUrl: './scan-qr.component.html',
  styleUrl: './scan-qr.component.scss'
})
export class ScanQRComponent {
  username: string = "practica.freya@gmail.com";
  password: string = "practicafreya2025";



  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router,
    private clientService: DataBase
  ) { }

  scanButtonOn() {
    const userUID = localStorage.getItem('userUID');

    if(!userUID){
      this.clientService.addNewClient();
    }
    // this.clientService.addNewClient().subscribe({
    //   next: (response) => console.log('Client adăugat cu succes:', response.payload),
    //   error: (error) => console.error('Eroare la adăugare client:', error),
    // });

    if (!this.authService.isDateValidAndNotExpired()) {
      this.authService.login(this.username, this.password).subscribe({
        next: (response: any) => {
          console.log('Login success:', response);
          const token = response.payload?.token;
          const expiresIn = response.payload?.expiresIn;
          if (token) {
            this.authService.saveToken(token);
            console.log('Token salvat:', token);

            this.authService.saveExparitionDate(expiresIn);

            this.store.dispatch(loadProducts());

            this.store.dispatch(CategoryActions.loadCategories());

          } else {
            console.error('Token lipsă în răspuns!');
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
      });
    } else {
      this.store.dispatch(loadProducts());
      this.store.dispatch(CategoryActions.loadCategories());
    }

    this.navigateTo('home')

  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

}

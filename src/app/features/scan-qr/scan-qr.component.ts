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
import { firstValueFrom } from 'rxjs';
import * as OrderActions from '../../core/store/order.actions';

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

 

  async scanButtonOn() {
    try {
      let tokenValid = this.authService.isDateValidAndNotExpired();


      if (!tokenValid) {
        const response: any = await firstValueFrom(this.authService.login(this.username, this.password));
        console.log('Login success:', response);

        const token = response.payload?.token;
        const expiresIn = response.payload?.expiresIn;

        if (!token) {
          console.error('Token lipsă în răspuns!');
          return;
        }

        this.authService.saveToken(token);
        this.authService.saveExparitionDate(expiresIn);
        console.log('Token salvat:', token);
      }


      const userUID = localStorage.getItem('userUID');
      if (!userUID) {
        this.clientService.addNewClient();
      }


      this.store.dispatch(loadProducts());
      
      this.store.dispatch(CategoryActions.loadCategories());
    
      if (userUID) {
        this.store.dispatch(OrderActions.loadClientOrders({ userUID }));

      } else {
        console.error('Nu există userUID în localStorage!');
      }

      this.navigateTo('home');

    } catch (error) {
      console.error('A apărut o eroare în fluxul scanButtonOn:', error);
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

}

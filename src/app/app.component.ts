import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BottomNavbarComponent } from "./shared/bottom-navbar/bottom-navbar.component";
import { NotificationComponent } from "./shared/notification/notification.component";
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/authService.sevice';
import { Store } from '@ngrx/store';
import { DataBase } from './core/services/dataBase.service';
import * as OrderActions from './core/store/order.actions';
import * as CategoryActions from './core/store/category.actions';
import { firstValueFrom } from 'rxjs';
import { loadProducts } from './core/store/products.actions';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BottomNavbarComponent, NotificationComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'menuApp';

  username: string = "practica.freya@gmail.com";
  password: string = "practicafreya2025";

  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router,
    private clientService: DataBase
  ) {

  }

  ngOnInit(){
     try {
          let tokenValid = this.authService.isDateValidAndNotExpired();
    
    
          if (!tokenValid) {
            const response: any =  firstValueFrom(this.authService.login(this.username, this.password));
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
    
    
    
        } catch (error) {
          console.error('A apărut o eroare în fluxul scanButtonOn:', error);
        }
  }
}

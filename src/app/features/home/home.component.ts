import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from "../../shared/product-card/product-card.component";
import { AuthService } from '../../core/services/authService.sevice';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DataBase } from '../../core/services/dataBase.service';




@Component({
  selector: 'app-home',
  imports: [MatIconModule, ProductCardComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  username: string ="practica.freya@gmail.com" ;
  password: string ="practicafreya2025" ;

  constructor(private authService: AuthService,
              private dataBaseService: DataBase
  ){}
 ngOnInit(){
   this.authService.login(this.username,this.password).subscribe({
    next: (response: any) => {
      console.log('Login success:', response);
      const token = response.payload?.token; 
      if (token) {
        this.authService.saveToken(token);
        console.log('Token salvat:', token);
        this.dataBaseService.getSellingProducts();
        this.dataBaseService.getCategorysSellingProducts();
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

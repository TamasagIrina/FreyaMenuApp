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
import * as CategorySelectors from '../../core/store/category.selectors';




@Component({
  selector: 'app-home',
  imports: [MatIconModule, ProductCardComponent, CommonModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products$: Observable<Product[]> | undefined;
  loading$: any;
  error$: any;

  categories$: Observable<any[]>;
  categoriesLoading$: Observable<boolean>;
  categoriesError$: Observable<any>;



  constructor(private authService: AuthService,
    private dataBaseService: DataBase,
    private store: Store
  ) {
    this.products$ = this.store.select(selectProducts);
    this.loading$ = this.store.select(selectProductsLoading);
    this.error$ = this.store.select(selectProductsError);

    this.categories$ = this.store.select(CategorySelectors.selectCategories);
    this.categoriesLoading$ = this.store.select(CategorySelectors.selectCategoriesLoading);
    this.categoriesError$ = this.store.select(CategorySelectors.selectCategoriesError);
  }


}

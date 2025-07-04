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
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
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
  rawProducts$: Observable<Product[]> | undefined;
  categories$: Observable<any[]>;
  categoriesLoading$: Observable<boolean>;
  categoriesError$: Observable<any>;

  private searchQuery$ = new BehaviorSubject<string>('');

  selectedCategory: string | null = null;

  protected search: boolean =false;

  constructor(private authService: AuthService,
    private dataBaseService: DataBase,
    private store: Store
  ) {

    const rawProducts$ = this.store.select(selectProducts);

    this.products$ = combineLatest([rawProducts$, this.searchQuery$]).pipe(
      map(([products, query]) =>
        products.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDescription?.toLowerCase().includes(query.toLowerCase())
        )
      )
    );

    this.loading$ = this.store.select(selectProductsLoading);
    this.error$ = this.store.select(selectProductsError);

    this.categories$ = this.store.select(CategorySelectors.selectCategories);
    this.categoriesLoading$ = this.store.select(CategorySelectors.selectCategoriesLoading);
    this.categoriesError$ = this.store.select(CategorySelectors.selectCategoriesError);
  }

  scrollToCategory(categoryName: string) {
    this.selectedCategory = categoryName;
    const anchorId = this.categoryAnchorId(categoryName);
    const element = document.getElementById(anchorId);
    if (element) {
      const yOffset = -250;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement | null;
    const value = target ? target.value : '';
    if(value===""){
      this.search=false;
    }else{
      this.search=true;
    }
    
    this.searchQuery$.next(value);
  }

  scrollToTop() {
    this.selectedCategory = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  categoryAnchorId(categoryName: string): string {

    return `category-${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
  }


}

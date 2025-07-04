import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PopUpProductDetailsComponent } from '../pop-up-product-details/pop-up-product-details.component';
import { Product } from '../../core/interfaces/product.model';
import { DataBase } from '../../core/services/dataBase.service';
import { Store } from '@ngrx/store';
import * as ProductsActions from '../../core/store/products.actions';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements AfterViewInit, OnDestroy {
  @Input() product!: Product;
  @ViewChild('cardElement', { static: true }) cardElement!: ElementRef;
  image: any | undefined;
  constructor(private dialog: MatDialog, protected dataBase: DataBase, private store: Store) {

  }
  private observer!: IntersectionObserver;
  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage();
          this.observer.disconnect(); 
        }
      });
    }, {
      threshold: 0.0,
      rootMargin: '200px'
    });

    this.observer.observe(this.cardElement.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private loadImage() {
    const localProduct = { ...this.product };
    this.dataBase.getImageUrl(localProduct.imageUid).subscribe({
      next: (p) => {
        localProduct.imageUrl = p;
        this.product = localProduct;

          this.store.dispatch(ProductsActions.setProductImage({
        productId: localProduct.id,
        imageUrl: p
      }));
      },
      error: (err) => {
        console.error('Eroare la încărcarea imaginii:', err);
      }
    });
  }

  // ngOnInit() {
  //   // this.dataBase.getImageUrl(this.product.imageUid).subscribe({
  //   //   next: (p) => {
  //   //     this.product.imageUrl=p;
  //   //     // console.log(p);
  //   //   }

  //   // });

  //   const localProduct = { ...this.product };

  //   this.dataBase.getImageUrl(localProduct.imageUid).subscribe({
  //     next: (p) => {
  //       localProduct.imageUrl = p;
  //       this.product = localProduct;
  //     },
  //     error: (err) => {
  //       console.error('Eroare la încărcarea imaginii:', err);
  //     }
  //   });

  // }



  openDetails() {
    this.dialog.open(PopUpProductDetailsComponent, {
      width: '30rem',
      height: '40rem',
      data: this.product

    });
  }
}

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { catchError, exhaustMap, forkJoin, map, mergeMap, Observable, of, pipe, switchMap, timeout } from 'rxjs';
import { DataBase } from '../services/dataBase.service';
import { Product } from '../interfaces/product.model';

@Injectable()

export class ProductsEffects {

    private actions$ = inject(Actions);
    private databaseService = inject(DataBase);

    // loadProducts$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(ProductsActions.loadProducts),
    //         exhaustMap(() =>
    //             this.databaseService.getSellingProducts().pipe(

    //                 map((data) => {
    //                     console.log('API response in effect:', data);
    //                     const products = data.payload.records.map((item: any) => ({
    //                         id: item.id,
    //                         name: item.name,
    //                         price: item.locationPrices[0].unitPriceWithVat,
    //                         imageUid: item.imageUid,
    //                         longDescription: item.longDescription,
    //                         shortDescription: item.shortDescription,
    //                         category: item.category.name,
    //                         amount: 1,
    //                     }));


    //                     return ProductsActions.loadProductsSuccess({ products });
    //                 }),
    //                 catchError((error) =>
    //                     of(ProductsActions.loadProductsFailure({ error }))
    //                 )
    //             )
    //         )
    //     )
    // );

  
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      exhaustMap(() =>
        this.databaseService.getSellingProducts().pipe(
          switchMap((data) => {
            console.log('API response in effect:', data);
            const products: Product[] = data.payload.records.map((item: any) => ({
              id: item.id,
              name: item.name,
              price: item.locationPrices[0].unitPriceWithVat,
              imageUid: item.imageUid,
              longDescription: item.longDescription,
              shortDescription: item.shortDescription,
              category: item.category.name,
              amount: 1,
            }));

         
            const productsWithImages$ = products.map((product: Product) => {
              if (!product.imageUid) {
                console.warn(`Product ${product.id} has no imageUid! Skipping image fetch.`);
                return of({
                  ...product,
                  imageUrl: null, 
                });
              }

             
              return this.databaseService.getImage(product.imageUid).pipe(
                timeout(15000),
                map((response) => ({
                  ...product,
                  imageUrl: response.payload,
                })),
                catchError((err) => {
                  console.error(`Error loading image for product ${product.id}:`, err);
                  return of({
                    ...product,
                    imageUrl: null,
                  });
                })
              );
            }, 5)

            return forkJoin(productsWithImages$) as Observable<Product[]>;
            
          
        }),
          map((productsWithImages) =>
            ProductsActions.loadProductsSuccess({ products: productsWithImages })
          ),
          catchError((error) =>
            of(ProductsActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  
}
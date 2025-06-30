import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { DataBase } from '../services/dataBase.service';

@Injectable()
export class ProductsEffects {
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.loadProducts),
            mergeMap(() =>
                this.databaseService.getSellingProducts().pipe(
                    map((data) => {
                        const products = data.payload.records.map((item: any) => ({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            imageUid: item.imageUid,
                            longDescription: item.longDescription,
                            shortDescription: item.shortDescription,
                            amount: 1,
                        }));
                        return ProductsActions.loadProductsSuccess({ products });
                    }),
                    catchError((error) =>
                        of(ProductsActions.loadProductsFailure({ error }))
                    )
                )
            )
        )
    );

    constructor(private actions$: Actions, private databaseService: DataBase) { }
}
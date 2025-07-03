import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as CategoryActions from './category.actions';
import { DataBase } from '../services/dataBase.service';

@Injectable()
export class CategoryEffects {
    private actions$ = inject(Actions);
    private databaseService = inject(DataBase);

    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CategoryActions.loadCategories),
            mergeMap(() =>
                this.databaseService.getCategorysSellingProducts().pipe(
                    map((response) => {
                        console.log('Categories API response:', response);  
                        return CategoryActions.loadCategoriesSuccess({
                            categories: response.payload.records
                        });
                    }),
                    catchError((error) => of(CategoryActions.loadCategoriesFailure({ error })))
                )
            )
        )
    );
}

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as OrderActions from './order.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { OrderSummary } from '../interfaces/order.model';
import { DataBase } from '../services/dataBase.service';

@Injectable()
export class OrderEffects {
private actions$ = inject(Actions);
private databaseService = inject(DataBase);


  loadClientOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadClientOrders),
      mergeMap(action =>
        this.databaseService.getClientOrders(action.userUID).pipe(
          map(response => {
            const mappedOrders: OrderSummary[] = response.payload.records.map((orderJson: any) => ({
              uid: orderJson.uid,
              shortCode: orderJson.shortCode,
              clientName: orderJson.clientName,
              deliveryAddressCity: orderJson.deliveryAddressCity,
              deliveryDate: orderJson.deliveryDate,
              status: orderJson.status,
              statusName: orderJson.statusName,
              shippingMethod: orderJson.shippingMethod,
              shippingMethodName: orderJson.shippingMethodName,
              items: orderJson.items.map((item: any) => ({
                uid: item.uid,
                productName: item.productName,
                quantity: item.quantity,
                unitPriceWithVat: item.unitPriceWithVat,
                totalValueWithVat: item.totalValueWithVat,
              })),
              payments: orderJson.payments.map((payment: any) => ({
                uid: payment.uid,
                paymentName: payment.paymentName,
                isPaid: payment.isPaid,
              })),
              totalValueWithVat: orderJson.totalValueWithVat,
              finalValue: orderJson.finalValue,
            }));
            return OrderActions.loadClientOrdersSuccess({ orders: mappedOrders });
          }),
          catchError(error => of(OrderActions.loadClientOrdersFailure({ error })))
        )
      )
    )
  );
}

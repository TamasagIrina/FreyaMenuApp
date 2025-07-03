import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CartActions from '../../core/store/cart.actions';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})

export class DataBase {
     private store = inject(Store);
    private apiUrl = 'https://api-staging-hesburger.freya.cloud';

    private readonly newClient = {
        "birthDate": null,
        "blockedPaymentMethods": [],
        "cityUid": "65138d8ba79645c6b16623aa22fe3e62",
        "clientGroupUid": null,
        "countryUid": "c41e27deddc14097b625317759783a9f",
        "defaultDeadlineDays": 30,
        "description": null,
        "discountPercent": 0,
        "districtUid": "8125f528844b40308346126f93697a47",
        "email": null,
        "gender": null,
        "identificationCode": null,
        "isExternalClient": false,
        "isGovernmentInstitution": false,
        "isJuridicPerson": false,
        "name": "TestProiectNou",
        "phone": null,
        "products": [],
        "streetName": null,
        "streetNo": null,
        "uniqueCode": null,
        "vatCollecting": false,
        "vatPayer": false,
        "vatUid": null,
        "zipCode": null
    };

    constructor(private http: HttpClient) { }

    getSellingProducts(): Observable<any> {

        return this.http.get<any>(
            `${this.apiUrl}/product/FindSellingProducts?pageNo=0&sortBy=orderflag&sortOrder=asc&top=0&isRetuRo=false`
        );

    }

    getImage(url: string): Observable<{ payload: string }> {
        return this.http.get<{ payload: string }>(this.apiUrl + "/Product/GetProductImage?imageUid=" + url);


    }

    getCategorysSellingProducts(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "/ProductCategory/FindSellingCategories?pageNo=0&sortBy=orderflag&sortOrder=asc&top=0");

    }

    addNewClient() {
        this.http.post<any>(this.apiUrl + "/Client/Insert", this.newClient).subscribe({
            next: (response) => {
                console.log('Client adăugat cu succes:', response.payload);
                localStorage.setItem("userUID", response.payload);
            },
            error: (error) => console.error('Eroare la adăugare client:', error),
        });
    }

    placeOrder(cartItems: any[], clientUid: string, method: any) {
        const now = new Date();

        const orderPayload = {
            "uid": null,
            "startDate":now.toISOString(),
            "deliveryDate": new Date(now.getTime() + 5 * 60 * 1000).toISOString(),
            "deliveryStartDate": new Date(now.getTime() + 10 * 60 * 1000).toISOString(),
            "deliveryStopDate": null,
            "description": null,
            "isVoid": false,
            "discountPercent": 0,
            "client": {
                "uid": clientUid,
                "deliveryAddress": {
                    "clientUid": null,
                    "clientName": null,
                    "name": "TEST PREZENTARI",
                    "phone": "-",
                    "isDefault": false,
                    "editAddressMode": false,
                    "addressDetails": null,
                    "streetName": null,
                    "streetNo": null,
                    "building": null,
                    "buildingNo": null,
                    "floor": null,
                    "apartment": null,
                    "zipCode": null,
                    "countryName": "Romania",
                    "countryUid": "c41e27deddc14097b625317759783a9f",
                    "districtName": "Alba",
                    "districtUid": "8125f528844b40308346126f93697a47",
                    "cityName": "Abrud",
                    "cityUid": "821da644b0e54851874510a579fe175b",
                    "uid": "91102105af634f6d8760cf27c08cf5a7",
                    "isDisabled": false,
                    "addedAt": null,
                    "addedBy": null,
                    "modifiedAt": null,
                    "modifiedBy": null
                }
            },
            "billingClientUid": clientUid,
            "billingClient": {
                "accounts": [],
                "products": [],
                "addresses": [],
                "fidelityCard": null,
                "parentUids": [],
                "blockedPaymentMethods": [],
                "name": "TEST PREZENTARI",
                "clientGroupUid": null,
                "clientGroupName": null,
                "description": null,
                "uniqueCode": "RO48599614",
                "identificationCode": "J40/14578/2023",
                "phone": "-",
                "email": "taner.atlatirlar@hesburger.fi",
                "discountPercent": null,
                "vatCollecting": null,
                "vatPayer": null,
                "orderFlag": 2147483647,
                "defaultDeadlineDays": 30,
                "birthDate": null,
                "countryName": "Romania",
                "countryUid": "c41e27deddc14097b625317759783a9f",
                "districtName": "Bucuresti",
                "districtUid": "a31d13bdb2334f069388cecc873b7429",
                "cityName": "Bucuresti",
                "cityUid": "4b65594947dc4d33980737d6265d19dc",
                "streetName": null,
                "streetNo": null,
                "imageUid": null,
                "parentUid": null,
                "fullAddress": null,
                "isGovernmentInstitution": false,
                "totalPromoPoints": 0,
                "isJuridicPerson": true,
                "zipCode": null,
                "vatName": null,
                "vatUid": null,
                "gender": null,
                "signatureUid": null,
                "isExternalClient": false,
                "uid": clientUid,
                "isDisabled": false,
                "addedAt": now.toISOString(),
                "addedBy": "Bogdan Vasile",
                "modifiedAt": null,
                "modifiedBy": null
            },
            "items":
                cartItems
            ,
            "payments": [
                method
            ],
            "email": "taner.atlatirlar@hesburger.fi",
            "locationUid": "1b252fdf4fba4629a1f4d2d80167a02c",
            "clientOrderSourceUid": null,
            "deliveryTax": 0,
            "deliveryHours": 2,
            "collectibleUnits": 0,
            "isRetuRo": false
        };

        return this.http.post<any>(this.apiUrl + "/clientOrder/insert", orderPayload).subscribe({
            next: (res) =>{
                console.log('Comanda plasată cu succes', res);
                this.store.dispatch(CartActions.clearCart());
            } ,
            error: (err) => console.error('Eroare la plasarea comenzii', err),
        });
        // console.log(orderPayload);
    }

}
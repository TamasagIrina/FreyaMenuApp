import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.model';

@Injectable({
    providedIn: 'root'
})

export class DataBase {
    private apiUrl = 'https://api-staging-hesburger.freya.cloud';


    constructor(private http: HttpClient) { }

    getSellingProducts(): Observable<any> {

        return this.http.get<any>(
            `${this.apiUrl}/product/FindSellingProducts?pageNo=0&sortBy=orderflag&sortOrder=asc&top=0&isRetuRo=false`
        );
        // return this.http.get<any>(this.apiUrl + "/product/FindSellingProducts?pageNo=0&sortBy=orderflag&sortOrder=asc&top=0&isRetuRo=false  ").subscribe({
        //     next: (data) => {
        //         console.log('Products fetched:', data.payload.records);

        //     },
        //     error: (error) => {
        //         console.error('Error fetching products:', error);
        //     }
        // });



    }

    getImage(url: string) {
        return this.http.get<any>(this.apiUrl + "/Product/GetProductImage?imageUid=" + url).subscribe({
            next: (data) => {
                console.log('Products fetched:', data);

            },
            error: (error) => {
                console.error('Error fetching products:', error);
            }
        });


    }

    getCategorysSellingProducts() {
        return this.http.get<any>(this.apiUrl + "/ProductCategory/FindSellingCategories?pageNo=0&sortBy=orderflag&sortOrder=asc&top=0").subscribe({
            next: (data) => {
                console.log('Products category fetched:', data.payload.records);

            },
            error: (error) => {
                console.error('Error fetching products:', error);
            }
        });

    }
}
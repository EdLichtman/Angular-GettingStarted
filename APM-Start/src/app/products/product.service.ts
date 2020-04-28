import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, tap, first } from 'rxjs/operators'

import { IProduct } from './product';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json'
    constructor(private http: HttpClient) {
        
    }
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(err => this.handleError<IProduct[]>(err))
        );
    }

    getProduct(id: number): Observable<IProduct> {
        return from(this.getProducts().toPromise().then((values) => {
            return values.filter(product => product.productId === id)[0]
        }));
    }
    private handleError<T>(err: HttpErrorResponse): Observable<T> {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is ${err.message}`;
        }
        console.error(errorMessage)
        return throwError(errorMessage);
    }
}
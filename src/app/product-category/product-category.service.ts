import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

import { ProductCategory } from './product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private productCategoriesUrl = 'api/productCategories';

  productCategories$ = this.http.get<ProductCategory[]>(this.productCategoriesUrl)
    .pipe(
      tap(data => console.log('GET ', JSON.stringify(data))),
      shareReplay(1),
      catchError(this.handleError)
    );

  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  constructor(private http: HttpClient) { }

  selectedCategoryChange(categoryId: number) {
    this.categorySelectedSubject.next(categoryId);
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}

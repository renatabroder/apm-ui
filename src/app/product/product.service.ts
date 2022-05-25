import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, combineLatest, Observable, throwError } from 'rxjs';
import { catchError, tap, map, shareReplay } from 'rxjs/operators';

import { Product } from './product';
import { ProductCategoryService } from '../product-category/product-category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  productList$: Observable<Product[]> = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      tap(data => console.log('GET ', JSON.stringify(data))),
      catchError(this.handleError)
    );

  productListWithCategory$ = combineLatest([
    this.productList$,
    this.productCategoryService.productCategories$
  ]).pipe(
    map(([products, categories]) => {
      return products.map(product => ({
        ...product,
        category: categories.find(c => product.categoryId === c.id)?.name,
      } as Product))
    }),
    shareReplay(1)
  );

  productListWithCategoryFilteredByCategory$ = combineLatest([
    this.productListWithCategory$,
    this.productCategoryService.categorySelectedAction$
  ]).pipe(
    map(([products, selectedCategoryId]) => selectedCategoryId === 0 ? products : products.filter(p => p.categoryId === selectedCategoryId)),
    shareReplay(1)
  );

  private productSelectedSubject = new BehaviorSubject<number>(0);
  productSelectedAction$ = this.productSelectedSubject.asObservable();

  selectedProduct$ = combineLatest([
    this.productListWithCategoryFilteredByCategory$,
    this.productSelectedAction$
  ]).pipe(
    map(([products, selectedProductId]) => products.find(product => product.id === selectedProductId))
  );

  constructor(private http: HttpClient, private productCategoryService: ProductCategoryService) { }

  selectedProductChange(selectedProductId: number) {
    this.productSelectedSubject.next(selectedProductId);
  }

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Product Id must be null for the Web API to assign an Id
    const newProduct = { ...product, id: null };
    return this.http.post<Product>(this.productsUrl, newProduct, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url, { headers })
      .pipe(
        tap((_data) => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<Product>(url, product, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + product.id)),
        // Return the product on an update
        map(() => product),
        catchError(this.handleError)
      );
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

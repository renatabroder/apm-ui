import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EMPTY, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProductCategoryService } from 'src/app/product-category/product-category.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  productCategories$ = this.categoryService.productCategories$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  selectedProduct$ = this.productService.selectedProduct$
    .pipe(
      tap(selected => this.setFormValues(selected)),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  selectedProductSuppliers$ = this.productService.selectedProductSuppliers$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  pageTitle$ = this.selectedProduct$
    .pipe(
      map(p => p ? `Product Detail for: ${p.name}` : null)
    );

  productEdit$ = this.productService.productEditSubject;

  productForm = this.fb.group({
    id: 0,
    name: '',
    code: '',
    category: '',
    description: '',
    price: 0,
    quantityInStock: 0
  });

  constructor(private productService: ProductService, private categoryService: ProductCategoryService, private fb: FormBuilder) { }

  setFormValues(product: Product | undefined) {
    if (product)
      this.productForm.patchValue({
        id: product.id,
        name: product.name,
        code: product.code,
        category: product.categoryId,
        description: product.description,
        price: product.price,
        quantityInStock: product.quantityInStock
      });
  }

  editProduct(edit: boolean) {
    this.productService.editProductChange(edit);
  }

  saveProduct() {
    const updatedProduct = this.productForm.getRawValue() as Product;
    this.productService.updateProduct(updatedProduct).subscribe(item => console.log(item));
  }
}

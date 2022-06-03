import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EMPTY, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProductCategoryService } from 'src/app/product-category/product-category.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  selectedProduct$ = this.productService.selectedProduct$
    .pipe(
      //tap(selected => this.setFormValues(selected)),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  pageTitle$ = this.selectedProduct$
    .pipe(
      map(p => p ? `Product Detail for: ${p.name}` : 'Add Product')
    );

  productCategories$ = this.categoryService.productCategories$
    .pipe(
      catchError(error => {
        this.errorMessageSubject.next(error);
        return EMPTY;
      })
    );

  productForm = this.fb.group({
    id: 0,
    name: '',
    code: '',
    category: '',
    description: '',
    price: 0,
    quantityInStock: 0
  });

  openForm$ = this.productService.openForm$;

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

  onCancel() {
    this.productService.openFormChange(false);
  }

  onSave() {
    this.productService.addProduct(this.productForm.value as Product);
    this.productForm.reset();
  }

}

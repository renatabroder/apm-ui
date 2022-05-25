import { Component } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductCategoryService } from 'src/app/product-category/product-category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Products';
  errorMessage: string = "";

  displayCode: boolean = false;

  productList$ = this.productService.productListWithCategory$
    .pipe(
      catchError(error => {
        this.errorMessage = error;
        return EMPTY;
      })
    );

  selectedProduct$ = this.productService.selectedProduct$;

  productCategories$ = this.categoryService.productCategories$
    .pipe(
      catchError(error => {
        this.errorMessage = error;
        return EMPTY;
      })
    );

  constructor(private productService: ProductService, private categoryService: ProductCategoryService) { }

  onSelected(productId: number): void {
    this.productService.selectedProductChange(+productId);
  }

  onSelectedCategory(categoryId: number) {
    this.categoryService.selectedCategoryChange(+categoryId);
  }

  checkChanged(): void {
    this.displayCode = !this.displayCode;
  }
}
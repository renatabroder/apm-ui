import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product-service.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Edit';

  //@Input() selectedProduct: Product | null | undefined;

  //@Input() selectedProduct: Product | null | undefined;
  productForm: FormGroup = this.fb.group({
    productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    productCode: ['', Validators.required],
    description: ''
  });

  errorMessage: string = "";

  selectedProduct: Product | null = null;

  sub!: Subscription;

  constructor(private productService: ProductService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe(
      products => this.selectedProduct = products[0]
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.selectedProduct = products[0],
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  displayProduct(product: Product | null): void {
    if (product && this.productForm) {
      // Reset the form back to pristine
      this.productForm.reset();

      // Display the appropriate page title
      if (product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${product.productName}`;
      }

      // Update the data on the form
      this.productForm.patchValue({
        productName: product.productName,
        productCode: product.productCode,
        starRating: product.starRating,
        description: product.description
      });
    }
  }

  cancelEdit(): void {
    // Redisplay the currently selected product
    // replacing any edits made
    this.displayProduct(this.selectedProduct);
  }

  saveProduct(): void {
    /* if (this.productForm.valid) {
      if (this.productForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const product = { ...this.selectedProduct, ...this.productForm.value };

        if (product.id === 0) {
          this.create.emit(product);
        } else {
          this.update.emit(product);
        }
      }
    } */
  }

  deleteProduct(): void {
    if (this.selectedProduct && this.selectedProduct.id) {
      if (confirm(`Really delete the product: ${this.selectedProduct.productName}?`)) {
        //this.delete.emit(this.selectedProduct);
      }
    } else {
      // No need to delete, it was never saved
      //this.clearCurrent.emit();
    }
  }

}

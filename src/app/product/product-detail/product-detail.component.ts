import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';
import { ProductService } from '../product-service.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  pageTitle = 'Product Edit';

  @Input() selectedProduct: Product | null = null;

  @Output() create = new EventEmitter<Product>();
  @Output() update = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
  @Output() clearCurrent = new EventEmitter<void>();

  productForm: FormGroup = this.fb.group({
    productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    productCode: ['', Validators.required],
    description: ''
  });

  errorMessage: string = "";

  constructor(private productService: ProductService, private fb: FormBuilder) { }

  displayProduct(product: Product | null): void {
    if (product && this.productForm) {
      this.productForm.reset();
      this.setPageTitle(product);
      this.updateFormData(product);
    }
  }

  private updateFormData(product: Product) {
    this.productForm.patchValue({
      productName: product.productName,
      productCode: product.productCode,
      description: product.description
    });
  }

  private setPageTitle(product: Product) {
    this.pageTitle = (product.id === 0) ? 'Add Product' : `Edit Product: ${product.productName}`;
  }

  cancelEdit(): void {
    this.displayProduct(this.selectedProduct);
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const product = { ...this.selectedProduct, ...this.productForm.value };

        if (product.id === 0) {
          this.create.emit(product);
        } else {
          this.update.emit(product);
        }
      }
    }
  }

  deleteProduct(): void {
    if (this.selectedProduct && this.selectedProduct.id) {
      if (confirm(`Really delete the product: ${this.selectedProduct.productName}?`)) {
        this.delete.emit(this.selectedProduct);
      }
    } else {
      // No need to delete, it was never saved
      this.clearCurrent.emit();
    }
  }

}

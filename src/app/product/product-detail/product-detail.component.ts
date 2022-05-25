import { Component } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  selectedProduct$ = this.productService.selectedProduct$;

  pageTitle$ = this.selectedProduct$
    .pipe(
      tap(p => console.log('pageTitle', p)),
      map(p => p ? `Product Detail for: ${p.name}` : null)
    );

  constructor(private productService: ProductService) { }

}

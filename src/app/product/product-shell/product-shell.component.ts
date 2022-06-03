import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-shell',
  templateUrl: './product-shell.component.html',
  styleUrls: ['./product-shell.component.css']
})
export class ProductShellComponent {

  openForm$ = this.productService.openForm$;

  constructor(private productService: ProductService) { }

}

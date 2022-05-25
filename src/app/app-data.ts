import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ProductCategory } from './product-category/product-category';
import { ProductCategoryData } from './product-category/product-category-data';
import { Product } from './product/product';
import { ProductData } from './product/product-data';

export class AppData implements InMemoryDbService {

    createDb(): { products: Product[], productCategories: ProductCategory[] } {
        const products = ProductData.products;
        const productCategories = ProductCategoryData.categories;
        //const suppliers = SupplierData.suppliers;
        return { products, productCategories };
    }
}
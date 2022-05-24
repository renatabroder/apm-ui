

import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './product';

export class ProductData implements InMemoryDbService {

    createDb() {
        const products: Product[] = [
            {
                id: 1,
                productName: 'Leaf Rake',
                productCode: 'GDN-0011',
                releaseDate: '05/05/2022',
                price: 12,
                description: 'Leaf rake with 48-inch wooden handle',
                starRating: 3.2,
                imageUrl: '../../assets'
            },
            {
                id: 2,
                productName: 'Garden Cart',
                productCode: 'GDN-0023',
                releaseDate: '05/05/2022',
                price: 12,
                description: '15 gallon capacity rolling garden cart',
                starRating: 4.2,
                imageUrl: '../../assets'
            },
            {
                id: 5,
                productName: 'Hammer',
                productCode: 'TBX-0048',
                releaseDate: '05/05/2022',
                price: 12,
                description: 'Curved claw steel hammer',
                starRating: 4.8,
                imageUrl: '../../assets'
            },
            {
                id: 8,
                productName: 'Saw',
                productCode: 'TBX-0022',
                releaseDate: '05/05/2022',
                price: 12,
                description: '15-inch steel blade hand saw',
                starRating: 3.7,
                imageUrl: '../../assets'
            },
            {
                id: 10,
                productName: 'Video Game Controller',
                productCode: 'GMG-0042',
                releaseDate: '05/05/2022',
                price: 12,
                description: 'Standard two-button video game controller',
                starRating: 4.6,
                imageUrl: '../../assets'
            }
        ];
        return { products };
    }
}

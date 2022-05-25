import { Product } from './product';

export class ProductData {

    static products: Product[] = [
        {
            id: 1,
            name: 'Leaf Rake',
            code: 'GDN-0011',
            description: 'Leaf rake with 48-inch wooden handle',
            price: 19.95,
            categoryId: 1,
            quantityInStock: 15,
            supplierIds: [1, 2]
        },
        {
            id: 2,
            name: 'Garden Cart',
            code: 'GDN-0023',
            description: '15 gallon capacity rolling garden cart',
            price: 32.99,
            categoryId: 1,
            quantityInStock: 2,
            supplierIds: [3, 4]
        },
        {
            id: 5,
            name: 'Hammer',
            code: 'TBX-0048',
            description: 'Curved claw steel hammer',
            price: 8.9,
            categoryId: 3,
            quantityInStock: 8,
            supplierIds: [5, 6]
        },
        {
            id: 8,
            name: 'Saw',
            code: 'TBX-0022',
            description: '15-inch steel blade hand saw',
            price: 11.55,
            categoryId: 3,
            quantityInStock: 6,
            supplierIds: [7, 8]
        },
        {
            id: 10,
            name: 'Video Game Controller',
            code: 'GMG-0042',
            description: 'Standard two-button video game controller',
            price: 35.95,
            categoryId: 5,
            quantityInStock: 12,
            supplierIds: [9, 10]
        },
        {
            id: 13,
            name: 'Chatty Cathy (no suppliers)',
            code: 'GMG-0001',
            description: 'Doll from the 1960s',
            price: 675.00,
            categoryId: 5,
            quantityInStock: 0
        },
        {
            id: 16,
            name: 'Garden Gloves',
            code: 'GDN-0006',
            description: 'Pair of gloves with claw for gardening',
            price: 10.00,
            categoryId: 1,
            quantityInStock: 8,
            supplierIds: [3, 4]
        },
        {
            id: 17,
            name: 'Flat Type Screwdriver',
            code: 'TBX-0002',
            description: 'Screwdriver with a wedge-shaped flat tip',
            price: 5.50,
            categoryId: 3,
            quantityInStock: 0
        },
        {
            id: 18,
            name: 'Chatty Cathy (no suppliers)',
            code: 'GMG-0001',
            description: 'Doll from the 1960s',
            price: 675.00,
            categoryId: 5,
            quantityInStock: 0
        }
    ];
}

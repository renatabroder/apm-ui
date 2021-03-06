export interface Product {
    id: number;
    name: string;
    code?: string;
    description?: string;
    price?: number;
    categoryId?: number;
    category?: string;
    quantityInStock?: number;
    searchKey?: string[];
    supplierIds?: number[];
}

export interface CRUDAction<T> {
    action: 'add' | 'update' | 'delete';
    data: T;
}
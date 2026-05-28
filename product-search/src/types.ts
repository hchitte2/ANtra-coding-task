export interface Product {
    id: number;
    title: string;
}

export interface ProductsResponse {
    products: Product []
    total:number
}
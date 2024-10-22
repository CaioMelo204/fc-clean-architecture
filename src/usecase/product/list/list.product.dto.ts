export interface InputListProductDTO {}

export interface ProductReturn {
    id: string;
    name: string;
    price: number;
}

export interface OutputListProductDTO {
    products: ProductReturn[];
}
export interface IProductRequest {
    category: string;
    type: string
    name: string;
    path: string;
    description: string;
    weight: string;
    price: number;
    country: string;
    imagePath: string;
    count: number;
}

export interface IProductResponse extends IProductRequest {
    id: number;
}

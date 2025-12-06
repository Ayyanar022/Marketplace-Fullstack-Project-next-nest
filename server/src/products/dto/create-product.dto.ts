export class CreateProductDto{
    name:string;
    price:number;
    description?:string;
    categoryId:string;
    sellerId?: string;  // Admin may set this, seller ignores it
}
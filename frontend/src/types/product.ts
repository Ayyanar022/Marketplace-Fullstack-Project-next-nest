

export interface Product{
    id:string;
    name:string;
    price:number;
    description?:string;
    categoryId :string;
    sellerId:string;
    imageUrl?:string; // simplified for now
    createdAt:string;
}
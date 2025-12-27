import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDto{
    @IsString()
    name:string;

    @IsNumber()
    @Min(1)
    price:number;

    @IsString()
    @IsOptional()
    description?:string;

    @IsString()
    categoryId:string;

    @IsString()
    @IsOptional()
    sellerId?: string;  // Admin may set this, seller ignores it
}
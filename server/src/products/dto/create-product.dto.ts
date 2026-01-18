import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDto{
    @IsString()
    name:string;

    @Type(()=>Number)
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

    @Type(()=>Number)
    @IsNumber()
    @Min(1)
    stock:number

    @IsString({each:true})
    @IsOptional()
    imageUrl?:string[]
}
import { Type } from "class-transformer";
import { IsNumber, IsOptional, isString, IsString, Min } from "class-validator";

export class UpdateProductDto{
    @IsOptional()
    @IsString()
    name?:string;

    @Type(()=>Number)
    @IsOptional()
    @IsNumber()
    @Min(1)
    price?:number;

    @IsOptional()
    @IsString()
    description?:string;

    @IsOptional()
    @IsString()
    categoryId?:string;

    @Type(()=>Number)
    @IsOptional()
    @IsNumber()
    @Min(1)
    stock?:number;

    @IsString({each:true})
    @IsOptional()
    imageUrl?:string[]
    
}
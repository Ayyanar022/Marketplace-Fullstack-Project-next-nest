import { IsEmail, IsString, MinLength } from "class-validator";

export class SignUpDto{
    @IsString()
    @MinLength(3)
    name:string;

    @IsEmail()
    email:string;

    @MinLength(2)
    password:string
}
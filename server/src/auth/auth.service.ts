import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private userService :UsersService,
        private jwt :JwtService
    ){}

    async signUp(dto:SignUpDto){
        const existingUser = await this.userService.findByEmail(dto.email);
        if(existingUser) throw new BadRequestException("Email alredy exists");

        const hashed = await bcrypt.hash(dto.password , 10);
        const user = await this.userService.createUser(dto,hashed);
        const accessToken = this.createToken(user.id,user.email,user.role)
        return {user:{name:user.name ,email: user.email ,role:user.role ,id:user.id} , accessToken:accessToken.token}
    }

    async login(dto:LoginDto){
        const user = await this.userService.findByEmail(dto.email);
        if(!user) return new BadRequestException("Invalid credentials");

        const isMatch = await bcrypt.compare(dto.password,user.password)
        if(!isMatch) return new BadRequestException("Invalid credentials")
        
        const accessToken = this.createToken(user.id,user.email,user.role)
        
        return {user:{name:user.name ,email:user.email ,role:user.role ,id:user.id} ,accessToken :accessToken.token}
    }

    createToken(id:string,email:string,role:Role){
        const token = this.jwt.sign({id,email,role})
        return {token};
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SignUpDto } from 'src/auth/dto/signup.dto';

@Injectable()
export class UsersService {
    constructor(private prisma :PrismaService){}

    findByEmail(email:string){
        return this.prisma.user.findUnique({where:{email}})
    }

    createUser(data:SignUpDto ,hashedPassword :string){
        return this.prisma.user.create({
            data:{
                name:data.name,
                email:data.email,
                password:hashedPassword,
            }
        })
    }

    findById(id:string){
        return this.prisma.user.findUnique({where:{id}})
    }
}

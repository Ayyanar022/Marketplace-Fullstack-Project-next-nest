import { Injectable, NotFoundException } from '@nestjs/common';
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


    //admin -> seller toggle
    async toggleSeller(sellerId :string){
        const seller = await this.prisma.user.findUnique({where:{
            id:sellerId
        }})

        if(!seller) throw new NotFoundException()
        
        return this.prisma.user.update({
            where:{id:sellerId},
            data:{isActive:!seller.isActive}
        })

    }

    // get all seller
    getAllUsers(){
        return this.prisma.user.findMany({
            where:{role:"SELLER"},
            include:{products:true}
        })
    }


    //user count
    countUser(){
        return this.prisma.user.count({
            where:{role:"CUSTOMER"}
        })
    }

    // seller count
    countSeller(){
        return this.prisma.user.count({
            where:{role:"SELLER"}
        })
    }


















}

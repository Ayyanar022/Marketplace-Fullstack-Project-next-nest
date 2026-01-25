

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CategoriesService {
    constructor(private prisma:PrismaService){}

    create(name:string){
        return this.prisma.category.create({data:{name}});
    }

    findAll(){
        return this.prisma.category.findMany()
    }

    findOne(id:string){
        return this.prisma.category.findUnique({where:{id}})
    }

    delete(id:string){
        return this.prisma.category.delete({where:{id}})
    }

   updateCat(id:string,data:string){
        return this.prisma.category.update({where:{id},
        data:{name:data}})

   }



}

import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGaurd } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('categories')
export class CategoriesController {
    
    constructor(private categoriesService : CategoriesService){}

    @Post()
    @Roles("ADMIN")
    @UseGuards(JwtAuthGaurd,RoleGuard)
    create(@Body('name') name:string ){
        return this.categoriesService.create(name)
    }

    @Get()
    @UseGuards(JwtAuthGaurd)
    getAll(){
        return this.categoriesService.findAll()
    }

    @Get(':id')
    @UseGuards(JwtAuthGaurd)
    getOne(@Param('id') id:string){
        return this.categoriesService.findOne(id);
    }

    @Delete(':id')
    @Roles("ADMIN")
    @UseGuards(JwtAuthGaurd,RoleGuard)
    delete(@Param('id') id:string){
        return this.delete(id)
    }

    @Put("edit-categories/:id")
    @Roles("ADMIN")
    @UseGuards(JwtAuthGaurd,RoleGuard)
    updatecat(@Param('id')id:string ,@Body('data')data:string){
        return this.categoriesService.updateCat(id,data)
    }


}

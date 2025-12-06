import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGaurd } from 'src/auth/guard/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
    
    constructor(private categoriesService : CategoriesService){}

    @Post()
    @UseGuards(JwtAuthGaurd)
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
    @UseGuards(JwtAuthGaurd)
    delete(@Param('id') id:string){
        return this.delete(id)
    }


}

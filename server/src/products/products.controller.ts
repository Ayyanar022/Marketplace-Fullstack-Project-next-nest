import { Body, Controller, Delete, Get, Param, Patch, Post,  Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGaurd } from 'src/auth/guard/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { extractPublicId } from 'src/utils/cloudinary';
import { FilterProfuctDto } from './dto/filter-product.dto';
import { RoleGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('products')
export class ProductsController {
    constructor(private productService :ProductsService,
        private cloudinary : CloudinaryService
    ){}

   
    @UseGuards(JwtAuthGaurd,RoleGuard)
    @Roles('ADMIN',"SELLER")
    @Post()
    create(@Body() dto:CreateProductDto , @CurrentUser() user){
        return this.productService.craete(dto,user)
    }

    @Get()
    // @UseGuards(JwtAuthGaurd)
    getAll(){
        return this.productService.findAll();
    }

    @Get()
    @UseGuards(JwtAuthGaurd)
    findAll(@Query() query:FilterProfuctDto){
        return this.productService.filterAll(query)
    }

    @Get(':id')
    // @UseGuards(JwtAuthGaurd)
    getOne(@Param("id") id:string){
        return this.productService.findUnique(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGaurd)
    update(@Param("id") id:string,@Body() dto:UpdateProductDto){
        return this.productService.update(id,dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGaurd)
    deleteOne(@Param('id') id:string){
        return this.productService.delete(id)
    }

    @Post(':id/upload')
    @UseGuards(JwtAuthGaurd)
    @UseInterceptors(FileInterceptor('image'))
   async upload(  @Param('id') id: string,  @UploadedFile() file: Express.Multer.File ) {
        const upload  = await this.cloudinary.uploadImage(file.path);
        return this.productService.uploadImage(id,upload.secure_url)
    }   

    @Delete('image/:id')
    @UseGuards(JwtAuthGaurd)
    async deleteImage(@Param('id') id:string){
        const image = await this.productService.deleteImage(id);  // to delete from database
        const publicId = extractPublicId(image.url);
        await this.cloudinary.deleteImage(publicId) // to delete from cloudinary

        return {message:"Image deleted"}
        
    }

    // @Get()

}

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

    
// for Public and user ----
    @Get()
    getAll(){
        return this.productService.findAll();
    }

 

    // filter
    @Get()
    @UseGuards(JwtAuthGaurd)
    findAll(@Query() query:FilterProfuctDto){
        return this.productService.filterAll(query)
    }

 

    // seller and admin---------------------
    @UseGuards(JwtAuthGaurd,RoleGuard)
    @Roles('ADMIN',"SELLER")
    @Post()
    create(@Body() dto:CreateProductDto , @CurrentUser() user){
        return this.productService.craete(dto,user)
    }

    // view all product -seller
    @Roles('SELLER','ADMIN')
    @UseGuards(JwtAuthGaurd , RoleGuard)
    @Get('seller-getproduct')
    async getSellerProduct(@CurrentUser() user ){
        const data = await this.productService.sellerGetAllProdct(user.id)
        console.log("data",data)
        return data
    }

    // view single product
    @UseGuards(JwtAuthGaurd,RoleGuard)
    @Roles("SELLER","ADMIN")
    @Get('seller-getproduct/:id')
    viewProduct(@CurrentUser() user ,@Param("id") id:string ){
        return this.productService.sellerViewProduct(user.id,id)
    }

    //update
    @UseGuards(JwtAuthGaurd,RoleGuard)
    @Roles("SELLER",'ADMIN')
    @Patch(':id')
    update(@Param("id") id:string,@Body() dto:UpdateProductDto){
        return this.productService.update(id,dto);
    }

    //delete
    @UseGuards(JwtAuthGaurd,RoleGuard)
     @Roles("SELLER",'ADMIN')
    @Delete(':id')
    deleteOne(@Param('id') id:string){
        return this.productService.delete(id)
    }

    // add image in add product 
    @UseGuards(JwtAuthGaurd,RoleGuard)
    @Roles('SELLER',"ADMIN")
    @Post('add-image-upload')
    @UseInterceptors(FileInterceptor('image'))
    async addImage(@UploadedFile() file:Express.Multer.File){
        // console.log("image ---",file)
        return await this.cloudinary.uploadImage(file.buffer);
    }

    // add image in update
    @UseGuards(JwtAuthGaurd,RoleGuard)
     @Roles("SELLER",'ADMIN')
    @Post(':id/-update-upload-image')
    @UseInterceptors(FileInterceptor('image'))
   async upload(  @Param('id') id: string,  @UploadedFile() file: Express.Multer.File ) {
        const upload  = await this.cloudinary.uploadImage(file.buffer);
        return this.productService.uploadImage(id,upload.secure_url)
    }   

    @UseGuards(JwtAuthGaurd,RoleGuard)
    @Roles("SELLER",'ADMIN')
    @Delete('image/:id')
    async deleteImage(@Param('id') id:string){
        const image = await this.productService.deleteImage(id);  // to delete from database
        const publicId = extractPublicId(image.url);
        await this.cloudinary.deleteImage(publicId) // to delete from cloudinary

        return {message:"Image deleted"}        
    }



    //  
    @Get(':id')
    getOne(@Param("id") id:string){
        return this.productService.findUnique(id);
    }

    // Admin - product isactive -status 
    @UseGuards(JwtAuthGaurd,RoleGuard)
    @Roles("ADMIN")
    @Patch('admin/product/:id/toggle')
    async toggleProduct(@Param('id')id:string){
        return this.productService.toggleProductActive(id)
    }






















}

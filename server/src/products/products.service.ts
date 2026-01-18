import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(private prisma:PrismaService){}

    // for public and user-----------
    findAll(){
        return this.prisma.product.findMany({include:{images:true}})
    }

    findUnique(id:string){
        return this.prisma.product.findUnique({
            where:{id},
            include:{images:true , category:true}
        })
    }


    // for seller and admin
   async craete(dto:CreateProductDto ,user){
        const category = await this.prisma.category.findUnique({
            where:{id:dto.categoryId}
        })

        let sellerId  = user.id ;  // seller default 

        // // if admin - >seller must be inside dto
        // if(user.role==='ADMIN'){
        //     if(!dto.sellerId)throw new BadRequestException("Admin must provide seller id")
            
        //     sellerId = dto.sellerId;
        // }

        console.log("dto in create product",dto)


        if(!category) throw new BadRequestException("Category not found")        
        return this.prisma.product.create({
                data:{
                    name:dto.name,
                    price:dto.price,
                    description:dto.description,
                    categoryId:dto.categoryId,
                    sellerId,
                    stock:dto.stock,    
                   
                ...(dto.imageUrl && {
                    images:{
                        createMany:{
                            data:dto.imageUrl.map(url=>({url}))
                        }
                    }      
                })
                           
                }
            })
    }

    async sellerGetAllProdct(id:string){
        return this.prisma.product.findMany({
            where:{sellerId:id},
            
            // include:{seller:true ,images:true , category:true}
        })
    }

    async sellerViewProduct(sellerId:string,productId:string){
        const product = await this.prisma.product.findUnique({
            where:{id:productId},
            include:{images:true,category:true},
        })

        if(product?.sellerId ===sellerId){
            return product
        }else{
            throw new BadRequestException("Bad Request")
        }
    }


    update(id:string, dto:UpdateProductDto){
        const {imageUrl,...res} = dto
        return this.prisma.product.update(
            {
                where:{id},
                data:{
                    ...res,
                    ...(imageUrl && {
                        images :{
                            createMany:{
                                data:imageUrl.map(url=>({url}))
                            }
                        }
                    })
                },
                

            }
        )
    }

    delete(id:string){
        return this.prisma.product.delete({where:{id}})
    }

    uploadImage(productId :string , imageUrl :string){
        return this.prisma.images.create({
            data:{
                url:imageUrl,
                productId
            }
        })
    }

    async deleteImage(id:string){
        const image = await this.prisma.images.findUnique({where:{id}})

        if(!image)  throw new BadRequestException("Image not found");

        // delete from db 
        await this.prisma.images.delete({where:{id}})
        return image // contoller will delete from cloudinary
    }

    //filter products
    async filterAll(query:any){
        const {page=1,
            limit=10 ,
            search ,
            categoryId,
            minPrice,
            maxPrice,
            sort
        } = query;

        const skip = (page-1) * limit;

        // Prisma filter object 
        const where :any ={};

        // search by product name or discription 
        if(search){
            where.OR = [
                {name: {contains :search , mode:"insensitive"}},
                {description :{contains:search ,mode :"insensitive"}}
            ]
        }

        // filter by category
        if(categoryId){
            where.categoryId = categoryId;
        }

        if(minPrice || maxPrice){
            where.price = {};
            if(minPrice) where.price.gte = Number(minPrice);
            if(maxPrice) where.price.lte = Number(maxPrice);            
        }

        // sorting logic 
        const orderBy ={};

        switch (sort){
            case 'price_asc' : 
                orderBy['price'] = 'asc';
                break;
            case 'price_desc':
                orderBy['price'] = 'desc';
                break;
            case "newest":
                orderBy['createdAt'] = 'desc';
                break;
            case "oldest":
                orderBy['createdAt'] = 'ase';
                break;
        }


        const [product ,total ] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip :Number(skip),
                take:Number(limit),
                orderBy,
                include:{images :true ,category:true}
            }),
            this.prisma.product.count({where}),
        ]);

        return {
            data:ProductsService,
            page:Number(page),
            limit:Number(limit),
            total,
            totalPages:Math.ceil(total /limit),
        };
    }


    // ADIN - >Enable disable Product 

    async toggleProductActive(productId:string){
        const product = await this.prisma.product.findUnique({
            where:{id:productId}
        })

        if(!product) throw new NotFoundException();

        return this.prisma.product.update({
            where:{id:productId},
            data:{
                isActive : !product.isActive
            },
        })

    }

    
























}

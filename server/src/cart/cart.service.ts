import { BadRequestException, Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CartService {
    constructor(private prisma:PrismaService){}
    // 1.Get Cart (auto-create if not exists)
    // 2) Add Product to Cart
    // 3) Update Cart Item Quantity
    // 4. remove item from cart 
    // 5. clear entire cart 

    //1.Get Cart (auto-create if not exists)
    async getCart(userId:string):Promise<Cart>{
        const existingg = await this .prisma.cart.findUnique({
            where:{userId},
            include:{
                cartItems:{
                    include:{
                        product:true
                    }
                }
            }
        })

       if(existingg) return existingg

        // if user has no cart create one
        
           const cart =  await this.prisma.cart.create({
            data :{userId},
            include:{
                cartItems:{
                    include:{product:true}
                }
            }
           })        

            return cart;
    }

    //2. add to cart
    async addToCart(userId :string,productId:string,quantity=1){
        const cart = await this.getCart(userId)!;

        const existingItem = await this.prisma.cartItems.findFirst({
            where:{
                cartId:cart.id ,
                productId:productId ,
            }
        })

        console.log("exis",existingItem)

      
        if(existingItem){
            //increase qty
            return this.prisma.cartItems.update({
                where:{id:existingItem.id},
                data:{quantity:existingItem.quantity+quantity},
            })
        }

        // create new cart item 
        return this.prisma.cartItems.create({
            data:{
                cartId:cart.id,
                productId,quantity
            }
        })       
    }


     //3. update cart qty 
        async updateCartQty(itemId:string,quantity:number){
            if(quantity<=0) throw new BadRequestException("Quantity must not be 0");

            return this.prisma.cartItems.update({
                where:{id:itemId},
                data:{quantity},
            })
        }

        // 4. remove item from cart 
        async removeItem(itemId:string){
            const item = await this.prisma.cartItems.findUnique({where:{id:itemId}})
            console.log("-----------item",item)
            if(!item) throw new BadRequestException("Cart Product not found")
            return this.prisma.cartItems.delete({
                where:{id:itemId}
            })
        }

        // 5. clear entire cart 
        async clearCart(userId:string){
            const cart = await this.getCart(userId);

            return this.prisma.cartItems.deleteMany({
                where:{cartId:cart.id}
            })
        }










}

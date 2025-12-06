import { BadRequestException, Injectable } from '@nestjs/common';
import { orderStatus } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OrderService {
    constructor(private prisma:PrismaService){}

    //1. Takes user’s cart
    //  Creates order
    //  Stores order items
    //  Clears the cart
    async placeOrder(userId:string){
        const cart = await this.prisma.cart.findUnique({
            where:{id:userId},
            include:{
                cartItems:{
                    include:{product:true}
                }
            }
        })
        

         if(!cart || cart.cartItems.length===0) throw new  BadRequestException("Cart is Empty");

         // calculate total 
         const total = cart.cartItems.reduce((sum,item)=>{
            return  sum+ item.quantity* item.product.price;
         },0)


         // create order
         const order = await  this.prisma.order.create({
            data:{
                userId,
                total,
                items:{
                    create:cart.cartItems.map((item)=>({
                        productId :item.productId,
                        quantity:item.quantity,
                        price:item.product.price
                    }))
                },           
            },
            include:{items:true}
         })

         // clear cart
         await this.prisma.cartItems.deleteMany({
            where:{cartId:cart.id},
         })

         
    }


    // get user orders
    async getUserOrders(userId:string){
        return this.prisma.order.findMany({
            where:{userId},
            include:{
                items:{
                    include:{product:true}
                }
            },
            orderBy:{createdAt:'desc'},
        })
    }

    //get seller order 
    async getSellerOredrs(sellerId:string){
        return this.prisma.order.findMany({
            where:{
                items:{
                    some:{
                        product:{sellerId}
                    }
                }
            },
            include:{
                items:{
                    include:{product:true}
                }
            }
        })
    }

    // update status
    async updateStatus(orderId:string,status:orderStatus){
        return this.prisma.order.update({
            where:{id:orderId},
            data:{status}
        })
    }




   
}

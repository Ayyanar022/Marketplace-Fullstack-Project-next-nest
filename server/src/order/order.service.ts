import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { orderStatus } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class OrderService {
    constructor(private prisma:PrismaService){}

    //1. Takes user’s cart
    //  Creates order
    //  Stores order items
    //  Clears the cart
    async placeOrder(userId:string,key:string){
      
        //-----------idempotency thing-----------------------
        if(!key) {
            throw new BadRequestException("IdemPtency key requird")
        }

        //1. check if alredy processed  this request IDEMPOTENCY
        const existing = await this.prisma.idempotencyKey.findUnique({
            where:{key}
        })

        if(existing){
            return existing.response ; // return old result
        }
//---------------------------------------------------------------------
        // actual logic for place order
        const cart = await this.prisma.cart.findUnique({
            where:{userId:userId},
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

         const order = await this.prisma.$transaction(async(tx)=>{

            // create first time request idempotency key ( this prevents duplicats )
            await this.prisma.idempotencyKey.create({
                data:{
                    key,
                    userId,
                    endpoint:'/order'
                }
            })

            for(const item of cart.cartItems){     

                if(item.quantity > item.product.stock ) throw new BadRequestException("Stock not avilable")
                
                await tx.product.update({  
                where:{id:item.product.id},
                data:{stock :{decrement:item.quantity}}
            })

             }                           

              // create order
            const order = await  tx.order.create({
                    data:{
                        userId,
                        total,
                        items:{
                            create:cart.cartItems.map((item)=>({
                                productId :item.productId,
                                quantity:item.quantity,
                                price:item.product.price,
                                sellerId:item.product.sellerId,
                            }))
                        },           
                    },
                    include:{items:true}
                })

                // clear cart
                await tx.cartItems.deleteMany({
                    where:{cartId:cart.id},
                })

                // store idempotency 
                await tx.idempotencyKey.update({
                    where :{key},
                    data:{response:order}
                })
         
              return order;         
         })

    }


    // get user orders
    async getUserOrders(userId:string){
        return this.prisma.order.findMany({
            where:{userId},
            include:{
                items:{
                    include:{product:{include:{images:true}}}
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
                    where:{
                        product:{sellerId}
                    },
                    include:{product:{include:{images:true}}}
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

    // update order-item status 
    async updateOrderItemStatus(
        sellerId:string,
        orderItemId:string,
       status: 'PACKED' | 'SHIPPED'
    ){
        const orderItem = await this.prisma.orderItem.findUnique({
            where:{id:orderItemId}
        })

        // item vailability check
        if(!orderItem) throw new NotFoundException("Order Item Not found")
        
        // ownership check
        if(orderItem.sellerId !==sellerId) throw new ForbiddenException();

        // validate 
        if(
            (status==='PACKED' && orderItem.status!=='PENDING') ||
            (status === 'SHIPPED' && orderItem.status !=='PACKED')
        ){
            throw new BadRequestException("Invalid Status transition")
        }

        return this.prisma.orderItem.update({
            where:{id:orderItemId},
            data:{status}
        })
    }


    // cancel-order-item
    async cancelOrderItem(userId:string,orderItemId:string){

        await this.prisma.$transaction(async(tx)=>{

               const orderItem = await tx.orderItem.findFirst({
                            where:{
                                id:orderItemId,
                                order:{userId:userId}
                            }
                     })
            
                if(!orderItem || orderItem.status !== "PENDING"){
                     throw new BadRequestException('Wrong input , Cannot cancel');
                }

                    await tx.orderItem.update({
                        where :{id:orderItemId},
                        data:{status:"CANCELLED"}
                    })

                     await tx.product.update({
                        where:{id:orderItem.productId},
                        data:{
                            stock:{increment : orderItem.quantity}
                        }
                    })
        })
     


      
           

    
    }



   
}

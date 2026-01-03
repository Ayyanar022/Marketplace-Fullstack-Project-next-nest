import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGaurd } from 'src/auth/guard/jwt-auth.guard';
import { OrderService } from './order.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { RoleGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { orderStatus } from '@prisma/client';
import { UpdateOrderItemStatusDto } from './dto/update-order-item-status.dto';

@UseGuards(JwtAuthGaurd)
@Controller('order')
export class OrderController {
    constructor(private orderService :OrderService){}


    @Post()
    @UseGuards(RoleGuard)
    @Roles('CUSTOMER')
    placeOrder(@Req() req:Request , @CurrentUser() user){
        const key = req.headers['idempotency-key'] as string ;
        return this.orderService.placeOrder(user.id ,key);
    }

    @Get('my')
    getUserOrders(@CurrentUser()user){
        return this.orderService.getUserOrders(user.id)
    }

    @UseGuards(RoleGuard)
    @Roles("SELLER",'ADMIN')
    @Get('seller')
   async getSellerOrder(@CurrentUser() user){
        console.log("seller order --- ",user)
        const res = await this.orderService.getSellerOredrs(user.id)
        console.log("return--res",res)
        return res
    }

    @UseGuards(RoleGuard)
    @Roles('SELLER','ADMIN')
    @Patch(':id/status')
    updateSattus(@Param('id') orderId:string , @Body('status')status:orderStatus){
            return this.orderService.updateStatus(orderId,status)
    }

    //update orderitem status - seller
    @Patch('seller/order-items/:id/status')
    @Roles("SELLER")
    @UseGuards(RoleGuard,JwtAuthGaurd)
    updateItem_order_Status(
         @CurrentUser('id') user,
         @Param("id")id:string,
         @Body()dto:UpdateOrderItemStatusDto
    ){
        // console.log("sellerId,id,dto.status-----pp",user.id,id,dto.status)
        return this.orderService.updateOrderItemStatus(user.id,id,dto.status)
    }

    // cancel orderitem -user
    @Patch('user/order-items/:id/cancel-order')
    @Roles("CUSTOMER")
    @UseGuards(RoleGuard,JwtAuthGaurd)
    cancelOrederItem(@CurrentUser()user ,@Param('id')id:string){
        // console.log("uerid-----id",user.id,id)
        return this.orderService.cancelOrderItem(user.id,id)
    }


}

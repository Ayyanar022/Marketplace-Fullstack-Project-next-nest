import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGaurd } from 'src/auth/guard/jwt-auth.guard';
import { OrderService } from './order.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { RoleGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { orderStatus } from '@prisma/client';

@UseGuards(JwtAuthGaurd)
@Controller('order')
export class OrderController {
    constructor(private orderService :OrderService){}

    @Post()
    placeOrder(@CurrentUser() user){
        return this.orderService.placeOrder(user.id);
    }

    @Get()
    getUserOrders(@CurrentUser()user){
        return this.orderService.getUserOrders(user.id)
    }

    @UseGuards(RoleGuard)
    @Roles("SELLER",'ADMIN')
    @Get('seller')
    getSellerOrder(@CurrentUser() user){
        return this.orderService.getSellerOredrs(user.id)
    }

    @UseGuards(RoleGuard)
    @Roles('SELLER','ADMIN')
    @Patch(':id/status')
    updateSattus(@Param('id') orderId:string , @Body('status')status:orderStatus){
            return this.orderService.updateStatus(orderId,status)
    }
}

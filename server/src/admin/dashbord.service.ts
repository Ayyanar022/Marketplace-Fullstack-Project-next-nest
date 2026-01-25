import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { OrderService } from "src/order/order.service";
import { ProductsService } from "src/products/products.service";
import { UsersService } from "src/users/users.service";




@Injectable()
export class DashbordService {
    constructor(
        private userService : UsersService,
        private productService : ProductsService,
        private orderService :OrderService,
    ){}

   async getdashbordCount(){
        const users = await this.userService.countUser();
        const sellers = await this.userService.countSeller();
        const products = await this.productService.productCount();
        const orders = await this.orderService.orderCount();
        const orderStatus = await this.orderService.orderSatusCount();

        return{
            users,
            sellers,
            products,
            orders,
            orderStatus,    
        }
    }

}
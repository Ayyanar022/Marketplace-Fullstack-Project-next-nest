import { Module } from "@nestjs/common";
import { Sellercontroller } from "./seller.controller";
import {  DashbordSellerService } from "./dashbord.service";
import { ProductsModule } from "src/products/products.module";
import { OrderModule } from "src/order/order.module";



@Module({
    imports:[ProductsModule,OrderModule],
    controllers:[Sellercontroller],
    providers:[DashbordSellerService],

})

export class SellerModule {}
import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { DashbordService } from "./dashbord.service";
import { OrderModule } from "src/order/order.module";
import { UsersModule } from "src/users/users.module";
import { ProductsModule } from "src/products/products.module";


@Module({
    imports:[
        OrderModule,
        UsersModule,
        ProductsModule
    ],
    controllers:[AdminController],
    providers:[DashbordService],
})

export class adminModule {}
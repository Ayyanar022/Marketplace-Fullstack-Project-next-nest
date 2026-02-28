import { Injectable } from "@nestjs/common";
import { OrderService } from "src/order/order.service";
import { ProductsService } from "src/products/products.service";



@Injectable()
export class DashbordSellerService{
    constructor(
        private productService:ProductsService ,
      private  orderService:OrderService
    ){}


    async dashbordDatas(sellerId:string){
        console.log("sellerId000",sellerId)
        const productcount =await this.productService.sellerProductCount(sellerId);
        const lowStockcountProduct =await this.productService.lowstockProductCount(sellerId);
        const orderItemCount =await this.orderService.sellerorderItemCount(sellerId)
        const orderBysatusC =await this.orderService.ordersBySattusCount(sellerId);

        // console.log("productcount------",productcount)

        return{
            productcount,
            orderItemCount,
            orderBysatusC,
            lowStockcountProduct,
        }

    }



}
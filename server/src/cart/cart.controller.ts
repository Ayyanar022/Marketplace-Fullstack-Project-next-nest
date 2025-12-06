import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGaurd } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';


 @UseGuards(JwtAuthGaurd)
@Controller('cart')
export class CartController {
    constructor(private cartService:CartService){}
        
    // 1.Get Cart (auto-create if not exists)
    // 2) Add Product to Cart
    // 3) Update Cart Item Quantity
    // 4. remove item from cart 
    // 5. clear entire cart 

    @Get("")   
    getCart(@CurrentUser() user){
        return this.cartService.getCart(user.id)
    }

    @Post()
    addToCart(
        @CurrentUser() user,
        @Body() productId:string,
        @Body() quantity:number
    ){
        return this.cartService.addToCart(user.id,productId,quantity)
    }

    @Patch(':id')
    updateQuantity(@Param() itemId:string, @Body() quantity:number){
        return this.cartService.updateCartQty(itemId,quantity)
    }

    @Delete(':id')
    removeItem(@Param('id') itemId:string){
        return this.cartService.removeItem(itemId)
    }

    @Delete()
    clear(@CurrentUser()user){
        return this.cartService.clearCart(user.id);
    }
}

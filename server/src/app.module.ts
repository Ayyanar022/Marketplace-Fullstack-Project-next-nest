import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [ ConfigModule.forRoot({isGlobal:true}),
    AuthModule, UsersModule ,
     PrismaModule, CategoriesModule,
      ProductsModule, CartModule, OrderModule,
      ThrottlerModule.forRoot({
        throttlers:[
          {
            ttl:60,   // time window in seconds
            limit:100,  // max request per window
          }
        ]
      })
    ],
})
export class AppModule {}

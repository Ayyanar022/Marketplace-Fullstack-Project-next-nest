import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { adminModule } from './admin/admin.module';

@Module({
  imports: [ ConfigModule.forRoot({isGlobal:true}),
    AuthModule, UsersModule ,
     PrismaModule, CategoriesModule,
      ProductsModule, CartModule, OrderModule,
      adminModule,
    
      // for rate limiting--------------
      ThrottlerModule.forRoot({
        throttlers:[
          {
            ttl:60,   // time window in seconds
            limit:100,  // max request per window
          }
        ]
      })
    ],

    providers:[
      { // for rate limiting
        provide :APP_GUARD,
        useClass:ThrottlerGuard,
      }

    ]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ ConfigModule.forRoot({isGlobal:true}),
    AuthModule, UsersModule ,PrismaModule, CategoriesModule, ProductsModule],
})
export class AppModule {}

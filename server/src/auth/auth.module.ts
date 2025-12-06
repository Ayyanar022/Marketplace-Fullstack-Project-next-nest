import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { RoleGuard } from './guard/roles.guard';

@Module({
  imports:[
    UsersModule,
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET,
      signOptions:{expiresIn: String(process.env.JWT_EXPIRES_IN) as any},
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,RoleGuard],
  exports: [RoleGuard]
})
export class AuthModule {}

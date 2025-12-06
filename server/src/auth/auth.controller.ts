import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGaurd } from './guard/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('signup')
    signup(@Body() dto:SignUpDto){
        return this.authService.signUp(dto);
    }

    @Post('login')
    login(@Body() dto:LoginDto){
        return this.authService.login(dto)
    }

    @Get('me')
    @UseGuards(JwtAuthGaurd)
    me(@CurrentUser() user){
        return user
    }

}

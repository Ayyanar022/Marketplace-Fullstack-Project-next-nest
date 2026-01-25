import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGaurd } from 'src/auth/guard/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guard/roles.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService :UsersService){}

    // toggle seller 
    @UseGuards(JwtAuthGaurd,RoleGuard)
    @Roles("ADMIN")
    @Patch('/admin/sellers/:id/toggle')
    toggleSeller(@Param('id')id:string){
        return this.userService.toggleSeller(id)
    }

    // get all seller 
    @UseGuards(JwtAuthGaurd,RoleGuard)
    @Roles('ADMIN')
    @Get('/get-all-seller')
    getAllSeller(){
        return this.userService.getAllUsers()
    }

















    


}

import { Controller, Get, UseGuards } from "@nestjs/common";
import { DashbordService } from "./dashbord.service";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGaurd } from "src/auth/guard/jwt-auth.guard";
import { RoleGuard } from "src/auth/guard/roles.guard";



@Controller('admin')
export class AdminController{

    constructor(private dashbordService : DashbordService){}

    @UseGuards(JwtAuthGaurd,RoleGuard)
    @Roles("ADMIN")
    @Get('/dashbord-count')
    getDashbordCount(){
        return this.dashbordService.getdashbordCount()
    }


}
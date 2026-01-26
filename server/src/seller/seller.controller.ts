import { Controller, Get, UseGuards } from "@nestjs/common";
import { DashbordService } from "src/admin/dashbord.service";
import { DashbordSellerService } from "./dashbord.service";
import { Role } from "@prisma/client";
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGaurd } from "src/auth/guard/jwt-auth.guard";
import { RoleGuard } from "src/auth/guard/roles.guard";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";




@Controller('seller')
export class Sellercontroller{
    constructor(private dashbordSellerService:DashbordSellerService ){}

    @Roles('SELLER')
    @UseGuards(JwtAuthGaurd,RoleGuard)
    @Get("/dashbord-counts")
    dashbordDatas(@CurrentUser() user ){
        return this.dashbordSellerService.dashbordDatas(user.id)
    }
}
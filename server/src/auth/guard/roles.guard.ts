import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles.decorator";



@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY,[
            context.getHandler(),
            context.getClass,
        ])

        if( !requiredRoles)return true // no role restrition 

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if(!user)return false;

        return requiredRoles.includes(user.role)
        
    }
}
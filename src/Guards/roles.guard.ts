import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector:Reflector){}
        canActivate(context: ExecutionContext){
            const role = context.switchToHttp().getRequest().user.role
            const allowedRoles = this.reflector.get('roles', context.getClass())

            if(allowedRoles.includes(role)){
                return true;
            }
            return false
        }
    }


import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from "@nestjs/common"
import { AuthGuard } from "src/Guards/auth.guard"
import { RolesGuard } from "src/Guards/roles.guard"


export const AuthUser = createParamDecorator(
    (data, cxt: ExecutionContext)=>{
        const req = cxt.switchToHttp().getRequest()
    return req.user    
}
)

export const Roles = (roles: string[]) => SetMetadata('roles', roles)

export function Auth(roles: string[]){
    return applyDecorators(
        UseGuards(AuthGuard, RolesGuard),
        Roles(roles)
    )
}
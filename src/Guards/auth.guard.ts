import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";



@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest()

        if (request.body.name){
            request.user = {name:'Tom', email: 'test', role:'admin'}
            return true
        } 
        return false
    }
}
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthUtils } from '../utils/utils.auth';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        let res = AuthUtils.decodeToken(request.headers.authorization);
        if(!res) {
            throw new UnauthorizedException();
        }
        request.user = res.user;
        return true;
    }
}

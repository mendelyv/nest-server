import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TokenUtils } from '../utils/utils.token';

@Injectable()
export class AuthGuard implements CanActivate {
    @Inject()
    tokenUtils: TokenUtils;

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        let res = this.tokenUtils.decodeToken(request.headers.authorization);
        if(!res) {
            throw new UnauthorizedException();
        }
        return true;
    }
}

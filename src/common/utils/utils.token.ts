import { Injectable } from '@nestjs/common'
import * as Jwt from 'jsonwebtoken';
import { envConfig } from '../config';

@Injectable()
export class TokenUtils {

    /**
     * 生成token，默认10天过期
     * @param user - 用户信息
     * @param expires - 过期时间
     * @returns token
     */
    generateToken(user: any, expires = 864000) {
        const tokenUser = {
            username: user.username,
            id: user.id,
        };
        return Jwt.sign(
            { user: tokenUser },
            envConfig.jwtSecret,
            { algorithm: 'HS256', expiresIn: expires }
        );
    }


    /**
     * 解析token
     * @param token - 
     * @returns 
     */
    decodeToken(token: string) {
        let result: string | Jwt.JwtPayload;
        Jwt.verify(
            token,
            envConfig.jwtSecret,
            { ignoreExpiration: true },
            (err, decoded) => {
                if (!err) {
                    result = decoded;
                }
            }
        );
        return result;
    }

}

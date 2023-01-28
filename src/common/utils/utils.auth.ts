import { Injectable } from '@nestjs/common'
import * as Jwt from 'jsonwebtoken';
import { envConfig } from '../config';

@Injectable()
export class AuthUtils {

    /**
     * 生成token，默认10天过期
     * @param user - 用户信息
     * @param expires - 过期时间
     * @returns token
     */
    static generateToken(user: any, expires: string | number = 864000) {
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
    static decodeToken(token: string) {
        if(token == null) return null;
        const regex = /((?:\.?(?:[A-Za-z0-9-_]+)){3})$/gm;
        const matchRes = token.match(regex);
        if(!matchRes) return null;
        token = matchRes[0];
        let result: any;
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

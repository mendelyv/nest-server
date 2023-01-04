
import { Injectable } from '@nestjs/common'
import Redis, { RedisOptions } from 'ioredis';
import { envConfig } from 'src/common/config';
import { LogManager } from '../log/log.manager';

@Injectable()
export class AppCacheService {
    private _redis: Redis;
    private _enable: boolean;

    public get redis() {
        if (!envConfig.redis.enable) {
            const logFormat = `****************************************************************
    Redis environment config was disabled
 ****************************************************************`;
            LogManager.error(logFormat);
            return null;
        }
        return this._redis;
    }

    constructor() {
        const config = envConfig.redis;
        this._enable = config.enable;
        if (!this._enable) return;

        const options: RedisOptions = {
            host: config.host,
            port: parseInt(config.port),
            password: config.password,
            db: config.index,
        }
        this._redis = new Redis(options);
    }

}

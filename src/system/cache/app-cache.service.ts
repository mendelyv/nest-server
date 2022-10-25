
import { Injectable } from '@nestjs/common'
import Redis, { RedisOptions } from 'ioredis';
import { envConfig } from 'src/common/config';
import { LogManager } from '../log/log.manager';

@Injectable()
export class AppCacheService {
    private _redis: Redis;
    private _enable: boolean;

    public get redis() {
        if (!envConfig.enable_redis) {
            const logFormat = `****************************************************************
    Redis environment config was disabled
 ****************************************************************`;
            LogManager.error(logFormat);
            return null;
        }
        return this._redis;
    }

    constructor() {
        this._enable = envConfig.enable_redis;
        if (!this._enable) return;

        const options: RedisOptions = {
            host: envConfig.redis_host,
            port: parseInt(envConfig.redis_port),
            password: envConfig.redis_password,
            db: envConfig.redis_db_index,
        }
        this._redis = new Redis(options);
    }

}

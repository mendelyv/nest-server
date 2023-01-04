import { TransformFnParams } from 'class-transformer';
import { AliossConfig } from './alioss.config';
import { DatabaseConfig } from './database.config';
import { RedisConfig } from './redis.config';
/** 默认配置，覆盖级别最低 */

/** 运行端口 */
export const port = '7788';

export const redisConfig: RedisConfig = {
    enable: true,
    host: '127.0.0.1',
    port: '6379',
    password: '',
    index: 0,
}

export const databaseConfig: DatabaseConfig = {
    enable: true,
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '12345678',
    database: 'database_name',
    sync: false,
}

export const ossConfig: AliossConfig = {
    enable: false,
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
    region: '',
    endpoint: '',
    basePath: '',
}

/**
 * 设置配置文件默认值
 */
export function setDefault(value: TransformFnParams, rollback: unknown) {
    return value.value ? value.value : rollback;
}

import * as OSS from 'ali-oss'
/** 默认配置，覆盖级别最低 */

/** 运行端口 */
export const server_port = '7890';
/** redis主机 */
export const redis_host = '127.0.0.1';
/** redis端口 */
export const redis_port = '6379';
/** redis目标库索引 */
export const redis_db_index = 0;
/** redis密码 */
export const redis_password = '';
/** database主机 */
export const db_host = '127.0.0.1';
/** database端口 */
export const db_port = '3306';
/** database用户 */
export const db_user = 'root';
/** database密码 */
export const db_password = '12345678';
/** 数据库名称 */
export const db_name = 'database_name';
/** 启用oss */
export const enable_oss = false;
/** oss配置 */
export const oss: OSS.Options = {
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
    region: '',
    endpoint: '',
}
/** oss文件根路径 */
export const ossBaseFilePath: string = 'outsourcing-2022/audi-sq5';

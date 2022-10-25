import { Expose, Transform, TransformFnParams, Type } from "class-transformer";
import { IsBoolean, IsInt, IsIP, IsNotEmpty, IsPort, IsString, ValidateIf } from "class-validator";
import * as defaultEnvConfig from "../default";
import * as OSS from 'ali-oss'

export class EnvConfigEntity {
    /** 运行端口 */
    @Expose()
    @IsString()
    @IsPort()
    @Transform((v) => setDefault(v, defaultEnvConfig.server_port), { toClassOnly: true })
    readonly server_port: string;

    /** 启用Redis */
    @Expose()
    @IsBoolean()
    @Transform((v) => setDefault(v, defaultEnvConfig.enable_redis), { toClassOnly: true })
    readonly enable_redis: boolean;

    /** redis主机 */
    @Expose()
    @ValidateIf((self) => self.enable_redis)
    @IsString()
    @IsIP()
    @Transform((v) => setDefault(v, defaultEnvConfig.redis_host), { toClassOnly: true })
    readonly redis_host: string;

    /** redis端口 */
    @Expose()
    @ValidateIf((self) => self.enable_redis)
    @IsString()
    @IsPort()
    @Transform((v) => setDefault(v, defaultEnvConfig.redis_port), { toClassOnly: true })
    readonly redis_port: string;

    /** redis目标库索引 */
    @Expose()
    @ValidateIf((self) => self.enable_redis)
    @IsInt()
    @Transform((v) => setDefault(v, defaultEnvConfig.redis_db_index), { toClassOnly: true })
    readonly redis_db_index: number;

    /** redis密码 */
    @Expose()
    @ValidateIf((self) => self.enable_redis)
    @IsString()
    @Transform((v) => setDefault(v, defaultEnvConfig.redis_password), { toClassOnly: true })
    readonly redis_password: string;

    /** database主机 */
    @Expose()
    @IsString()
    @IsIP()
    @IsNotEmpty()
    @Transform((v) => setDefault(v, defaultEnvConfig.db_host), { toClassOnly: true })
    readonly db_host: string;

    /** database端口 */
    @Expose()
    @IsString()
    @IsPort()
    @IsNotEmpty()
    @Transform((v) => setDefault(v, defaultEnvConfig.db_port), { toClassOnly: true })
    readonly db_port: string;

    /** database用户 */
    @Expose()
    @IsString()
    @IsNotEmpty()
    @Transform((v) => setDefault(v, defaultEnvConfig.db_user), { toClassOnly: true })
    readonly db_user: string;

    /** database密码 */
    @Expose()
    @IsString()
    @IsNotEmpty()
    @Transform((v) => setDefault(v, defaultEnvConfig.db_password), { toClassOnly: true })
    readonly db_password: string;

    /** 数据库名称 */
    @Expose()
    @IsString()
    @IsNotEmpty()
    @Transform((v) => setDefault(v, defaultEnvConfig.db_name), { toClassOnly: true })
    readonly db_name: string;

    /** 是否同步表结构 */
    @Expose()
    @IsBoolean()
    @Transform((v) => setDefault(v, false), { toClassOnly: true })
    readonly db_sync: boolean;

    /** oss配置 */
    @Expose()
    @Transform((v) => setDefault(v, defaultEnvConfig.oss), { toClassOnly: true })
    readonly oss: OSS.Options

    /** oss文件根路径 */
    @Expose()
    @IsString()
    @Transform((v) => setDefault(v, defaultEnvConfig.ossBaseFilePath), { toClassOnly: true })
    readonly ossBaseFilePath: string;

    /** jwt */
    @Expose()
    @IsString()
    readonly jwtSecret: string;
}


function setDefault(value: TransformFnParams, rollback: unknown) {
    return value.value ? value.value : rollback;
}

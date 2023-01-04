import { Expose, Transform, Type } from "class-transformer";
import { IsNotEmptyObject, IsPort, IsString, ValidateNested } from "class-validator";
import { AliossConfig } from "./dtos/alioss.config";
import { DatabaseConfig } from "./dtos/database.config";
import { databaseConfig, ossConfig, port, redisConfig, setDefault } from "./dtos/default.config";
import { RedisConfig } from "./dtos/redis.config";

export class EnvironmentConfig {
    /** 运行端口 */
    @Expose()
    @Transform((v) => setDefault(v, port), { toClassOnly: true })
    @IsPort()
    readonly port: string;

    /** 数据库配置 */
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => DatabaseConfig)
    @Transform((v) => setDefault(v, databaseConfig), { toClassOnly: true })
    @IsNotEmptyObject()
    readonly database: DatabaseConfig;

    /** redis配置 */
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => RedisConfig)
    @Transform((v) => setDefault(v, redisConfig), { toClassOnly: true })
    @IsNotEmptyObject()
    readonly redis: RedisConfig;

    /** OSS配置 */
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => AliossConfig)
    @Transform((v) => setDefault(v, ossConfig), { toClassOnly: true })
    @IsNotEmptyObject()
    readonly oss: AliossConfig;

    /** jwt */
    @Expose()
    @IsString()
    readonly jwtSecret: string;
}



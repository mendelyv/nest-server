import { Expose, Transform, Type } from "class-transformer";
import { IsNotEmptyObject, IsPort, IsString, ValidateNested } from "class-validator";
import { AliossConfig } from "./dtos/alioss.config";
import { DatabaseConfig } from "./dtos/database.config";
import { setDefault } from "./dtos/default.config";
import * as defaultConfig from "./dtos/default.config";
import { ExcelExportConfig } from "./dtos/excel-export.config";
import { RedisConfig } from "./dtos/redis.config";

export class EnvironmentConfig {
    /** 运行端口 */
    @Expose()
    @Transform((v) => setDefault(v, defaultConfig.port), { toClassOnly: true })
    @IsPort()
    readonly port: string;

    /** 数据库配置 */
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => DatabaseConfig)
    @Transform((v) => setDefault(v, defaultConfig.databaseConfig), { toClassOnly: true })
    @IsNotEmptyObject()
    readonly database: DatabaseConfig;

    /** redis配置 */
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => RedisConfig)
    @Transform((v) => setDefault(v, defaultConfig.redisConfig), { toClassOnly: true })
    @IsNotEmptyObject()
    readonly redis: RedisConfig;

    /** OSS配置 */
    @Expose()
    @ValidateNested({ each: true })
    @Type(() => AliossConfig)
    @Transform((v) => setDefault(v, defaultConfig.ossConfig), { toClassOnly: true })
    @IsNotEmptyObject()
    readonly oss: AliossConfig;

    /** jwt */
    @Expose()
    @IsString()
    readonly jwtSecret: string;

    /** Excel导出配置 */
    @Expose()
    @Type(() => ExcelExportConfig)
    @ValidateNested({ each: true })
    @Transform((v) => setDefault(v, defaultConfig.excelExportConfig), { toClassOnly: true })
    @IsNotEmptyObject()
    readonly excel: ExcelExportConfig;
}



import { Expose } from "class-transformer";
import { IsBoolean, IsIP, IsPort, IsString, ValidateIf } from "class-validator";

/**
 * @class: DatabaseConfig
 * @description: 数据库配置结构
 * @author: Ran
 * @time: 2023-01-04 09:04:12
 */
export class DatabaseConfig {
    @Expose()
    @IsBoolean()
    enable: boolean;

    @Expose()
    @ValidateIf((s) => s.enable)
    @IsIP()
    host: string;

    @Expose()
    @ValidateIf((s) => s.enable)
    @IsPort()
    port: string;

    @Expose()
    @ValidateIf((s) => s.enable)
    @IsString()
    user: string;

    @Expose()
    @ValidateIf((s) => s.enable)
    @IsString()
    password: string;

    /** 数据库名 */
    @Expose()
    @ValidateIf((s) => s.enable)
    @IsString()
    database: string;

    /** 同步表结构 */
    @Expose()
    @ValidateIf((s) => s.enable)
    @IsBoolean()
    sync: boolean;
}

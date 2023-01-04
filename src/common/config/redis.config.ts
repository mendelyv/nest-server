import { Expose } from "class-transformer";
import { IsBoolean, IsInt, IsIP, IsPort, IsString, ValidateIf } from "class-validator";

/**
 * @class: RedisConfig
 * @description: redis配置
 * @author: Ran
 * @time: 2023-01-04 09:21:02
 */
export class RedisConfig {
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
    password: string;

    @Expose()
    @ValidateIf((s) => s.enable)
    @IsInt()
    index: number;
}

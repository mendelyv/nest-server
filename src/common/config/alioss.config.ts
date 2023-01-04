import * as OSS from 'ali-oss';
import { Expose } from 'class-transformer';
import { IsBoolean, IsString, ValidateIf } from 'class-validator';

/**
 * @class: AliossConfig
 * @description: 阿里OSS配置
 * @author: Ran
 * @time: 2023-01-04 09:20:38
 */
export class AliossConfig implements OSS.Options {
    @Expose()
    @IsBoolean()
    enable: boolean;

    @Expose()
    @ValidateIf((s) => s.enable)
    @IsString()
    accessKeyId: string;

    @Expose()
    @ValidateIf((s) => s.enable)
    @IsString()
    accessKeySecret: string;

    @Expose()
    @ValidateIf((s) => s.enable)
    @IsString()
    bucket: string;

    @Expose()
    @ValidateIf((s) => s.enable)
    @IsString()
    region: string;

    @Expose()
    @ValidateIf((s) => s.enable)
    @IsString()
    endpoint: string;

    /** oss文件根路径 */
    @Expose()
    @ValidateIf((s) => s.enable)
    @IsString()
    basePath: string;
}

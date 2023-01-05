import { Expose, Transform } from "class-transformer";
import { IsHexColor, IsInt } from "class-validator";
import { setDefault, excelExportConfig } from "./default.config";

export class ExcelExportConfig {
    /** 默认列宽 */
    @Expose()
    @Transform((v) => setDefault(v, excelExportConfig.column), { toClassOnly: true })
    @IsInt()
    column: number;

    /** 默认行高 */
    @Expose()
    @Transform((v) => setDefault(v, excelExportConfig.row), { toClassOnly: true })
    @IsInt()
    row: number;

    /** 默认标题高 */
    @Expose()
    @Transform((v) => setDefault(v, excelExportConfig.titleHeight), { toClassOnly: true })
    @IsInt()
    titleHeight: number;

    /** 默认表头高 */
    @Expose()
    @Transform((v) => setDefault(v, excelExportConfig.headerHeight), { toClassOnly: true })
    @IsInt()
    headerHeight: number;

    /** 标题字体颜色 */
    @Expose()
    @Transform((v) => setDefault(v, excelExportConfig.titleFontColor), { toClassOnly: true })
    @IsHexColor()
    titleFontColor: string;

    /** 标题背景色 */
    @Expose()
    @Transform((v) => setDefault(v, excelExportConfig.titleBackgroundColor), { toClassOnly: true })
    @IsHexColor()
    titleBackgroundColor: string;

    /** 边框色 */
    @Expose()
    @Transform((v) => setDefault(v, excelExportConfig.borderColor), { toClassOnly: true })
    @IsHexColor()
    borderColor: string;

    /** 内容背景色 */
    @Expose()
    @Transform((v) => setDefault(v, excelExportConfig.contentBackgroundColor), { toClassOnly: true })
    @IsHexColor()
    contentBackgroundColor: string;
}

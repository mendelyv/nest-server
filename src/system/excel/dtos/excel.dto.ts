import { FindOptions } from "sequelize";
import { Model } from "sequelize-typescript";
import { envConfig } from "src/common/config";

export class GenerateExcelDto {
    /** excel文件名及标题名 */
    title: string;
    /** 每一列的表头 */
    header: HeaderType[];
    /** 导出数据，要与表头数组长度及顺序一一对应 */
    datas: Array<Array<string | number>>;
}


export class HeaderType {
    /** 列宽设置 */
    columnWidth: number;
    /** 列名 */
    name: string;


    constructor(name: string, columnWidth?: number) {
        this.name = name;
        this.columnWidth = columnWidth || envConfig.excel.column;
    }
}


/**
 * @class: ExcelExportOptions
 * @description: 导出Excel选项参数
 * @author: Ran
 * @time: 2023-03-10 13:07:05 
 */
export class ExcelExportOptions<T> {
    /** 文件路径 */
    filename: string;
    /** 导出表 */
    table: typeof Model<T>;
    /** 导出数据查找条件 */
    options: Omit<FindOptions<T>, 'group'>;
    /** 单步导出表数据量 */
    stepCount: number = 1000;
    /** sheet前缀 */
    sheetPrefix: string = 'sheet';
    /** 导出起始偏移 */
    offset: number = 0;
    /** 最大导出行数 */
    maxCount: number = -1;
    /** 导出字段 */
    fields: (keyof T)[];
}

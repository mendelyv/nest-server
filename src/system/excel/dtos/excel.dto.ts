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

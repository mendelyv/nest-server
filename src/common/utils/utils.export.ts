import * as ExcelJs from 'exceljs'
import * as Fs from 'fs'
import { envConfig } from '../config';
import { TimeUtils } from './utils.time';


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

export class GeneralExcelDto {
    /** excel文件名及标题名 */
    title: string;
    /** 每一列的表头 */
    header: HeaderType[];
    /** 导出数据，要与表头数组长度及顺序一一对应 */
    datas: Array<Array<string | number>>;
}

export class ExportUtils {

    /**
     * 导出-版本V1
     * @param object
     * @returns url
     */
    static async generalExcel(dto: GeneralExcelDto): Promise<string> {
        const config = envConfig.excel;
        // 创建一个文件
        const workbook = new ExcelJs.Workbook();
        workbook.creator = '';
        workbook.lastModifiedBy = '';
        workbook.created = new Date();
        workbook.modified = new Date();

        const { title, header, datas } = dto;
        // 创建一个工作组
        const sheet = workbook.addWorksheet(title);
        // 设置默认行高
        sheet.properties.defaultRowHeight = config.row;
        // 创建列
        sheet.getRow(1).values = [title + TimeUtils.format_3(new Date())];
        sheet.getRow(2).values = header.map(v => v.name);
        console.log(2);
        header.forEach((v, k) => {
            if (v.columnWidth) sheet.getColumn(k + 1).width = v.columnWidth
        })
        const colorFont = config.titleFontColor; // 字体颜色
        const colorHeader = config.titleBackgroundColor; // 表头背景色
        const colorBorder = config.borderColor; // 边框色
        const colorContent = config.contentBackgroundColor; // 内容填充色
        const rowHeader1 = sheet.getRow(1)
        const rowHeader2 = sheet.getRow(2)
        // 合并单元格
        sheet.mergeCells(`A1:${this.numToString(header.length)}1`);
        // 设置表头样式
        rowHeader1.getCell(1).border = { bottom: { style: 'thin' }, right: { style: 'thin' } };
        rowHeader1.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorHeader } };
        // 设置表头高度
        rowHeader1.height = config.titleHeight;
        rowHeader2.height = config.headerHeight;
        rowHeader1.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
        rowHeader1.getCell(1).font = { family: 2, bold: true, size: 24, color: { argb: colorFont }, };
        rowHeader2.eachCell(cell => {
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.font = { family: 2, bold: true };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorHeader } };
            cell.border = { bottom: { style: 'thin' }, right: { style: 'thin' } };
        });
        // 冻结行
        sheet.views = [{ state: 'frozen', ySplit: 2, activeCell: 'A1' }];
        // 填充内容
        const row1 = 3;
        for (let k = 0; k < datas.length; k++) {
            const element = datas[k];
            sheet.insertRow(row1 + k, element).eachCell((cell, number) => {
                cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: false };
                // cell.height = 42.5
                cell.font = { family: 2, bold: true };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorContent } };
                cell.border = { bottom: { style: 'thin' }, right: { style: 'thin' } };
            })
        }

        if (!Fs.existsSync('public')) Fs.mkdirSync('public');
        let basePath = 'public/excel';
        // 判断是否存在/public/excel, 不存在则创建
        if (!Fs.existsSync(basePath)) Fs.mkdirSync(basePath);
        const url: string = `${basePath}/${title}-${TimeUtils.format_2(new Date())}.xlsx`;
        await workbook.xlsx.writeFile(url)
        return url;
    }

    // 导出buffer
    static async generalExcelBuffer(dto: GeneralExcelDto): Promise<ExcelJs.Buffer> {
        const config = envConfig.excel;
        // 创建一个文件
        const workbook = new ExcelJs.Workbook();
        workbook.creator = '';
        workbook.lastModifiedBy = '';
        workbook.created = new Date();
        workbook.modified = new Date();

        const { title, header, datas } = dto;
        // 创建一个工作组
        const sheet = workbook.addWorksheet(title);
        // 设置默认行高
        sheet.properties.defaultRowHeight = config.row;
        // 创建列
        sheet.getRow(1).values = [title + TimeUtils.format_3(new Date())];
        sheet.getRow(2).values = header.map(v => v.name);
        console.log(2);
        header.forEach((v, k) => {
            if (v.columnWidth) sheet.getColumn(k + 1).width = v.columnWidth
        })
        const colorFont = config.titleFontColor; // 字体颜色
        const colorHeader = config.titleBackgroundColor; // 表头背景色
        const colorBorder = config.borderColor; // 边框色
        const colorContent = config.contentBackgroundColor; // 内容填充色
        const rowHeader1 = sheet.getRow(1)
        const rowHeader2 = sheet.getRow(2)
        // 合并单元格
        sheet.mergeCells(`A1:${this.numToString(header.length)}1`);
        // 设置表头样式
        rowHeader1.getCell(1).border = { bottom: { style: 'thin' }, right: { style: 'thin' } };
        rowHeader1.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorHeader } };
        // 设置表头高度
        rowHeader1.height = config.titleHeight;
        rowHeader2.height = config.headerHeight;
        rowHeader1.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
        rowHeader1.getCell(1).font = { family: 2, bold: true, size: 24, color: { argb: colorFont }, };
        rowHeader2.eachCell(cell => {
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.font = { family: 2, bold: true };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorHeader } };
            cell.border = { bottom: { style: 'thin' }, right: { style: 'thin' } };
        });
        // 冻结行
        sheet.views = [{ state: 'frozen', ySplit: 2, activeCell: 'A1' }];
        // 填充内容
        const row1 = 3;
        for (let k = 0; k < datas.length; k++) {
            const element = datas[k];
            sheet.insertRow(row1 + k, element).eachCell((cell, number) => {
                cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: false };
                // cell.height = 42.5
                cell.font = { family: 2, bold: true };
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorContent } };
                cell.border = { bottom: { style: 'thin' }, right: { style: 'thin' } };
            })
        }

        return await workbook.xlsx.writeBuffer()
    }

    // excel字母变数字
    static stringTonum(a: string): number {
        const str = a.toLowerCase().split('');
        const al = str.length;
        const getCharNumber = function(charx: any): number {
            return charx.charCodeAt() - 96;
        };
        let numout = 0;
        let charnum = 0;
        for (let i = 0; i < al; i++) {
            charnum = getCharNumber(str[i]);
            numout += charnum * Math.pow(26, al - i - 1);
        }
        return numout;
    }

    // excel数字变字母
    static numToString(numm: number): string {
        const stringArray = [];
        const numToStringAction = function(nnum: number): void {
            const num: number = nnum - 1;
            const a: number = num / 26;
            const b = num % 26;
            stringArray.push(String.fromCharCode(64 + b + 1));
            if (a > 0) numToStringAction(a);
        }
        numToStringAction(numm);
        return stringArray.reverse().join('');
    }

}

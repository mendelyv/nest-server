import { Injectable } from "@nestjs/common";
import * as ExcelJS from "exceljs";

@Injectable()
export class ExcelJsService {
    private async add(datas: any[], filename: string) {
        let workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filename);
        let worksheet = workbook.getWorksheet(1);
        let lastRow = worksheet.lastRow;
        let num = lastRow.number;
        worksheet.insertRows(num, datas);
        worksheet.commit();
    }


    async generate(datas: any[], filePath: string) {
        let chunk = []
        let num = 10000;
        let flag = false;
        while (datas.length > 0) {
            chunk = datas.splice(0, num)
            await this.add(chunk, filePath);
            flag = true
        }
    }
}

import { Injectable } from "@nestjs/common";
import * as ExcelJS from "exceljs";

@Injectable()
export class ExcelJsService {
  async add(worksheet, datas: any[]) {
    for (let i = 0; i < datas.length; i++) worksheet.addRow(datas[i.toString()]).commit();
    return true;
  }

  // async generate(datas: any[], filePath: string) {
  //   let chunk = [];
  //   let num = 10000;
  //   let flag = false;
  //   while (datas.length > 0) {
  //     chunk = datas.splice(0, num);
  //     await this.add(chunk, filePath);
  //     flag = true;
  //   }
  // }
}

import { Injectable } from "@nestjs/common";
import * as xlsx from "xlsx";
import * as fs from "fs";
import { Readable } from "stream";

@Injectable()
export class ExcelService {
    private add(datas: any[], filePath: string, skipHeader: boolean) {
        return new Promise<boolean>(resolve => {
            const jsonWorkSheet = xlsx.utils.json_to_sheet(datas, { skipHeader: skipHeader });
            const stream = xlsx.stream.to_csv(jsonWorkSheet) as Readable;
            const writeS = fs.createWriteStream(filePath);
            stream.pipe(writeS);
            stream.on('end', () => {
                stream.destroy();
                resolve(true);
            });
            stream.on('error', () => {
                stream.destroy();
                resolve(false);
            });
        });
    }


    async generate(datas: any[], filePath: string) {
        let chunk = []
        let num = 1000;
        let flag = false;
        while (datas.length > 0) {
            chunk = datas.splice(0, num)
            await this.add(chunk, filePath, flag);
            flag = true
        }
    }
}

import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { existsSync, mkdirSync } from 'fs';
import { ExcelExportOptions } from './dtos/excel.dto';

@Injectable()
export class ExcelService {
    async exportMassData<T>(options: ExcelExportOptions<T>) {
        this.checkAndMakeDirectory(options.filename);
        const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
            filename: options.filename,
        });
        const sheet = workbook.addWorksheet(options.sheetPrefix + '1');
        // @ts-ignore
        let maxRow: number = await options.table.count(options.options);
        let offset = options.offset;
        let total = 0;
        for (; maxRow > 0; ) {
            options.options.offset = offset;
            options.options.limit = options.stepCount;
            // @ts-ignore
            let datas = await options.table.findAll(options.options);
            offset += options.stepCount;
            maxRow -= options.stepCount;
            total += options.stepCount;
            for (let i = 0; i < datas.length; i++) {
                let data = datas[i];
                let rows = [];
                for (let j = 0; j < options.fields.length; j++)
                    // @ts-ignore
                    rows.push(data[options.fields[j]]);
                sheet.addRow(rows).commit();
            }
            if (options.maxCount > 0 && total >= options.maxCount) break;
        }
        sheet.commit();
        await workbook.commit();
    }

    private checkAndMakeDirectory(path: string) {
        let p = path.split('/');
        p.pop();
        let _p = '';
        for (let i = 0; i < p.length; i++) {
            _p += p[i] + '/';
            if (!existsSync(_p)) mkdirSync(_p);
        }
    }
}


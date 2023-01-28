import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { ExcelJsService } from "./exceljs.service";
import * as exceljs from "exceljs";

describe('exceljs导出测试', () => {
    let s_excel: ExcelJsService;
    let app: INestApplication;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [ExcelJsService],
        }).compile();
        app = module.createNestApplication();
        await app.init();
        s_excel = module.get(ExcelJsService);
    });

    afterAll(async () => {
        await app.close();
    });

    it('测试基础导出', async () => {
        let workbook = new exceljs.Workbook();
        workbook.xlsx.writeFile('public/excel/测试exceljs基础导出.xlsx');
        debugger;
        let datas = [];
        for (let j = 0; j < 1000; j++) {
            for (let i = 0; i < 1000; i++) {
                datas.push({
                    hello: '哈哈哈' + i,
                    world: '黑乎乎' + i,
                    hehe2: '黑乎乎' + i,
                    hehe3: '黑乎乎' + i,
                    hehe4: '黑乎乎' + i,
                    hehe5: '黑乎乎' + i,
                    hehe6: '黑乎乎' + i,
                    hehe7: '黑乎乎' + i,
                    hehe8: '黑乎乎' + i,
                    hehe9: '黑乎乎' + i,
                    hehe10: '黑乎乎' + i,
                    hehe11: '黑乎乎' + i,
                    hehe12: '黑乎乎' + i,
                    hehe13: '黑乎乎' + i,
                    hehe14: '黑乎乎' + i,
                    hehe15: '黑乎乎' + i,
                })
            }
            await s_excel.generate(datas, 'public/excel/测试exceljs基础导出.xlsx');
        }
        expect(true).toBe(true);
    });
});

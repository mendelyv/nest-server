import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { ExcelService } from "./excel.service";

describe('xlsx导出测试', () => {
    let s_excel: ExcelService;
    let app: INestApplication;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            providers: [ExcelService],
        }).compile();
        app = module.createNestApplication();
        await app.init();
        s_excel = module.get(ExcelService);
    });

    afterAll(async () => {
        await app.close();
    });

    it('测试基础导出', async () => {
        debugger;
        let datas = [];
        // for (let i = 0; i < 10; i++) {
        //     datas = [];
        //     for (let j = 0; j < 10; j++) {
        //         datas.push({
        //             hello: '哈哈哈' + i + j,
        //             world: '黑乎乎' + i + j,
        //             hehe2: '黑乎乎' + i + j,
        //             hehe3: '黑乎乎' + i + j,
        //             hehe4: '黑乎乎' + i + j,
        //             hehe5: '黑乎乎' + i + j,
        //             hehe6: '黑乎乎' + i + j,
        //             hehe7: '黑乎乎' + i + j,
        //             hehe8: '黑乎乎' + i + j,
        //             hehe9: '黑乎乎' + i + j,
        //             hehe10: '黑乎乎' + i + j,
        //             hehe11: '黑乎乎' + i + j,
        //             hehe12: '黑乎乎' + i + j,
        //             hehe13: '黑乎乎' + i + j,
        //             hehe14: '黑乎乎' + i + j,
        //             hehe15: '黑乎乎' + i + j,
        //         });
        //     }
        //     await s_excel.generate(datas, 'public/excel/测试xlsx基础导出.xlsx');
        // }

        for (let i = 0; i < 100; i++) {
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
            });
        }
        await s_excel.generate(datas, 'public/excel/测试xlsx基础导出.xlsx');
        expect(true).toBe(true);
    });
});

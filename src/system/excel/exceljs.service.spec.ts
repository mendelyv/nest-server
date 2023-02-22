import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { ExcelJsService } from "./exceljs.service";
import * as exceljs from "exceljs";

describe("exceljs导出测试", () => {
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

  it("测试基础导出", async () => {
    const workbook = new exceljs.stream.xlsx.WorkbookWriter({
      filename: "public/excel/测试exceljs基础导出.xlsx",
    });
    const sheet = workbook.addWorksheet("test");
    for (let j = 0; j < 10; j++)
      for (let i = 0; i < 100000; i++) {
        sheet
          .addRow([
            "哈哈哈" + i,
            "黑乎乎" + i,
            "黑乎乎" + i,
            "黑乎乎" + i,
            "黑乎乎" + i,
            "黑乎乎" + i,
            "黑乎乎" + i,
            "黑乎乎" + i,
            "黑乎乎" + i,
            "黑乎乎" + i,
            "黑乎乎" + i,
            "黑乎乎" + i,
            "黑乎乎" + i,
            "黑乎乎" + i,
            "黑乎乎" + i,
            "黑乎乎" + i,
          ])
          .commit();
      }

    // await s_excel.add(sheet, datas);
    sheet.commit();
    await workbook.commit();
    expect(true).toBe(true);
  });
});

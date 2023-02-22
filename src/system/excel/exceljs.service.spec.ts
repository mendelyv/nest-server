import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { ExcelJsService } from "./exceljs.service";
import * as exceljs from "exceljs";
import { DatabaseManager } from "../database/database.manager";
import { DataBaseModule } from "../database/database.module";

describe("exceljs导出测试", () => {
  let s_excel: ExcelJsService;
  let app: INestApplication;
  let dbm: DatabaseManager;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [DataBaseModule.register()],
      providers: [ExcelJsService],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    s_excel = module.get(ExcelJsService);
    dbm = module.get(DatabaseManager);
  });

  afterAll(async () => {
    await dbm.sequelize.close();
    await app.close();
  });

  it("测试基础导出", async () => {
    const workbook = new exceljs.stream.xlsx.WorkbookWriter({
      filename: "public/excel/测试exceljs基础导出.xlsx",
    });
    const sheet = workbook.addWorksheet("test");
    // for (let j = 0; j < 10; j++)
    //   for (let i = 0; i < 100000; i++) {
    //     sheet
    //       .addRow([
    //         "哈哈哈" + i,
    //         "黑乎乎" + i,
    //         "黑乎乎" + i,
    //         "黑乎乎" + i,
    //         "黑乎乎" + i,
    //         "黑乎乎" + i,
    //         "黑乎乎" + i,
    //         "黑乎乎" + i,
    //         "黑乎乎" + i,
    //         "黑乎乎" + i,
    //         "黑乎乎" + i,
    //         "黑乎乎" + i,
    //         "黑乎乎" + i,
    //         "黑乎乎" + i,
    //         "黑乎乎" + i,
    //         "黑乎乎" + i,
    //       ])
    //       .commit();
    //   }
    debugger;
    let [res] = await dbm.sequelize.query(`SELECT COUNT(*) FROM student`);
    let total = res[0]['COUNT(*)'];
    let offset = 0;
    let count = 1000;
    for(;total > 0;) {
      let [datas] = await dbm.sequelize.query(`SELECT * FROM student LIMIT ${offset},${count}`);
      offset += count;
      total -= count;

      for(let i = 0; i < datas.length; i++) {
        let data = datas[i] as any;
        sheet.addRow([data.id, data.stuno, data.name, data.age, data.classId]).commit();
      }
    }
    sheet.commit();
    await workbook.commit();
    expect(true).toBe(true);
  });
});

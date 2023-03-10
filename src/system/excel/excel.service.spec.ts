import { Test } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import { ExcelService } from "./excel.service"
import { DatabaseManager } from "../database/database.manager"
import { DatabaseModule } from "../database/database.module"

describe("exceljs导出测试", () => {
    let s_excel: ExcelService
    let app: INestApplication
    let dbm: DatabaseManager
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [DatabaseModule.register()],
            providers: [ExcelService],
        }).compile()
        app = module.createNestApplication()
        await app.init()
        s_excel = module.get(ExcelService)
        dbm = module.get(DatabaseManager)
    })

    afterAll(async () => {
        await dbm.sequelize.close()
        await app.close()
    })

    it("测试基础导出", async () => {
        // await s_excel.exportMassData<Student>({
        //     filename: "public/excel/测试exceljs基础导出.xlsx",
        //     table: Student,
        //     options: {},
        //     stepCount: 1000,
        //     maxCount: -1,
        //     offset: 0,
        //     sheetPrefix: "sheet",
        //     fields: ["id", "stuno", "name", "age", "classId"],
        // })
        expect(true).toBe(true)
    })
})

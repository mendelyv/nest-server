import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { DatabaseManager } from "src/system/database/database.manager";
import { DataBaseModule } from "src/system/database/database.module";
import { CreateUserRequest, UpdateUserRequest } from "./dto/user.dto";
import { userProviders } from "./providers";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

describe('UserModule', () => {
    let userService: UserService;
    let testId: number = 4;
    let app: INestApplication;
    let dbm: DatabaseManager;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                ...userProviders,
                UserService,
            ],
            imports: [DataBaseModule],
        }).compile();
        app = module.createNestApplication();
        await app.init();
        dbm = module.get(DatabaseManager);
        userService = module.get(UserService);
    });

    afterAll(async () => {
        await dbm.sequelize.close();
        await app.close();
    });

    describe('UserService', () => {
        it('create', async () => {
            const packet = new CreateUserRequest();
            packet.username = 'test username' + new Date();
            packet.password = 'test123';
            packet.displayName = '测试真实姓名';
            packet.email = 'test@test.com';
            packet.mobile = (new Date()).getSeconds().toString();
            packet.sex = 1;
            packet.profileImageUrl = 'http://xxx.xxx.xxx';
            const result = await userService.create(packet);
            testId = result.id;
            expect(result.username).toEqual(packet.username);
            expect(result.password).toEqual(packet.password);
            expect(result.displayName).toEqual(packet.displayName);
            expect(result.email).toEqual(packet.email);
            expect(result.mobile).toEqual(packet.mobile);
            expect(result.sex).toEqual(packet.sex);
            expect(result.profileImageUrl).toEqual(packet.profileImageUrl);
        });

        it('show', async () => {
            const fn = jest.spyOn(userService, 'findOne');
            const res = await userService.findOne(testId.toString());
            expect(fn).toBeCalledTimes(1);
            expect(res != null).toBe(true);
        });

        it('index', async () => {
            const result = {
                rows: [],
                count: 0,
            }
            jest.spyOn(userService, 'findAll').mockResolvedValue(result);
            const testRes = await userService.findAll();
            expect(result).toEqual(testRes);
        });

        it('update', async () => {
            const packet = new UpdateUserRequest();
            packet.username = '测试用户名';
            packet.profileImageUrl = 'https://yyy.yyy.yyy';
            const result = await userService.update(testId.toString(), packet);
            expect(result[0]).toBeGreaterThanOrEqual(1);
        });

        it('destroy', async () => {
            const result = await userService.destroy(testId.toString());
            expect(result).toBeGreaterThanOrEqual(1);
        });
    });
})

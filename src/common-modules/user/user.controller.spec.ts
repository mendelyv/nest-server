import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { userProviders } from "./providers";
import { UserController } from "./user.controller"
import { UserService } from "./user.service";

describe('UserModule', () => {
    let userController: UserController;
    let userService: UserService;
    let app: INestApplication;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                ...userProviders,
                UserService,
            ],
        }).compile();
        app = module.createNestApplication();
        await app.init();
        userController = module.get(UserController);
        userService = module.get(UserService);
    });

    afterAll(async () => {
        await app.close();
    });

    it('instance user controller', () => {
        expect(userController).toBeDefined();
    })

    it('instance user service', () => {
        expect(userService).toBeDefined();
    })
})

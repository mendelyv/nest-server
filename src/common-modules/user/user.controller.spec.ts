import { Test } from "@nestjs/testing";
import { DataBaseModule } from "src/system/database/database.module";
import { userProviders } from "./providers";
import { UserController } from "./user.controller"
import { UserService } from "./user.service";

describe('UserModule', () => {
    let userController: UserController;
    let userService: UserService;

    beforeAll(async() => {
        const module = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                ...userProviders,
                UserService,
            ],
            imports: [DataBaseModule],
        }).compile();
        userController = module.get(UserController);
        userService = module.get(UserService);
    });

    it('instance user controller', () => {
        expect(userController).toBeDefined();
    })

    it('instance user service', () => {
        expect(userService).toBeDefined();
    })
})

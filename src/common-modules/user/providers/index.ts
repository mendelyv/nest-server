import { Provider } from "@nestjs/common";
import { userRespositoryProvider } from "src/common/constants/repository.constants";
import { User } from "../entities/user.entity";

export const userProviders: Provider[] = [
    {
        provide: userRespositoryProvider,
        useValue: User
    }
];

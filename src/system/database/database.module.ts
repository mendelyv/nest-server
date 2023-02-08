import { DynamicModule } from "@nestjs/common";
import { envConfig } from "src/common/config";
import { DatabaseManager } from "./database.manager";
import { databaseProviders } from "./database.providers";

export class DatabaseModule {
    static register(): DynamicModule {
        return envConfig.database.enable ? {
            module: DatabaseModule,
            providers: [...databaseProviders, DatabaseManager],
            exports: [DatabaseManager],
            global: true,
        } : {
            module: DatabaseModule,
        }
    }
}

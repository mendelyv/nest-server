import { DynamicModule } from "@nestjs/common";
import { envConfig } from "src/common/config";
import { DatabaseManager } from "./database.manager";
import { databaseProviders } from "./database.providers";

export class DataBaseModule {
    static register(): DynamicModule {
        return envConfig.database.enable ? {
            module: DataBaseModule,
            providers: [...databaseProviders, DatabaseManager],
            exports: [DatabaseManager],
            global: true,
        } : {
            module: DataBaseModule,
        }
    }
}

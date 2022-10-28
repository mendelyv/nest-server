import { Module, Global } from "@nestjs/common";
import { DatabaseManager } from "./database.manager";
import { databaseProviders } from "./database.providers";

@Global()
@Module({
    providers: [...databaseProviders, DatabaseManager],
    exports: [DatabaseManager]
})
export class DataBaseModule { }

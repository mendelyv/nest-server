import { Module } from "@nestjs/common";
import { DatabaseManager } from "./database.manager";
import { databaseProviders } from "./database.providers";

@Module({
    providers: [...databaseProviders, DatabaseManager],
    exports: [...databaseProviders, DatabaseManager]
})
export class DataBaseModule {}

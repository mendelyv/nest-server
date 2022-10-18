import { Provider } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript"
import { Dialect } from 'sequelize/types';
import { envConfig } from "src/common/config";
import { DatabaseManager } from "./database.manager";

export const databaseProviders: Provider[] = [
    {
        provide: 'Sequelize',
        useFactory: (dbmanager: DatabaseManager) => {
            const sequelize = new Sequelize({
                dialect: 'mysql' as Dialect,
                host: envConfig.db_host,
                port: parseInt(envConfig.db_port),
                username: envConfig.db_user,
                password: envConfig.db_password,
                database: envConfig.db_name,
                define: {
                    paranoid: false,
                    underscored: true,
                    freezeTableName: true,
                }
            });
            dbmanager.initSequelize(sequelize);
            return sequelize;
        },
        inject: [DatabaseManager]
    }
]

import { Provider } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript"
import { Dialect } from 'sequelize/types';
import { envConfig } from "src/common/config";
import * as chalk from "chalk";
import { DB } from "./database.tables";

export const databaseProviders: Provider[] = [
    {
        provide: 'Sequelize',
        useFactory: () => {
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

            let tables = DB.getTables();
            sequelize.addModels(tables);

            if (envConfig.db_sync) {
                sequelize.sync({ alter: true })
            }

            let logFormat = chalk.green('[DataBase Tables]: ');
            for (let i = 0; i < tables.length; i++) {
                let table = tables[i];
                logFormat += table.tableName;
                if (i != tables.length - 1) logFormat += ' | ';
            }
            console.log(logFormat);

            return sequelize;
        },
    }
]

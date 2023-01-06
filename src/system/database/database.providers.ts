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
            const config = envConfig.database;
            const sequelize = new Sequelize({
                dialect: 'mysql' as Dialect,
                host: config.host,
                port: parseInt(config.port),
                username: config.user,
                password: config.password,
                database: config.database,
                define: {
                    paranoid: false,
                    underscored: true,
                    freezeTableName: true,
                }
            });

            let tables = DB.getTables();
            sequelize.addModels(tables);

            if (config.sync) {
                sequelize.sync({ alter: true })
            }

            if (!envConfig.silent && !envConfig.databaseSilent) {
                let logFormat = chalk.green('[DataBase Tables]: ');
                for (let i = 0; i < tables.length; i++) {
                    let table = tables[i];
                    logFormat += table.tableName;
                    if (i != tables.length - 1) logFormat += ' | ';
                }
                console.log(logFormat);
            }

            return sequelize;
        },
    }
]

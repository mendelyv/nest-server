import { Provider } from "@nestjs/common";
import { Sequelize, SequelizeOptions } from "sequelize-typescript"
import { Dialect } from 'sequelize/types';
import { envConfig } from "src/common/config";
import * as chalk from "chalk";
import { DB } from "./database.tables";
import { LogManager } from "../log/log.manager";
import { env } from "process";

export const databaseProviders: Provider[] = [
    {
        provide: 'Sequelize',
        useFactory: () => {
            const config = envConfig.database;

            let options: SequelizeOptions = {
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
                },
            }

            let logging: boolean | ((sql: string, timing?: number) => void);
            if (env.NODE_ENV === 'production') {
                logging = false;
                if (config.log) logging = (sql: string, timing?: number) => {
                    LogManager.SQL(sql);
                }
            } else {
                if (config.silent && !config.log) logging = false;
                else if (config.silent && config.log)
                    logging = (sql: string, timing?: number) => {
                        LogManager.SQL(sql);
                    }
                else if (!config.silent && config.log)
                    logging = (sql: string, timing?: number) => {
                        LogManager.SQL(sql);
                        console.log(sql);
                    }
            }

            if (logging != null) options.logging = logging;

            const sequelize = new Sequelize(options);

            let tables = DB.getTables();
            sequelize.addModels(tables);

            if (config.sync) {
                sequelize.sync({ alter: true })
            }

            if (!envConfig.silent && !config.silentInitModels) {
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

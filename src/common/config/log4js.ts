import * as path from 'path';
import { env } from 'process';
import { envConfig } from '.';
const baseLogPath = path.resolve('logs'); // 日志根目录

const log4jsConfig = {
    appenders: {
        console: {
            type: 'console',//打印到控制台
        },
        access: {
            type: 'dateFile',//会写入文件，并且按照日期分类
            filename: `${baseLogPath}/access/access.log`,//日志文件名，会命名为：access.当前时间.log
            alwaysIncludePattern: true,
            pattern: 'yyyy-MM-dd',//时间格式
            daysToKeep: 60,
            numBackups: 3,
            category: 'http',
            keepFileExt: true,//是否保留文件后缀
        },
        app: {
            type: 'dateFile',
            filename: `${baseLogPath}/app-out/app.log`,
            alwaysIncludePattern: true,
            //日志文件按日期切割
            pattern: 'yyyy-MM-dd',
            daysToKeep: 60,
            numBackups: 3,
            keepFileExt: true,
        },
        errorFile: {
            type: 'dateFile',
            filename: `${baseLogPath}/errors/error.log`,
            alwaysIncludePattern: true,
            pattern: 'yyyy-MM-dd',
            daysToKeep: 60,
            numBackups: 3,
            keepFileExt: true,
        },
        errors: {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: 'errorFile',
        },
        SQL: {
            type: 'dateFile',
            filename: `${baseLogPath}/SQLs/SQL.log`,
            alwaysIncludePattern: true,
            pattern: 'yyyy-MM-dd',
            daysToKeep: 60,
            numBackups: 3,
            keepFileExt: true,
        }
    },
    categories: {
        default: {
            appenders: ['app', 'errors'],
            level: 'DEBUG',
        },
        http: { appenders: ['access'], level: 'DEBUG' },
    },
}
if (env.NODE_ENV == 'development' && !envConfig.silent && !envConfig.logSilent) {
    log4jsConfig.categories.default.appenders.push('console');
}
if (envConfig.database.log) {
    log4jsConfig.categories['SQL'] = { appenders: ['SQL'], level: 'DEBUG' };
}
export default log4jsConfig;

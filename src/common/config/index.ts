import * as path from 'path';
import { load as yamlLoad } from 'js-yaml';
import { readFileSync } from 'fs';
import { plainToClass } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import * as chalk from 'chalk';
import { EnvironmentConfig } from './environment.config';

const TAG = '[ENV]';

// 解析配置文件
const envFilePath = path.resolve(`env.${process.env.NODE_ENV.toLocaleLowerCase()}.yaml`);
const _envConfig = yamlLoad(readFileSync(envFilePath, 'utf-8'));
if (!_envConfig) {
    const err = chalk.red(`${TAG}: environment file is empty`) + `filePath: ${envFilePath}`;
    throw new Error(err);
}
// console.log("_envConfig: ", _envConfig);

// debugger;

// 将配置文件内容读取为环境配置示例对象
export const envConfig = plainToClass(EnvironmentConfig, _envConfig, {
    excludeExtraneousValues: true,
});
// console.log("envConfig: ", envConfig);

if (!envConfig.silent) {
    console.log(chalk.green(`${TAG}: prepare check environment config...`));
    console.log(chalk.green(`${TAG}: enviroment config file path`), `${envFilePath}`);
}

const errors = validateSync(envConfig);
if (errors.length > 0) {
    console.log(chalk.red(formatValidationError(errors)));
    throw new Error(chalk.red(`${TAG}: check environment failed`));
} else {
    if (!envConfig.silent)
        console.log(chalk.green(`${TAG}: check environment succeed, start server...`));
}

/**
 * 格式化class-validator错误信息
 */
function formatValidationError(errors: ValidationError[], property: boolean = true) {
    let ret = '';
    for (let i = 0; i < errors.length; i++) {
        let error = errors[i];
        if (property) ret += error.property + ':\n';
        if (error.constraints) {
            let keys = Object.keys(error.constraints);
            for (let j = 0; j < keys.length; j++) {
                ret += `\t${error.constraints[keys[j]]}\n`;
            }
        } else if (error.children && error.children.length > 0) {
            ret += formatValidationError(error.children, false);
        }
    }
    return ret;
}

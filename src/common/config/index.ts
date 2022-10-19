import * as path from 'path';
import { load as yamlLoad } from 'js-yaml';
import { readFileSync } from 'fs';
import { plainToClass } from 'class-transformer';
import { EnvConfigEntity } from './entities/env-config.entity';
import { validateSync } from 'class-validator';
import * as chalk from 'chalk';

const TAG = '[ENV]';
console.log(chalk.green(`${TAG}: prepare check environment config...`));

// 解析配置文件
const envFilePath = path.resolve(`env.${process.env.NODE_ENV.toLocaleLowerCase()}.yaml`);
console.log(chalk.green(`${TAG}: enviroment config file path`), `${envFilePath}`);
const _envConfig = yamlLoad(readFileSync(envFilePath, 'utf-8'));
if(!_envConfig) {
    const err = chalk.red(`${TAG}: environment file is empty`) + `filePath: ${envFilePath}`;
    throw new Error(err);
}
// console.log("_envConfig: ", _envConfig);

// 将配置文件内容读取为环境配置示例对象
export const envConfig = plainToClass(EnvConfigEntity, _envConfig, {
    excludeExtraneousValues: true
});
// console.log("envConfig: ", envConfig);

const errors = validateSync(envConfig);
if(errors.length > 0) {
    console.log(_buildError(errors));
    throw new Error(chalk.red(`${TAG}: check environment failed`));
} else {
    console.log(chalk.green(`${TAG}: check environment succeed, start server...`));
}

// 构建错误
function _buildError(errors) {
  const result = {}
  errors.forEach((el) => {
    const prop = el.property
    Object.entries(el.constraints).forEach((constraint) => {
      result[prop] = constraint[1]
    })
  })
  return result
}

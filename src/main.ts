import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { envConfig } from './common/config';
import * as nunjucks from 'nunjucks';
import { logger } from './common/middleware/logger.middleware';
import * as Express from 'express';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { AppExceptionFilter } from './common/filter/app-exception.filter';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import * as chalk from 'chalk';
import { Swagger } from './swagger';
const { NODE_ENV = 'production' } = process.env;

// declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['error'],
    });
    const express = app.getHttpAdapter().getInstance();

    // 静态资源
    const assets = join(__dirname, '..', 'public');
    // 静态模板
    const views = join(__dirname, '..', 'views');
    // 配置njk引擎
    nunjucks.configure(views, { express });
    app.useStaticAssets(assets);
    app.setBaseViewsDir(views);
    app.setViewEngine('njk');

    // 配置接口文档
    Swagger.setupSwagger(app);

    // 解析请求体结构
    app.use(Express.json());
    app.use(Express.urlencoded({ extended: true }));

    // 使用logger中间件监听所有路由Request
    app.use(logger);
    // 使用transform拦截器监听所有路由Response
    app.useGlobalInterceptors(new TransformInterceptor());

    // 全局异常过滤器
    app.useGlobalFilters(new AppExceptionFilter());
    // 全局Http异常过滤器
    app.useGlobalFilters(new HttpExceptionFilter());

    const port = envConfig.port;
    await app.listen(port);
    console.log(chalk.green(` ===== app on ${port} now ===== `));
    if (!envConfig.silent && !envConfig.configSilent)
        console.log(chalk.green('[ENV]: 运行配置 '), envConfig);
    console.log(chalk.green('[ENV]: 运行模式 '), chalk.yellow(NODE_ENV));
    console.log(chalk.green(` ===== app on ${port} now ===== `));

    // if(module.hot) {
    //     module.hot.accept();
    //     module.hot.dispose(() => app.close());
    // }
}
bootstrap();

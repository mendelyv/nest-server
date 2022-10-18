import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { envConfig } from './common/config';
import { setupSwagger } from './swagger';
import * as nunjucks from 'nunjucks';
import { logger } from './common/middleware/logger.middleware';
import * as Express from 'express';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { AppExceptionFilter } from './common/filter/app-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const express = app.getHttpAdapter().getInstance();

    // 静态资源
    const assets = join(__dirname, '..', 'public');
    // 静态模板
    const views = join(__dirname, '..', 'views');
    // 配置njk引擎
    nunjucks.configure(views, {express});
    app.useStaticAssets(assets);
    app.setBaseViewsDir(views);
    app.setViewEngine('njk');

    // 配置接口文档
    setupSwagger(app);

    // 解析请求体结构
    app.use(Express.json());
    app.use(Express.urlencoded({extended: true}));

    // 使用logger中间件监听所有路由Request
    app.use(logger);
    // 使用transform拦截器监听所有路由Response
    app.useGlobalInterceptors(new TransformInterceptor());

    // 全局异常过滤器
    app.useGlobalFilters(new AppExceptionFilter());

    const port = envConfig.server_port;
    await app.listen(port);
}
bootstrap();

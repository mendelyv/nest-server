# nestjs模板

## 📌 简介
基于 `nestjs` +`sequelize`+`redis`+`mysql`+`class-validator`+`restful`。

Nodejs框架学习项目

## 📂 文件结构
```
src
├── app.controller.ts
├── app.module.ts
├── common                              // 通用代码，组件，工具
│   ├── base                            // 基础数据结构   
│   ├── config                          // 环境配置
│   ├── constants                       // 常量
│   ├── decorator
│   ├── filter
│   ├── guard
│   ├── interceptor
│   ├── middleware
│   ├── pipe
│   └── utils
├── common-modules
│   └── user
├── main.ts
├── swagger.ts
└── system
    ├── cache
    ├── database
    ├── log
    └── oss
```
## 📄 环境配置 
根目录下创建env.{NODE_ENV}.yaml文件，变量名同env-config.entity.ts
配置遵循覆盖原则，default配置为最低覆盖等级，如在yaml文件中配置，则以手动配置为准


NODE_ENV配置详见package.json

## 📊数据库
database模块为全局模块，使用时只需引入对应导出的provider即可。\
(PS: app.module.ts导入数据库模块的原因为手动调用一下database提供者中的工厂函数)

声明数据表对象见user示例代码user.entitiy.ts。

database.manager.ts数据库管理类，存放Sequelize实例化后的对象。

使用Sequelize ORM，API详见[Sequelize文档][sequelize herf]

## 💾 缓存
缓存采用ioredis包与Redis服务连接

app-cache模块为全局模块

app-cache.service.ts提供Redis单例，使用时仅需注入AppCacheService即可

## 🗄️ 文件存储
仅简单实现了文件上传

采用阿里云OSS服务，详见[阿里云OSS文档][aliOSS herf]

## 🗂️ API文档
采用Swagger自动生成，相关装饰器使用见user模块示例代码

详细使用说明见[Nestjs OpenAPI][Nestjs OpenAPI herf]

## 🛠️ 单元测试(非强制)
采用jest包来进行单元测试，测试用例代码详见user.controller.spec.ts，user.service.spec.ts和log.controller.spec.ts。

测试用例文件均使用spec或test修饰，jest会自行寻找，或自行配置jest.config.js文件。

[jest教程][jest herf]

## 📑 静态网页
文件存于views

使用nunjucks渲染

示例代码见app.controller.ts中@Render修饰函数

## 📝 日志
使用log4js完成日志的打印及落盘
```
logs
├── access          // 请求及响应日志
├── app-out         // 所有通过LogManger输出的日志
└── errors          // 异常日志
src
├── ····
```
## 📦 打包
采用Webpack + pkg的打包方式，pkg见[pkg github][pkg herf]

```
// webpack打包development环境
npm run build:dev

// webpack打包production环境
npm run build:prod

// pkg打包linux
npm run pkg:linux
```
打包后的文件在release文件夹中

## 🔍 参考链接
Nestjs框架：\
https://github.com/SunSeekerX/upushy-server \
https://github.com/kentloog/nestjs-sequelize-typescript

log4js日志系统：\
https://juejin.cn/post/6844904098689449998

webpack配置：\
https://github.com/ZenSoftware/bundled-nest

pkg打包：\
https://juejin.cn/post/6855129005730775053


[sequelize herf]: https://sequelize.org
[aliOSS herf]: https://help.aliyun.com/document_detail/32070.html
[Nestjs OpenAPI herf]: https://docs.nestjs.cn/8/openapi
[pkg herf]: https://github.com/vercel/pkg
